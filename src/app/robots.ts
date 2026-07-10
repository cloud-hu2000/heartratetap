import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.heartratetap.com'
  
  // List of AI crawlers and bots that should be allowed
  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'CCBot',
    'anthropic-ai',
    'Claude-Web',
    'Google-Extended',
    'PerplexityBot',
    'Applebot-Extended',
    'Omgilibot',
    'FacebookBot',
    'Bytespider',
    'Diffbot',
    'Bingbot',
    'Googlebot',
  ]
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/login',
          '/profile',
          '/register',
          '/reset-password',
          '/sentry-example-page',
        ],
      },
      // Explicitly allow AI crawlers and bots
      ...aiCrawlers.map((crawler) => ({
        userAgent: crawler,
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/login',
          '/profile',
          '/register',
          '/reset-password',
          '/sentry-example-page',
        ],
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

