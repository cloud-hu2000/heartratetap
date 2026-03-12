# Stripe Webhook 生产环境配置指南

本文档详细说明如何在生产环境中配置 Stripe Webhook。

## 📋 前置要求

1. 已部署的生产环境应用（例如：Vercel、AWS、自建服务器等）
2. 生产环境的 HTTPS 域名（Stripe 要求 webhook 端点必须是 HTTPS）
3. Stripe 账户的生产环境密钥（Live Mode）

## 🔧 配置步骤

### 1. 获取生产环境 Webhook Secret

#### 步骤 1.1：登录 Stripe Dashboard
1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 确保切换到 **Live Mode**（右上角切换开关）

#### 步骤 1.2：创建 Webhook 端点
1. 进入 **Developers** → **Webhooks**
2. 点击 **Add endpoint** 按钮
3. 配置以下信息：
   - **Endpoint URL**: `https://your-domain.com/api/billing/notify-payment`
     - 将 `your-domain.com` 替换为你的实际生产域名
     - 例如：`https://heartratetap.com/api/billing/notify-payment`
   - **Description**: `HeartRateTap Payment Webhook`（可选，用于标识）
   - **Events to send**: 选择以下事件：
     - ✅ `checkout.session.completed` - 支付完成
     - ✅ `payment_intent.succeeded` - 支付成功
     - ✅ `payment_intent.payment_failed` - 支付失败（可选，用于错误处理）
     - ✅ `charge.refunded` - 退款（可选，如果需要支持退款）

#### 步骤 1.3：获取 Webhook Signing Secret
1. 创建端点后，点击端点进入详情页
2. 在 **Signing secret** 部分，点击 **Reveal** 按钮
3. 复制 Secret（格式类似：`whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）
4. ⚠️ **重要**：这个 Secret 只显示一次，请妥善保存

### 2. 配置生产环境变量

在生产环境部署平台配置以下环境变量：

#### 必需的环境变量

```bash
# Stripe 生产环境密钥（Live Mode）
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE

# Stripe Webhook Secret（从步骤 1.3 获取）
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

#### 环境变量配置位置（根据部署平台）

**Vercel:**
1. 进入项目设置 → **Environment Variables**
2. 添加上述两个变量
3. 确保选择 **Production** 环境
4. 点击 **Save** 并重新部署

**AWS / 自建服务器:**
- 在 `.env.production` 文件中添加
- 或通过服务器环境变量配置
- 确保文件权限安全（`chmod 600 .env.production`）

**Docker:**
- 在 `docker-compose.yml` 的 `environment` 部分添加
- 或使用 Docker secrets

### 3. 验证 Webhook 端点可访问性

#### 步骤 3.1：测试端点是否可访问
```bash
# 使用 curl 测试 GET 端点（应该返回状态信息）
curl https://your-domain.com/api/billing/notify-payment

# 预期响应：
# {"message":"Stripe notify-payment endpoint is active","timestamp":"...","status":"ok"}
```

#### 步骤 3.2：在 Stripe Dashboard 中测试
1. 进入 Webhook 端点详情页
2. 点击 **Send test webhook** 按钮
3. 选择事件类型（例如：`checkout.session.completed`）
4. 点击 **Send test webhook**
5. 查看 **Recent events** 部分，确认：
   - ✅ Status 为 `200 OK`
   - ✅ Response 包含 `{"received":true}`

### 4. 监控和调试

#### 4.1 Stripe Dashboard 监控
- **Developers** → **Webhooks** → 选择你的端点
- 查看 **Recent events** 了解 webhook 调用情况
- 如果出现失败，点击事件查看详细错误信息

#### 4.2 应用日志监控
检查生产环境的应用日志，查找以下关键词：
- `🚀 API /api/billing/notify-payment: 接收 Stripe webhook`
- `📡 Stripe event:` - 成功接收事件
- `✅ 已更新用户会员等级` - 成功处理
- `❌` - 错误信息

