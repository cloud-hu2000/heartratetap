import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartratetap.com'
  const contentReviewDate = new Date('2026-07-10T00:00:00.000Z')
  
  return [
    {
      url: baseUrl,
      lastModified: contentReviewDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: contentReviewDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: contentReviewDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/heart-rate-zones-for-running`,
      lastModified: contentReviewDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/daily-resting-heart-rate-check`,
      lastModified: contentReviewDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/free-online-heart-rate-checker`,
      lastModified: contentReviewDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: contentReviewDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: contentReviewDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}

