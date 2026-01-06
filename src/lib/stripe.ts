import Stripe from 'stripe';

// 条件性实例化：只有在 STRIPE_SECRET_KEY 存在时才创建客户端
const stripeSecret = process.env.STRIPE_SECRET_KEY;

// 临时调试：掩码打印 STRIPE_SECRET_KEY 是否存在（仅用于确认，之后会移除）
if (process.env.NODE_ENV !== 'production') {
  try {
    // 只显示前 8 个字符以避免泄露完整密钥
    console.log('DEBUG: STRIPE_SECRET_KEY present:', !!stripeSecret, stripeSecret ? `${stripeSecret.slice(0,8)}...` : null);
  } catch (e) {
    // 忽略任何日志错误，避免影响启动
  }
}

export const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2022-11-15' })
  : (null as any);


