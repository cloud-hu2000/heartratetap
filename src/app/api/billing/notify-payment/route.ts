import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { stripe } from "@/lib/stripe";

// Stripe webhook handler: 验证签名并根据事件处理业务逻辑（如更新用户会员等级）
export async function POST(req: NextRequest) {
  try {
    console.log('🚀 API /api/billing/notify-payment: 接收 Stripe webhook');

    if (!stripe) {
      console.error('❌ Stripe 未配置 (STRIPE_SECRET_KEY 缺失)');
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET 环境变量未配置');
      return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
    }

    const sig = req.headers.get('stripe-signature') || '';
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      console.error('❌ Stripe webhook 验证失败:', err);
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    console.log('📡 Stripe event:', event.type);

    // 处理 checkout.session.completed: 完成支付后更新用户会员等级
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const userId = metadata.userId;
      const tier = metadata.tier;

      console.log('🔔 checkout.session.completed metadata:', metadata);
      if (userId && tier) {
        if (!sql) {
          console.error('❌ 数据库连接不可用，无法更新用户等级');
        } else {
          await sql`
            UPDATE users
            SET account_tier = ${tier}, updated_at = NOW()
            WHERE id = ${userId}
          `;
          console.log('✅ 已更新用户会员等级', { userId, tier });
        }
      }
      // 更新 payments 表（如果存在关联的 order_id / checkout_session_id / provider_payment_id）
      try {
        const orderId = session.metadata?.payToRequestId;
        const checkoutSessionId = session.id;
        const providerPaymentId = session.payment_intent || null;
        let receiptUrl = null;
        if (providerPaymentId && stripe) {
          try {
            const pi = await stripe.paymentIntents.retrieve(providerPaymentId);
            receiptUrl = pi.charges?.data?.[0]?.receipt_url || null;
          } catch (e) {
            console.warn('🔍 无法通过 PaymentIntent 获取 receipt_url', e);
          }
        }

        if (sql) {
          await sql`
            UPDATE payments
            SET status = 'succeeded',
                provider_payment_id = ${providerPaymentId},
                checkout_session_id = ${checkoutSessionId},
                amount = ${session.amount_total ?? null},
                currency = ${session.currency ? session.currency.toUpperCase() : null},
                receipt_url = ${receiptUrl},
                raw_payload = ${JSON.stringify(event)},
                updated_at = NOW()
            WHERE order_id = ${orderId} OR checkout_session_id = ${checkoutSessionId} OR provider_payment_id = ${providerPaymentId}
          `;
          console.log('📝 已更新 payments（checkout.session.completed）', { orderId, checkoutSessionId, providerPaymentId });
        } else {
          console.warn('⚠️ 数据库不可用，无法更新 payments');
        }
      } catch (err) {
        console.error('❌ 更新 payments 行时出错', err);
      }
    }

    // 处理 payment_intent.succeeded：尝试从 metadata 或关联的 checkout session 获取 userId/tier 并更新数据库
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata || {};
      const userId = metadata.userId;
      const tier = metadata.tier;

      console.log('🔔 payment_intent.succeeded metadata:', metadata);

      if (userId && tier) {
        if (!sql) {
          console.error('❌ 数据库连接不可用，无法更新用户等级');
        } else {
          await sql`
            UPDATE users
            SET account_tier = ${tier}, updated_at = NOW()
            WHERE id = ${userId}
          `;
          console.log('✅ 已更新用户会员等级 (from payment_intent.metadata)', { userId, tier });
        }
      } else {
        // 若 payment_intent.metadata 没有 userId/tier，则尝试通过 payment_intent 查找关联的 checkout session
        try {
          const sessions = await stripe.checkout.sessions.list({ payment_intent: paymentIntent.id, limit: 1 });
          const sess = sessions.data?.[0];
          const sessMeta = sess?.metadata || {};
          const sessUserId = sessMeta.userId;
          const sessTier = sessMeta.tier;
          console.log('🔍 Linked checkout.session metadata:', sessMeta);
          if (sessUserId && sessTier) {
            if (!sql) {
              console.error('❌ 数据库连接不可用，无法更新用户等级');
            } else {
              await sql`
                UPDATE users
                SET account_tier = ${sessTier}, updated_at = NOW()
                WHERE id = ${sessUserId}
              `;
              console.log('✅ 已更新用户会员等级 (from linked checkout.session)', { userId: sessUserId, tier: sessTier });
            }
          } else {
            console.warn('⚠️ 无法从 payment_intent 或其关联 session 中找到 userId/tier', { paymentIntentId: paymentIntent.id });
          }
        } catch (err) {
          console.error('❌ 查询 checkout.session 时出错', err);
        }
      }
    }

    // 可扩展：处理其他事件类型，如 payment_intent.succeeded、invoice.paid 等

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('💥 API /api/billing/notify-payment: 服务器错误', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Stripe notify-payment endpoint is active",
    timestamp: new Date().toISOString(),
    status: "ok"
  });
}
