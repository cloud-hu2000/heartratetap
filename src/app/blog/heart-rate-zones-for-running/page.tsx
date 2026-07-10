import type { Metadata } from "next";
import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import BlogKnowledgeHub from "@/components/BlogKnowledgeHub";
import Footer from "@/components/Footer";
import SourceList, { Source } from "@/components/SourceList";

const TITLE = "Heart Rate Zones for Running – Are You Training in the Right Zone?";
const DESCRIPTION =
  "Learn what age-predicted heart-rate ranges can and cannot show, how to use the talk test, and why a tap reading after a run is only a delayed snapshot.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.heartratetap.com/blog/heart-rate-zones-for-running"
  }
};

const TARGETS = [
  { age: "20", zone: "100–170", maximum: "200" },
  { age: "30", zone: "95–162", maximum: "190" },
  { age: "40", zone: "90–153", maximum: "180" },
  { age: "50", zone: "85–145", maximum: "170" },
  { age: "60", zone: "80–136", maximum: "160" },
  { age: "70", zone: "75–128", maximum: "150" }
];

const SOURCES: Source[] = [
  {
    name: "Target Heart Rates Chart",
    publisher: "American Heart Association",
    url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates",
    note: "Age-predicted maximum values, 50–85% target ranges and cautions about medication and individual needs."
  },
  {
    name: "How to Measure Physical Activity Intensity",
    publisher: "U.S. Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/physical-activity-basics/measuring/index.html",
    note: "The talk test and perceived-effort descriptions for moderate and vigorous activity."
  }
];

export default function RunningZonesPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Guides • Exercise context
          </p>
          <h1>{TITLE}</h1>
          <p className="blog-intro">
            Heart-rate ranges can add context to perceived effort, but age formulas are averages and a tap-based reading
            taken after you stop is not continuous workout monitoring. Here is a careful way to use both the numbers and
            their limitations.
          </p>
        </header>

        <ArticleMeta published="December 22, 2025" reviewed="July 10, 2026" readingTime="8 minute read" />

        <section className="blog-section">
          <h2>Why heart rate context can help runners</h2>
          <p>
            Pace does not always equal effort. Hills, heat, fatigue and fitness can make the same pace feel different.
            Heart rate is one additional observation, while perceived effort and the ability to talk provide context
            that does not require a device.
          </p>
          <p>
            The CDC describes moderate relative intensity as roughly 5 or 6 on a 0–10 effort scale, where you can talk
            but not sing. Vigorous relative intensity begins around 7 or 8, where speaking more than a few words without
            pausing is difficult. This “talk test” adapts to the person better than treating one BPM threshold as
            universal.
          </p>
        </section>

        <section className="blog-section">
          <h2>What age-predicted target ranges mean</h2>
          <p>
            A common estimate for maximum heart rate is about 220 minus age. The American Heart Association describes
            moderate activity as approximately 50–70% of that estimated maximum and vigorous activity as approximately
            70–85%. These are averages for general guidance, not test results or prescribed limits.
          </p>
          <div className="blog-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>General 50–85% target range (BPM)</th>
                  <th>Age-predicted maximum (BPM)</th>
                </tr>
              </thead>
              <tbody>
                {TARGETS.map((row) => (
                  <tr key={row.age}>
                    <td>{row.age}</td>
                    <td>{row.zone}</td>
                    <td>{row.maximum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="blog-note">
            Source: American Heart Association target heart rates chart, last reviewed August 12, 2024. The AHA table
            includes additional five-year ages; this shorter table preserves its values at ten-year intervals.
          </p>
        </section>

        <section className="blog-section">
          <h2>Why your personal zone may differ</h2>
          <p>
            Age prediction does not measure your actual maximum. Fitness, health conditions, heat and medication can
            change the relationship between BPM and effort. Beta blockers and some other medicines can lower heart rate,
            making a general target chart inappropriate for setting intensity.
          </p>
          <p>
            If you have a heart condition, take heart-rate-affecting medication, are returning after illness or have
            been given a clinical exercise limit, use the range and device recommended by your health professional.
            Beginners should build gradually rather than trying to reach the top of a chart.
          </p>
        </section>

        <section className="blog-section">
          <h2>What HeartRateTap can measure around a run</h2>
          <p>
            HeartRateTap requires one hand to find a pulse and another deliberate action for every beat. It is not safe
            or practical as a continuous monitor while running. It can provide two limited snapshots:
          </p>
          <ul>
            <li>
              <strong>Before the run:</strong> after sitting quietly, take a resting estimate under your usual conditions
              and compare it with your own routine—not with someone else&apos;s baseline.
            </li>
            <li>
              <strong>After the run:</strong> once you are safely stopped, find the pulse and tap. Record how many seconds
              passed after stopping because heart rate begins changing during that delay.
            </li>
          </ul>
          <p>
            A post-run value is not the peak rate from the workout. The time needed to stop, unlock a phone, find a pulse
            and tap means the number is a later average. Use a suitable wearable or chest strap if continuous workout
            monitoring matters.
          </p>
        </section>

        <section className="blog-section">
          <h2>A practical pre- and post-run record</h2>
          <div className="blog-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Example</th>
                  <th>Interpretation limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Planned session</td>
                  <td>30-minute easy run</td>
                  <td>Describes intent, not actual intensity</td>
                </tr>
                <tr>
                  <td>Talk test / effort</td>
                  <td>Full sentences; 5 of 10</td>
                  <td>Subjective but individualized</td>
                </tr>
                <tr>
                  <td>Post-run delay</td>
                  <td>45 seconds</td>
                  <td>Longer delays generally miss more of the earlier rate</td>
                </tr>
                <tr>
                  <td>Tap estimate and repeats</td>
                  <td>132, then 124 BPM</td>
                  <td>Shows a short changing period, not continuous monitoring</td>
                </tr>
                <tr>
                  <td>Conditions</td>
                  <td>Hot, hilly route</td>
                  <td>Helps compare similar sessions without assigning a cause</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="blog-section">
          <h2>Stop conditions matter more than a zone</h2>
          <p>
            Stop exercising and seek appropriate help if you develop chest pain, fainting, severe shortness of breath,
            marked dizziness or another alarming symptom. Do not try to finish a tap sequence or use a target-zone table
            to decide whether the symptom is safe.
          </p>
        </section>

        <SourceList sources={SOURCES} />

        <section className="blog-section blog-cta">
          <h2>Try a clearly labeled snapshot</h2>
          <p>
            Use the main calculator only when you are safely still, and record whether the result was resting or taken
            after activity. For the calculation itself, read the methodology guide first.
          </p>
          <Link href="/" className="pill active">
            Open HeartRateTap
          </Link>
        </section>

        <BlogKnowledgeHub />
        <ArticleStructuredData
          title={TITLE}
          description={DESCRIPTION}
          path="/blog/heart-rate-zones-for-running"
          datePublished="2025-12-22"
          dateModified="2026-07-10"
        />
      </article>
      <Footer />
    </div>
  );
}
