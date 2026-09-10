"use client";

import { useMemo, useState } from "react";
const INTERVAL_COUNT = 9;
function bpmFromInterval(intervalMs: number) {
  return 60000 / intervalMs;
}
function formatBpm(value: number) {
  return `${value.toFixed(1)} LPM`;
}
export default function TapIntervalExplorer() {
  const [intervalMs, setIntervalMs] = useState(800);
  const [lateTapMs, setLateTapMs] = useState(80);
  const results = useMemo(() => {
    const baseline = bpmFromInterval(intervalMs);
    const lateTapAverage = intervalMs + lateTapMs / INTERVAL_COUNT;
    const missedBeatAverage = intervalMs * (INTERVAL_COUNT + 1) / INTERVAL_COUNT;
    return {
      baseline,
      lateTap: bpmFromInterval(lateTapAverage),
      missedBeat: bpmFromInterval(missedBeatAverage)
    };
  }, [intervalMs, lateTapMs]);
  return <div className="tap-explorer" aria-labelledby="tap-explorer-title">
      <div className="tap-explorer-heading">
        <div>
          <p className="guide-label">Aritmética interactiva</p>
          <h3 id="tap-explorer-title">Explora cómo un cambio de tiempo afecta a una estimación de 10 toques</h3>
        </div>
        <p className="tap-explorer-formula">60.000 ÷ intervalo medio</p>
      </div>

      <div className="tap-explorer-controls">
        <label>
          <span>
            Intervalos típicos
            <output htmlFor="interval-control">{intervalMs} ms</output>
          </span>
          <input id="interval-control" type="range" min="400" max="1500" step="10" value={intervalMs} onChange={event => setIntervalMs(Number(event.target.value))} />
          <small>400 ms es 150 LPM; 1.500 ms es 40 LPM.</small>
        </label>

        <label>
          <span>
            Un toque tarde
            <output htmlFor="late-tap-control">+{lateTapMs} ms</output>
          </span>
          <input id="late-tap-control" type="range" min="10" max="300" step="10" value={lateTapMs} onChange={event => setLateTapMs(Number(event.target.value))} />
          <small>El retraso se extiende a través de los nueve intervalos realizados por diez toques.</small>
        </label>
      </div>

      <div className="tap-explorer-results" aria-live="polite">
        <article>
          <span>Los nueve intervalos son constantes</span>
          <strong>{formatBpm(results.baseline)}</strong>
          <small>Cálculo de referencia</small>
        </article>
        <article>
          <span>Un toque {lateTapMs} ms tarde</span>
          <strong>{formatBpm(results.lateTap)}</strong>
          <small>{(results.lateTap - results.baseline).toFixed(1)} LPM diferencia</small>
        </article>
        <article>
          <span>Un latido omitido</span>
          <strong>{formatBpm(results.missedBeat)}</strong>
          <small>{(results.missedBeat - results.baseline).toFixed(1)} LPM diferencia</small>
        </article>
      </div>

      <p className="tap-explorer-note">
        Este modelo mantiene ocho intervalos estables y cambia uno. Muestra el aritmético solamente. Un pulso real puede cambiar durante la muestra, y este navegador no puede decir si un toque coincide con un latido cardíaco.
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
    </div>;
}
