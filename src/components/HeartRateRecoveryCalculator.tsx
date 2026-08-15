"use client";

import { useMemo, useState } from "react";

export default function HeartRateRecoveryCalculator() {
  const [exerciseEndRate, setExerciseEndRate] = useState(160);
  const [recoveryRate, setRecoveryRate] = useState(130);
  const [intervalSeconds, setIntervalSeconds] = useState(60);

  const result = useMemo(() => {
    const valid =
      exerciseEndRate >= 30 &&
      exerciseEndRate <= 240 &&
      recoveryRate >= 30 &&
      recoveryRate <= 240 &&
      (intervalSeconds === 60 || intervalSeconds === 120);

    if (!valid) {
      return null;
    }

    const drop = exerciseEndRate - recoveryRate;
    return {
      drop,
      percentage: Math.abs((drop / exerciseEndRate) * 100).toFixed(1)
    };
  }, [exerciseEndRate, intervalSeconds, recoveryRate]);

  return (
    <section className="calculator-card" aria-labelledby="recovery-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Difference calculator</p>
        <h2 id="recovery-calculator-title">Calculate heart rate recovery</h2>
        <p>Enter two readings from the same recovery protocol. The result is the arithmetic change between them.</p>
      </div>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="exercise-end-rate">
          <span>Heart rate at exercise end</span>
          <div className="calculator-input-suffix">
            <input
              id="exercise-end-rate"
              type="number"
              inputMode="numeric"
              min="30"
              max="240"
              value={exerciseEndRate}
              onChange={(event) => setExerciseEndRate(Number(event.target.value))}
            />
            <span>BPM</span>
          </div>
        </label>

        <label className="calculator-field" htmlFor="recovery-rate">
          <span>Heart rate after recovery</span>
          <div className="calculator-input-suffix">
            <input
              id="recovery-rate"
              type="number"
              inputMode="numeric"
              min="30"
              max="240"
              value={recoveryRate}
              onChange={(event) => setRecoveryRate(Number(event.target.value))}
            />
            <span>BPM</span>
          </div>
        </label>
      </div>

      <fieldset className="calculator-methods calculator-methods-compact">
        <legend>Recovery interval</legend>
        <label>
          <input
            type="radio"
            name="recovery-interval"
            value="60"
            checked={intervalSeconds === 60}
            onChange={() => setIntervalSeconds(60)}
          />
          <span>
            <strong>1 minute</strong>
            <small>HRR60</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="recovery-interval"
            value="120"
            checked={intervalSeconds === 120}
            onChange={() => setIntervalSeconds(120)}
          />
          <span>
            <strong>2 minutes</strong>
            <small>HRR120</small>
          </span>
        </label>
      </fieldset>

      <div className="calculator-result" aria-live="polite">
        {result ? (
          <>
            <p className="calculator-result-label">Heart rate change after {intervalSeconds / 60} minute{intervalSeconds === 120 ? "s" : ""}</p>
            <p className="calculator-result-number">
              {result.drop >= 0 ? result.drop : Math.abs(result.drop)} <span>BPM {result.drop >= 0 ? "drop" : "rise"}</span>
            </p>
            <div className="calculator-result-details">
              <span>{result.percentage}% of the exercise-end reading</span>
              <span>{exerciseEndRate} − {recoveryRate} = {result.drop} BPM</span>
            </div>
          </>
        ) : (
          <p className="calculator-error">Enter both readings between 30 and 240 BPM.</p>
        )}
      </div>

      <p className="calculator-disclaimer">
        The calculator does not grade the result. Exercise type, peak effort, active or passive recovery, medication,
        measurement equipment and exact timing all affect interpretation.
      </p>
    </section>
  );
}
