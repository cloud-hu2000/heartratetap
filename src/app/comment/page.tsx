import type { Metadata } from "next";
import CommentForm from "./CommentForm";
import { fetchFeedbackList } from "@/lib/feedback";

export const metadata: Metadata = {
  title: "Community Feedback & Feature Requests | HeartRateTap",
  description:
    "Share your ideas and feedback to help improve HeartRateTap. Vote on community suggestions and contribute to the development of our free online heart rate monitor.",
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
  return (
    <div className="comment-page">
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

