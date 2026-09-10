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
        <span>By the HeartRateTap product and editorial team</span>
        <span>Published {published}</span>
        <span>Content checked {reviewed}</span>
        <span>{readingTime}</span>
      </div>
      <p>
        Product behavior is checked against the public code; health references are checked against the sources named
        on the page. This is editorial review, not medical review, and no clinical reviewer is implied. Read our{" "}
        <Link href="/about#editorial-standards">editorial and corrections policy</Link>.
      </p>
    </aside>
  );
}
