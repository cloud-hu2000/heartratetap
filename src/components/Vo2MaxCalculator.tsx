"use client";

import { useMemo, useState } from "react";
import {
  COOPER_12_MAX_METERS,
  COOPER_12_MIN_METERS,
  MILE_15_MAX_SECONDS,
  MILE_15_MIN_SECONDS,
  ROCKPORT_MAX_AGE,
  ROCKPORT_MAX_HR,
  ROCKPORT_MAX_POUNDS,
  ROCKPORT_MAX_SECONDS,
  ROCKPORT_MIN_AGE,
  ROCKPORT_MIN_HR,
  ROCKPORT_MIN_POUNDS,
  ROCKPORT_MIN_SECONDS,
  estimateCooper12Minute,
  estimateCooper15Mile,
  estimateRockportWalk,
  type SexTerm,
  type Vo2Estimate,
  type Vo2Method
} from "@/components/vo2-max";

function parseWholeNumber(value: string): number | null {
  if (!/^\d+$/.test(value.trim())) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function parsePounds(value: string): number | null {
  if (!/^\d+(\.\d)?$/.test(value.trim())) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function combineTime(minutesInput: string, secondsInput: string): number | null {
  const minutes = parseWholeNumber(minutesInput);
  const seconds = parseWholeNumber(secondsInput);

  if (minutes === null || seconds === null || seconds > 59) {
    return null;
  }

  return minutes * 60 + seconds;
}

export default function Vo2MaxCalculator() {
  const [method, setMethod] = useState<Vo2Method>("cooper-12");
  const [distanceInput, setDistanceInput] = useState("2550");
  const [runMinutesInput, setRunMinutesInput] = useState("11");
  const [runSecondsInput, setRunSecondsInput] = useState("40");
  const [sex, setSex] = useState<SexTerm>("male");
  const [ageInput, setAgeInput] = useState("33");
  const [weightInput, setWeightInput] = useState("160");
  const [walkMinutesInput, setWalkMinutesInput] = useState("11");
  const [walkSecondsInput, setWalkSecondsInput] = useState("20");
  const [heartRateInput, setHeartRateInput] = useState("160");

  const result = useMemo((): { estimate: Vo2Estimate } | { error: string } => {
    if (method === "cooper-12") {
      const distance = parseWholeNumber(distanceInput);

      if (distance === null) {
        return { error: "Enter the 12-minute distance as a whole number of meters." };
      }

      const estimate = estimateCooper12Minute(distance);

      if (!estimate) {
        return {
          error: `Enter a 12-minute distance from ${COOPER_12_MIN_METERS} to ${COOPER_12_MAX_METERS} meters. The cited line is not used below that entry check.`
        };
      }

      return { estimate };
    }

    if (method === "mile-15") {
      const totalSeconds = combineTime(runMinutesInput, runSecondsInput);

      if (totalSeconds === null) {
        return { error: "Enter the 1.5-mile finish as whole minutes and 0–59 seconds." };
      }

      const estimate = estimateCooper15Mile(totalSeconds);

      if (!estimate) {
        return {
          error: `Enter a 1.5-mile time from ${MILE_15_MIN_SECONDS / 60}:00 through ${MILE_15_MAX_SECONDS / 60}:00.`
        };
      }

      return { estimate };
    }

    const age = parseWholeNumber(ageInput);
    const weightPounds = parsePounds(weightInput);
    const totalSeconds = combineTime(walkMinutesInput, walkSecondsInput);
    const heartRate = parseWholeNumber(heartRateInput);

    if (age === null || weightPounds === null || totalSeconds === null || heartRate === null) {
      return {
        error: "Enter age and heart rate as whole numbers, weight in pounds to at most one decimal, and a walk time with 0–59 seconds."
      };
    }

    const estimate = estimateRockportWalk({ sex, age, weightPounds, totalSeconds, heartRate });

    if (!estimate) {
      return {
        error: `Use age ${ROCKPORT_MIN_AGE}–${ROCKPORT_MAX_AGE}, weight ${ROCKPORT_MIN_POUNDS}–${ROCKPORT_MAX_POUNDS} lb, a walk from ${ROCKPORT_MIN_SECONDS / 60}:00 through ${ROCKPORT_MAX_SECONDS / 60}:00, and a heart rate from ${ROCKPORT_MIN_HR} to ${ROCKPORT_MAX_HR}. A non-positive equation result is rejected.`
      };
    }

    return { estimate };
  }, [
    ageInput,
    distanceInput,
    heartRateInput,
    method,
    runMinutesInput,
    runSecondsInput,
    sex,
    walkMinutesInput,
    walkSecondsInput,
    weightInput
  ]);

  const estimate = "estimate" in result ? result.estimate : null;

  return (
    <section className="calculator-card" aria-labelledby="vo2-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Field-test equation</p>
        <h2 id="vo2-calculator-title">VO2 max calculator</h2>
        <p>Score a test you already finished.</p>
      </div>

      {method === "cooper-12" ? (
        <div className="calculator-form-grid">
          <label className="calculator-field" htmlFor="vo2-distance">
            <span>Distance covered</span>
            <div className="calculator-input-suffix">
              <input
                id="vo2-distance"
                name="vo2-distance"
                type="number"
                inputMode="numeric"
                min={COOPER_12_MIN_METERS}
                max={COOPER_12_MAX_METERS}
                step={1}
                value={distanceInput}
                onChange={(event) => setDistanceInput(event.target.value)}
              />
              <span>m</span>
            </div>
            <small>Whole meters in exactly 12 minutes</small>
          </label>
        </div>
      ) : null}

      {method === "mile-15" ? (
        <div className="calculator-form-grid">
          <label className="calculator-field" htmlFor="vo2-run-minutes">
            <span>Minutes</span>
            <input
              id="vo2-run-minutes"
              name="vo2-run-minutes"
              type="number"
              inputMode="numeric"
              min={6}
              max={30}
              step={1}
              value={runMinutesInput}
              onChange={(event) => setRunMinutesInput(event.target.value)}
            />
            <small>Whole minutes for 1.5 miles</small>
          </label>
          <label className="calculator-field" htmlFor="vo2-run-seconds">
            <span>Seconds</span>
            <input
              id="vo2-run-seconds"
              name="vo2-run-seconds"
              type="number"
              inputMode="numeric"
              min={0}
              max={59}
              step={1}
              value={runSecondsInput}
              onChange={(event) => setRunSecondsInput(event.target.value)}
            />
            <small>0–59 seconds</small>
          </label>
        </div>
      ) : null}

      {method === "rockport" ? (
        <>
          <fieldset className="calculator-methods calculator-methods-compact">
            <legend>Sex term in the 1987 equation</legend>
            <label>
              <input
                type="radio"
                name="vo2-sex"
                value="male"
                checked={sex === "male"}
                onChange={() => setSex("male")}
              />
              <span>
                <strong>Male</strong>
                <small>Coefficient 1</small>
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="vo2-sex"
                value="female"
                checked={sex === "female"}
                onChange={() => setSex("female")}
              />
              <span>
                <strong>Female</strong>
                <small>Coefficient 0</small>
              </span>
            </label>
          </fieldset>
          <div className="calculator-form-grid">
            <label className="calculator-field" htmlFor="vo2-age">
              <span>Age</span>
              <div className="calculator-input-suffix">
                <input
                  id="vo2-age"
                  name="vo2-age"
                  type="number"
                  inputMode="numeric"
                  min={ROCKPORT_MIN_AGE}
                  max={ROCKPORT_MAX_AGE}
                  step={1}
                  value={ageInput}
                  onChange={(event) => setAgeInput(event.target.value)}
                />
                <span>years</span>
              </div>
              <small>20–69 completed years</small>
            </label>
            <label className="calculator-field" htmlFor="vo2-weight">
              <span>Body weight</span>
              <div className="calculator-input-suffix">
                <input
                  id="vo2-weight"
                  name="vo2-weight"
                  type="number"
                  inputMode="decimal"
                  min={ROCKPORT_MIN_POUNDS}
                  max={ROCKPORT_MAX_POUNDS}
                  step={0.1}
                  value={weightInput}
                  onChange={(event) => setWeightInput(event.target.value)}
                />
                <span>lb</span>
              </div>
              <small>Pounds, as the equation requires</small>
            </label>
            <label className="calculator-field" htmlFor="vo2-walk-minutes">
              <span>Walk minutes</span>
              <input
                id="vo2-walk-minutes"
                name="vo2-walk-minutes"
                type="number"
                inputMode="numeric"
                min={8}
                max={30}
                step={1}
                value={walkMinutesInput}
                onChange={(event) => setWalkMinutesInput(event.target.value)}
              />
              <small>One mile, without jogging</small>
            </label>
            <label className="calculator-field" htmlFor="vo2-walk-seconds">
              <span>Walk seconds</span>
              <input
                id="vo2-walk-seconds"
                name="vo2-walk-seconds"
                type="number"
                inputMode="numeric"
                min={0}
                max={59}
                step={1}
                value={walkSecondsInput}
                onChange={(event) => setWalkSecondsInput(event.target.value)}
              />
              <small>0–59 seconds</small>
            </label>
            <label className="calculator-field" htmlFor="vo2-heart-rate">
              <span>Last-quarter heart rate</span>
              <div className="calculator-input-suffix">
                <input
                  id="vo2-heart-rate"
                  name="vo2-heart-rate"
                  type="number"
                  inputMode="numeric"
                  min={ROCKPORT_MIN_HR}
                  max={ROCKPORT_MAX_HR}
                  step={1}
                  value={heartRateInput}
                  onChange={(event) => setHeartRateInput(event.target.value)}
                />
                <span>BPM</span>
              </div>
              <small>Type a counted rate. This page does not read taps.</small>
            </label>
          </div>
        </>
      ) : null}

      <fieldset className="calculator-methods">
        <legend>Finished test</legend>
        <label>
          <input
            type="radio"
            name="vo2-method"
            value="cooper-12"
            checked={method === "cooper-12"}
            onChange={() => setMethod("cooper-12")}
          />
          <span>
            <strong>12-minute run</strong>
            <small>Distance in meters</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="vo2-method"
            value="mile-15"
            checked={method === "mile-15"}
            onChange={() => setMethod("mile-15")}
          />
          <span>
            <strong>1.5-mile run</strong>
            <small>Finish time</small>
          </span>
        </label>
        <label>
          <input
            type="radio"
            name="vo2-method"
            value="rockport"
            checked={method === "rockport"}
            onChange={() => setMethod("rockport")}
          />
          <span>
            <strong>One-mile walk</strong>
            <small>Time, heart rate, weight, age, sex term</small>
          </span>
        </label>
      </fieldset>

      <div className="calculator-result" aria-live="polite">
        {estimate ? (
          <>
            <p className="calculator-result-label">{estimate.headline}</p>
            <p className="calculator-result-number">
              {estimate.primaryValue} <span>{estimate.primaryUnit}</span>
            </p>
            <div className="calculator-result-details">
              {estimate.arithmetic.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <p className="calculator-formula">{estimate.formula}</p>
          </>
        ) : (
          <p className="calculator-error">{"error" in result ? result.error : "Enter a finished field test."}</p>
        )}
      </div>

      <p className="calculator-disclaimer">
        {estimate ? `${estimate.note} ` : null}
        The calculator does not measure oxygen uptake, diagnose illness, or clear anyone for a maximal run. Counting
        taps on the BPM timer does not measure VO2 max. A walk heart rate has to be typed in.
      </p>
    </section>
  );
}
