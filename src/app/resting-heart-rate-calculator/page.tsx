import type { Metadata } from "next";
import Link from "next/link";
import CalculatorStructuredData from "@/components/CalculatorStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Footer from "@/components/Footer";
import RestingHeartRateCalculator from "@/components/RestingHeartRateCalculator";
import SourceList, { type Source } from "@/components/SourceList";
import { buildSocialMetadata } from "@/lib/seo-metadata";

const TITLE = "Resting Heart Rate Calculator by Age";
const DESCRIPTION =
  "Compare a calm resting heart rate and age with the cited 60–100 BPM adult span, including the exact beat distance. Readings under age 18 are not scored.";
const PATH = "/resting-heart-rate-calculator";
const URL = `https://www.heartratetap.com${PATH}`;

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
    name: "How the Heart Works: How the Heart Beats",
    publisher: "National Heart, Lung, and Blood Institute, National Institutes of Health",
    url: "https://www.nhlbi.nih.gov/health/heart/heart-beats",
    note: "Wrist-count method and the statement that a resting heart rate of 60 to 100 beats per minute is normal."
  },
  {
    name: "Resting Pulse Rate Reference Data for Children, Adolescents, and Adults: United States, 1999–2008",
    publisher: "National Center for Health Statistics, Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/nchs/data/nhsr/nhsr041.pdf",
    note: "NHANES 1999–2008 means, standard errors, and the report’s definitions used for bradycardia and tachycardia prevalence."
  },
  {
    name: "All About Heart Rate (Pulse)",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse",
    note: "Further reading from the American Heart Association. The 60–100 comparison on this page follows the NHLBI resting statement, not a separate AHA statistic."
  }
];

const FAQS = [
  {
    question: "What does the resting heart rate calculator compare?",
    answer:
      "For age 18 or older, it compares one resting count with 60 and 100 beats per minute and shows the distance from each edge. Under 18, it withholds that adult span and shows only the matching age landmark from the cited survey."
  },
  {
    question: "Why is there no separate band for age 30, 40, 50, or 60?",
    answer:
      "In the cited National Center for Health Statistics report, the adult mean plateaued at 72 beats per minute. The calculator therefore keeps one adult reference instead of inventing a new cutoff for each decade."
  },
  {
    question: "Does a result below 60 mean bradycardia?",
    answer:
      "No. The page reports that the count is below the cited span. The same survey used a below-60 definition when it published prevalence, and that prevalence was not rare, especially among males. A label on this page is not a diagnosis."
  },
  {
    question: "Can the count come from just after exercise?",
    answer:
      "It should not. The 60–100 reference and the survey means describe resting measurements. A post-exercise count answers a different question and will be misread if it is entered here."
  }
];

