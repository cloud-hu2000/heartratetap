import type { Metadata } from "next";
import Link from "next/link";
import CalculatorStructuredData from "@/components/CalculatorStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Footer from "@/components/Footer";
import SourceList, { type Source } from "@/components/SourceList";
import Vo2MaxCalculator from "@/components/Vo2MaxCalculator";
import {
  estimateCooper12Minute,
  estimateCooper15Mile,
  estimateRockportWalk,
  type Vo2Estimate
} from "@/components/vo2-max";

function requiredEstimate(estimate: Vo2Estimate | null, label: string): Vo2Estimate {
  if (!estimate) {
    throw new Error(`VO2 max example failed its entry check: ${label}`);
  }

  return estimate;
}
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "VO2 Max Calculator for Field Tests";
const DESCRIPTION =
  "A VO2 max calculator for a 12-minute run, a 1.5-mile time, or a Rockport one-mile walk. Each result shows the cited equation and the study limit.";
const PATH = "/vo2-max-calculator";
const URL = `https://www.heartratetap.com${PATH}`;

const cooperExample = requiredEstimate(estimateCooper12Minute(2550), "12-minute 2550 m");
const mileExample = requiredEstimate(estimateCooper15Mile(11 * 60 + 40), "1.5-mile 11:40");
const mileTwelve = requiredEstimate(estimateCooper15Mile(12 * 60), "1.5-mile 12:00");
const cooperMileDistance = requiredEstimate(estimateCooper12Minute(2414), "12-minute 2414 m");
const walkExample = requiredEstimate(
  estimateRockportWalk({
    sex: "male",
    age: 33,
    weightPounds: 160,
    totalSeconds: 11 * 60 + 20,
    heartRate: 160
  }),
  "walk male"
);
const walkFemale = requiredEstimate(
  estimateRockportWalk({
    sex: "female",
    age: 30,
    weightPounds: 155.5,
    totalSeconds: 13 * 60 + 34,
    heartRate: 145
  }),
  "walk female"
);

export const metadata: Metadata = {
  title: `${TITLE} | HeartRateTap`,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      "x-default": URL
    }
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, url: URL, type: "website" })
};

const SOURCES: Source[] = [
  {
    name: "50 Years of the Cooper 12-Minute Run",
    publisher: "The Cooper Institute",
    url: "https://www.cooperinstitute.org/blog/50-years-of-the-cooper-12-minute-run",
    note: "Twelve-minute protocol, the 115-person Air Force comparison with correlation 0.897, the 1.5-mile equation (483 / minutes) + 3.5, and the safety note for maximal runs."
  },
  {
    name: "VO2 max: Cooper test",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/VO2_max#Cooper_test",
    note: "Prints the inverted 12-minute distance equation (meters − 504.9) / 44.73. The 1968 paper is the study; this page uses that published inversion and does not refit it."
  },
  {
    name: "A Means of Assessing Maximal Oxygen Intake",
    publisher: "JAMA",
    url: "https://doi.org/10.1001/jama.1968.03140030033008",
    note: "Kenneth H. Cooper, 1968, volume 203, pages 201–204. Primary report of the 12-minute field test."
  },
  {
    name: "Estimation of VO2max from a one-mile track walk, gender, age, and body weight",
    publisher: "PubMed, MEDLINE",
    url: "https://pubmed.ncbi.nlm.nih.gov/3600239/",
    note: "Kline and colleagues, Medicine & Science in Sports & Exercise, 1987. Sample, sex coding, and the liter-per-minute equation used by the walk method."
  },
  {
    name: "Predicting Aerobic Power (VO2max) Using The 1-Mile Walk Test",
    publisher: "University of Michigan",
    url: "https://websites.umich.edu/~exphysio/mvs.241/Assig4.Pred.VOmax.pdf",
    note: "Walk-the-mile procedure, the instruction not to jog, the 15-second post-walk count multiplied by four, and the sheet’s group error statement."
  }
];

