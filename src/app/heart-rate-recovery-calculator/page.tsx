import type { Metadata } from "next";
import Link from "next/link";
import CalculatorStructuredData from "@/components/CalculatorStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Footer from "@/components/Footer";
import HeartRateRecoveryCalculator from "@/components/HeartRateRecoveryCalculator";
import SourceList, { type Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "Heart Rate Recovery Calculator: 1- and 2-Minute BPM Drop";
const DESCRIPTION =
  "Calculate the BPM change between exercise end and a 1- or 2-minute recovery reading, document the protocol, and understand why results are not interchangeable.";
const PATH = "/heart-rate-recovery-calculator";
const URL = `https://www.heartratetap.com${PATH}`;

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: URL, type: "website" })
};

const SOURCES: Source[] = [
  {
    name: "Heart-rate recovery immediately after exercise as a predictor of mortality",
    publisher: "New England Journal of Medicine via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/10536127/",
    note: "The original study defined recovery as the decrease from peak exercise to one minute after exercise in its specified clinical protocol."
  },
  {
    name: "Reproducibility of post-exercise heart rate recovery indices: A systematic review",
    publisher: "Autonomic Neuroscience via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/31493664/",
    note: "Comparison of HRR60, HRR120 and other indices, emphasizing that the selected time point is part of the measure."
  },
  {
    name: "A systematic review on heart-rate recovery to monitor changes in training status in athletes",
    publisher: "International Journal of Sports Physiology and Performance via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/22357753/",
    note: "Age, temperature, exercise intensity and duration as confounders, plus the need for better protocol standardization."
  },
  {
    name: "Physical Activity Guidelines for Americans, 2nd edition",
    publisher: "U.S. Department of Health and Human Services",
    url: "https://health.gov/paguidelines/second-edition/pdf/Physical_Activity_Guidelines_2nd_edition.pdf",
    note: "Gradual progression, relative-intensity context and the talk test around moderate and vigorous activity."
  }
];

const FAQS = [
  {
    question: "What is the heart rate recovery formula?",
    answer:
      "Subtract the heart rate at the selected recovery time from the exercise-end or peak reading: starting HR minus recovery HR."
  },
  {
    question: "Should I use a 1-minute or 2-minute reading?",
    answer:
      "Both are used, but they are different indices. Choose one interval and repeat the same exercise and recovery protocol before comparing results."
  },
  {
    question: "Does this calculator diagnose abnormal recovery?",
    answer:
      "No. It only calculates the difference. Clinical cutoffs depend on the exercise test, recovery mode, population and measurement protocol."
  }
];

