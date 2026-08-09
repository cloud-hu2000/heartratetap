import type { Metadata } from "next";
import Link from "next/link";
import CalculatorStructuredData from "@/components/CalculatorStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Footer from "@/components/Footer";
import SourceList, { type Source } from "@/components/SourceList";
import TargetHeartRateCalculator from "@/components/TargetHeartRateCalculator";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "Target Heart Rate Calculator: Max HR and Heart Rate Reserve";
const DESCRIPTION =
  "Calculate a target heart rate range from age or heart rate reserve, compare the formulas, and keep population estimates in the right exercise context.";
const PATH = "/target-heart-rate-calculator";
const URL = `https://www.heartratetap.com${PATH}`;

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: URL, type: "website" })
};

const SOURCES: Source[] = [
  {
    name: "Target Heart Rates Chart",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
    note: "The age-predicted 220-minus-age estimate and general 50–70% moderate and 70–85% vigorous reference bands."
  },
  {
    name: "Physical Activity Guidelines for Americans, 2nd edition",
    publisher: "U.S. Department of Health and Human Services",
    url: "https://health.gov/paguidelines/second-edition/pdf/Physical_Activity_Guidelines_2nd_edition.pdf",
    note: "Relative-intensity context, gradual progression and the talk test for moderate and vigorous activity."
  },
  {
    name: "Tips for Monitoring Aerobic Exercise Intensity",
    publisher: "American College of Sports Medicine",
    url: "https://www.acsm.org/docs/default-source/files-for-resource-library/exercise-intensity-infographic.pdf",
    note: "Percent-of-maximum and heart-rate-based approaches used alongside perceived exertion."
  },
  {
    name: "Validity of the Maximal Heart Rate Prediction Models among Runners and Cyclists",
    publisher: "Journal of Clinical Medicine via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/37109218/",
    note: "A large athlete cohort illustrating the individual error in formula-predicted maximum heart rate."
  }
];

const FAQS = [
  {
    question: "Is 220 minus age my actual maximum heart rate?",
    answer:
      "No. It is a population estimate used to create a starting reference. An individual's measured maximum can be higher or lower."
  },
  {
    question: "What is the heart rate reserve formula?",
    answer:
      "Heart rate reserve is estimated maximum minus resting heart rate. A target is resting heart rate plus the chosen percentage of that reserve."
  },
  {
    question: "Can this calculator prescribe a safe exercise limit?",
    answer:
      "No. It cannot account for diagnosis, medication, symptoms, a measured exercise test or an individual plan from a qualified professional."
  }
];

