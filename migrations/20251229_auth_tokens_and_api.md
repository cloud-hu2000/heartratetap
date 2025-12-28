# auth_tokens 表设计 & Email verification / Password reset API 文档

Generated: 2025-12-29

本文件说明：
- 数据库迁移 `migrations/20251229_add_auth_tokens.sql` 中 `auth_tokens` 表的设计意图、字段含义与使用约定；  
- 四个相关 HTTP API 的接口文档与示例：  
  - `POST /api/auth/send-verification` — 生成邮箱验证 token 并发送邮件（24 小时有效）  
  - `GET  /api/auth/verify-email` — 验证 token，将用户设置为已验证并标记 token 已用（并重定向）  
  - `POST /api/auth/request-password-reset` — 生成密码重置 token 并发送邮件（1 小时有效）  
  - `POST /api/auth/reset-password` — 使用 token 重置密码、标记 token 已用并签发 session cookie

---

## 一、auth_tokens 表设计说明

用途：存储会用于 Email 验证与密码重置的一次性 token、过期时间以及使用状态。token 为单次使用，过期后不可用。

建表脚本（摘录）

```sql
CREATE TABLE IF NOT EXISTS auth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  token text NOT NULL,
  type text NOT NULL, -- 'email_verification' | 'password_reset'
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz
);
```

字段说明：
- `id`：主键，UUID。  
- `user_id`：关联的 user id（外键）。当用户被删除时，对应 token 会 cascade 删除。  
- `token`：token 明文（注：建议将来改为 token 哈希以提高安全性，见下文）。  
- `type`：token 类型，当前支持 `'email_verification'` 与 `'password_reset'`。  
- `expires_at`：过期时间戳。  
- `used`：布尔，是否已消费（默认为 false）。  
- `created_at`：创建时间。  
- `consumed_at`：被消费的时间（用于审计）。

索引：
- `idx_auth_tokens_user (user_id)`：按用户查询 token。  
- `idx_auth_tokens_token_type (token, type)`：按 token+type 快速查找。

设计注意事项与安全建议：
- 不要在生产中无限期保留未使用的 token；可定期清理（例如 cron 删除过期并已使用或过期很久的记录）。  
- 为防止数据库泄露导致 token 滥用，建议改为仅存储 token 的哈希值（例如 SHA256）；邮件中发送原始 token，验证时对比哈希。当前实现为明文以简化开发，可在后续迭代替换（推荐）。  
- token 生成应使用高熵随机值（示例使用 Node 的 crypto.randomBytes(32) -> hex）。  
- 对 token 使用与类型组合的严格唯一性/幂等检查（插入时不强制唯一，使用查询/标记机制避免重复消费）。

过期策略（当前实现）
- email_verification：24 小时有效。  
- password_reset：1 小时有效。  

---

## 二、API：POST /api/auth/send-verification

路径：`src/app/api/auth/send-verification/route.ts`  
方法：POST  
描述：为指定邮箱生成 email verification token 并发送邮件；若邮箱不存在则返回成功以防止账号枚举。  

请求（JSON）
```json
{ "email": "user@example.com" }
```

成功响应（200）
```json
{ "ok": true }
```

错误响应
- 400 Missing email  
- 500 Server error

行为说明：
- 以小写 email 在 users 表查找用户；若找不到，返回 `{ ok: true }`（不泄露用户存在性）。  
- 若用户存在且 `email_verified` 已为 true，则直接返回 ok（不重复发送）。  
- 如果需要发送：生成高熵 token，expires_at = now + 24h，插入 `auth_tokens` 表（type = 'email_verification'，used=false），调用邮件发送工具（需 `RESEND_API_KEY` 与 `NEXTAUTH_URL` 环境变量）。  
- 邮件包含指向 `GET /api/auth/verify-email?token=...` 的链接。

注意：
- 该接口应受速率限制，避免滥用或被用于发送垃圾邮件。

示例 curl
```bash
curl -X POST http://localhost:3000/api/auth/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## 三、API：GET /api/auth/verify-email

路径：`src/app/api/auth/verify-email/route.ts`  
方法：GET  
描述：使用 token 验证邮箱，若成功则将对应用户的 `email_verified` 设为 true，标记 token 为已用并可选择重定向到站点首页或登录页。

请求参数（查询）
- `token`：必填（URL 编码）

成功行为（302 重定向）
- 将用户 `email_verified` 设为 true；将 `auth_tokens.used=true`、`consumed_at=now`。  
- 返回重定向到 `/`（或你希望的登录/成功页面）。

错误响应（400）
- token 缺失、token 无效、token 已过期或已被使用都会返回 400（可做更友好的页面/提示）。  
- 实现中对“已验证”的 token 返回 `{ ok: true, message: "Already verified" }` 并重定向。

安全：
- 该路由在操作前应检查 token 是否存在、是否未使用且未过期。  
- 避免在 GET 请求中泄露敏感详情，重定向到公开页面并通过前端展示成功/失败信息更好。

示例
访问： `https://your.site/api/auth/verify-email?token=...`

