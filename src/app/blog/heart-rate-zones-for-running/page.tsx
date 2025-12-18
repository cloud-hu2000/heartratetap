import type { Metadata } from "next";
import Link from "next/link";
import BlogKnowledgeHub from "@/components/BlogKnowledgeHub";

export const metadata: Metadata = {
  title: "Heart Rate Zones for Running – Are You Training in the Right Zone?",
  description:
    "Learn how to use heart rate zones for running and workouts, and quickly check whether you are in the right zone with HeartRateTap’s free online heart rate monitor.",
  alternates: {
    canonical: "https://heartratetap.com/blog/heart-rate-zones-for-running"
  }
};

const ZONES = [
  {
    name: "Zone 1 – Easy / Recovery",
    percent: "50–60% HRmax",
    feeling: "You can breathe through your nose and talk in full sentences.",
    use: "Warm-ups, cooldowns, active recovery days."
  },
  {
    name: "Zone 2 – Endurance / Fat-burning",
    percent: "60–70% HRmax",
    feeling: "Comfortable but purposeful. You can talk, but not sing.",
    use: "Building aerobic base, long steady runs and walks."
  },
  {
    name: "Zone 3 – Tempo / Moderate",
    percent: "70–80% HRmax",
    feeling: "Talking in short phrases only, breathing more labored.",
    use: "Shorter steady runs, tempo sessions for experienced runners."
  },
  {
    name: "Zone 4 – Hard / Threshold",
    percent: "80–90% HRmax",
    feeling: "Very challenging. You can only say a few words at a time.",
    use: "Intervals, hill repeats, race-pace efforts for trained athletes."
  },
  {
    name: "Zone 5 – Max Effort",
    percent: "90–100% HRmax",
    feeling: "All-out sprinting, unsustainable for long.",
    use: "Very short sprint work under guidance; not needed for most people."
  }
];

const RunningZonesPage = () => {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Guides • Training & running
          </p>
          <h1>Heart Rate Zones for Running – Are You Training in the Right Zone?</h1>
          <p className="blog-intro">
            If you run or work out without checking your heart rate, you might be training in the wrong zone—too easy to
            improve, or too hard to recover. Here’s how to use HeartRateTap to stay in the right zone before and after
            your runs.
          </p>
        </header>

        <section className="blog-section">
          <h2>Why heart rate zones matter for runners</h2>
          <p>
            When you run based purely on pace, you ignore a key signal: how hard your body is actually working. Heat,
            hills, sleep, stress, and even caffeine can make the same pace feel very different from day to day.
          </p>
          <p>
            Heart rate zones anchor your effort to your own physiology instead of a fixed pace. Training in the right
            zone helps you:
          </p>
          <ul>
            <li>Build endurance without overtraining</li>
            <li>Burn fat efficiently at sustainable intensities</li>
            <li>Protect your heart from constantly “redlining” workouts</li>
            <li>Recover smarter between hard sessions</li>
          </ul>
          <p>
            With{" "}
            <Link href="/" className="blog-inline-cta">
              HeartRateTap
            </Link>
            , you can quickly check your heart rate before you start running and right after you finish—no watch, strap,
            or app install required.
          </p>
        </section>

        <section className="blog-section">
          <h2>Quick refresher: how HeartRateTap works</h2>
          <p>
            Instead of reading from a wearable, HeartRateTap uses your taps to measure your pulse rhythm. Each time you
            feel a heartbeat at your wrist or neck, you tap or hit the spacebar. The tool processes the timing between
            taps and converts it into a live BPM reading.
          </p>
          <ol>
            <li>Find your pulse at your wrist or neck.</li>
            <li>Tap along with each beat using your keyboard or screen.</li>
            <li>Watch your BPM update in real time while you tap.</li>
            <li>Click “Stop” to lock your result and see coaching for rest or workout ranges.</li>
          </ol>
          <p>
            It’s ideal for those moments before and after a workout where you simply want to confirm:{" "}
            <em>am I in the right zone for today’s goal?</em>
          </p>
          <p>
            👉{" "}
            <Link href="/" className="blog-inline-cta">
              Try HeartRateTap now
            </Link>{" "}
            and get a live BPM reading in seconds.
          </p>
        </section>

        <section className="blog-section">
          <h2>Understanding running heart rate zones</h2>
          <p>
            Many runners estimate their maximum heart rate (HRmax) with simple formulas such as{" "}
            <strong>220 − age</strong> or more refined versions. Zones are then expressed as a percentage of that HRmax.
            While not perfect, these ranges are a practical starting point:
          </p>
          <div className="blog-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>% of HRmax</th>
                  <th>How it feels</th>
                  <th>Best used for</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map((zone) => (
                  <tr key={zone.name}>
                    <td>{zone.name}</td>
                    <td>{zone.percent}</td>
                    <td>{zone.feeling}</td>
                    <td>{zone.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="blog-note">
            💡 These are general guidelines. If you have heart conditions, are on medication, or are new to exercise,
            always check with a healthcare professional or coach before relying heavily on specific HR zones.
          </p>
        </section>

        <section className="blog-section">
          <h2>How to use HeartRateTap before and after a run</h2>
          <h3>Before your run: set the right intensity</h3>
          <ul>
            <li>
              <strong>Step 1:</strong> Sit or stand calmly and use HeartRateTap in rest mode to check your starting
              heart rate.
            </li>
            <li>
              <strong>Step 2:</strong> If your resting BPM is unusually high (for example, well above your normal
              morning value), consider scaling the session back or turning it into an easy recovery day.
            </li>
          </ul>
          <h3>Right after your run: confirm the training zone</h3>
          <ul>
            <li>
              <strong>Step 1:</strong> Within 30–60 seconds of stopping, use HeartRateTap in “Active” mode and tap along
              with your pulse.
            </li>
            <li>
              <strong>Step 2:</strong> Lock the result and compare the BPM with the zone ranges in the table above.
            </li>
            <li>
              <strong>Step 3:</strong> Ask: did this session match my intention (easy, tempo, intervals), or drift into a
              different zone?
            </li>
          </ul>
          <p>
            Over time, pairing your perceived effort with an actual number will sharpen your internal “pace feel” and
            make your training more intentional.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Try HeartRateTap before your next workout</h2>
          <p>
            The next time you head out for a run, take 20–30 seconds before and after to check your heart rate with
            HeartRateTap. You’ll quickly see whether you are truly training in the right zone—or if your body is asking
            for more recovery.
          </p>
          <Link href="/" className="pill active">
            Try HeartRateTap now
          </Link>
          <p className="blog-cta-note">
            No app. No wearables. Just your pulse, your browser, and clearer insight into every session.
          </p>
        </section>

        <BlogKnowledgeHub />
      </article>
    </div>
  );
};

export default RunningZonesPage;


