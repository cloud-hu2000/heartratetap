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
    const restingRateIsValid = method !== "heart-rate-reserve" || restingHeartRate >= 30 && restingHeartRate <= 120;
    const valid = age >= 18 && age <= 100 && restingRateIsValid && lowerPercent >= 40 && lowerPercent <= 90 && upperPercent >= 45 && upperPercent <= 95 && lowerPercent < upperPercent;
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
  return <section className="calculator-card" aria-labelledby="target-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Estimación interactiva</p>
        <h2 id="target-calculator-title">Calcular un rango de frecuencia cardíaca objetivo</h2>
        <p>Elija un método, introduzca sus entradas y mantenga la fórmula adjunta al resultado.</p>
      </div>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="target-age">
          <span>Edad</span>
          <input id="target-age" type="number" inputMode="numeric" min="18" max="100" value={age} onChange={event => setAge(Number(event.target.value))} />
          <small>18 a 100 años</small>
        </label>

        <label className="calculator-field" htmlFor="target-resting-rate">
          <span>Frecuencia cardíaca en reposo</span>
          <input id="target-resting-rate" type="number" inputMode="numeric" min="30" max="120" value={restingHeartRate} onChange={event => setRestingHeartRate(Number(event.target.value))} disabled={method !== "heart-rate-reserve"} />
          <small>{method === "heart-rate-reserve" ? "Necesario para reserva de frecuencia cardíaca" : "Utilizado sólo por el método de reserva"}</small>
        </label>
      </div>

      <fieldset className="calculator-methods">
        <legend>Método de cálculo</legend>
        <label>
          <input type="radio" name="target-method" value="percent-max" checked={method === "percent-max"} onChange={() => setMethod("percent-max")} />
          <span>
            <strong>Porcentaje del máximo estimado</strong>
            <small>Usa (220 − edad) × intensidad</small>
          </span>
        </label>
        <label>
          <input type="radio" name="target-method" value="heart-rate-reserve" checked={method === "heart-rate-reserve"} onChange={() => setMethod("heart-rate-reserve")} />
          <span>
            <strong>Reserva de frecuencia cardíaca</strong>
            <small>Añade la frecuencia en reposo después de aplicar la intensidad</small>
          </span>
        </label>
      </fieldset>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="target-lower-percent">
          <span>Intensidad inferior</span>
          <div className="calculator-input-suffix">
            <input id="target-lower-percent" type="number" inputMode="numeric" min="40" max="90" value={lowerPercent} onChange={event => setLowerPercent(Number(event.target.value))} />
            <span>%</span>
          </div>
        </label>
        <label className="calculator-field" htmlFor="target-upper-percent">
          <span>Intensidad superior</span>
          <div className="calculator-input-suffix">
            <input id="target-upper-percent" type="number" inputMode="numeric" min="45" max="95" value={upperPercent} onChange={event => setUpperPercent(Number(event.target.value))} />
            <span>%</span>
          </div>
        </label>
      </div>

      <div className="calculator-result" aria-live="polite">
        {result ? <>
            <p className="calculator-result-label">Rango previsto</p>
            <p className="calculator-result-number">
              {result.lower}–{result.upper} <span>LPM</span>
            </p>
            <div className="calculator-result-details">
              <span>Máximo estimado: {result.estimatedMaximum} LPM</span>
              <span>{result.midpointPercent}% punto medio: {result.midpoint} LPM</span>
            </div>
            <p className="calculator-formula">
              {method === "heart-rate-reserve"
                ? `Objetivo = ${restingHeartRate} + intensidad × (${result.estimatedMaximum} − ${restingHeartRate})`
                : `Objetivo = ${result.estimatedMaximum} × intensidad`}
            </p>
          </> : <p className="calculator-error">
            Introduce una edad de 18 a 100 años, una frecuencia en reposo de 30 a 120 LPM y un porcentaje superior mayor que el inferior.
          </p>}
      </div>

      <p className="calculator-disclaimer">
        Es una estimación poblacional para el ejercicio, no un máximo medido, una autorización para hacer ejercicio ni una prescripción médica. La medicación, la salud y la condición física pueden cambiar el objetivo adecuado.
      </p>
    </section>;
}
