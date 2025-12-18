import Link from "next/link";

const BlogKnowledgeHub = () => {
  return (
    <section className="blog-section">
      <h2>HeartRateTap Knowledge Hub</h2>
      <p>
        Explore more guides on how to understand and use your heart rate in everyday life and training. All articles are
        built around the same real-time tapping tool, so you can learn and measure in one place.
      </p>
      <ul>
        <li>
          <Link href="/blog/free-online-heart-rate-checker">
            Free Online Heart Rate Checker – Measure Heart Rate Online Instantly
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-check-heart-rate-online">
            How to Check Heart Rate Online Free – No Device Needed
          </Link>
        </li>
        <li>
          <Link href="/blog/heart-rate-zones-for-running">
            Heart Rate Zones for Running: Are You Training in the Right Zone?
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
        <Link href="/" className="blog-inline-cta">
          Try HeartRateTap now
        </Link>{" "}
        and see your own numbers in real time.
      </p>
    </section>
  );
};

export default BlogKnowledgeHub;


