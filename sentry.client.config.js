import * as Sentry from "@sentry/nextjs";

// 只在客户端初始化Sentry
if (typeof window !== 'undefined') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1, // 降低采样率以减少数据量
    environment: process.env.NODE_ENV || 'development',
    replaysOnErrorSampleRate: 0.1,
    replaysSessionSampleRate: 0.01,
    // 隐私保护：默认不关联用户标识
    beforeSend(event) {
      // 检查用户是否同意数据收集
      const consent = typeof window !== 'undefined'
        ? window.localStorage.getItem('hrt-analytics-consent')
        : null;

      if (consent !== 'accepted') {
        // 如果用户未同意，移除所有用户标识信息
        if (event.user) {
          delete event.user.id;
          delete event.user.email;
          delete event.user.username;
          delete event.user.ip_address;
        }
        // 移除可能包含用户数据的上下文
        if (event.contexts) {
          delete event.contexts.user;
        }
      }

      return event;
    },
    // 性能监控配置
    beforeSendTransaction(event) {
      // 类似的用户隐私保护逻辑
      return event;
    },
  });
}