#### 4.3 常见问题排查

**问题 1：Webhook 返回 400 Bad Request**
- 检查 `STRIPE_WEBHOOK_SECRET` 是否正确配置
- 确认使用的是生产环境的 Webhook Secret（不是测试环境的）

**问题 2：Webhook 返回 500 Internal Server Error**
- 检查应用日志获取详细错误信息
- 确认数据库连接正常
- 确认 `STRIPE_SECRET_KEY` 已正确配置

**问题 3：Webhook 未触发**
- 确认端点 URL 正确且可访问（HTTPS）
- 确认在 Stripe Dashboard 中选择了正确的事件类型
- 检查防火墙/安全组是否允许 Stripe IP 访问

**问题 4：签名验证失败**
- 确认 `STRIPE_WEBHOOK_SECRET` 与 Stripe Dashboard 中的 Signing Secret 完全一致
- 确认没有额外的空格或换行符
- 如果使用代理/CDN，确保原始请求体未被修改

### 5. 安全最佳实践

#### 5.1 Webhook Secret 安全
- ✅ 永远不要将 Webhook Secret 提交到代码仓库
- ✅ 使用环境变量管理，不要硬编码
- ✅ 定期轮换 Webhook Secret（在 Stripe Dashboard 中重新生成）

#### 5.2 端点安全
- ✅ 确保使用 HTTPS（Stripe 要求）
- ✅ 验证 webhook 签名（代码中已实现）
- ✅ 限制端点访问（如果需要，可以添加 IP 白名单）

#### 5.3 幂等性处理
- ✅ 代码中已通过数据库更新实现幂等性
- ✅ 即使 webhook 重复调用，也不会重复更新用户等级

### 6. 测试环境 vs 生产环境

#### 测试环境（Test Mode）
- Webhook URL: `https://your-test-domain.com/api/billing/notify-payment`
- 使用 `STRIPE_SECRET_KEY` (sk_test_...)
- 使用测试环境的 `STRIPE_WEBHOOK_SECRET` (whsec_test_...)
- 在 Stripe Dashboard 的 **Test Mode** 中配置

#### 生产环境（Live Mode）
- Webhook URL: `https://your-production-domain.com/api/billing/notify-payment`
- 使用 `STRIPE_SECRET_KEY` (sk_live_...)
- 使用生产环境的 `STRIPE_WEBHOOK_SECRET` (whsec_...)
- 在 Stripe Dashboard 的 **Live Mode** 中配置

⚠️ **重要**：测试环境和生产环境需要分别配置不同的 Webhook 端点！

## 📝 检查清单

部署前请确认：

- [ ] Stripe Dashboard 中已创建生产环境 Webhook 端点
- [ ] Webhook URL 指向正确的生产域名（HTTPS）
- [ ] 已选择需要的事件类型（`checkout.session.completed`, `payment_intent.succeeded`）
- [ ] 已获取并保存 Webhook Signing Secret
- [ ] 生产环境已配置 `STRIPE_SECRET_KEY`（Live Mode）
- [ ] 生产环境已配置 `STRIPE_WEBHOOK_SECRET`
- [ ] Webhook 端点可访问（测试 GET 请求）
- [ ] 在 Stripe Dashboard 中发送测试 webhook 成功
- [ ] 应用日志显示成功接收和处理 webhook
- [ ] 数据库正确更新用户会员等级

## 🔗 相关资源

- [Stripe Webhooks 官方文档](https://stripe.com/docs/webhooks)
- [Stripe Webhook 签名验证](https://stripe.com/docs/webhooks/signatures)
- [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
- [Webhook 事件类型参考](https://stripe.com/docs/api/events/types)

## 📞 支持

如果遇到问题：
1. 检查 Stripe Dashboard 中的 Webhook 事件日志
2. 查看应用生产环境日志
3. 参考 [Stripe 支持文档](https://support.stripe.com/)
