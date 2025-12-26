import * as Sentry from "@sentry/nextjs";

export async function register() {
  // 只在生产环境和服务器端注册Sentry
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'production') {
    await Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
      // 基础服务端监控
      integrations: [],
    });
  }
}
