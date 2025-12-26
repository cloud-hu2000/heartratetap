import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV || 'development',
  // 服务端不收集用户特定数据，除非明确授权
  beforeSend(event) {
    // 服务端事件通常不包含用户特定数据
    // 但为了安全起见，我们仍然检查
    if (event.user) {
      delete event.user.id;
      delete event.user.email;
      delete event.user.username;
      delete event.user.ip_address;
    }
    return event;
  },
});
