# Vercel 使用量优化指南

## 当前使用情况
- **Fluid Active CPU**: 1h 36m / 4h (40% 使用率)
- **Edge Requests**: 350K / 1M (35% 使用率)

## 已实施的优化措施

### 1. 禁用 Sentry Tunnel Route ✅
**文件**: `next.config.mjs`
- **问题**: Sentry tunnel route (`/monitoring`) 会增加服务器负载和 Edge Requests
- **解决方案**: 已注释掉 `tunnelRoute: "/monitoring"`
- **预期效果**: 显著减少 Edge Requests，因为不再需要通过服务器转发 Sentry 请求

### 2. 优化静态资源缓存 ✅
**文件**: `vercel.json`
- **添加了缓存头**:
  - Favicon 文件: 1年缓存
  - 图片资源 (pause.png/webp/avif): 1年缓存
  - Next.js 静态资源: 1年缓存
  - Next.js 图片优化: 1年缓存
- **预期效果**: 减少重复的静态资源请求，降低 Edge Requests

### 3. API 路由优化 ✅

#### Session API (`/api/auth/session`)
**文件**: `src/app/api/auth/session/route.ts`
- 添加了 `runtime = 'nodejs'` 以减少 Edge Function 使用
- 添加了缓存头: `Cache-Control: private, max-age=30, stale-while-revalidate=60`
- **预期效果**: 减少数据库查询和 Edge Requests

#### Feedback API (`/api/feedback`)
**文件**: `src/app/api/feedback/route.ts`
- 添加了 `runtime = 'nodejs'`
- GET 请求添加了缓存: `Cache-Control: public, max-age=300, stale-while-revalidate=600`
- **预期效果**: 反馈列表缓存5分钟，减少数据库查询

### 4. Next.js 配置优化 ✅
**文件**: `next.config.mjs`
- 启用图片压缩和格式优化 (AVIF, WebP)
- 设置图片缓存为1年
- 启用包导入优化
- **预期效果**: 减少传输数据量，降低 CPU 使用

## 进一步优化建议

### 短期优化（立即可做）

1. **减少 checkAuth 调用频率**
   - 在 `AuthContext.tsx` 中，考虑使用防抖或节流
   - 只在必要时调用（如页面加载、登录后）

2. **优化 Feedback Widget**
   - 在 `FeedbackWidget.tsx` 中，考虑使用 `cache: 'force-cache'` 而不是 `cache: 'no-store'`
   - 或者增加轮询间隔

3. **使用 ISR (Incremental Static Regeneration)**
   - 对于不经常变化的页面（如 pricing、roadmap），考虑使用 ISR
   - 可以减少服务器端渲染

### 中期优化（需要更多工作）

1. **CDN 配置**
   - 考虑使用 Cloudflare 或其他 CDN 来缓存静态资源
   - 可以进一步减少 Vercel Edge Requests

2. **数据库查询优化**
   - 检查是否有 N+1 查询问题
   - 添加数据库索引
   - 使用连接池

3. **API 路由合并**
   - 如果可能，合并一些小的 API 调用
   - 减少 HTTP 请求数量

### 长期优化（架构级别）

1. **考虑使用 Edge Functions 替代 Node.js Runtime**
   - 对于简单的 API，使用 Edge Runtime 可能更便宜
   - 但需要评估性能影响

2. **实现客户端缓存**
   - 使用 React Query 或 SWR 来缓存 API 响应
   - 减少重复请求

3. **监控和分析**
   - 使用 Vercel Analytics 来识别高流量路由
   - 针对性地优化这些路由

## 监控建议

1. **定期检查 Vercel Dashboard**
   - 监控 Edge Requests 和 CPU 使用趋势
   - 识别异常流量

2. **设置告警**
   - 当使用量接近限制时收到通知
   - 可以提前采取措施

3. **分析日志**
   - 查看哪些 API 被频繁调用
   - 优化热点路由

## 预期效果

实施这些优化后，预期可以：
- **Edge Requests**: 减少 30-50% (从 350K 降至 175K-245K)
- **CPU 使用**: 减少 20-30% (从 1h 36m 降至 1h 7m-1h 17m)

## 注意事项

1. **缓存策略**: 某些数据可能需要实时性，需要平衡缓存和新鲜度
2. **用户体验**: 确保优化不会影响用户体验
3. **测试**: 部署前在 staging 环境测试所有更改

## 回滚方案

如果优化导致问题，可以：
1. 恢复 `next.config.mjs` 中的 `tunnelRoute`
2. 移除 API 路由中的缓存头
3. 恢复 `vercel.json` 到原始配置