const FAQS = [
  {
    question: "Can tapping a pulse measure VO2 max?",
    answer:
      "No. HeartRateTap’s tap timer records taps you make. It does not sense oxygen, airflow, or heartbeats. This VO2 max calculator never reads those taps. A walk heart rate is a number you type after a separate count."
  },
  {
    question: "Why do the 12-minute and 1.5-mile equations disagree?",
    answer: `They are different published equations. Covering 2,414 meters in the distance equation returns ${cooperMileDistance.primaryValue} ml/kg/min. Finishing 1.5 miles in 12:00 returns ${mileTwelve.primaryValue} ml/kg/min from the time equation. The form does not convert one into the other.`
  },
  {
    question: "Why is the walk result shown twice?",
    answer:
      "The 1987 equation that this page uses outputs liters per minute. Dividing by the entered body mass, after converting pounds to kilograms, expresses that same result as ml/kg/min. The paper also fit separate relative equations. Those coefficients are not the division shown here."
  },
  {
    question: "Who should avoid the run tests?",
    answer:
      "The Cooper Institute says the 12-minute and 1.5-mile runs are for people who are apparently healthy and regularly active. It points people who are relatively inactive, who have joint pain with running, or for whom a maximal run is a poor idea toward a walk test instead. This page cannot decide which group you are in."
  }
];

