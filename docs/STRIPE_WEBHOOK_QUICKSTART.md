# Stripe Webhook 快速配置指南

## 🚀 5 分钟快速配置

### 步骤 1：在 Stripe Dashboard 创建 Webhook 端点

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/) 并切换到 **Live Mode**
2. 进入 **Developers** → **Webhooks** → **Add endpoint**
3. 配置：
   - **Endpoint URL**: `https://your-production-domain.com/api/billing/notify-payment`
   - **Events**: 选择 `checkout.session.completed` 和 `payment_intent.succeeded`
4. 复制 **Signing secret**（格式：`whsec_...`）

### 步骤 2：配置生产环境变量

在你的部署平台（Vercel/AWS/等）添加：

```bash
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

### 步骤 3：验证配置

运行检查脚本：

```bash
npm run check:stripe-webhook
```

或在生产环境设置 `STRIPE_WEBHOOK_URL` 环境变量后运行：

```bash
STRIPE_WEBHOOK_URL=https://your-domain.com npm run check:stripe-webhook
```

### 步骤 4：测试 Webhook

1. 在 Stripe Dashboard 中点击你的 Webhook 端点
2. 点击 **Send test webhook**
3. 选择 `checkout.session.completed` 事件
4. 确认返回 `200 OK`

## 📚 详细文档

查看完整配置指南：[STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md)

## ✅ 检查清单

- [ ] Stripe Dashboard 中已创建 Webhook 端点（Live Mode）
- [ ] Webhook URL 指向生产域名（HTTPS）
- [ ] 已配置 `STRIPE_SECRET_KEY`（sk_live_...）
- [ ] 已配置 `STRIPE_WEBHOOK_SECRET`（whsec_...）
- [ ] 运行 `npm run check:stripe-webhook` 通过
- [ ] 在 Stripe Dashboard 中测试 webhook 成功

## 🆘 遇到问题？

1. 检查 [详细配置文档](./STRIPE_WEBHOOK_SETUP.md) 中的"常见问题排查"部分
2. 查看 Stripe Dashboard 中的 Webhook 事件日志
3. 检查应用生产环境日志
