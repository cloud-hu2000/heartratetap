import Link from "next/link";
import { fetchFeedbackList } from "@/lib/feedback";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_LABEL: Record<string, string> = {
  planned: "Planned",
  in_progress: "In Progress",
  shipped: "Shipped",
  archived: "Archived"
};

const STATUS_ORDER: Array<keyof typeof STATUS_LABEL> = ["planned", "in_progress", "shipped"];

const RoadmapPage = async () => {
  let ideas: any[] = [];
  try {
    ideas = await fetchFeedbackList();
  } catch (error) {
    console.warn("Failed to fetch feedback list:", error);
    ideas = [];
  }

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: ideas.filter((idea) => idea.status === status)
  }));

  const hasAny = ideas.length > 0;

  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Community • Roadmap & Top Ideas
          </p>
          <h1>HeartRateTap Roadmap & Top Ideas</h1>
          <p className="blog-intro">
            This page highlights the most-voted ideas from the community. Use it to see what&apos;s planned, what&apos;s
            in progress, and what has already shipped.
          </p>
        </header>

        <section className="blog-section">
          <p>
            Every time you submit feedback or vote on an idea in the widget, it contributes to this public roadmap. We
            prioritize features based on impact, feasibility, and how many people they help.
          </p>
          <p>
            Have an idea of your own?{" "}
            <Link href="/" className="blog-inline-cta">
              Try HeartRateTap now
            </Link>{" "}
            and send your suggestion through the feedback box in the bottom-right corner. It will appear here once
            reviewed and grouped.
          </p>
        </section>

        <section className="roadmap-grid">
          {!hasAny && (
            <p className="history-empty">
              No public ideas yet. Share your first suggestion using the feedback box on the main page and check back
              soon.
            </p>
          )}
          {hasAny &&
            grouped.map((column) => (
              <div key={column.status} className="roadmap-column">
                <div className="roadmap-column-header">
                  <h2>{STATUS_LABEL[column.status]}</h2>
                  <span>{column.items.length}</span>
                </div>
                {column.items.length === 0 && <p className="roadmap-empty">No ideas in this column yet.</p>}
                <ul className="roadmap-list">
                  {column.items.map((idea) => (
                    <li key={idea.id} className="roadmap-item">
                      <div className="roadmap-item-main">
                        <h3>{idea.title}</h3>
                        <p>{idea.description}</p>
                      </div>
                      <div className="roadmap-item-meta">
                        <span className="roadmap-votes">{idea.votes} votes</span>
                        <span className="roadmap-date">
                          {new Date(idea.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </section>

        <section className="blog-section blog-cta">
          <h2>Want to influence what comes next?</h2>
          <p>
            Head back to the main HeartRateTap tool, try a few measurements, and use the feedback widget to tell us what
            you would like to see improved. Don&apos;t forget to vote for ideas that already resonate with you.
          </p>
          <Link href="/" className="pill active">
            Try HeartRateTap now
          </Link>
        </section>
      </article>
    </div>
  );
};

export default RoadmapPage;


