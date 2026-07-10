import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/check-heart-rate-online-free',
        destination: '/',
        permanent: true,
      },
      {
        source: '/online-heart-rate-monitor',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/free-online-heart-rate-monitor',
        destination: '/blog/free-online-heart-rate-checker',
        permanent: true,
      },
      {
        source: '/blog/heart-rate-monitor-online',
        destination: '/blog/free-online-heart-rate-checker',
        permanent: true,
      },
    ];
  },
  // Optimize for static generation and reduce server-side rendering
  output: 'standalone',
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['@sentry/nextjs'],
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "cloudhu",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // DISABLED to reduce Vercel Edge Requests and server load
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
