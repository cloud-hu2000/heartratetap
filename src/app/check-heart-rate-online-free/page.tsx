import React from 'react';

export const metadata = {
  title: 'Free Online Heart Rate Check — HeartrateTap Instant Measure',
  description:
    'Use HeartrateTap to check your heart rate online for free. Fast response, mobile and desktop friendly. No device needed — click to view your BPM and get interpretation and measurement tips. Try it now for free.',
};

export default function CheckHeartRatePage() {
  return (
    <main>
      <header>
        <h1>Free Online Heart Rate Check — HeartrateTap Instant Measure</h1>
        <p>
          Use HeartrateTap to check your heart rate (BPM) online for free. No extra
          devices or downloads required — mobile and desktop supported.
        </p>
      </header>

      <section>
        <h2>How to start</h2>
        <ol>
          <li>Click the "Start check" button and follow the on-screen instructions.</li>
          <li>Remain still and allow the tool a few seconds to sample for a stable reading.</li>
          <li>Review the displayed BPM and guidance; repeat the measurement if needed.</li>
        </ol>
      </section>

      <section>
        <h2>Results interpretation & tips</h2>
        <p>
          The measured BPM is an instant reading. Normal resting adult heart rate is
          roughly 60–100 BPM. If readings remain abnormal over time, consult a
          healthcare professional.
        </p>
        <ul>
          <li>Rest for 1–2 minutes before measurement; avoid intense exercise or strong emotions.</li>
          <li>Repeat and record measurements if you observe anomalies for comparison.</li>
          <li>This tool is for reference and does not replace professional medical advice.</li>
        </ul>
      </section>

      <section>
        <h2>FAQ</h2>
        <h3>Do I need to pay or register?</h3>
        <p>No — basic checks are free and require no registration.</p>
        <h3>Are results always accurate?</h3>
        <p>
          For better accuracy, keep the device stable and ensure adequate lighting if using
          camera-based detection. For definitive diagnosis, use medical-grade equipment.
        </p>
      </section>

      <footer>
        <p>© HeartrateTap</p>
      </footer>
    </main>
  );
}


