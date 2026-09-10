import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { GUIDE_CLUSTER_META, GUIDE_CLUSTER_ORDER, GUIDE_CONTENT, TOOL_CONTENT } from "@/lib/guide-content";

export const metadata: Metadata = {
  title: "Heart Rate Guides & Tap-Measurement Methodology | HeartRateTap",
  description:
    "Use target and recovery calculators, then browse tap-based BPM methodology, resting-rate references and heart rate zone guides.",
  alternates: {
    canonical: "https://www.heartratetap.com/guides"
  }
};

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
            Each guide has a distinct job: document the calculator, improve a measurement routine, add an activity
            context, or prepare a health-care conversation. Closely related material is kept on one page so readers can
            find a full answer without comparing repeated versions.
          </p>
        </header>

        <section className="blog-section">
          <h2>Start with a calculator</h2>
          <p>
            Use a functional calculator for a formula-based task, then open the supporting guide that matches your
            measurement method, activity or tracking question.
          </p>
          <div className="guide-card-grid">
            {TOOL_CONTENT.map((tool) => (
              <article key={tool.path} className="guide-card">
                <p className="guide-label">{tool.label}</p>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <Link href={tool.path}>Open the calculator</Link>
              </article>
            ))}
          </div>
        </section>

        {GUIDE_CLUSTER_ORDER.map((cluster) => {
          const clusterMeta = GUIDE_CLUSTER_META[cluster];
          const guides = GUIDE_CONTENT.filter((guide) => guide.cluster === cluster);

          return (
            <section className="blog-section" key={cluster}>
              <h2>{clusterMeta.title}</h2>
              <p>{clusterMeta.description}</p>
              <div className="guide-card-grid">
                {guides.map((guide) => (
                  <article key={guide.path} className="guide-card">
                    <p className="guide-label">{guide.label}</p>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <Link href={guide.path}>Read the guide</Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

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
