# 注册功能调试指南

## 🔍 调试步骤

### 1. 打开浏览器开发者工具
- 按 `F12` 或右键选择 "检查元素"
- 切换到 "Console" 标签页

### 2. 访问注册页面
- 打开 http://localhost:3001/register
- 填写注册信息并提交

### 3. 查看调试信息
在浏览器控制台中，你将看到详细的调试日志：

#### 前端验证阶段
```
🔄 开始注册流程...
📝 表单数据: {email: "...", passwordLength: 12, ...}
✅ 前端验证通过，开始API调用...
```

#### API调用阶段
```
🚀 AuthContext.register: 开始注册请求
📤 请求数据: {email: "...", password: "***"}
🌐 请求URL: /api/auth/register
```

#### 后端处理阶段 (在终端中查看)
```
🚀 API /auth/register: 开始处理注册请求
📥 API /auth/register: 解析请求体
📦 请求体数据: {email: "...", password: "***"}
🔍 API /auth/register: 验证输入数据
🔍 API /auth/register: 检查邮箱是否已存在
💾 API /auth/register: 插入新用户到数据库
🎫 API /auth/register: 生成JWT token
🍪 API /auth/register: 设置session cookie
🎉 API /auth/register: 注册成功完成
```

#### 响应处理阶段
```
📡 HTTP响应状态: 201 Created
📦 响应数据: {...}
📡 API响应结果: {success: true}
🎉 注册成功！
```

## 🚨 常见问题排查

### 问题1: 数据库连接失败
**症状**: 控制台显示 "Database connection not available"
**检查**:
- 确认 `.env.local` 文件存在
- 确认 `POSTGRES_URL` 环境变量正确
- 运行 `node test-db.js` 验证连接

### 问题2: 邮箱已存在
**症状**: 控制台显示 "Email already in use"
**解决**: 使用不同的邮箱地址测试

### 问题3: 前端验证失败
**症状**: 表单不提交，显示前端错误信息
**检查**:
- 邮箱格式是否正确
- 密码是否满足强度要求 (至少8位，包含大小写字母、数字、特殊字符)

### 问题4: 网络请求失败
**症状**: "Network error" 或 fetch 异常
**检查**:
- 开发服务器是否运行在 http://localhost:3001
- 浏览器控制台的 Network 标签页查看请求详情

## 🛠️ 快速测试工具

### 数据库连接测试
```bash
cd F:\heartratetap
node test-db.js
```

### API注册测试
```bash
cd F:\heartratetap
node test-register.js
```

## 📋 调试清单

- [ ] 开发服务器运行在端口3001
- [ ] 数据库连接正常 (test-db.js 通过)
- [ ] API端点可访问 (test-register.js 通过)
- [ ] 浏览器控制台打开
- [ ] 表单填写完整且符合要求
- [ ] 检查所有console.log输出

## 💡 提示

- 如果遇到问题，首先查看浏览器控制台的红色错误信息
- 所有调试信息都会以表情符号开头，便于识别
- 开发环境中的详细日志不会出现在生产环境中
