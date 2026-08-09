import type { Metadata } from "next";
import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import BlogKnowledgeHub from "@/components/BlogKnowledgeHub";
import Footer from "@/components/Footer";
import SourceList, { Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "How a Tap-Based Heart Rate Checker Estimates BPM";
const DESCRIPTION =
  "See the exact interval-to-BPM formula used by HeartRateTap, a worked example, the browser data flow, error sources and a repeatability checklist.";
const PATH = "/blog/free-online-heart-rate-checker";

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: {
    canonical: `https://www.heartratetap.com${PATH}`
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: `https://www.heartratetap.com${PATH}` })
};

const SOURCES: Source[] = [
  {
    name: "All About Heart Rate",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    note: "Pulse locations, a full-minute manual count, common adult resting context and symptom guidance."
  },
  {
    name: "Target Heart Rates Chart",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
    note: "Age-predicted maximum and target ranges, plus the limits of general formulas."
  }
];

export default function TapMethodologyPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Product documentation • Methodology
          </p>
          <h1>{TITLE}</h1>
          <p className="blog-intro">
            HeartRateTap does not read a camera, microphone or wearable sensor. You find your pulse and create the input
            by tapping once per beat. The browser measures those tap intervals and converts them into a BPM estimate.
            This guide documents the calculation so you can understand and reproduce it.
          </p>
        </header>

        <ArticleMeta published="January 7, 2026" reviewed="August 7, 2026" readingTime="9 minute read" />

        <section className="blog-section">
          <h2>The input comes from you, not a heart sensor</h2>
          <p>
            A browser cannot infer your pulse from an ordinary click. First locate a pulse at the wrist or side of the
            neck with your index and middle fingers. Each time you feel a beat, press the on-screen heart or the
            spacebar. HeartRateTap records only the browser timestamp of that action for the calculation.
          </p>
          <p>
            That distinction matters: the displayed number is an estimate of <em>your tapping rhythm</em>. It matches
            your pulse only when each tap matches a pulse beat. The tool cannot determine whether you missed a beat,
            double-tapped, felt an irregular rhythm or selected the wrong pulse point.
          </p>
        </section>

        <section className="blog-section">
          <h2>The interval-to-BPM formula</h2>
          <p>
            BPM means beats per minute. If the average time between taps is measured in milliseconds, the conversion is:
          </p>
          <p className="formula-block" aria-label="BPM equals 60000 divided by average tap interval in milliseconds">
            BPM = 60,000 ÷ average interval in milliseconds
          </p>
          <p>
            The code takes consecutive timestamps, subtracts each earlier timestamp from the next one, averages those
            intervals and rounds 60,000 divided by that average. The live display also checks short 5-second and
            10-second windows and prefers the longer available window. Only the latest 16 taps are retained in the
            active calculation.
          </p>

          <h3>A worked example</h3>
          <p>
            Imagine five taps at 0 ms, 800 ms, 1,610 ms, 2,400 ms and 3,205 ms. The four intervals are 800, 810, 790 and
            805 ms. Their average is 801.25 ms, so 60,000 ÷ 801.25 = 74.88. The rounded display is 75 BPM.
          </p>
          <p>
            One late tap changes the average. More steady intervals usually reduce the influence of a single small
            timing mistake, which is why the interface asks for at least 10 taps before treating a result as stable.
            “Stable” refers to the sample of taps; it is not a claim of medical accuracy.
          </p>
        </section>

        <section className="blog-section">
          <h2>What the browser stores</h2>
          <div className="blog-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Used for</th>
                  <th>Default location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tap timestamps</td>
                  <td>Calculating the current intervals and BPM estimate</td>
                  <td>Temporary page state</td>
                </tr>
                <tr>
                  <td>Locked BPM, time and selected context</td>
                  <td>Showing recent history and a simple chart</td>
                  <td>Local browser storage</td>
                </tr>
                <tr>
                  <td>Language and consent preferences</td>
                  <td>Remembering interface choices</td>
                  <td>Local browser storage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Clearing browser storage, changing browser profiles or using a private window can remove local history. The
            basic calculator does not require an account. For details about optional analytics, accounts and feedback,
            see the <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>

        <section className="blog-section">
          <h2>Five common sources of error</h2>
          <ol>
            <li>
              <strong>Anticipating the beat:</strong> tapping just before you feel each pulse shortens or varies the
              measured interval.
            </li>
            <li>
              <strong>Missing or adding a tap:</strong> one missed beat roughly doubles a single interval; an accidental
              extra tap shortens it.
            </li>
            <li>
              <strong>A changing heart rate:</strong> after activity, BPM can fall while you are still tapping, so the
              average represents a short changing period rather than one fixed instant.
            </li>
            <li>
              <strong>A weak or irregular pulse:</strong> if beats are difficult to identify, tap timing is not a
              dependable substitute for clinical rhythm assessment.
            </li>
            <li>
              <strong>Comparing different conditions:</strong> posture, recent movement, emotions, temperature, caffeine
              and some medications can change heart rate. A real change is not necessarily a calculator error.
            </li>
          </ol>
        </section>

        <section className="blog-section">
          <h2>A repeatability check you can perform</h2>
          <ol>
            <li>Sit quietly and use the same wrist, fingers, posture and browser for the comparison.</li>
            <li>Tap for at least 10 clearly felt beats, stop, and write down the locked value.</li>
            <li>Wait 30 to 60 seconds without changing position, then repeat twice.</li>
            <li>
              Compare the three results. If one differs markedly, consider whether a beat was missed or added rather
              than simply choosing the middle result.
            </li>
            <li>
              If the pulse itself feels irregular, a surprising pattern persists, or you have symptoms, stop using the
              tap estimate as the decision tool and seek appropriate professional advice.
            </li>
          </ol>
          <p className="blog-note">
            A repeatability check evaluates how consistently you used this interface. It does not validate the result
            against an ECG, pulse oximeter or certified monitor.
          </p>
        </section>

        <section className="blog-section">
          <h2>Has HeartRateTap published accuracy validation data?</h2>
          <p>
            HeartRateTap has not yet published a validation study comparing tap estimates with a certified medical
            instrument or a reference device. For that reason, the site does not state an accuracy percentage, an
            average error, or a clinically acceptable agreement range. The 10-tap prompt describes an interface choice
            intended to reduce the influence of one small timing error; it is not a validated accuracy threshold.
          </p>
          <p>
            A future comparison should publish the protocol before collecting results, record the reference method,
            posture, activity context, tap count, paired BPM values, absolute difference, and exclusions, and then
            release every de-identified row together with summary statistics and limitations. The downloadable CSV is
            a blank data dictionary for that work, not a results dataset and not evidence that validation has occurred.
          </p>
          <a
            href="/downloads/heartratetap-repeatability-study-template.csv"
            download
            className="blog-inline-cta"
          >
            Download the blank repeatability-study CSV template
          </a>
        </section>

        <section className="blog-section">
          <h2>What this result cannot tell you</h2>
          <p>
            A BPM number alone does not diagnose an abnormal rhythm, dehydration, anxiety, infection, overtraining or a
            heart condition. HeartRateTap also cannot measure blood pressure, blood oxygen, pulse strength or electrical
            activity. A normal-looking average can hide irregular intervals because the tool summarizes timing into one
            number.
          </p>
          <p>
            The American Heart Association advises emergency help when a heart rate is suddenly very high or low for
            the person and symptoms such as chest pain, shortness of breath, dizziness or fainting are present. Contact
            the emergency service for your location; do not wait to complete an online measurement.
          </p>
        </section>

        <SourceList sources={SOURCES} />

        <section className="blog-section blog-cta">
          <h2>Use the calculator with its limits in view</h2>
          <p>
            The main page includes the tap surface, recent local history, reference context and the same methodology
            summarized beside the tool.
          </p>
          <Link href="/" className="pill active">
            Open the tap calculator
          </Link>
        </section>

        <BlogKnowledgeHub currentPath={PATH} />
        <ArticleStructuredData
          title={TITLE}
          description={DESCRIPTION}
          path={PATH}
          datePublished="2026-01-07"
          dateModified="2026-08-07"
        />
      </article>
      <Footer />
    </div>
  );
}
