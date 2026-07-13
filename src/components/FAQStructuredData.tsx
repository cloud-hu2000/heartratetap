"use client";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQStructuredDataProps = {
  url: string;
  items: FAQItem[];
};

export default function FAQStructuredData({ url, items }: FAQStructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
