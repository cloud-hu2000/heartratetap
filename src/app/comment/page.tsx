import CommentForm from "./CommentForm";
import { fetchFeedbackList } from "@/lib/feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Ideas - Community Feedback | HeartRateTap",
  description: "Help us improve HeartRateTap! Share your ideas, suggestions, and feedback with our community. Vote on features you'd like to see and contribute to making heart rate monitoring better.",
  keywords: [
    "heart rate app feedback",
    "feature requests",
    "community ideas",
    "heart rate monitor suggestions",
    "user feedback",
    "improve heart rate app"
  ],
  openGraph: {
    title: "Share Your Ideas - Community Feedback | HeartRateTap",
    description: "Help us improve HeartRateTap! Share your ideas and vote on features with our community.",
    url: "https://heartratetap.com/comment",
    siteName: "HeartRateTap",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Share Your Ideas - Community Feedback | HeartRateTap",
    description: "Help us improve HeartRateTap! Share your ideas and vote on features with our community."
  },
  alternates: {
    canonical: "https://heartratetap.com/comment"
  }
};

const CommentPage = async () => {
  let comments: any[] = [];
  try {
    comments = await fetchFeedbackList();
  } catch (error) {
    console.warn("Failed to fetch feedback list:", error);
    comments = [];
  }

  // 确保页面即使在没有评论时也能正常渲染
  // 页面特定的结构化数据，帮助搜索引擎理解内容
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Share Your Ideas - Community Feedback | HeartRateTap",
    "description": "Help us improve HeartRateTap! Share your ideas, suggestions, and feedback with our community. Vote on features you'd like to see.",
    "url": "https://heartratetap.com/comment",
    "isPartOf": {
      "@type": "WebSite",
      "name": "HeartRateTap",
      "url": "https://heartratetap.com"
    },
    "mainEntity": {
      "@type": "DiscussionForumPosting",
      "name": "Community Feedback Forum",
      "description": "User feedback and feature requests for HeartRateTap heart rate monitoring app",
      "url": "https://heartratetap.com/comment"
    }
  };

  return (
    <div className="comment-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData)
        }}
      />
      <section className="panel">
        <p className="hero-sub">Community idea wall</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          Share how we can improve HeartRateTap
        </h1>
        <CommentForm />
      </section>

      <section className="panel">
        <p className="hero-sub">Latest ideas</p>
        <div className="comment-list">
          {comments.length === 0 && <p className="feedback-empty">No ideas yet. Be the first to submit one!</p>}
          {comments.map((item) => (
            <article key={item.id} className="feedback-item">
              <div>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <span className="feedback-item-time">
                  {new Date(item.createdAt).toLocaleString(undefined, {
                    hour12: false
                  })}
                </span>
              </div>
              <div className="feedback-vote" style={{ cursor: "default" }}>
                <span>{item.votes}</span>
                <small>Total votes</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommentPage;

