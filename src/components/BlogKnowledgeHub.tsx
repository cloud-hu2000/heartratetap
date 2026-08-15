import Link from "next/link";
import { getRelatedGuides } from "@/lib/guide-content";

const BlogKnowledgeHub = ({ currentPath }: { currentPath: string }) => {
  const relatedGuides = getRelatedGuides(currentPath);

  return (
    <section className="blog-section">
      <h2>Related heart rate guides</h2>
      <p>
        Continue with a closely related question, or browse the full library. Each guide has a distinct job so that
        measurement technique, personal tracking, exercise context and product methodology remain easy to distinguish.
      </p>
      <div className="tool-link-grid">
        <Link href="/">Use the tap-based BPM calculator</Link>
        <Link href="/guides">Browse all guides</Link>
      </div>
      <ul>
        {relatedGuides.map((guide) => (
          <li key={guide.path}>
            <Link href={guide.path}>{guide.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        Ready to put it into practice?{" "}
        <Link href="/" className="blog-inline-cta">
          open the calculator
        </Link>{" "}
        and watch the tap-based estimate update.
      </p>
    </section>
  );
};

export default BlogKnowledgeHub;
