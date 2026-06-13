import Link from "next/link";

const BlogKnowledgeHub = () => {
  return (
    <section className="blog-section">
      <h2>HeartRateTap Knowledge Hub</h2>
      <p>
        Explore more guides on how to understand and use your heart rate in everyday life and training. All articles are
        built around the same real-time tapping tool, so you can learn and measure in one place.
      </p>
      <div className="tool-link-grid">
        <Link href="/check-heart-rate-online-free">Check heart rate online free</Link>
        <Link href="/online-heart-rate-monitor">Use the online heart rate monitor</Link>
      </div>
      <ul>
        <li>
          <Link href="/blog/free-online-heart-rate-checker">
            Free Online Heart Rate Checker – Measure Heart Rate Online Instantly
          </Link>
        </li>
        <li>
          <Link href="/blog/heart-rate-zones-for-running">
            Heart Rate Zones for Running: Are You Training in the Right Zone?
          </Link>
        </li>
        <li>
          <Link href="/blog/free-online-heart-rate-monitor">
            Free Online Heart Rate Monitor — Check Your Heart Rate Instantly
          </Link>
        </li>
        <li>
          <Link href="/blog/heart-rate-monitor-online">
            Heart Rate Monitor Online — Trustworthy Online Heart Rate Tool
          </Link>
        </li>
        <li>
          <Link href="/blog/daily-resting-heart-rate-check">
            Daily Resting Heart Rate Check – A 30-Second Health Habit
          </Link>
        </li>
      </ul>
      <p>
        Ready to put it into practice?{" "}
        <Link href="/check-heart-rate-online-free" className="blog-inline-cta">
          Try the free online heart rate checker
        </Link>{" "}
        and see your own numbers in real time.
      </p>
    </section>
  );
};

export default BlogKnowledgeHub;


