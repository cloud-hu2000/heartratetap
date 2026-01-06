import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | HeartRateTap",
  description:
    "Learn how HeartRateTap handles your data. We do not sell your data and store your heart rate measurements locally in your browser by default.",
  alternates: {
    canonical: "https://heartratetap.com/privacy-policy"
  }
};

const PrivacyPolicyPage = () => {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Legal • Privacy Policy
          </p>
          <h1>Privacy Policy</h1>
          <p className="blog-intro">
            This page explains how HeartRateTap collects, uses, and protects information when you use our service.
          </p>
        </header>

        <section className="blog-section">
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Heart rate measurements:</strong> Stored locally in your browser (localStorage) for your personal
              use. By default, these readings are not sent to our servers.
            </li>
            <li>
              <strong>Feedback submissions:</strong> If you submit feedback or vote on ideas, we store the content you
              provide (title, description, optional email) to operate the feedback board.
            </li>
            <li>
              <strong>Device ID for voting:</strong> A random ID kept in your browser to prevent duplicate votes.
            </li>
            <li>
              <strong>Analytics:</strong> We use privacy-conscious analytics (e.g., Vercel Analytics) to understand
              anonymous traffic patterns.
            </li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>How we use data</h2>
          <ul>
            <li>Provide the heart rate tap experience.</li>
            <li>Improve features based on anonymous usage patterns.</li>
            <li>Respond to your feedback and feature requests.</li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>What we do not do</h2>
          <ul>
            <li>We do not sell your data.</li>
            <li>We do not share your personal data with advertisers.</li>
            <li>We do not require account creation to use the heart rate tool.</li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>Data storage and retention</h2>
          <p>
            Heart rate readings stay in your browser until you clear them. Feedback submissions are retained to operate
            the roadmap and community voting. If you want your feedback entry removed, contact us and include the title
            or description you submitted.
          </p>
        </section>

        <section className="blog-section">
          <h2>Cookies and local storage</h2>
          <p>
            We primarily use localStorage for history and voting. If cookies or similar storage are used for analytics,
            they are limited to improving the service and not for ad tracking.
          </p>
        </section>

        <section className="blog-section">
          <h2>Third-party services</h2>
          <p>
            We may use providers such as Vercel (hosting/analytics) and email services to communicate about feedback.
            These services process minimal data necessary to operate the product.
          </p>
        </section>

        <section className="blog-section">
          <h2>Your choices</h2>
          <ul>
            <li>You can clear your local heart rate history anytime in your browser storage settings.</li>
            <li>You may choose not to submit feedback or omit your email address.</li>
            <li>You can use ad blockers or opt-out tools to limit analytics cookies if enabled.</li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>Contact</h2>
          <p>
            For privacy questions or data requests, please reach out via the feedback widget or email listed on our
            site.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Back to HeartRateTap</h2>
          <p>Ready to measure? Return to the main tool and start tapping.</p>
          <Link href="/" className="pill active">
            Go to HeartRateTap
          </Link>
        </section>
      </article>
    </div>
  );
};

export default PrivacyPolicyPage;

