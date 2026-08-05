import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Heart Rate Guides & Tap-Measurement Methodology | HeartRateTap",
  description:
    "Browse HeartRateTap's original guide to tap-based BPM calculation, a consistent resting-rate routine, and exercise intensity context.",
  alternates: {
    canonical: "https://www.heartratetap.com/guides"
  }
};

const GUIDES = [
  {
    href: "/blog/free-online-heart-rate-checker",
    label: "Methodology",
    title: "How tap timing becomes a BPM estimate",
    description:
      "See the interval formula, a worked example, the browser data flow, sources of error and a repeatability checklist."
  },
  {
    href: "/blog/daily-resting-heart-rate-check",
    label: "Routine",
    title: "A consistent resting heart rate check",
    description:
      "Build a comparable morning routine, record context with each result and learn when a trend deserves professional advice."
  },
  {
    href: "/blog/heart-rate-zones-for-running",
    label: "Exercise",
    title: "Using heart rate context around a run",
    description:
      "Understand age-predicted ranges, the talk test and the important limitation of taking a tap-based reading after exercise stops."
  },
  {
    href: "/blog/how-to-check-pulse-manually",
    label: "Technique",
    title: "How to check a pulse manually",
    description:
      "Learn a repeatable wrist-pulse technique, how to count and compare readings, and when a manual estimate is not the right tool."
  }
];

export default function GuidesPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Knowledge hub • Curated guides
          </p>
          <h1>Heart rate guides and product methodology</h1>
          <p className="blog-intro">
            This library is intentionally small. Each guide has a different job: document the calculator, improve the
            consistency of a resting check, or add exercise context. Closely related material is kept on one page so
            readers can find the full answer without comparing repeated versions.
          </p>
        </header>

        <section className="blog-section">
          <h2>Choose a guide by your goal</h2>
          <div className="guide-card-grid">
            {GUIDES.map((guide) => (
              <article key={guide.href} className="guide-card">
                <p className="guide-label">{guide.label}</p>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <Link href={guide.href}>Read the guide</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="blog-section">
          <h2>What these guides do differently</h2>
          <p>
            The methodology article refers to the actual behavior of this codebase: user-generated tap timestamps,
            millisecond intervals, short rolling windows and local browser history. It does not imply that the browser
            can sense a heartbeat. Health reference ranges are kept separate from the product calculation and linked to
            their original authoritative sources.
          </p>
          <p>
            Every result still depends on your ability to find a pulse and tap with each beat. If a pulse feels
            irregular, a value is surprising, or symptoms are present, a tap estimator is the wrong tool for deciding
            what is happening.
          </p>
        </section>

        <section className="blog-section">
          <h2>How to use a result responsibly</h2>
          <p>
            Start by labeling the situation: a calm resting check and a reading taken after activity are not
            interchangeable. Repeat an unexpected value under the same conditions and note whether a tap was missed or
            added. The browser&apos;s recent-history chart is a convenience for comparison, not an alert system and not a
            clinical record.
          </p>
          <p>
            A BPM estimate cannot identify a rhythm problem or explain a change. Symptoms and personal medical context
            take priority over a general range. If a suddenly unusual heart rate comes with chest pain, shortness of
            breath, fainting or marked dizziness, contact local emergency services instead of repeating the calculator.
          </p>
        </section>

        <section className="blog-section">
          <h2>Start with the measurement technique</h2>
          <p>
            Before comparing numbers, make the input as consistent as possible. The practical pulse guide explains how
            to find the wrist pulse with two fingers, why the thumb is a poor choice, how to label the situation, and
            why a short tap estimate should be repeated when it is unexpected. The aim is not to turn a browser into a
            medical device; it is to make the manual step clear enough that a result can be interpreted with the right
            amount of caution.
          </p>
          <p>
            A reliable personal comparison starts with a simple question: was this a calm, resting check or a reading
            after movement? Resting checks work best when taken under similar conditions. After exercise, a manual
            value can change while you are finding the pulse and tapping, so it describes a brief recovery period rather
            than a fixed training-zone measurement. Record the condition alongside the number instead of treating every
            result as interchangeable.
          </p>
          <p>
            The guides deliberately separate three jobs: the calculator documentation explains the arithmetic; the
            technique guide explains the human input; and the resting and exercise articles provide general context from
            named health sources. Reading the relevant guide is more useful than searching for multiple versions of the
            same answer, and it helps keep product limitations visible next to the information people use.
          </p>
        </section>

        <section className="blog-section">
          <h2>What to do with an unexpected reading</h2>
          <p>
            First, pause and consider the conditions. Recent activity, stress, fever, caffeine, body position and some
            medicines can affect heart rate. If you feel well and the value is surprising, rest in the same position and
            repeat the manual measurement rather than deciding from a single set of taps. A one-off difference may be a
            changed condition or a missed tap; it is not enough information to explain a cause.
          </p>
          <p>
            Do not use this site to diagnose a rhythm issue, set a treatment plan or decide whether to ignore symptoms.
            If a pulse feels irregular, repeated attempts differ greatly, or you have chest pain, shortness of breath,
            fainting, severe dizziness or another urgent symptom, seek appropriate professional or emergency help for
            your location. The safety guidance is part of every guide because a simple BPM estimate cannot answer those
            questions.
          </p>
        </section>

        <section className="blog-section">
          <h2>How the library is maintained</h2>
          <p>
            Guides show publication and review dates, distinguish editorial review from medical review, and link health
            claims to named sources. Product statements are checked against the current code. If a source changes or a
            feature behaves differently, the relevant page should be corrected rather than duplicated in another
            guide. The full process and correction contact are on the <Link href="/about">About page</Link>.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Measure after you understand the method</h2>
          <p>
            The main page contains the complete tap tool, local history and measurement notes in one place. No account
            or camera permission is needed for the basic check.
          </p>
          <Link href="/" className="pill active">
            Open HeartRateTap
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  );
}
