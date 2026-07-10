export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.heartratetap.com/#webapplication",
        "url": "https://www.heartratetap.com",
        "name": "HeartRateTap",
        "description": "A browser tool that estimates beats per minute from taps made in time with a manually located pulse.",
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
          "Tap-interval BPM estimation",
          "No connected sensor required",
          "Tap or spacebar input",
          "General resting and exercise reference context",
          "Local browser history",
          "Multi-language support (English/Spanish)"
        ],
        "author": {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.heartratetap.com/#organization",
        "name": "HeartRateTap",
        "alternateName": "Heart Rhythm Studio",
        "url": "https://www.heartratetap.com",
        "logo": "https://www.heartratetap.com/favicon.png",
        "description": "The independent product and editorial team that maintains the HeartRateTap browser tool and guides.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "cloudhu2000@gmail.com",
          "contactType": "technical support",
          "availableLanguage": ["English", "Spanish"]
        },
        "sameAs": [
          "https://github.com/cloud-hu2000/heartratetap"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.heartratetap.com/#website",
        "url": "https://www.heartratetap.com",
        "name": "HeartRateTap",
        "description": "Tap-based BPM estimation with transparent methodology and general wellness guides.",
        "inLanguage": ["en", "es"],
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