export default function RestingHeartRateCalculatorPage() {
  return (
    <div className="frame tool-landing-page">
      <main className="tool-landing-page">
        <section className="panel tool-hero">
          <div className="tool-hero-copy">
            <p className="tool-eyebrow">Adult reference comparison</p>
            <h1>Resting Heart Rate Calculator</h1>
            <p className="tool-intro">
              Enter a seated or lying heart rate and an age in completed years. Adults get a plain comparison with the
              60 and 100 beat boundaries, including how far the count sits from each edge. Children and teens do not
              receive that adult score.
            </p>
            <div className="tool-keyword-row" aria-label="Calculator limits">
              <span>Resting BPM</span>
              <span>Age</span>
              <span>60–100 reference</span>
              <span>No diagnosis</span>
            </div>
          </div>
          <div className="tool-hero-monitor">
            <RestingHeartRateCalculator />
          </div>
        </section>

        <section className="tool-support-grid">
          <article className="panel tool-info-panel">
            <h2>Two resting inputs</h2>
            <ol>
              <li>Count only while seated or lying and calm.</li>
              <li>Enter that rate and age as whole numbers.</li>
              <li>Read the distance from 60 and from 100.</li>
            </ol>
          </article>
          <article className="panel tool-info-panel">
            <h2>Visible arithmetic</h2>
            <p>
              An adult result states the beats above 60 and the beats below 100, or the beats outside one edge. A 72
              BPM entry is 12 above 60 and 28 below 100.
            </p>
          </article>
          <article className="panel tool-info-panel">
            <h2>No automatic label</h2>
            <p>
              The headline never says bradycardia, tachycardia, fit, or cleared. A clinician&apos;s personal range
              outranks this public comparison.
            </p>
          </article>
        </section>

        <article className="panel blog-article">
          <section className="blog-section">
            <h2>How this resting heart rate calculator uses your entries</h2>
            <p>
              The resting heart rate calculator takes two whole numbers: a calm heart rate in beats per minute and an
              age in completed years. It does not estimate a maximum, a training zone, or a recovery drop. Those are
              different questions. This page only compares a resting count with a published adult reference and, in a
              separate sentence, recalls what a large U.S. survey found about age.
            </p>
            <p>
              For age 18 or older, the comparison uses 60 and 100 BPM. The{" "}
              <a href="https://www.nhlbi.nih.gov/health/heart/heart-beats">
                National Heart, Lung, and Blood Institute
              </a>{" "}
              states that, at rest, a heart rate of 60 to 100 beats per minute is normal. The calculator reports
              whether the entry is inside that span or how many beats it sits outside either edge. A 72 BPM entry is 12
              beats above 60 and 28 beats below 100. A 54 BPM entry is 6 beats below 60. A 108 BPM entry is 8 beats
              above 100. The arithmetic stays next to the headline so the result can be checked without a hidden
              formula.
            </p>
            <p>
              Under age 18, that 60–100 span is withheld. Pediatric resting rates are faster, and one adult cutoff
              would mislabel an ordinary childhood count. Age 0 is reserved for an infant who has not yet reached a
              first birthday. Heart rates below 30 or above 240, and ages above 120, are rejected as entry errors.
              Those bounds are typing checks. They are not a claim that 30 or 240 is a healthy rate.
            </p>
          </section>

          <section className="blog-section">
            <h2>Take the count before you type it</h2>
            <p>
              The same NHLBI page describes a manual wrist count: place the index and middle fingers on the artery of
              the inner wrist, below the thumb, count the beats for 30 seconds, and double that count. A 15-second
              count multiplied by four magnifies a missed or extra beat. A full 60-second count avoids that
              multiplication. Use a method you can repeat, and write the method down with the number. Count only when
              you are seated or lying, calm, and not talking. A reading taken while standing, walking, or just after
              stairs is not a resting heart rate, even though the form will still do the arithmetic.
            </p>
            <p>
              If you use the <Link href="/">manual tap BPM calculator</Link>, you are timing taps you make while
              feeling a pulse. The tap tool does not sense the heart. Finish the count, then type the resulting BPM
              here. Do not enter a number from the middle of exercise and expect a resting comparison to stay
              meaningful. The{" "}
              <Link href="/heart-rate-recovery-calculator">heart rate recovery calculator</Link> is the page for two
              timed post-exercise readings.
            </p>
          </section>

          <section className="blog-section">
            <h2>What the cited survey shows about age</h2>
            <p>
              The age notes come from National Health Statistics Reports Number 41, from the National Center for Health
              Statistics, using National Health and Nutrition Examination Survey examinations from 1999 through 2008.
              Examiners saw 49,114 people. The normative sample was 35,302 people who did not have a current condition
              or medication expected to affect resting pulse. Pulse was taken after the person had been seated and had
              rested quietly for about four minutes. The{" "}
              <a href="https://www.cdc.gov/nchs/data/nhsr/nhsr041.pdf">report PDF</a> is the source for every mean and
              prevalence figure below.
            </p>
            <p>
              In that sample, mean resting pulse was 129 beats per minute at less than 1 year of age (standard error
              0.9). It fell to 96 beats per minute by age 5 (standard error 0.5), then to 78 beats per minute in early
              adolescence (standard error 0.3). In adulthood the mean plateaued at 72 beats per minute (standard error
              0.2). The report describes that decline with age as statistically significant. The calculator repeats the
              landmark that matches the age you enter. It does not turn the landmark into a personal target, and it
              does not invent a new band at 30, 40, 50, or 60. The adult mean stayed on a plateau.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Age entered</th>
                    <th>Survey landmark shown</th>
                    <th>Adult 60–100 span</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0 (infant under 1)</td>
                    <td>Mean 129 BPM, standard error 0.9</td>
                    <td>Withheld</td>
                  </tr>
                  <tr>
                    <td>1–9 years</td>
                    <td>Mean 96 BPM by age 5, standard error 0.5</td>
                    <td>Withheld</td>
                  </tr>
                  <tr>
                    <td>10–17 years</td>
                    <td>Decline toward 78 BPM in early adolescence, standard error 0.3; not a year-specific mean</td>
                    <td>Withheld</td>
                  </tr>
                  <tr>
                    <td>18 years or older</td>
                    <td>Adult plateau 72 BPM, standard error 0.2</td>
                    <td>Applied</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              A 10-year-old does not receive a private “age 10 normal.” The childhood and adolescent lines are group
              context so the missing adult score is understandable. Percentile tables in the report are more detailed
              than these four landmarks. This form does not interpolate a percentile for one child. For the narrative
              version of the same sources, use the{" "}
              <Link href="/blog/normal-resting-heart-rate-by-age">normal resting heart rate by age</Link> guide. This
              page is the comparison; that guide is the longer reference.
            </p>
          </section>

          <section className="blog-section">
            <h2>Why the form does not ask for sex</h2>
            <p>
              The same report found sex differences in the group means. Under age 20, the mean was 86 beats per minute
              for males (standard error 0.3) and 90 for females (standard error 0.3). At age 20 and over, the mean was
              71 for males (standard error 0.3) and 74 for females (standard error 0.2). Male resting pulse tended to
              plateau earlier in adulthood, while female resting pulse plateaued later. Those gaps are a few beats in a
              population, not a personal range you can pass or fail.
            </p>
            <p>
              The report also published prevalence using clinical definitions: tachycardia as a resting pulse of 100
              beats per minute, and bradycardia as a resting pulse below 60. Among males, tachycardia prevalence was
              1.3 percent (95 percent confidence interval 1.1 to 1.7) and bradycardia prevalence was 15.2 percent (14.1
              to 16.4). For adult females, the figures were 1.9 percent (1.6 to 2.3) and 6.9 percent (6.2 to 7.8).
              Controlling for age, males had higher odds of the below-60 definition (odds ratio 2.43, 95 percent
              confidence interval 2.09 to 2.83) and lower odds of the 100-beat definition (odds ratio 0.71, 0.52 to
              0.97).
            </p>
            <p>
              The form still does not ask for sex, and a result never prints those clinical words. A gap of a few beats
              between group means is too small to justify a second cutoff on a public form, and a prevalence statistic
              is not a verdict on one person. A trained adult can sit below 60 while feeling well. The headline stays a
              comparison with the cited 60–100 span.
            </p>
          </section>

          <section className="blog-section">
            <h2>Read the worked examples as arithmetic</h2>
            <p>
              The opening entries, 72 BPM and age 35, are a worked example, not a suggestion to match them. Seventy-two
              sits on the adult mean from the survey and inside 60–100: 12 beats above 60 and 28 beats below 100.
              Changing age from 35 to 55 does not move that adult result, because the page does not swap in a
              decade-specific band. Changing age from 35 to 16 removes the adult comparison and shows the
              early-adolescence landmark instead.
            </p>
            <div className="blog-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Example input</th>
                    <th>What the calculator reports</th>
                    <th>What it does not mean</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>72 BPM, age 35</td>
                    <td>Inside 60–100, 12 above 60 and 28 below 100</td>
                    <td>Not a personal target, even though 72 is the cited adult mean</td>
                  </tr>
                  <tr>
                    <td>54 BPM, age 42</td>
                    <td>6 beats below 60</td>
                    <td>Not a diagnosis; 15.2 percent of males in the survey were below 60</td>
                  </tr>
                  <tr>
                    <td>108 BPM, age 28</td>
                    <td>8 beats above 100</td>
                    <td>Not a reason to label tachycardia or to delay urgent symptoms</td>
                  </tr>
                  <tr>
                    <td>96 BPM, age 5</td>
                    <td>Adult span withheld; age-5 mean is 96 BPM</td>
                    <td>Not a pediatric clearance and not an “on target” score</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Try 96 BPM at age 5 in the form. The adult span stays hidden, and the note cites the age-5 mean of 96.
              Matching a published mean is a property of the example. It is not evidence that a five-year-old whose
              pulse is 96 is on target. HeartRateTap is not a pediatric monitor, a triage tool, or a substitute for the
              ranges a pediatric professional chooses.
            </p>
            <p>
              Try 54 BPM at age 42. The result is 6 beats below 60. That sentence is arithmetic. It does not say
              whether the cause is endurance training, a medication, a count taken too soon after effort, or something
              that needs care. If the count followed a hard effort, discard it and repeat the measurement at rest
              before you keep the number.
            </p>
          </section>

          <section className="blog-section">
            <h2>Limits, symptoms, and a surprising number</h2>
            <p>
              Medication, fever, pain, caffeine, alcohol, dehydration, poor sleep, anxiety, and recent activity can all
              move a resting rate. One count also includes counting error. Repeat an unexpected value later, in the
              same posture and with the same counting method, before you treat it as a pattern. Write down the time of
              day and whether you had just climbed stairs, taken caffeine, or felt ill.
            </p>
            <p>
              Do not use the result to start, stop, or change a medicine, to clear yourself for exercise, or to decide
              that a child is safe. If a clinician has given you a personal range, that instruction outranks this
              public reference. Chest pain, fainting, severe shortness of breath, or marked dizziness needs local
              emergency services. Do not stay on the page to see whether a different age entry changes the label.
            </p>
            <p>
              The comparison runs in the browser from the numbers you type. It does not create an account, upload the
              reading, or store a new server-side record for this tool. If you want a written trend, copy the inputs,
              the headline, and the measurement conditions into your own note. A single inside-range result is not a
              fitness score. This site does not publish user ratings, accuracy percentages, or performance claims for
              the comparison.
            </p>
          </section>

          <section className="blog-section">
            <h2>Related measurement guides</h2>
            <div className="tool-link-grid">
              <Link href="/blog/how-to-check-pulse-manually">How to check a pulse manually</Link>
              <Link href="/blog/daily-resting-heart-rate-check">A repeatable daily resting check</Link>
              <Link href="/guides">Heart rate guides</Link>
            </div>
          </section>

          <SourceList sources={SOURCES} />

          <section className="blog-section">
            <h2>Resting heart rate calculator questions</h2>
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
          "Resting heart rate and age inputs",
          "Beat distance from the cited 60–100 BPM adult span",
          "Adult span withheld under age 18",
          "Survey age landmarks with standard errors"
        ]}
      />
    </div>
  );
}
