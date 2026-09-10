type ArticleStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
};

export default function ArticleStructuredData({
  title,
  description,
  path,
  datePublished,
  dateModified
}: ArticleStructuredDataProps) {
  const url = `https://www.heartratetap.com${path}`;
  const isSpanish = path === "/es" || path.startsWith("/es/");
  const articleId = `${url}#article`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": articleId,
        headline: title,
        description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url
        },
        url,
        image: {
          "@type": "ImageObject",
          url: "https://www.heartratetap.com/og-heart-rate-tap.png",
          width: 1200,
          height: 630
        },
        datePublished,
        dateModified,
        isAccessibleForFree: true,
        inLanguage: isSpanish ? "es" : "en",
        author: {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization",
          name: isSpanish ? "Equipo de producto y editorial de HeartRateTap" : "HeartRateTap product and editorial team",
          url: `https://www.heartratetap.com${isSpanish ? "/es" : ""}/about`
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://www.heartratetap.com/#organization",
          name: "HeartRateTap",
          url: "https://www.heartratetap.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.heartratetap.com/favicon-256x256.png",
            width: 256,
            height: 256
          }
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".blog-hero h1", ".blog-intro", ".blog-section h2"]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isSpanish ? "Inicio" : "Home",
            item: `https://www.heartratetap.com${isSpanish ? "/es" : "/"}`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isSpanish ? "Guías" : "Guides",
            item: `https://www.heartratetap.com${isSpanish ? "/es" : ""}/guides`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
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
