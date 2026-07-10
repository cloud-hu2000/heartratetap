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
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    url,
    datePublished,
    dateModified,
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "HeartRateTap",
      url: "https://www.heartratetap.com/about"
    },
    publisher: {
      "@type": "Organization",
      name: "HeartRateTap",
      url: "https://www.heartratetap.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.heartratetap.com/favicon-256x256.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
