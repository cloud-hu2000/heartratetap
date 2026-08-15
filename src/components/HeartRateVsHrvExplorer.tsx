"use client";

import { useMemo, useState } from "react";

const INTERVAL_COUNT = 6;

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatIntervals(values: number[]) {
  return values.map((value, index) => (
    <li key={`${index}-${value}`} aria-label={`Interval ${index + 1}: ${value} milliseconds`}>
      {value} ms
    </li>
  ));
}

export default function HeartRateVsHrvExplorer() {
  const [intervalMs, setIntervalMs] = useState(1000);
  const [variationMs, setVariationMs] = useState(160);

  const result = useMemo(() => {
    const steady = Array.from({ length: INTERVAL_COUNT }, () => intervalMs);
    const alternating = Array.from(
      { length: INTERVAL_COUNT },
      (_, index) => intervalMs + (index % 2 === 0 ? -variationMs : variationMs)
    );
    const steadyAverage = average(steady);
    const alternatingAverage = average(alternating);

    return {
      steady,
      alternating,
      steadyAverage,
      alternatingAverage,
      steadyBpm: 60000 / steadyAverage,
      alternatingBpm: 60000 / alternatingAverage,
      alternatingRange: Math.max(...alternating) - Math.min(...alternating)
    };
  }, [intervalMs, variationMs]);

  return (
    <div className="hr-hrv-explorer" aria-labelledby="hr-hrv-explorer-title">
      <div className="hr-hrv-explorer__heading">
        <div>
          <p className="guide-label">Interactive interval demonstration</p>
          <h3 id="hr-hrv-explorer-title">Keep average BPM fixed while interval spacing changes</h3>
        </div>
        <p className="hr-hrv-explorer__formula">BPM = 60,000 ÷ mean interval</p>
      </div>

      <div className="hr-hrv-explorer__controls">
        <label>
          <span>
            Mean interval
            <output htmlFor="mean-interval-control">{intervalMs} ms</output>
          </span>
          <input
            id="mean-interval-control"
            type="range"
            min="700"
            max="1300"
            step="10"
            value={intervalMs}
            onChange={(event) => setIntervalMs(Number(event.target.value))}
          />
          <small>Changes the average rate for both patterns.</small>
        </label>

        <label>
          <span>
            Alternating change
            <output htmlFor="variation-control">±{variationMs} ms</output>
          </span>
          <input
            id="variation-control"
            type="range"
            min="0"
            max="250"
            step="10"
            value={variationMs}
            onChange={(event) => setVariationMs(Number(event.target.value))}
          />
          <small>Moves alternating intervals shorter and longer by equal amounts.</small>
        </label>
      </div>

      <div className="hr-hrv-explorer__patterns" aria-live="polite">
        <article>
          <p className="guide-label">Pattern A</p>
          <h4>Even spacing</h4>
          <ul aria-label="Even interval pattern">{formatIntervals(result.steady)}</ul>
          <dl>
            <div><dt>Mean interval</dt><dd>{result.steadyAverage.toFixed(0)} ms</dd></div>
            <div><dt>Average rate</dt><dd>{result.steadyBpm.toFixed(1)} BPM</dd></div>
            <div><dt>Interval range</dt><dd>0 ms</dd></div>
          </dl>
        </article>

        <article>
          <p className="guide-label">Pattern B</p>
          <h4>Alternating spacing</h4>
          <ul aria-label="Alternating interval pattern">{formatIntervals(result.alternating)}</ul>
          <dl>
            <div><dt>Mean interval</dt><dd>{result.alternatingAverage.toFixed(0)} ms</dd></div>
            <div><dt>Average rate</dt><dd>{result.alternatingBpm.toFixed(1)} BPM</dd></div>
            <div><dt>Interval range</dt><dd>{result.alternatingRange} ms</dd></div>
          </dl>
        </article>
      </div>

      <p className="hr-hrv-explorer__note">
        Both patterns have the same mean interval and therefore the same average BPM. Their spacing is visibly
        different. The range shown here is a simple arithmetic description, not an HRV metric, rhythm analysis or
        medical measurement.
      </p>

      <style jsx>{`
        .hr-hrv-explorer {
          margin-top: 1.25rem;
          padding: clamp(1rem, 3vw, 1.5rem);
          border: 1px solid var(--line);
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(15, 140, 140, 0.08), rgba(255, 255, 255, 0.94));
        }
        .hr-hrv-explorer__heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .hr-hrv-explorer__heading h3,
        .hr-hrv-explorer__heading p,
        .hr-hrv-explorer__patterns h4,
        .hr-hrv-explorer__patterns p {
          margin-top: 0;
        }
        .hr-hrv-explorer__formula {
          flex: 0 0 auto;
          padding: 0.5rem 0.75rem;
          border-radius: 999px;
          background: var(--card);
          color: var(--accent-dark, #096b6b);
          font-weight: 800;
        }
        .hr-hrv-explorer__controls,
        .hr-hrv-explorer__patterns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .hr-hrv-explorer__controls label,
        .hr-hrv-explorer__patterns article {
          padding: 1rem;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--card);
        }
        .hr-hrv-explorer__controls label {
          display: grid;
          gap: 0.6rem;
        }
        .hr-hrv-explorer__controls label > span {
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
        small,
        .hr-hrv-explorer__note {
          color: var(--muted);
          line-height: 1.5;
        }
        .hr-hrv-explorer__patterns {
          margin-top: 1rem;
        }
        .hr-hrv-explorer__patterns h4 {
          font-size: 1.15rem;
        }
        .hr-hrv-explorer__patterns ul {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0;
          list-style: none;
        }
        .hr-hrv-explorer__patterns li {
          padding: 0.35rem 0.55rem;
          border-radius: 999px;
          background: rgba(15, 140, 140, 0.09);
          font-variant-numeric: tabular-nums;
        }
        .hr-hrv-explorer__patterns dl {
          display: grid;
          gap: 0.5rem;
          margin-bottom: 0;
        }
        .hr-hrv-explorer__patterns dl div {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        .hr-hrv-explorer__patterns dt {
          color: var(--muted);
        }
        .hr-hrv-explorer__patterns dd {
          margin: 0;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
        }
        .hr-hrv-explorer__note {
          margin: 1rem 0 0;
          font-size: 0.95rem;
        }
        @media (max-width: 720px) {
          .hr-hrv-explorer__heading,
          .hr-hrv-explorer__controls,
          .hr-hrv-explorer__patterns {
            grid-template-columns: 1fr;
          }
          .hr-hrv-explorer__heading {
            display: grid;
          }
          .hr-hrv-explorer__formula {
            justify-self: start;
          }
        }
      `}</style>
    </div>
  );
}
