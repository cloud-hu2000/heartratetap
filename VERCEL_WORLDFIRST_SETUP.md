# 万里汇支付集成配置指南

本指南介绍如何在Vercel上配置万里汇(WorldFirst)的完整支付集成，包括创建支付订单和接收支付通知。

## 🎯 集成概览

已实现的万里汇支付集成包括：

- ✅ **创建支付订单**: `/api/billing/create-checkout-session` - 调用万里汇 `createCashierPayment` API
- ✅ **支付通知处理**: `/api/billing/notify-payment` - 接收并处理万里汇的支付结果通知
- ✅ **RSA签名验证**: 确保通知的安全性和真实性
- ✅ **用户状态更新**: 支付成功后自动更新用户会员等级
- ✅ **完整的错误处理**: 支持各种异常情况和重试机制

## 环境变量配置

在Vercel项目设置中添加以下环境变量：

### 必需的环境变量

1. **WORLDFIRST_PUBLIC_KEY**
   - 类型：多行文本
   - 描述：万里汇的RSA公钥，用于验证支付通知的签名
   - 获取方式：联系万里汇技术支持获取RSA公钥
   - 示例格式：
     ```
     -----BEGIN PUBLIC KEY-----
     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
     -----END PUBLIC KEY-----
     ```

2. **WORLDFIRST_CLIENT_ID**
   - 类型：字符串
   - 描述：万里汇客户端ID
   - 获取方式：万里汇商户控制台获取

3. **WORLDFIRST_PRIVATE_KEY**
   - 类型：多行文本
   - 描述：用于向万里汇API发送请求时进行RSA签名的私钥
   - 获取方式：生成RSA密钥对，将公钥提供给万里汇，私钥保存在服务器
   - 示例格式：
     ```
     -----BEGIN PRIVATE KEY-----
     MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
     -----END PRIVATE KEY-----
     ```

4. **WORLDFIRST_API_URL** (可选)
   - 类型：字符串
   - 描述：万里汇API基础URL
   - 默认值：`https://api-sg.worldfirst.com`
   - 生产环境可能需要不同的URL

## API端点说明

### 支付通知接收端点

- **URL**: `/api/billing/notify-payment`
- **方法**: POST
- **功能**: 接收万里汇的支付结果通知

### 创建结账会话端点

- **URL**: `/api/billing/create-checkout-session`
- **方法**: POST
- **功能**: 创建支付会话，返回万里汇支付URL

## 支付流程

1. 用户在前端选择会员等级并点击升级
2. 前端调用 `/api/billing/create-checkout-session` 创建支付会话
3. 后端生成 `payToRequestId` (格式: `user_{userId}_{tier}_{timestamp}`)
4. 设置 `paymentNotifyUrl` 为 `${YOUR_DOMAIN}/api/billing/notify-payment`
5. 调用万里汇的 `createCashierPayment` API
6. 用户被重定向到万里汇支付页面完成支付
7. 支付完成后，万里汇向通知URL发送POST请求
8. 服务器验证签名并更新用户账户状态

## 通知数据格式

万里汇会发送以下格式的通知数据：

```json
{
  "notifyType": "PAYMENT_RESULT",
  "payToAmount": {
    "currency": "USD",
    "value": "11000"
  },
  "payToId": "*****",
  "payToRequestId": "user_123_basic_1703123456789",
  "paymentAmount": {
    "currency": "USD",
    "value": "11000"
  },
  "paymentDetailSummaries": [...],
  "paymentId": "*****",
  "paymentTime": "2022-07-18T17:38:04+08:00",
  "result": {
    "resultCode": "SUCCESS",
    "resultMessage": "success.",
    "resultStatus": "S"
  }
}
```

## 签名验证

服务器会验证每个通知请求的RSA256签名，确保请求来自万里汇。

## 错误处理

- **签名验证失败**: 返回 `PARAM_ILLEGAL` 错误
- **数据库连接失败**: 返回服务器错误
- **用户不存在**: 记录错误但不影响响应
- **支付失败**: 只处理成功的支付通知

## 测试

### 1. 基础功能测试

运行集成测试脚本：
```bash
# 设置环境变量
export VERCEL_URL=https://your-domain.vercel.app
export WORLDFIRST_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
你的RSA公钥内容
-----END PUBLIC KEY-----"

# 运行测试
node test-worldfirst-notification.js
```

### 2. 手动测试通知

使用curl发送模拟通知：
```bash
curl -X POST https://your-domain.vercel.app/api/billing/notify-payment \
  -H "Content-Type: application/json" \
  -H "signature: algorithm=RSA256,keyVersion=1,signature=your_signature" \
  -H "client-id: your_client_id" \
  -d '{"notifyType":"PAYMENT_RESULT","payToRequestId":"user_123_basic_1703123456789",...}'
```

### 3. 完整支付流程测试

1. **前端测试**: 访问pricing页面，点击升级按钮
2. **支付重定向**: 确认跳转到万里汇支付页面
3. **成功回调**: 支付完成后跳转到成功页面
4. **数据库验证**: 检查用户会员等级是否更新

## 安全注意事项

1. 确保 `WORLDFIRST_PUBLIC_KEY` 环境变量正确配置
2. 定期更新RSA公钥
3. 监控通知端点的错误日志
4. 验证所有支付金额和用户ID的匹配性

## 故障排除

### 常见问题

1. **签名验证失败**
   - 检查RSA公钥是否正确
   - 确认签名格式是否正确

2. **通知未收到**
   - 检查Vercel域名是否正确配置
   - 确认API路由是否正确部署

3. **用户账户未更新**
   - 检查数据库连接
   - 验证payToRequestId格式是否正确

### 日志监控

所有重要的操作都会记录在Vercel的函数日志中，可以通过Vercel控制台查看。
