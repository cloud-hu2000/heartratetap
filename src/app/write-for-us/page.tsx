import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const TITLE = "Write for Us: Guest Posts | HeartRateTap";
const DESCRIPTION =
  "HeartRateTap accepts guest post pitches about heart-rate tracking, exercise, wellness, and practical pulse-checking. Read the guidelines and contact us.";
const URL = "https://www.heartratetap.com/write-for-us";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "HeartRateTap",
    images: [
      {
        url: "https://www.heartratetap.com/og-heart-rate-tap.png",
        width: 1200,
        height: 630,
        alt: "Write for HeartRateTap guest post guidelines"
      }
    ]
  }
};

export default function WriteForUsPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            We Accept Guest Posts • Contribute to HeartRateTap
          </p>
          <h1>Write for Us: Guest Post Guidelines</h1>
          <p className="blog-intro">
            <strong>HeartRateTap accepts guest post pitches.</strong> We welcome original, practical articles that
            help readers understand manual pulse checks, heart-rate tracking, exercise, recovery, and everyday
            wellness. Read the guidelines below, then email your idea to our editorial team.
          </p>
          <a className="pill active" href="mailto:cloudhu2000@gmail.com?subject=Guest%20post%20pitch%20for%20HeartRateTap">
            Pitch a guest post
          </a>
        </header>

        <section className="blog-section">
          <h2>Topics we consider</h2>
          <p>Strong pitches fit HeartRateTap&apos;s audience and cover a focused question with useful, accurate advice.</p>
          <ul>
            <li>How to find and count a pulse manually</li>
            <li>Heart-rate tracking for running, cycling, swimming, strength training, yoga, or recovery</li>
            <li>Practical wellness routines and responsible use of fitness data</li>
            <li>Accessibility, product design, or technology related to pulse and fitness tracking</li>
            <li>Evidence-based explanations that make heart-rate concepts easier to understand</li>
          </ul>
          <p>
            We do not publish diagnosis or treatment claims, unsafe exercise advice, unsupported health promises, or
            content designed mainly to place unrelated links. HeartRateTap is a wellness tool, not a medical device.
          </p>
        </section>

        <section className="blog-section">
          <h2>Guest post requirements</h2>
          <ul>
            <li>
              <strong>Original work:</strong> submit content you wrote and have the right to publish. It must not be
              copied, spun, or already published elsewhere.
            </li>
            <li>
              <strong>Useful and specific:</strong> explain the reader&apos;s problem clearly and provide practical steps,
              examples, or evidence rather than generic filler.
            </li>
            <li>
              <strong>Reliable sources:</strong> factual health statements must be supported by current, authoritative
              sources such as public-health agencies, medical associations, or peer-reviewed research.
            </li>
            <li>
              <strong>Transparent links:</strong> disclose any relationship you have with a company, product, or site
              mentioned in the article. We may edit or remove promotional links.
            </li>
            <li>
              <strong>Readable format:</strong> use a descriptive title, short introduction, clear headings, concise
              paragraphs, and natural English.
            </li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>How to submit a pitch</h2>
          <p>
            Email <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a> with the subject line
            <strong> “Guest post pitch for HeartRateTap.”</strong> Include:
          </p>
          <ol>
            <li>Your proposed headline and a two- or three-sentence summary</li>
            <li>A short outline showing the main sections</li>
            <li>Your name, relevant experience, and links to one or two writing samples</li>
            <li>Any requested author bio link or other links you hope to include</li>
            <li>Whether the pitch represents a company, client, product, or paid campaign</li>
          </ol>
          <p>
            Please send a pitch before writing a full draft. A submission does not guarantee publication. We review
            ideas for relevance, originality, accuracy, and usefulness, and we may edit accepted work for clarity,
            style, safety, links, and search presentation.
          </p>
        </section>

        <section className="blog-section">
          <h2>Sponsored and advertising inquiries</h2>
          <p>
            If you are proposing paid placement, sponsorship, or another commercial collaboration, identify it clearly
            in your first email. Sponsored arrangements are considered separately from editorial guest posts and must
            be disclosed to readers. Payment never guarantees an unsupported claim, hidden endorsement, or do-follow
            link.
          </p>
          <p>
            For product support, corrections, privacy requests, or other questions, use the general{" "}
            <Link href="/contact">Contact page</Link> instead.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Ready to contribute?</h2>
          <p>Send a concise, relevant pitch and tell us why it will help HeartRateTap readers.</p>
          <a className="pill active" href="mailto:cloudhu2000@gmail.com?subject=Guest%20post%20pitch%20for%20HeartRateTap">
            Email cloudhu2000@gmail.com
          </a>
        </section>
      </article>
      <Footer />
    </div>
  );
}