---

## 四、API：POST /api/auth/request-password-reset

路径：`src/app/api/auth/request-password-reset/route.ts`  
方法：POST  
描述：生成 password reset token 并通过邮件发送给用户；若邮箱不存在返回 ok（不泄露存在性）。  

请求（JSON）
```json
{ "email": "user@example.com" }
```

成功响应（200）
```json
{ "ok": true }
```

错误响应
- 400 Missing email  
- 500 Server error

行为说明：
- 在 users 表中查找 email（小写匹配）。若不存在，返回 ok。  
- 若存在：生成 token（高熵），expires_at = now + 1h，插入 `auth_tokens`（type='password_reset'），调用邮件发送工具发送包含重置链接（例如 `https://your.site/reset-password?token=...`）。  
- 邮件包含前端页面或直接调用 `POST /api/auth/reset-password` 的说明（取决于你选择的 UX：前端表单或 API 调用）。

安全注意：
- 强制短过期时间（1 小时），并在 token 已使用时立即失效。  
- 实施速率限制与 captcha（或限制每天发送次数）以减少滥用。

示例 curl
```bash
curl -X POST http://localhost:3000/api/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## 五、API：POST /api/auth/reset-password

路径：`src/app/api/auth/reset-password/route.ts`  
方法：POST  
描述：使用 token 重置密码；成功后更新用户密码（哈希后存储），将 token 标记为已用，并签发 session cookie，使用户在重置后直接登录。

请求（JSON）
```json
{
  "token": "hex-or-base64-token",
  "password": "new-plaintext-password"
}
```

成功响应（200）
```json
{ "ok": true }
```
同时响应头会设置 httpOnly session cookie（名称 `hrt_session`），使用户获得登录态。

错误响应（400/401）
- 400 Missing token/password 或 token 无效/已用/过期。  
- 500 Server error

行为说明：
- 验证 `auth_tokens` 表中对应 token（type='password_reset'），且 `used=false` 且未过期。  
- 若验证通过：对新密码进行哈希（使用 bcrypt/argon2），更新 users.password_hash；将 token 标记为 used 且写入 consumed_at；签发 JWT session 并设置 httpOnly cookie。  
- 若 token 无效或已用，返回 400 并不泄露更多信息。

安全建议：
- 强制密码策略（最小长度、复杂度）并告知用户安全建议。  
- 在成功重置后记录一次审计日志（ip、timestamp）并可通知用户其账号发生密码更改（邮件/通知）。  
- 考虑在多次失败尝试时锁定该 token 或对相关账号施加保护。

示例 curl
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"...","password":"newpass123"}' -i
```

---

## 六、环境变量与外部服务

- `RESEND_API_KEY` — Resend 邮件服务的 API Key（或替换为你选择的邮件提供方），用于发送验证和重置邮件。  
- `RESEND_FROM_EMAIL` — 发件人地址（例如 `no-reply@heartratetap.com`）。  
- `NEXTAUTH_URL` — 站点基础 URL，用于构建邮件内的回调链接（本地测试通常为 `http://localhost:3000`）。  
- `NEXTAUTH_SECRET` — 用于签发 session JWT 的密钥（必要）。

---

## 七、测试建议

- 使用 Neon 分支或测试数据库测试 token 流程（不要直接在 production DB 上测试写操作）。  
- 使用 ngrok 暴露本地页面测试邮件中的回调链接（如果邮件服务需要可公开访问的 URL 来点击）。  
- 编写自动化集成测试：发送 verification/request-reset -> 查询 `auth_tokens` 插入 -> 调用 verify/reset -> 校验 `users.email_verified` 或 `users.password_hash` 更新并 `auth_tokens.used=true`。

## 八、后续改进（安全/可扩展）

- 将 token 存储改为哈希存储（强烈推荐）。  
- 将 token 的生成与发送与速率限制结合（例如对单个用户或 IP 限制每日请求数）。  
- 支持短链失效通知与用户通知（例如在密码重置后，发邮件通知“若非本人操作，请联系客服”）。  
- 在邮件模板中包含 nonce/指纹以防止重放（可选）。