export default function Vo2MaxCalculatorPage() {
  return (
    <div className="frame tool-landing-page">
      <main className="tool-landing-page">
        <section className="panel tool-hero">
          <div className="tool-hero-copy">
            <p className="tool-eyebrow">Cited field-test arithmetic</p>
            <h1>VO2 Max Calculator</h1>
            <p className="tool-intro">
              Enter one finished field test. The VO2 max calculator shows that published equation. Tapping a pulse does
              not produce this result.
            </p>
            <div className="tool-keyword-row" aria-label="Calculator limits">
              <span>VO2 max</span>
              <span>12-minute run</span>
              <span>1.5-mile run</span>
              <span>One-mile walk</span>
            </div>
          </div>
          <div className="tool-hero-monitor">
            <Vo2MaxCalculator />
          </div>
        </section>

        <section className="tool-support-grid">
          <article className="panel tool-info-panel">
            <h2>Three separate equations</h2>
            <ol>
              <li>12-minute run: meters only.</li>
              <li>1.5-mile run: finish time only.</li>
              <li>One-mile walk: time, heart rate, weight, age, and the sex term.</li>
            </ol>
          </article>
          <article className="panel tool-info-panel">
            <h2>Checkable defaults</h2>
            <p>
              The opening 2,550 meter example returns {cooperExample.primaryValue} ml/kg/min. Eleven minutes and 40
              seconds for 1.5 miles returns {mileExample.primaryValue}. The walk example returns {walkExample.arithmetic[0]}.
            </p>
          </article>
          <article className="panel tool-info-panel">
            <h2>No tap-based oxygen score</h2>
            <p>
              The BPM timer is a different tool. Nothing on this page reads its taps, estimates a maximum heart rate, or
              turns a resting count into VO2 max.
            </p>
          </article>
        </section>

        <article className="panel blog-article">
          <section className="blog-section">
            <h2>How this VO2 max calculator uses a finished field test</h2>
            <p>
              VO2 max is the highest rate of oxygen uptake reached in a maximal laboratory test, usually written as
              milliliters of oxygen per kilogram of body mass per minute. A mask, a calibrated analyzer, and a graded
              treadmill or cycle protocol are what measure it. A browser cannot do that job. This VO2 max calculator
              only rearranges three field tests that researchers compared with laboratory uptake. You bring the result
              of a test you already completed. The page does not watch you run, walk, or tap.
            </p>
            <p>
              Pick the test that matches the session. A 12-minute run needs the distance covered while the clock ran
              for exactly 12 minutes. A 1.5-mile run needs the time to cover that distance. A Rockport walk needs the
              time to walk one mile, body weight in pounds, age, the sex coefficient from the 1987 equation, and the
              heart rate from the last quarter of that mile. Mixing those inputs produces a number with no published
              meaning. The form therefore keeps one method selected and ignores the fields that belong to the others.
            </p>
            <p>
              The{" "}
              <a href="https://www.cooperinstitute.org/blog/50-years-of-the-cooper-12-minute-run">Cooper Institute</a>{" "}
              describes the original 12-minute comparison: 115 U.S. Air Force officers and airmen ran as far as they
              could in 12 minutes, then completed a maximal treadmill test within three days. The correlation between
              distance and measured oxygen uptake was 0.897. That is a strong group association. It is not a promise
              that one person&apos;s field result equals a laboratory value, and the sample was men in the Air Force.
              The distance equation has no age term and no sex term. Applying it outside that sample is an
              extrapolation, which the result line says in plain language.
            </p>
          </section>

          <section className="blog-section">
            <h2>The 12-minute distance equation</h2>
            <p>
              The distance form used here is the published inversion of that regression: VO2max in ml/kg/min equals
              (distance in meters − 504.9) / 44.73. The{" "}
              <a href="https://en.wikipedia.org/wiki/VO2_max#Cooper_test">VO2 max reference for the Cooper test</a>{" "}
              prints that inversion. The page does not replace 504.9 and 44.73 with a rounded classroom version, and it
              does not invent a new slope.
            </p>
            <p>
              The form opens on 2,550 meters. Subtract 504.9 to get 2,045.1, then divide by 44.73. The result is{" "}
              {cooperExample.primaryValue} ml/kg/min, which is the figure in the calculator before you change the
              distance. Every extra 44.73 meters raises the estimate by about 1 ml/kg/min. A 10-meter mistake in the
              measured distance moves the result by about 0.22. That is why the Cooper Institute tells testers to use a
              flat, accurately measured course, preferably lane 1 of a 400-meter track, and to record laps rather than
              guess from a car odometer.
            </p>
            <p>
              Entry is limited to {`1,000–4,500`} meters. At 504.9 meters the line would be zero, and a shorter
              distance would be negative. One thousand meters is already a slow 12 minutes, and 4,500 meters is an
              entry ceiling, not a claim that 4,500 meters is a realistic personal goal. Distances outside that span
              are rejected instead of being clipped to a prettier number.
            </p>
            <p>
              Warm up, start too fast, and the second half of the 12 minutes slows down. The Institute calls that a
              common mistake and says it lowers the distance you can cover. This page cannot see your pacing. It can
              only score the distance you type. If the course was short, long, uphill, or run on a treadmill while
              holding the rails, the equation still runs, and the result is only as relevant as the protocol was.
            </p>
          </section>

          <section className="blog-section">
            <h2>The 1.5-mile time equation is not the same line</h2>
            <p>
              For large groups, the same Institute page says administrators often time a 1.5-mile run instead of
              counting laps for 12 minutes. On a 400-meter track that distance is 6 laps plus 15 meters. The equation
              printed there is VO2max = (483 / time in minutes) + 3.5. Seconds belong in the fraction of a minute:
              divide them by 60, then add them to the whole minutes. Eleven minutes and 40 seconds is 700/60 minutes.
              The division 483 / (700/60) is 41.4, and adding 3.5 gives {mileExample.primaryValue}. A finish of exactly
              12:00 gives {mileTwelve.primaryValue}.
            </p>
            <p>
              Those two equations are related history, not identical arithmetic. One and a half miles is about 2,414
              meters. Put 2,414 meters into the 12-minute equation and the result is {cooperMileDistance.primaryValue}{" "}
              ml/kg/min. Put a 12:00 finish into the 1.5-mile equation and the result is {mileTwelve.primaryValue}. The
              Institute describes the tests as giving essentially the same estimate. The published lines still differ
              by about 1 ml/kg/min on that paired example, so this calculator refuses to translate a distance into a
              time behind your back. If you ran for time, use the time method. If you ran for 12 minutes, use the
              distance method.
            </p>
            <p>
              Accepted 1.5-mile times run from 6:00 through 30:00. Six minutes is 4:00 per mile, near the top of what
              the line will score here. Thirty minutes is a walk, and the Institute did not build this run equation for
              that effort. The bounds are typing checks. They do not certify that a 6:00 or a 30:00 effort was safe or
              that the equation was validated at either edge.
            </p>
          </section>

          <section className="blog-section">
            <h2>The one-mile walk uses heart rate you type</h2>
            <p>
              The walk method follows the best liter-per-minute equation in the{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/3600239/">1987 one-mile walk paper by Kline and colleagues</a>.
              The abstract prints it as VO2max = 6.9652 + (0.0091 × weight in pounds) − (0.0257 × age) + (0.5955 ×
              sex) − (0.2240 × time in minutes) − (0.0115 × heart rate). Sex is 1 for male and 0 for female. The
              derivation group had 174 adults. The fit was r = 0.93 with a standard error of 0.325 liters per minute.
              A cross-validation group of 169 adults had r = 0.92 and a standard error of 0.355 liters per minute.
              Those errors describe the study groups. This page does not turn them into a personal plus-or-minus band.
            </p>
            <p>
              The full sample was 343 healthy adults, 165 men and 178 women, ages 30 to 69. Their mean laboratory
              VO2max was 37.0 ml/kg/min, with a standard deviation of 10.7. Each person walked one mile as fast as
              possible at least twice. Heart rate was recorded every quarter mile, and the equation uses the
              fourth-quarter rate. The form accepts ages 20 through 69 because later teaching protocols widened the
              practical range, but an age under 30 is labeled as outside the 1987 sample. Ages under 20 or over 69 are
              rejected. There is no third sex coefficient in the paper, so the control offers only the published 0 and
              1.
            </p>
            <p>
              A worked walk makes the signs obvious. A 33-year-old man weighing 160 pounds, finishing in 11 minutes 20
              seconds, with a fourth-quarter heart rate of 160, is the walk example stored in the form. Time is 11 +
              20/60 minutes. The terms are 0.0091 × 160 = 1.456, 0.0257 × 33 = 0.8481, 0.5955 × 1 = 0.5955, 0.2240 ×
              (34/3) = 2.5387, and 0.0115 × 160 = 1.84. Starting from 6.9652, adding the weight and sex terms and
              subtracting the age, time, and heart-rate terms leaves {walkExample.arithmetic[0]}. Body mass is 160 ×
              0.45359237 kilograms, which is 72.57 kg. Dividing the liter result by that mass produces{" "}
              {walkExample.primaryValue} ml/kg/min. Change any input and both lines change together.
            </p>
            <p>
              The sex term is not decorative. The same equation with sex set to 0, age 30, weight 155.5 pounds, a time
              of 13 minutes 34 seconds, and a heart rate of 145 returns {walkFemale.arithmetic[0]} and{" "}
              {walkFemale.primaryValue} ml/kg/min. That second set is another substitution into the abstract, not a
              laboratory retest of that person. Weight is accepted from 80.0 to 400.0 pounds in tenths, walk times
              from 8:00 through 30:00, and heart rates from 40 to 220. If the liter equation comes out at or below
              zero, the result is withheld.
            </p>
            <p>
              A{" "}
              <a href="https://websites.umich.edu/~exphysio/mvs.241/Assig4.Pred.VOmax.pdf">
                University of Michigan walk-test sheet
              </a>{" "}
              tells the walker to cover one mile as fast as possible without jogging or running, on a measured track,
              in the inside lane. It takes the heart rate as a 15-second pulse counted immediately after the walk and
              multiplies by four. That is a field way to fill the heart-rate term. A resting morning pulse is the wrong
              number. So is a heart rate from the middle of a later cooldown, or a guess based on 220 minus age. The
              sheet also says that, for most people in its discussion, predicted values fell within 0.335 L/min, about
              4.4 ml/kg/min, of measured VO2max. Read that as the sheet&apos;s group statement. The calculator does not
              attach ±4.4 to your row.
            </p>
            <p>
              The paper also says generalized equations in ml/kg/min were generated and had a similar standard error.
              This page does not use those unpublished-on-the-abstract coefficients. It reports the liter equation that
              the abstract actually prints, then divides by body mass so the large figure is in the unit most people
              compare. If you have seen a different walk calculator produce a nearby but unequal ml/kg/min value, it
              may be using that other regression. The formula line under the result shows which one ran.
            </p>
          </section>

          <section className="blog-section">
            <h2>A counted pulse is still not a VO2 max measurement</h2>
            <p>
              The walk equation needs a heart rate, and that is the only reason a pulse appears on this page. You can
              count the wrist or neck for 15 seconds as soon as the mile ends, multiply by four, and type the product.
              The <Link href="/blog/how-to-check-pulse-manually">manual pulse guide</Link> covers finding a pulse with
              two fingers. If you time those taps with the <Link href="/">manual tap BPM calculator</Link>, you are
              only timing taps. The timer does not check that a tap matched a beat, and it has no path into this VO2
              max calculator. Copy the number yourself if you want to use it. Do not treat a tap screen as an oxygen
              test that finished on its own.
            </p>
            <p>
              A target-zone estimate answers a different question. The{" "}
              <Link href="/target-heart-rate-calculator">target heart rate calculator</Link> applies percents to an
              age-based maximum or to heart-rate reserve. It does not estimate oxygen uptake, and a zone in beats per
              minute cannot be pasted into the walk equation in place of the fourth-quarter rate. Recovery, resting
              comparisons, and VO2 max stay on separate pages because the inputs are not interchangeable.
            </p>
          </section>

          <section className="blog-section">
            <h2>What the three checks look like side by side</h2>
            <div className="blog-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Test entered</th>
                    <th>Equation output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12-minute run, 2,550 m</td>
                    <td>{cooperExample.primaryValue} ml/kg/min</td>
                  </tr>
                  <tr>
                    <td>1.5 miles in 11:40</td>
                    <td>{mileExample.primaryValue} ml/kg/min</td>
                  </tr>
                  <tr>
                    <td>1.5 miles in 12:00</td>
                    <td>{mileTwelve.primaryValue} ml/kg/min</td>
                  </tr>
                  <tr>
                    <td>2,414 m in the 12-minute equation</td>
                    <td>{cooperMileDistance.primaryValue} ml/kg/min</td>
                  </tr>
                  <tr>
                    <td>Walk, 33 years, male, 160 lb, 11:20, 160 BPM</td>
                    <td>
                      {walkExample.arithmetic[0]}; {walkExample.primaryValue} ml/kg/min
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              None of these rows is a fitness grade. The page does not assign poor, fair, good, or elite labels, and it
              does not compare you with an age table that is not printed in the cited equations. A higher estimate
              means the equation scored a faster run, a longer 12-minute distance, or a walk with a lower weighted
              combination of time and heart rate. It does not by itself say that a training plan is working or that a
              symptom can be ignored.
            </p>
          </section>

          <section className="blog-section">
            <h2>Limits before you treat a number as fitness</h2>
            <p>
              The Cooper Institute says the 12-minute and 1.5-mile runs are intended for people who are apparently
              healthy and regularly physically active. It specifically steers people who are relatively inactive, who
              have joint pain during or after running, or for whom a maximal effort is the wrong test toward a walk
              such as the Rockport mile. This website cannot see your history. Choosing the run methods anyway does
              not make the effort appropriate. Stop a field test for chest pain, fainting, severe shortness of breath,
              or marked dizziness, and contact local emergency services. Do not stay on the page to try a different
              equation first.
            </p>
            <p>
              Heat, hills, altitude, pacing, a short course, a long course, holding treadmill rails, and an inaccurate
              heart-rate count all move the inputs. Medication that changes heart rate moves the walk result even when
              the mile time stays the same, because heart rate is subtracted inside the equation. A laboratory test
              with gas analysis remains the measurement. Field equations were built because that measurement is slow
              and expensive, not because a phone replaces it.
            </p>
            <p>
              The arithmetic stays in the browser. The tool does not create an account, upload the test, or store a
              server record of the entries. Copy the inputs and both result lines into your own note if you want a
              record. HeartRateTap publishes no user ratings, accuracy percentages, or device-performance claims for
              this calculator. The only error figures on the page are the ones printed in the cited papers and the
              university walk sheet.
            </p>
          </section>

          <section className="blog-section">
            <h2>Related pages</h2>
            <div className="tool-link-grid">
              <Link href="/guides">Heart rate guides</Link>
              <Link href="/heart-rate-recovery-calculator">Heart rate recovery, a different pair of readings</Link>
            </div>
          </section>

          <SourceList sources={SOURCES} />

          <section className="blog-section">
            <h2>VO2 max calculator questions</h2>
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
          "Cooper 12-minute distance equation",
          "Cooper Institute 1.5-mile time equation",
          "Kline 1987 one-mile walk equation in liters per minute",
          "Body-mass conversion of that liter result to ml/kg/min"
        ]}
      />
    </div>
  );
}
