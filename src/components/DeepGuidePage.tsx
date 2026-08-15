import type { ReactNode } from "react";
import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import BlogKnowledgeHub from "@/components/BlogKnowledgeHub";
import Footer from "@/components/Footer";
import SourceList, { type Source } from "@/components/SourceList";

type GuideSection = {
  heading: string;
  content: ReactNode;
};

type DeepGuidePageProps = {
  title: string;
  description: string;
  path: string;
  category: string;
  intro: ReactNode;
  readingTime: string;
  sections: GuideSection[];
  sources: Source[];
  ctaTitle: string;
  ctaText: string;
  published?: string;
  reviewed?: string;
  datePublished?: string;
  dateModified?: string;
};

const DATE = "August 6, 2026";
const ISO_DATE = "2026-08-06";

export default function DeepGuidePage({
  title,
  description,
  path,
  category,
  intro,
  readingTime,
  sections,
  sources,
  ctaTitle,
  ctaText,
  published = DATE,
  reviewed = DATE,
  datePublished = ISO_DATE,
  dateModified = ISO_DATE
}: DeepGuidePageProps) {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Guides • {category}
          </p>
          <h1>{title}</h1>
          <p className="blog-intro">{intro}</p>
        </header>

        <ArticleMeta published={published} reviewed={reviewed} readingTime={readingTime} />

        {sections.map((section) => (
          <section className="blog-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.content}
          </section>
        ))}

        <SourceList sources={sources} />

        <section className="blog-section blog-cta">
          <h2>{ctaTitle}</h2>
          <p>{ctaText}</p>
          <Link href="/" className="pill active">
            Open HeartRateTap
          </Link>
        </section>

        <BlogKnowledgeHub currentPath={path} />
        <ArticleStructuredData
          title={title}
          description={description}
          path={path}
          datePublished={datePublished}
          dateModified={dateModified}
        />
      </article>
      <Footer />
    </div>
  );
}
