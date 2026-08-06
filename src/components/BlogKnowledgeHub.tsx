import Link from "next/link";

const BlogKnowledgeHub = () => {
  return (
    <section className="blog-section">
      <h2>HeartRateTap Knowledge Hub</h2>
      <p>
        Continue with a guide that answers a different question, or browse the curated library. Closely related
        instructions stay together so you do not have to compare repeated versions of the same article.
      </p>
      <div className="tool-link-grid">
        <Link href="/">Use the tap-based BPM calculator</Link>
        <Link href="/guides">Browse all guides</Link>
      </div>
      <ul>
        <li>
          <Link href="/blog/free-online-heart-rate-checker">
            How a Tap-Based Heart Rate Checker Estimates BPM
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
        <li>
          <Link href="/blog/how-to-check-pulse-manually">
            How to Check Your Pulse Manually: A Repeatable Wrist-Pulse Method
          </Link>
        </li>
        <li>
          <Link href="/blog/seniors-guide-checking-pulse">A Senior&apos;s Guide to Checking Your Pulse</Link>
        </li>
        <li>
          <Link href="/blog/heart-rate-yoga-meditation">Using HeartRateTap During Yoga and Meditation</Link>
        </li>
        <li>
          <Link href="/blog/manual-heart-rate-checks-team-sports">Manual Heart-Rate Checks for Team Sports</Link>
        </li>
        <li>
          <Link href="/blog/build-personal-heart-rate-log">How to Build a Meaningful Personal Heart-Rate Log</Link>
        </li>
        <li>
          <Link href="/blog/talk-to-doctor-manual-heart-rate-data">
            How to Talk to Your Doctor About Manual Heart-Rate Measurements
          </Link>
        </li>
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
