import Link from "next/link";

type ArticleMetaProps = {
  published: string;
  reviewed: string;
  readingTime: string;
};

export default function ArticleMeta({ published, reviewed, readingTime }: ArticleMetaProps) {
  return (
    <aside className="article-meta" aria-label="Article information">
      <div className="article-meta-row">
        <span>By the HeartRateTap editorial team</span>
        <span>Published {published}</span>
        <span>Reviewed {reviewed}</span>
        <span>{readingTime}</span>
      </div>
      <p>
        This article explains general wellness concepts and how this site works; it is not medical advice and has not
        been medically reviewed. Read our{" "}
        <Link href="/about#editorial-standards">editorial and corrections policy</Link>.
      </p>
    </aside>
  );
}
