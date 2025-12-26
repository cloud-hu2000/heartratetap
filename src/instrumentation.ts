import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { serverConfig } = await import("../sentry.server.config");
    Sentry.init(serverConfig);
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { edgeConfig } = await import("../sentry.edge.config");
    Sentry.init(edgeConfig);
  }
}
export const onRequestError = Sentry.captureRequestError;

