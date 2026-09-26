import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartratetap.com'
  const contentReviewDate = new Date('2026-08-07T00:00:00.000Z')
  const contactPageDate = new Date('2026-08-05T00:00:00.000Z')
  const newGuideDate = new Date('2026-08-06T00:00:00.000Z')
  const exerciseGuideDate = new Date('2026-08-07T00:00:00.000Z')
  const guideLibraryDate = new Date('2026-08-09T00:00:00.000Z')
  const restingGuideDate = new Date('2026-08-09T00:00:00.000Z')
  const calculatorLaunchDate = new Date('2026-08-09T00:00:00.000Z')
  const methodologyReviewDate = new Date('2026-08-09T00:00:00.000Z')
  const personalLogReviewDate = new Date('2026-08-09T00:00:00.000Z')
  const heartRateVsHrvDate = new Date('2026-08-15T00:00:00.000Z')
  const lifestyleGuideDate = new Date('2026-08-12T00:00:00.000Z')
  const scenarioGuideDate = new Date('2026-08-22T00:00:00.000Z')
  const travelAndDanceGuideDate = new Date('2026-08-23T00:00:00.000Z')
  const zoneGuideDate = new Date('2026-09-11T00:00:00.000Z')
  const measurementGuideDate = new Date('2026-09-26T00:00:00.000Z')
  
  const englishPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentReviewDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: guideLibraryDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/target-heart-rate-calculator`,
      lastModified: calculatorLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/heart-rate-recovery-calculator`,
      lastModified: calculatorLaunchDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: contentReviewDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contactPageDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/how-to-check-pulse-manually`,
      lastModified: contactPageDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/heart-rate-zones-for-running`,
      lastModified: exerciseGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/cycling-heart-rate-zones`,
      lastModified: exerciseGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/swimming-heart-rate-zones`,
      lastModified: exerciseGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/heart-rate-zones-strength-training`,
      lastModified: exerciseGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/daily-resting-heart-rate-check`,
      lastModified: restingGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/normal-resting-heart-rate-by-age`,
      lastModified: restingGuideDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/free-online-heart-rate-checker`,
      lastModified: methodologyReviewDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/seniors-guide-checking-pulse`,
      lastModified: newGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/heart-rate-yoga-meditation`,
      lastModified: newGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/manual-heart-rate-checks-team-sports`,
      lastModified: newGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/build-personal-heart-rate-log`,
      lastModified: personalLogReviewDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/talk-to-doctor-manual-heart-rate-data`,
      lastModified: newGuideDate,
      changeFrequency: 'monthly',
      priority: 0.75,
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

  const englishOnlyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/heart-rate-vs-heart-rate-variability`,
      lastModified: heartRateVsHrvDate,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/blog/heart-rate-vs-heart-rate-variability`,
          'x-default': `${baseUrl}/blog/heart-rate-vs-heart-rate-variability`,
        },
      },
    },
    ...[
      ["/blog/poor-sleep-resting-heart-rate", lifestyleGuideDate],
      ["/blog/stress-resting-heart-rate", lifestyleGuideDate],
      ["/blog/hydration-alcohol-fever-heart-rate", lifestyleGuideDate],
      ["/blog/resting-heart-rate-after-night-shift", scenarioGuideDate],
      ["/blog/heart-rate-while-gaming", scenarioGuideDate],
      ["/blog/heart-rate-before-presentation", scenarioGuideDate],
      ["/blog/resting-heart-rate-after-flying", travelAndDanceGuideDate],
      ["/blog/heart-rate-after-dance-class", travelAndDanceGuideDate],
      ["/blog/heart-rate-zones", zoneGuideDate],
      ["/blog/zone-2-heart-rate", zoneGuideDate],
      ["/blog/heart-rate-vs-rpe", measurementGuideDate],
      ["/blog/manual-pulse-vs-smartwatch", measurementGuideDate],
    ].map(([path, lastModified]) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${baseUrl}${path}`,
          'x-default': `${baseUrl}${path}`,
        },
      },
    })),
  ]

  const bilingualPages = englishPages.flatMap((page) => {
    const englishPath = page.url.slice(baseUrl.length)
    const spanishUrl = `${baseUrl}/es${englishPath}`
    const languages = {
      en: page.url,
      es: spanishUrl,
      'x-default': page.url,
    }

    return [
      { ...page, alternates: { languages } },
      { ...page, url: spanishUrl, alternates: { languages } },
    ]
  })

  return [...bilingualPages, ...englishOnlyPages]
}