export default function HeartRateRecoveryCalculatorPage() {
  return (
    <div className="frame tool-landing-page">
      <main className="tool-landing-page">
        <section className="panel tool-hero">
          <div className="tool-hero-copy">
            <p className="tool-eyebrow">Free post-exercise difference calculator</p>
            <h1>Heart Rate Recovery Calculator</h1>
            <p className="tool-intro">
              Calculate how many beats per minute your recorded heart rate changed after one or two minutes. The tool
              shows the subtraction and percentage change without assigning a medical grade to the result.
            </p>
            <div className="tool-keyword-row" aria-label="Calculator capabilities">
              <span>1-minute HRR</span>
              <span>2-minute HRR</span>
              <span>BPM drop</span>
              <span>Visible formula</span>
            </div>
            <p className="blog-note">
              Use two readings from the same documented protocol. A peak from a continuous monitor, an exercise-end
              value and a delayed manual pulse check are not interchangeable starting points.
            </p>
          </div>
          <div className="tool-hero-monitor">
            <HeartRateRecoveryCalculator />
          </div>
        </section>

        <section className="tool-support-grid">
          <article className="panel tool-info-panel">
            <h2>Use one protocol</h2>
            <ol>
              <li>Record the exercise-end value and start timing.</li>
              <li>Recover in the same way each time.</li>
              <li>Record again at exactly 60 or 120 seconds.</li>
            </ol>
          </article>
          <article className="panel tool-info-panel">
            <h2>Simple arithmetic</h2>
            <p>
              HRR = starting heart rate − recovery heart rate. A 160 BPM start and 130 BPM one-minute value produce a
              30 BPM drop. The calculation is simple; the protocol determines what the number represents.
            </p>
          </article>
          <article className="panel tool-info-panel">
            <h2>No automatic grading</h2>
            <p>
              Research cutoffs belong to specific exercise-test and recovery procedures. This calculator does not copy
              one study threshold onto an unsupervised workout or delayed manual reading.
            </p>
          </article>
        </section>

        <article className="panel blog-article">
          <section className="blog-section">
            <h2>What heart rate recovery measures</h2>
            <p>
              Heart rate recovery (HRR) describes the decrease in heart rate after exercise stops. A common index
              subtracts the value at one minute of recovery from the value at peak exercise or exercise end. If the
              starting reading is 160 BPM and the one-minute reading is 130 BPM, HRR60 is 30 BPM. A two-minute index uses
              the same subtraction at 120 seconds. The time label matters because a heart rate has had twice as long to
              change at two minutes.
            </p>
            <p>
              The original 1999 clinical study frequently associated with one-minute HRR used a symptom-limited exercise
              test and a defined recovery procedure. Its result was not simply “any heart rate after any workout.” Later
              research has used multiple time points and protocols. For that reason, this page reports the arithmetic
              difference and does not label a self-entered result normal, abnormal, fit or unsafe.
            </p>
          </section>

          <section className="blog-section">
            <h2>The heart rate recovery formula</h2>
            <p className="formula-block">HRR = exercise-end heart rate − recovery heart rate</p>
            <p>
              Use the value recorded at the selected starting point, not a remembered estimate of the hardest moment.
              Then use the reading taken at the exact interval selected in the calculator. If heart rate rises instead
              of falls, the subtraction is negative; the interface describes that as a rise. Do not edit the values to
              force a positive result.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead><tr><th>Input</th><th>Example</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr><td>Starting heart rate</td><td>160 BPM</td><td>The documented exercise-end or peak value</td></tr>
                  <tr><td>Recovery interval</td><td>60 seconds</td><td>The exact time to the second reading</td></tr>
                  <tr><td>Recovery heart rate</td><td>130 BPM</td><td>The reading at that time point</td></tr>
                  <tr><td>Calculated HRR</td><td>30 BPM</td><td>160 − 130</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="blog-section">
            <h2>Why one-minute and two-minute results cannot be mixed</h2>
            <p>
              A systematic review of post-exercise indices found that HRR60 and HRR120 are both widely used, but they are
              separate measures. Longer recovery allows additional change, so a two-minute drop is often larger. Rename
              every saved value with its interval—“HRR60” or “HRR120”—instead of storing an unlabeled “recovery score.”
            </p>
            <p>
              The recovery activity matters too. Walking slowly keeps muscles working and can maintain a higher rate than
              sitting still. Posture, temperature, exercise intensity, session duration, hydration and medication can
              also change the result. Pick one safe recovery procedure and repeat it only around comparable sessions.
              Do not stop moving abruptly when your exercise plan or professional guidance calls for a gradual cool-down.
            </p>
          </section>

          <section className="blog-section">
            <h2>Choose a measurement method before the test</h2>
            <p>
              Continuous exercise monitors can preserve the rate at the final effort and at exact recovery timestamps.
              A manual count has unavoidable setup time: you stop, become stable, locate the pulse and begin counting.
              HeartRateTap adds another deliberate tapping window. It calculates the intervals you enter accurately, but
              it cannot reconstruct the peak or the seconds that passed before the first tap.
            </p>
            <p>
              A manual routine can still create a clearly labeled personal checkpoint. Decide in advance to walk or sit,
              note the exercise-end time, and measure at the same later point. If you use the <Link href="/">manual tap
              BPM calculator</Link>, label the number “tap estimate” and record when tapping began. Do not compare it
              directly with a watch&apos;s immediate peak or a clinic exercise test.
            </p>
          </section>

          <section className="blog-section">
            <h2>Use trends without turning them into a diagnosis</h2>
            <p>
              A repeated protocol can show whether the observed drop was larger or smaller on comparable days. It cannot
              explain the reason. Training status, fatigue, illness, heat, a changed warm-up, a harder finishing effort
              or measurement error may contribute. Athlete research reviews describe potential value in HRR trends but
              also emphasize confounding factors and the need for standardization.
            </p>
            <p>
              Do not use an online result to clear yourself for exercise, diagnose autonomic function or change medicine.
              If a clinician or rehabilitation program has asked for heart rate recovery testing, use its equipment,
              exercise endpoint, posture, interval and interpretation. Their protocol takes priority over this general
              calculator.
            </p>
          </section>

          <section className="blog-section">
            <h2>Stop for symptoms, not for a cleaner data point</h2>
            <p>
              Safety comes before completing the timer. Stop exercise and seek appropriate help for chest pain, fainting,
              severe dizziness, marked shortness of breath or another urgent symptom. Contact local emergency services
              when symptoms may be an emergency. Do not wait for a one-minute result or repeat a test to see whether the
              number improves.
            </p>
            <p>
              For planning broad exercise intensity before a session, use the <Link href="/target-heart-rate-calculator">
              target heart rate calculator</Link>. It answers a different question: the recovery calculator compares two
              measured time points, while the target calculator creates formula-based exercise references.
            </p>
          </section>

          <section className="blog-section">
            <h2>Related measurement guides</h2>
            <div className="tool-link-grid">
              <Link href="/blog/how-to-check-pulse-manually">How to check a pulse manually</Link>
              <Link href="/blog/build-personal-heart-rate-log">Build a personal heart-rate log</Link>
              <Link href="/blog/heart-rate-zones-for-running">Running heart rate zones</Link>
              <Link href="/blog/cycling-heart-rate-zones">Cycling heart rate zones</Link>
            </div>
          </section>

          <SourceList sources={SOURCES} />

          <section className="blog-section">
            <h2>Heart rate recovery calculator questions</h2>
            <div className="tool-faq-grid">
              {FAQS.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <FAQStructuredData url={URL} items={FAQS} />
      <CalculatorStructuredData
        name={TITLE}
        description={DESCRIPTION}
        path={PATH}
        featureList={[
          "One-minute heart rate recovery difference",
          "Two-minute heart rate recovery difference",
          "BPM and percentage change",
          "Visible subtraction formula"
        ]}
      />
    </div>
  );
}