export default function TargetHeartRateCalculatorPage() {
  return (
    <div className="frame tool-landing-page">
      <main className="tool-landing-page">
        <section className="panel tool-hero">
          <div className="tool-hero-copy">
            <p className="tool-eyebrow">Free exercise planning calculator</p>
            <h1>Target Heart Rate Calculator</h1>
            <p className="tool-intro">
              Estimate a target heart rate range with percent of maximum heart rate or the heart rate reserve
              (Karvonen) formula. Change the intensity endpoints, see the arithmetic immediately and keep the selected
              method beside the result.
            </p>
            <div className="tool-keyword-row" aria-label="Calculator capabilities">
              <span>Target heart rate</span>
              <span>Estimated max HR</span>
              <span>Heart rate reserve</span>
              <span>Custom intensity range</span>
            </div>
            <p className="blog-note">
              Start with the default 50–85% age-predicted reference only as general orientation. Do not use a formula
              to override symptoms, medication guidance, exercise-test results or a clinician-prescribed range.
            </p>
          </div>
          <div className="tool-hero-monitor">
            <TargetHeartRateCalculator />
          </div>
        </section>

        <section className="tool-support-grid">
          <article className="panel tool-info-panel">
            <h2>How to use the calculator</h2>
            <ol>
              <li>Enter your age to create an estimated maximum of 220 minus age.</li>
              <li>Choose percent of maximum or enter a calm resting value for heart rate reserve.</li>
              <li>Set the lower and upper percentages and save the formula with the BPM result.</li>
            </ol>
          </article>
          <article className="panel tool-info-panel">
            <h2>Two formulas, two results</h2>
            <p>
              Percent of maximum starts at zero. Heart rate reserve starts with the usable span between resting and
              estimated maximum, then adds resting rate back. The same percentage therefore produces different BPM.
            </p>
          </article>
          <article className="panel tool-info-panel">
            <h2>Keep effort in the decision</h2>
            <p>
              During moderate activity, the federal talk test says conversation is usually possible but singing is not.
              During vigorous activity, only a few words may be comfortable before a breath.
            </p>
          </article>
        </section>

        <article className="panel blog-article">
          <section className="blog-section">
            <h2>What a target heart rate calculation means</h2>
            <p>
              A target heart rate is a calculated exercise reference, not a speed limit measured from your body. The
              most accessible method begins with an age-predicted maximum. The American Heart Association describes the
              maximum as about <strong>220 − age</strong>, with moderate activity around 50–70% and vigorous activity
              around 70–85% of that estimate. Those figures are population averages. They help translate broad exercise
              intensity into BPM, but they do not reveal an individual&apos;s tested maximum, aerobic threshold, medication
              response or safe clinical limit.
            </p>
            <p>
              Keep the method attached to every number. A watch zone based on measured maximum, a laboratory threshold,
              a percent-of-maximum chart and a heart rate reserve calculation may all show different boundaries. That
              does not make the arithmetic broken. It means the inputs and definitions differ. Comparing two ranges
              without their formulas can lead to false precision.
            </p>
          </section>

          <section className="blog-section">
            <h2>Percent of estimated maximum heart rate</h2>
            <p>
              For a 40-year-old, 220 minus 40 gives an estimated maximum of 180 BPM. Fifty percent is 90 BPM, 70% is 126
              BPM and 85% is 153 BPM. The general combined reference is therefore 90–153 BPM. The calculation is easy to
              reproduce because it needs only age, but age cannot describe fitness, exercise mode or individual maximum.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead><tr><th>Step</th><th>40-year-old example</th><th>Result</th></tr></thead>
                <tbody>
                  <tr><td>Estimated maximum</td><td>220 − 40</td><td>180 BPM</td></tr>
                  <tr><td>50% point</td><td>180 × 0.50</td><td>90 BPM</td></tr>
                  <tr><td>70% point</td><td>180 × 0.70</td><td>126 BPM</td></tr>
                  <tr><td>85% point</td><td>180 × 0.85</td><td>153 BPM</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Do not perform an unsupervised maximal effort merely to replace the estimate. Whether maximal testing is
              appropriate depends on health, symptoms, training history and the test protocol. If a measured maximum is
              available from an appropriate supervised test, use the interpretation supplied with that test rather than
              silently substituting it into a generic online plan.
            </p>
          </section>

          <section className="blog-section">
            <h2>Heart rate reserve and the Karvonen calculation</h2>
            <p>
              Heart rate reserve includes a resting measurement. First subtract resting heart rate from estimated
              maximum. Then multiply that reserve by the chosen intensity and add resting rate back: <strong>target =
              resting HR + intensity × (maximum HR − resting HR)</strong>. If the same 40-year-old has a resting rate of
              60 BPM, reserve is 120 BPM. The 50% point is 120 BPM, the 70% point is 144 BPM and the 85% point is 162 BPM.
            </p>
            <p>
              The reserve result is higher than the simple percent-of-maximum result because the calculation begins
              above the resting baseline. Use a calm, repeatable resting value. A reading after coffee, rushing to the
              gym or warming up is not a resting input. Do not mix a reserve-based lower boundary with a
              percent-of-maximum upper boundary; both ends of a range need the same method.
            </p>
          </section>

          <section className="blog-section">
            <h2>Why your appropriate exercise intensity may differ</h2>
            <p>
              Heat, altitude, dehydration, fatigue, stress and caffeine can change heart rate at a familiar workload.
              Running, cycling and swimming may also produce different responses. Short intervals can finish before
              heart rate catches up, while a long steady effort may show cardiac drift even when pace or power stays
              similar. Use the calculation beside the purpose of the session, perceived exertion, breathing, pace or
              power—not as a command to accelerate whenever BPM is below a boundary.
            </p>
            <p>
              Beta blockers and other medicines can change maximum and exercise heart rate. Heart conditions,
              rehabilitation plans and clinician-defined restrictions can make population formulas unsuitable. If any
              of those apply, ask which method and monitoring equipment you should use. A generic result cannot provide
              exercise clearance.
            </p>
          </section>

          <section className="blog-section">
            <h2>Manual checks are delayed after exercise</h2>
            <p>
              HeartRateTap estimates BPM from the intervals between taps you make while feeling a pulse. It is not a
              continuous sensor. After exercise, time passes while you stop safely, find the wrist pulse and begin
              tapping. The number describes that later tapping window, not the workout peak or average. Use equipment
              designed for continuous exercise monitoring when the in-session value matters.
            </p>
            <p>
              If you want to compare a repeatable post-exercise checkpoint, keep the same activity, stop-to-measure
              delay, posture and method. The separate <Link href="/heart-rate-recovery-calculator">heart rate recovery
              calculator</Link> can subtract two readings from one documented protocol, but it cannot recreate a value
              that was not measured.
            </p>
          </section>

          <section className="blog-section">
            <h2>Related heart rate zone guides</h2>
            <div className="tool-link-grid">
              <Link href="/blog/heart-rate-zones-for-running">Running heart rate zones</Link>
              <Link href="/blog/cycling-heart-rate-zones">Cycling heart rate zones</Link>
              <Link href="/blog/swimming-heart-rate-zones">Swimming heart rate zones</Link>
              <Link href="/blog/heart-rate-zones-strength-training">Heart rate and strength training</Link>
            </div>
          </section>

          <SourceList sources={SOURCES} />

          <section className="blog-section">
            <h2>Target heart rate calculator questions</h2>
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
          "Percent of estimated maximum heart rate",
          "Heart rate reserve calculation",
          "Custom lower and upper intensity percentages",
          "Visible formula and estimated maximum"
        ]}
      />
    </div>
  );
}
