"use client";

import { useMemo, useState } from "react";

const INTERVAL_COUNT = 9;

function bpmFromInterval(intervalMs: number) {
  return 60000 / intervalMs;
}

function formatBpm(value: number) {
  return `${value.toFixed(1)} BPM`;
}

export default function TapIntervalExplorer() {
  const [intervalMs, setIntervalMs] = useState(800);
  const [lateTapMs, setLateTapMs] = useState(80);

  const results = useMemo(() => {
    const baseline = bpmFromInterval(intervalMs);
    const lateTapAverage = intervalMs + lateTapMs / INTERVAL_COUNT;
    const missedBeatAverage = (intervalMs * (INTERVAL_COUNT + 1)) / INTERVAL_COUNT;

    return {
      baseline,
      lateTap: bpmFromInterval(lateTapAverage),
      missedBeat: bpmFromInterval(missedBeatAverage)
    };
  }, [intervalMs, lateTapMs]);

  return (
    <div className="tap-explorer" aria-labelledby="tap-explorer-title">
      <div className="tap-explorer-heading">
        <div>
          <p className="guide-label">Interactive arithmetic</p>
          <h3 id="tap-explorer-title">Explore how one timing change affects a 10-tap estimate</h3>
        </div>
        <p className="tap-explorer-formula">60,000 ÷ average interval</p>
      </div>

      <div className="tap-explorer-controls">
        <label>
          <span>
            Typical interval
            <output htmlFor="interval-control">{intervalMs} ms</output>
          </span>
          <input
            id="interval-control"
            type="range"
            min="400"
            max="1500"
            step="10"
            value={intervalMs}
            onChange={(event) => setIntervalMs(Number(event.target.value))}
          />
          <small>400 ms is 150 BPM; 1,500 ms is 40 BPM.</small>
        </label>

        <label>
          <span>
            One late tap
            <output htmlFor="late-tap-control">+{lateTapMs} ms</output>
          </span>
          <input
            id="late-tap-control"
            type="range"
            min="10"
            max="300"
            step="10"
            value={lateTapMs}
            onChange={(event) => setLateTapMs(Number(event.target.value))}
          />
          <small>The delay is spread across the nine intervals made by ten taps.</small>
        </label>
      </div>

      <div className="tap-explorer-results" aria-live="polite">
        <article>
          <span>All nine intervals steady</span>
          <strong>{formatBpm(results.baseline)}</strong>
          <small>Reference calculation</small>
        </article>
        <article>
          <span>One tap {lateTapMs} ms late</span>
          <strong>{formatBpm(results.lateTap)}</strong>
          <small>{(results.lateTap - results.baseline).toFixed(1)} BPM difference</small>
        </article>
        <article>
          <span>One beat missed</span>
          <strong>{formatBpm(results.missedBeat)}</strong>
          <small>{(results.missedBeat - results.baseline).toFixed(1)} BPM difference</small>
        </article>
      </div>

      <p className="tap-explorer-note">
        This model holds eight intervals steady and changes one. It demonstrates the arithmetic only. A real pulse may
        change during the sample, and this browser cannot tell whether a tap matched a heartbeat.
      </p>

      <style jsx>{`
        .tap-explorer {
          margin-top: 1.25rem;
          padding: clamp(1rem, 3vw, 1.5rem);
          border: 1px solid var(--line);
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(15, 140, 140, 0.08), rgba(255, 255, 255, 0.92));
        }
        .tap-explorer-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .tap-explorer-heading h3,
        .tap-explorer-heading p {
          margin-top: 0;
        }
        .tap-explorer-formula {
          flex: 0 0 auto;
          padding: 0.5rem 0.75rem;
          border-radius: 999px;
          background: var(--card);
          font-weight: 800;
          color: var(--accent-dark, #096b6b);
        }
        .tap-explorer-controls {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .tap-explorer-controls label {
          display: grid;
          gap: 0.6rem;
          padding: 1rem;
          border-radius: 14px;
          background: var(--card);
        }
        .tap-explorer-controls label > span {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-weight: 700;
        }
        output {
          color: var(--accent-dark, #096b6b);
          font-variant-numeric: tabular-nums;
        }
        input[type="range"] {
          width: 100%;
          accent-color: var(--accent);
        }
        small {
          color: var(--muted);
          line-height: 1.45;
        }
        .tap-explorer-results {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .tap-explorer-results article {
          display: grid;
          gap: 0.35rem;
          padding: 1rem;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--card);
        }
        .tap-explorer-results span {
          min-height: 2.8em;
          color: var(--muted);
        }
        .tap-explorer-results strong {
          font-size: clamp(1.35rem, 3vw, 1.8rem);
          font-variant-numeric: tabular-nums;
        }
        .tap-explorer-note {
          margin: 1rem 0 0;
          color: var(--muted);
          font-size: 0.95rem;
        }
        @media (max-width: 720px) {
          .tap-explorer-heading,
          .tap-explorer-controls,
          .tap-explorer-results {
            grid-template-columns: 1fr;
          }
          .tap-explorer-heading {
            display: grid;
          }
          .tap-explorer-formula {
            justify-self: start;
          }
          .tap-explorer-results span {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}
