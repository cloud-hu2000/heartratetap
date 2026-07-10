import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About HeartRateTap & Editorial Standards",
  description:
    "Learn who maintains HeartRateTap, how the tap-based BPM estimator works, how health content is sourced, and how to request a correction.",
  alternates: {
    canonical: "https://www.heartratetap.com/about"
  }
};

export default function AboutPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            About • Transparency
          </p>
          <h1>About HeartRateTap</h1>
          <p className="blog-intro">
            HeartRateTap is an independent browser tool for estimating beats per minute from taps you make while
            feeling your own pulse. This page explains what we publish, what the tool can and cannot do, and how we keep
            our claims accountable.
          </p>
        </header>

        <section className="blog-section">
          <h2>Our purpose</h2>
          <p>
            The project exists to make a basic manual pulse count easier when a timer is inconvenient. Instead of
            sensing your body, the site records the time between deliberate taps and converts the average interval into
            BPM. It is useful for a quick wellness reference and for learning how pulse timing works.
          </p>
          <p>
            HeartRateTap is not a hospital, medical practice, diagnostic service, wearable sensor, electrocardiogram or
            certified medical device. It cannot identify an arrhythmia, measure blood pressure or oxygen saturation, or
            explain why a reading changed.
          </p>
        </section>

        <section className="blog-section">
          <h2>Who maintains the site</h2>
          <p>
            The HeartRateTap product and editorial team maintains the code, interface and articles. We do not present
            the team as clinicians or claim medical review where none has occurred. The source code is available in the{" "}
            <a href="https://github.com/cloud-hu2000/heartratetap" rel="noopener noreferrer">
              public GitHub repository
            </a>
            , so the timing approach and product changes can be inspected.
          </p>
          <p>
            Questions, accessibility issues and correction requests can be sent to{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Include the page URL and the sentence or
            result you believe needs attention so we can reproduce the issue.
          </p>
        </section>

        <section className="blog-section" id="editorial-standards">
          <h2>Editorial and corrections policy</h2>
          <ul>
            <li>
              <strong>Original purpose:</strong> every guide must answer a distinct user question or document how the
              product works; we do not create near-duplicate pages merely for keyword variations.
            </li>
            <li>
              <strong>Named sources:</strong> health ranges and safety statements should link to organizations such as
              the American Heart Association, CDC, NHS or comparable public-health authorities.
            </li>
            <li>
              <strong>Clear limits:</strong> product estimates are described as estimates. We avoid unverified accuracy,
              testing-volume, expert-endorsement and medical-benefit claims.
            </li>
            <li>
              <strong>Visible review dates:</strong> substantive guides show a publication date and a content review
              date. A review checks links, product behavior and whether the cited source still supports the statement.
            </li>
            <li>
              <strong>Corrections:</strong> confirmed factual errors are corrected in the page and its review date is
              updated. Material changes are recorded in the public source history.
            </li>
          </ul>
          <p>
            Editorial review is not the same as clinical review. Unless a page explicitly names a qualified medical
            reviewer and their credentials, readers should assume it has not been medically reviewed.
          </p>
        </section>

        <section className="blog-section">
          <h2>How we separate content and monetization</h2>
          <p>
            Articles and product guidance are written independently of advertisers. Advertising does not determine
            reference ranges, recommendations or which sources we cite. Advertising code is not placed on sign-in,
            registration, password-reset, account, checkout-success, alert or error screens. Any future ad placement
            must remain visually distinct from navigation and the tap controls.
          </p>
          <p>
            HeartRateTap has applied to Google AdSense. Google may use cookies or similar identifiers on pages where its
            ads are enabled; our <Link href="/privacy-policy">Privacy Policy</Link> explains those technologies and user
            choices.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Read the practical guides</h2>
          <p>
            Start with the calculation methodology if you want to understand the estimator, then use the resting-rate
            and exercise guides for context from named public-health sources.
          </p>
          <Link href="/guides" className="pill active">
            Open the guide library
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  );
}
