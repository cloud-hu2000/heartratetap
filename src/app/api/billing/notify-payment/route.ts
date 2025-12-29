import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import crypto from "crypto";

// WorldFirst RSA公钥 (需要在环境变量中配置)
const WORLDFIRST_PUBLIC_KEY = process.env.WORLDFIRST_PUBLIC_KEY;

// 验证RSA256签名
function verifySignature(signature: string, data: string, publicKey: string): boolean {
  try {
    // 从签名字符串中提取实际签名 (格式: algorithm=RSA256, keyVersion=2, signature=xxxxx)
    const signatureMatch = signature.match(/signature=([^,]+)/);
    if (!signatureMatch) {
      console.error('❌ 无效的签名格式');
      return false;
    }

    const actualSignature = signatureMatch[1];
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(data, 'utf8');

    return verifier.verify(publicKey, actualSignature, 'base64');
  } catch (error) {
    console.error('💥 签名验证失败:', error);
    return false;
  }
}

// 处理支付通知
async function handlePaymentNotification(notificationData: any) {
  const {
    payToRequestId,  // 商户生成的支付请求号
    paymentId,       // 万里汇支付ID
    paymentTime,     // 支付时间
    paymentAmount,   // 支付金额
    result,          // 支付结果
    notifyType       // 通知类型
  } = notificationData;

  console.log('📡 处理支付通知:', {
    payToRequestId,
    paymentId,
    paymentTime,
    paymentAmount,
    result,
    notifyType
  });

  // 检查数据库连接
  if (!sql) {
    console.error('❌ 数据库连接不可用');
    throw new Error('Database connection not available');
  }

  // 只有支付成功的结果才处理
  if (result.resultStatus !== 'S' || result.resultCode !== 'SUCCESS') {
    console.log('⚠️ 支付未成功，跳过处理:', result);
    return;
  }

  // 从payToRequestId中解析用户信息 (格式: user_{userId}_{tier}_{timestamp})
  const requestIdParts = payToRequestId.split('_');
  if (requestIdParts.length < 3 || requestIdParts[0] !== 'user') {
    console.error('❌ 无效的支付请求ID格式:', payToRequestId);
    throw new Error('Invalid payment request ID format');
  }

  const userId = requestIdParts[1];
  const tier = requestIdParts[2];

  console.log('👤 更新用户账户:', { userId, tier, paymentAmount });

  // 更新用户的会员等级
  const updateResult = await sql`
    UPDATE users
    SET account_tier = ${tier}, updated_at = NOW()
    WHERE id = ${userId}
  `;

  if (updateResult.rowCount === 0) {
    console.error('❌ 用户更新失败，用户ID不存在:', userId);
    throw new Error('User not found or update failed');
  }

  // 记录支付历史 (可以扩展为单独的支付记录表)
  console.log('✅ 用户账户更新成功:', { userId, tier });

  // 可以在这里添加更多业务逻辑，比如：
  // - 发送确认邮件
  // - 更新订阅状态
  // - 触发其他业务流程
}

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 API /api/billing/notify-payment: 接收万里汇支付通知');

    // 检查环境变量
    if (!WORLDFIRST_PUBLIC_KEY) {
      console.error('❌ WORLDFIRST_PUBLIC_KEY 环境变量未配置');
      return NextResponse.json({
        result: {
          resultStatus: "F",
          resultCode: "PARAM_ILLEGAL",
          resultMessage: "WorldFirst public key not configured"
        }
      }, { status: 500 });
    }

    // 获取请求头
    const signature = req.headers.get('signature');
    const clientId = req.headers.get('client-id');
    const responseTime = req.headers.get('response-time');

    console.log('📋 请求头信息:', { signature: signature?.substring(0, 50) + '...', clientId, responseTime });

    // 验证必需的请求头
    if (!signature || !clientId) {
      console.error('❌ 缺少必需的请求头');
      return NextResponse.json({
        result: {
          resultStatus: "F",
          resultCode: "PARAM_ILLEGAL",
          resultMessage: "Missing required headers: signature or client-id"
        }
      }, { status: 400 });
    }

    // 获取请求体
    const body = await req.text();
    console.log('📦 请求体:', body.substring(0, 200) + '...');

    // 验证签名
    const isValidSignature = verifySignature(signature, body, WORLDFIRST_PUBLIC_KEY);
    if (!isValidSignature) {
      console.error('❌ 签名验证失败');
      return NextResponse.json({
        result: {
          resultStatus: "F",
          resultCode: "PARAM_ILLEGAL",
          resultMessage: "Invalid signature"
        }
      }, { status: 400 });
    }

    console.log('✅ 签名验证成功');

    // 解析请求体
    let notificationData;
    try {
      notificationData = JSON.parse(body);
    } catch (error) {
      console.error('❌ 无效的JSON格式');
      return NextResponse.json({
        result: {
          resultStatus: "F",
          resultCode: "PARAM_ILLEGAL",
          resultMessage: "Invalid JSON format"
        }
      }, { status: 400 });
    }

    // 处理支付通知
    await handlePaymentNotification(notificationData);

    // 返回成功响应
    console.log('✅ 支付通知处理成功');

    return NextResponse.json({
      result: {
        resultStatus: "S",
        resultCode: "SUCCESS",
        resultMessage: "success"
      }
    });

  } catch (error) {
    console.error('💥 API /api/billing/notify-payment: 服务器错误', error);

    return NextResponse.json({
      result: {
        resultStatus: "U",
        resultCode: "UNKNOWN_EXCEPTION",
        resultMessage: "Internal server error"
      }
    }, { status: 500 });
  }
}

// 为了测试目的，添加GET方法来检查端点是否可用
export async function GET() {
  return NextResponse.json({
    message: "WorldFirst notify-payment endpoint is active",
    timestamp: new Date().toISOString(),
    status: "ok"
  });
}
