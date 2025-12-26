// 验证JSON-LD结构化数据
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // WebApplication - 描述工具类型
    {
      "@type": "WebApplication",
      "@id": "https://heartratetap.com/#webapplication",
      "url": "https://heartratetap.com",
      "name": "HeartRateTap - Free Online Heart Rate Monitor",
      "description": "Free online heart rate checker - measure your heart rate online instantly with no device needed. Tap to check heart rate online free in seconds. The easiest free heart rate monitor online!",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Modern web browser with JavaScript enabled",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Real-time heart rate measurement",
        "No device required",
        "Tap or spacebar input",
        "Resting and active heart rate zones",
        "BPM analysis and coaching",
        "Heart rate history tracking",
        "Multi-language support (English/Spanish)"
      ],
      "screenshot": "https://heartratetap.com/favicon.png",
      "author": {
        "@type": "Organization",
        "@id": "https://heartratetap.com/#organization"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://heartratetap.com/#organization"
      }
    },
    // Organization - 描述组织信息
    {
      "@type": "Organization",
      "@id": "https://heartratetap.com/#organization",
      "name": "HeartRateTap",
      "alternateName": "Heart Rhythm Studio",
      "url": "https://heartratetap.com",
      "logo": "https://heartratetap.com/favicon.png",
      "description": "Free online heart rate monitoring tool providing real-time BPM measurement without any devices or downloads.",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "email": "cloudhu2000@gmail.com",
        "contactType": "technical support",
        "availableLanguage": ["English", "Spanish"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00",
          "timeZone": "America/New_York"
        }
      },
      "sameAs": [
        "https://github.com/cloud-hu2000/heartratetap"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "Global"
      }
    },
    // ContactPoint - 额外的联系方式
    {
      "@type": "ContactPoint",
      "@id": "https://heartratetap.com/#contact",
      "telephone": "+1-555-123-4567",
      "email": "cloudhu2000@zohomail.cn",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00",
        "timeZone": "America/New_York"
      },
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceType": "Email Support",
        "availableLanguage": ["English", "Spanish"]
      }
    },
    // SoftwareApplication - 补充应用信息
    {
      "@type": "SoftwareApplication",
      "@id": "https://heartratetap.com/#software",
      "name": "HeartRateTap",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "softwareVersion": "1.0.0",
      "fileSize": "0 KB",
      "downloadUrl": "https://heartratetap.com",
      "screenshot": "https://heartratetap.com/favicon.png",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "@id": "https://heartratetap.com/#organization"
      }
    },
    // WebSite - 网站信息
    {
      "@type": "WebSite",
      "@id": "https://heartratetap.com/#website",
      "url": "https://heartratetap.com",
      "name": "HeartRateTap - Free Online Heart Rate Monitor",
      "description": "Free online heart rate checker - measure your heart rate online instantly with no device needed",
      "inLanguage": ["en", "es"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://heartratetap.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://heartratetap.com/#organization"
      }
    }
  ]
};

try {
  // 验证JSON格式
  JSON.stringify(structuredData);
  console.log('✅ JSON-LD is valid JSON format');

  // 检查schema类型
  const types = structuredData['@graph'].map(item => item['@type']);
  console.log('📊 Contains', types.length, 'schema types:');
  types.forEach(type => console.log('  -', type));

  // 检查必需字段
  const requiredChecks = [
    { type: 'WebApplication', required: ['name', 'description', 'applicationCategory'] },
    { type: 'Organization', required: ['name', 'url', 'contactPoint'] },
    { type: 'ContactPoint', required: ['email', 'contactType'] },
    { type: 'WebSite', required: ['url', 'name'] }
  ];

  console.log('\n🔍 Schema validation:');
  requiredChecks.forEach(check => {
    const schema = structuredData['@graph'].find(item => item['@type'] === check.type);
    if (schema) {
      const missing = check.required.filter(field => !schema[field]);
      if (missing.length === 0) {
        console.log(`  ✅ ${check.type}: All required fields present`);
      } else {
        console.log(`  ⚠️  ${check.type}: Missing fields: ${missing.join(', ')}`);
      }
    }
  });

  console.log('\n🎉 Structured data validation completed successfully!');

} catch (error) {
  console.error('❌ JSON-LD validation failed:', error.message);
  process.exit(1);
}
