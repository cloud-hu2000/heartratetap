// 测试万里汇支付集成的脚本
// 包含创建支付会话和通知测试
// 使用方法: node test-worldfirst-notification.js

const https = require('https');
const crypto = require('crypto');

// 从环境变量读取配置
const VERCEL_URL = process.env.VERCEL_URL || 'http://localhost:3000';
const WORLDFIRST_PUBLIC_KEY = process.env.WORLDFIRST_PUBLIC_KEY;

// 配置
const NOTIFICATION_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/billing/notify-payment`
  : 'http://localhost:3000/api/billing/notify-payment';

// 模拟万里汇的通知数据
const mockNotificationData = {
  notifyType: "PAYMENT_RESULT",
  payToAmount: {
    currency: "USD",
    value: "199"
  },
  payToId: "20241229001",
  payToRequestId: "user_123_basic_1703123456789", // 模拟用户ID为123，升级到basic会员
  paymentAmount: {
    currency: "USD",
    value: "199"
  },
  paymentDetailSummaries: [{
    customerId: "customer_123",
    customerName: {
      fullName: "Test User"
    },
    extendInfo: "{}",
    paymentAmount: {
      currency: "USD",
      value: "199"
    },
    paymentMethodType: "WALLET_WF"
  }],
  paymentId: "payment_20241229001",
  paymentTime: new Date().toISOString(),
  result: {
    resultCode: "SUCCESS",
    resultMessage: "success.",
    resultStatus: "S"
  }
};

// 简单的RSA密钥对生成（仅用于测试）
function generateTestKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  return { publicKey, privateKey };
}

// 生成签名
function generateSignature(data, privateKey) {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(JSON.stringify(data));
  const signature = signer.sign(privateKey, 'base64');
  return `algorithm=RSA256,keyVersion=1,signature=${signature}`;
}

// 发送测试通知
async function sendTestNotification() {
  console.log('🚀 发送测试万里汇支付通知...');
  console.log('📍 目标URL:', NOTIFICATION_URL);

  // 生成测试密钥（实际使用中应该使用万里汇提供的公钥）
  const { publicKey, privateKey } = generateTestKeys();

  // 生成签名
  const signature = generateSignature(mockNotificationData, privateKey);

  const postData = JSON.stringify(mockNotificationData);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'signature': signature,
      'client-id': 'test_client_123',
      'response-time': new Date().toISOString()
    }
  };

  console.log('📋 请求头:', {
    'signature': signature.substring(0, 50) + '...',
    'client-id': 'test_client_123',
    'response-time': options.headers['response-time']
  });

  console.log('📦 请求体:', JSON.stringify(mockNotificationData, null, 2));

  return new Promise((resolve, reject) => {
    const req = https.request(NOTIFICATION_URL, options, (res) => {
      let data = '';

      console.log('📡 响应状态:', res.statusCode);
      console.log('📡 响应头:', res.headers);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ 响应数据:', JSON.stringify(response, null, 2));
          resolve(response);
        } catch (error) {
          console.log('📄 原始响应:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求失败:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 检查GET端点
async function checkEndpoint() {
  console.log('\n🔍 检查通知端点状态...');

  return new Promise((resolve, reject) => {
    const req = https.get(NOTIFICATION_URL, (res) => {
      let data = '';

      console.log('📡 GET响应状态:', res.statusCode);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ GET响应:', response);
          resolve(response);
        } catch (error) {
          console.log('📄 GET原始响应:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ GET请求失败:', error.message);
      reject(error);
    });
  });
}

// 测试创建支付会话
async function testCreateCheckoutSession() {
  console.log('\n🔄 测试创建支付会话...');

  const postData = JSON.stringify({
    tier: 'basic',
    successUrl: `${VERCEL_URL}/checkout/success?tier=basic`,
    cancelUrl: `${VERCEL_URL}/pricing?canceled=true`
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'hrt_session=test_session_token' // 需要有效的session token
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(`${VERCEL_URL}/api/billing/create-checkout-session`, options, (res) => {
      let data = '';

      console.log('📡 创建会话响应状态:', res.statusCode);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('✅ 创建会话响应:', JSON.stringify(response, null, 2));
          resolve(response);
        } catch (error) {
          console.log('📄 创建会话原始响应:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 创建会话请求失败:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 主函数
async function main() {
  try {
    console.log('🧪 万里汇支付集成测试脚本');
    console.log('================================');
    console.log('📍 测试环境:', VERCEL_URL);
    console.log('🔑 RSA公钥配置:', WORLDFIRST_PUBLIC_KEY ? '已配置' : '未配置');

    // 检查通知端点状态
    await checkEndpoint();

    console.log('\n================================');

    // 测试创建支付会话
    try {
      await testCreateCheckoutSession();
    } catch (error) {
      console.log('⚠️ 创建支付会话测试跳过 (需要有效的用户会话)');
    }

    console.log('\n================================');

    // 发送测试通知
    if (WORLDFIRST_PUBLIC_KEY) {
      await sendTestNotification();
    } else {
      console.log('⚠️ 跳过通知测试：未配置WORLDFIRST_PUBLIC_KEY环境变量');
    }

    console.log('\n✅ 测试完成！');
    console.log('💡 提示: 这是一个集成测试，确保万里汇环境变量正确配置以获得完整功能');

  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { sendTestNotification, checkEndpoint };
