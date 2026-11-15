"use client";

import { useMemo, useState } from "react";

const MIN_BPM = 30;
const MAX_BPM = 240;
const MIN_AGE = 0;
const MAX_AGE = 120;
const ADULT_AGE = 18;
const ADULT_LOW = 60;
const ADULT_HIGH = 100;

type AdultPlacement = "below" | "inside" | "above";

type Comparison = {
  bpm: number;
  age: number;
  adultApplied: boolean;
  placement: AdultPlacement | "withheld";
  headline: string;
  arithmetic: string;
  landmark: string;
};

function parseWholeNumber(value: string): number | null {
  if (!/^\d+$/.test(value.trim())) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function adultArithmetic(bpm: number): { placement: AdultPlacement; arithmetic: string } {
  if (bpm < ADULT_LOW) {
    return {
      placement: "below",
      arithmetic: `${bpm} is ${ADULT_LOW - bpm} BPM below ${ADULT_LOW}, outside the lower edge of the cited adult reference.`
    };
  }

  if (bpm > ADULT_HIGH) {
    return {
      placement: "above",
      arithmetic: `${bpm} is ${bpm - ADULT_HIGH} BPM above ${ADULT_HIGH}, outside the upper edge of the cited adult reference.`
    };
  }

  const aboveLow = bpm - ADULT_LOW;
  const belowHigh = ADULT_HIGH - bpm;

  if (bpm === ADULT_LOW) {
    return {
      placement: "inside",
      arithmetic: `${bpm} sits on the lower edge of the cited ${ADULT_LOW}–${ADULT_HIGH} BPM adult reference, ${belowHigh} BPM below ${ADULT_HIGH}.`
    };
  }

  if (bpm === ADULT_HIGH) {
    return {
      placement: "inside",
      arithmetic: `${bpm} sits on the upper edge of the cited ${ADULT_LOW}–${ADULT_HIGH} BPM adult reference, ${aboveLow} BPM above ${ADULT_LOW}.`
    };
  }

  return {
    placement: "inside",
    arithmetic: `${bpm} is inside ${ADULT_LOW}–${ADULT_HIGH}: ${aboveLow} BPM above ${ADULT_LOW} and ${belowHigh} BPM below ${ADULT_HIGH}.`
  };
}

function landmarkForAge(age: number): string {
  if (age < 1) {
    return "Cited survey mean under age 1: 129 BPM (standard error 0.9). That figure is a group mean from a seated protocol, not a personal target.";
  }

  if (age < 10) {
    return "Cited survey mean by age 5: 96 BPM (standard error 0.5), after a rapid decline from infancy. This page does not assign a separate band to each childhood year.";
  }

  if (age < ADULT_AGE) {
    return "The cited survey describes a further decline to 78 BPM (standard error 0.3) in early adolescence, after childhood rates had already fallen. That is not a personal mean for the exact year entered. The adult 60–100 reference is not applied before age 18.";
  }

  return "Cited survey mean in adulthood: a plateau at 72 BPM (standard error 0.2). A mean is not a target, and this page does not create a new band at 30, 40, 50, or 60.";
}

export function compareRestingHeartRate(bpm: number, age: number): Comparison | null {
  if (bpm < MIN_BPM || bpm > MAX_BPM || age < MIN_AGE || age > MAX_AGE) {
    return null;
  }

  const landmark = landmarkForAge(age);

  if (age < ADULT_AGE) {
    return {
      bpm,
      age,
      adultApplied: false,
      placement: "withheld",
      headline: "Adult reference not applied",
      arithmetic: `Age ${age} is under ${ADULT_AGE}, so the ${ADULT_LOW}–${ADULT_HIGH} BPM adult span is withheld. No personal range is calculated.`,
      landmark
    };
  }

  const adult = adultArithmetic(bpm);
  const headline =
    adult.placement === "below"
      ? "Below the cited adult reference"
      : adult.placement === "above"
        ? "Above the cited adult reference"
        : "Inside the cited adult reference";

  return {
    bpm,
    age,
    adultApplied: true,
    placement: adult.placement,
    headline,
    arithmetic: adult.arithmetic,
    landmark
  };
}

export default function RestingHeartRateCalculator() {
  const [bpmInput, setBpmInput] = useState("72");
  const [ageInput, setAgeInput] = useState("35");

  const result = useMemo(() => {
    const bpm = parseWholeNumber(bpmInput);
    const age = parseWholeNumber(ageInput);

    if (bpm === null || age === null) {
      return { error: "Enter whole numbers only. Heart rate uses beats per minute, and age uses completed years." as const };
    }

    const comparison = compareRestingHeartRate(bpm, age);

    if (!comparison) {
      return {
        error: `Enter a heart rate from ${MIN_BPM} to ${MAX_BPM} BPM and an age from ${MIN_AGE} to ${MAX_AGE}. Use 0 only for an infant under 1 year.` as const
      };
    }

    return { comparison };
  }, [ageInput, bpmInput]);

  const comparison = "comparison" in result ? result.comparison : null;

  return (
    <section className="calculator-card" aria-labelledby="resting-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Reference comparison</p>
        <h2 id="resting-calculator-title">Resting heart rate calculator</h2>
        <p>Replace the example with your own calm count. The result is a comparison, not a diagnosis.</p>
      </div>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="resting-bpm">
          <span>Resting heart rate</span>
          <div className="calculator-input-suffix">
            <input
              id="resting-bpm"
              name="resting-bpm"
              type="number"
              inputMode="numeric"
              min={MIN_BPM}
              max={MAX_BPM}
              step={1}
              value={bpmInput}
              onChange={(event) => setBpmInput(event.target.value)}
            />
            <span>BPM</span>
          </div>
          <small>Whole number from a seated or lying count</small>
        </label>

        <label className="calculator-field" htmlFor="resting-age">
          <span>Age</span>
          <div className="calculator-input-suffix">
            <input
              id="resting-age"
              name="resting-age"
              type="number"
              inputMode="numeric"
              min={MIN_AGE}
              max={MAX_AGE}
              step={1}
              value={ageInput}
              onChange={(event) => setAgeInput(event.target.value)}
            />
            <span>years</span>
          </div>
          <small>Use 0 for an infant under 1 year</small>
        </label>
      </div>

      <div className="calculator-result" aria-live="polite">
        {comparison ? (
          <>
            <p className="calculator-result-label">{comparison.headline}</p>
            <p className="calculator-result-number">
              {comparison.bpm} <span>BPM at age {comparison.age}</span>
            </p>
            <div className="calculator-result-details">
              <span>{comparison.arithmetic}</span>
              <span>{comparison.landmark}</span>
            </div>
          </>
        ) : (
          <p className="calculator-error">{"error" in result ? result.error : "Enter a resting heart rate and age."}</p>
        )}
      </div>

      <p className="calculator-disclaimer">
        The calculator does not diagnose bradycardia, tachycardia, an arrhythmia, or fitness. Medication, illness,
        temperature, emotions, pain, caffeine, and recent activity can change a resting rate. A clinician&apos;s personal
        range takes priority over this public reference.
      </p>
    </section>
  );
}
