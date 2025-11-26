import CommentForm from "./CommentForm";
import { fetchFeedbackList } from "@/lib/feedback";

const CommentPage = async () => {
  const comments = await fetchFeedbackList();
  return (
    <div className="comment-page">
      <section className="panel">
        <p className="hero-sub">社区意见墙</p>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          直接在这里提交你的改进建议
        </h1>
        <CommentForm />
      </section>

      <section className="panel">
        <p className="hero-sub">最新建议</p>
        <div className="comment-list">
          {comments.length === 0 && <p className="feedback-empty">暂时还没有建议，快来当第一个吧。</p>}
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
                <small>总票数</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommentPage;

