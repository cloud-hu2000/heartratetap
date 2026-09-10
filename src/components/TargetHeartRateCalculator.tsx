"use client";

import { useMemo, useState } from "react";

type CalculationMethod = "percent-max" | "heart-rate-reserve";

export default function TargetHeartRateCalculator() {
  const [age, setAge] = useState(40);
  const [restingHeartRate, setRestingHeartRate] = useState(60);
  const [lowerPercent, setLowerPercent] = useState(50);
  const [upperPercent, setUpperPercent] = useState(85);
  const [method, setMethod] = useState<CalculationMethod>("percent-max");

  const result = useMemo(() => {
    const estimatedMaximum = 220 - age;
    const restingRateIsValid = method !== "heart-rate-reserve" || (restingHeartRate >= 30 && restingHeartRate <= 120);
    const valid =
      age >= 18 &&
      age <= 100 &&
      restingRateIsValid &&
      lowerPercent >= 40 &&
      lowerPercent <= 90 &&
      upperPercent >= 45 &&
      upperPercent <= 95 &&
      lowerPercent < upperPercent;

    if (!valid) {
      return null;
    }

    const calculateTarget = (percentage: number) => {
      if (method === "heart-rate-reserve") {
        return restingHeartRate + (estimatedMaximum - restingHeartRate) * (percentage / 100);
      }

      return estimatedMaximum * (percentage / 100);
    };

    const midpointPercent = (lowerPercent + upperPercent) / 2;

    return {
      estimatedMaximum,
      lower: Math.round(calculateTarget(lowerPercent)),
      midpoint: Math.round(calculateTarget(midpointPercent)),
      midpointPercent,
      upper: Math.round(calculateTarget(upperPercent))
    };
  }, [age, lowerPercent, method, restingHeartRate, upperPercent]);

  return (
    <section className="calculator-card" aria-labelledby="target-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Interactive estimate</p>
        <h2 id="target-calculator-title">Calculate a target heart rate range</h2>
        <p>Choose a method, enter your inputs and keep the formula attached to the result.</p>
      </div>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="target-age">
          <span>Age</span>
          <input
            id="target-age"
            type="number"
            inputMode="numeric"
            min="18"
            max="100"
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
          />
          <small>18–100 years</small>
        </label>

        <label className="calculator-field" htmlFor="target-resting-rate">
          <span>Resting heart rate</span>
          <input
            id="target-resting-rate"
            type="number"
            inputMode="numeric"
            min="30"
            max="120"
            value={restingHeartRate}
            onChange={(event) => setRestingHeartRate(Number(event.target.value))}
            disabled={method !== "heart-rate-reserve"}
          />
          <small>{method === "heart-rate-reserve" ? "Required for heart rate reserve" : "Used only by the reserve method"}</small>
        </label>
      </div>

      <fieldset className="calculator-methods">
        <legend>Calculation method</legend>
        <label>
          <input
            type="radio"
            name="target-method"
            value="percent-max"
            checked={method === "percent-max"}
            onChange={() => setMethod("percent-max")}
          />
          <span>
            <strong>Percent of estimated maximum</strong>
            <small>Uses (220 − age) × intensity</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="target-method"
            value="heart-rate-reserve"
            checked={method === "heart-rate-reserve"}
            onChange={() => setMethod("heart-rate-reserve")}
          />
          <span>
            <strong>Heart rate reserve</strong>
            <small>Adds resting heart rate back after applying intensity</small>
          </span>
        </label>
      </fieldset>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="target-lower-percent">
          <span>Lower intensity</span>
          <div className="calculator-input-suffix">
            <input
              id="target-lower-percent"
              type="number"
              inputMode="numeric"
              min="40"
              max="90"
              value={lowerPercent}
              onChange={(event) => setLowerPercent(Number(event.target.value))}
            />
            <span>%</span>
          </div>
        </label>
        <label className="calculator-field" htmlFor="target-upper-percent">
          <span>Upper intensity</span>
          <div className="calculator-input-suffix">
            <input
              id="target-upper-percent"
              type="number"
              inputMode="numeric"
              min="45"
              max="95"
              value={upperPercent}
              onChange={(event) => setUpperPercent(Number(event.target.value))}
            />
            <span>%</span>
          </div>
        </label>
      </div>

      <div className="calculator-result" aria-live="polite">
        {result ? (
          <>
            <p className="calculator-result-label">Estimated target range</p>
            <p className="calculator-result-number">
              {result.lower}–{result.upper} <span>BPM</span>
            </p>
            <div className="calculator-result-details">
              <span>Estimated maximum: {result.estimatedMaximum} BPM</span>
              <span>{result.midpointPercent}% midpoint: {result.midpoint} BPM</span>
            </div>
            <p className="calculator-formula">
              {method === "heart-rate-reserve"
                ? `Target = ${restingHeartRate} + intensity × (${result.estimatedMaximum} − ${restingHeartRate})`
                : `Target = ${result.estimatedMaximum} × intensity`}
            </p>
          </>
        ) : (
          <p className="calculator-error">
            Enter an age from 18–100, a resting rate from 30–120, and make the upper percentage greater than the lower percentage.
          </p>
        )}
      </div>

      <p className="calculator-disclaimer">
        This is a population-based exercise estimate, not a measured maximum, exercise clearance or medical prescription.
        Medication, health conditions and fitness can change an appropriate target.
      </p>
    </section>
  );
}
