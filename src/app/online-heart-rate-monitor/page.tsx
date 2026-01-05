import React from 'react';

export const metadata = {
  title: 'Online Heart Rate Monitor — Real-time & Free Tool | HeartrateTap',
  description:
    "Use HeartrateTap's reliable online heart rate monitor for fast, simple measurements. Click to get real-time BPM, measurement guidance, and common error tips — ideal for quick checks and daily monitoring.",
};

export default function OnlineHeartRateMonitorPage() {
  return (
    <main>
      <header>
        <h1>Online Heart Rate Monitor — Real-time & Free Tool</h1>
        <p>
          HeartrateTap offers a simple and reliable online heart rate monitor to help
          you quickly obtain real-time BPM and view measurement guidance and notes.
        </p>
      </header>

      <section>
        <h2>Key features</h2>
        <ul>
          <li>Real-time BPM display with fast, easy operation.</li>
          <li>Mobile-optimized for quick, stable sampling.</li>
          <li>Measurement guidance and common error tips to improve accuracy.</li>
        </ul>
      </section>

      <section>
        <h2>When to use</h2>
        <ul>
          <li>Daily health self-checks and logging</li>
          <li>Post-exercise recovery checks</li>
          <li>Quick temporary measurements when needed</li>
        </ul>
      </section>

      <section>
        <h2>Measurement notes</h2>
        <ul>
          <li>Remain still during sampling and avoid excessive movement.</li>
          <li>If using the camera, ensure adequate lighting and avoid glare.</li>
          <li>For medical diagnosis, use medical-grade equipment or consult a doctor.</li>
        </ul>
      </section>

      <footer>
        <p>© HeartrateTap</p>
      </footer>
    </main>
  );
}


