type CalculatorStructuredDataProps = {
  name: string;
  description: string;
  path: string;
  featureList: string[];
};

export default function CalculatorStructuredData({
  name,
  description,
  path,
  featureList
}: CalculatorStructuredDataProps) {
  const url = `https://www.heartratetap.com${path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#calculator`,
        name,
        description,
        url,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        browserRequirements: "Modern web browser with JavaScript enabled",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        featureList,
        author: {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.heartratetap.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: url
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
