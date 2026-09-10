"use client";

import { useMemo, useState } from "react";
export default function HeartRateRecoveryCalculator() {
  const [exerciseEndRate, setExerciseEndRate] = useState(160);
  const [recoveryRate, setRecoveryRate] = useState(130);
  const [intervalSeconds, setIntervalSeconds] = useState(60);
  const result = useMemo(() => {
    const valid = exerciseEndRate >= 30 && exerciseEndRate <= 240 && recoveryRate >= 30 && recoveryRate <= 240 && (intervalSeconds === 60 || intervalSeconds === 120);
    if (!valid) {
      return null;
    }
    const drop = exerciseEndRate - recoveryRate;
    return {
      drop,
      percentage: Math.abs(drop / exerciseEndRate * 100).toFixed(1)
    };
  }, [exerciseEndRate, intervalSeconds, recoveryRate]);
  return <section className="calculator-card" aria-labelledby="recovery-calculator-title">
      <div className="calculator-card-header">
        <p className="calculator-kicker">Calculadora de diferencias</p>
        <h2 id="recovery-calculator-title">Calcular la recuperación de la frecuencia cardíaca</h2>
        <p>Introduzca dos lecturas del mismo protocolo de recuperación. El resultado es el cambio aritmético entre ellos.</p>
      </div>

      <div className="calculator-form-grid">
        <label className="calculator-field" htmlFor="exercise-end-rate">
          <span>Frecuencia cardíaca al terminar el ejercicio</span>
          <div className="calculator-input-suffix">
            <input id="exercise-end-rate" type="number" inputMode="numeric" min="30" max="240" value={exerciseEndRate} onChange={event => setExerciseEndRate(Number(event.target.value))} />
            <span>LPM</span>
          </div>
        </label>

        <label className="calculator-field" htmlFor="recovery-rate">
          <span>Frecuencia cardíaca tras la recuperación</span>
          <div className="calculator-input-suffix">
            <input id="recovery-rate" type="number" inputMode="numeric" min="30" max="240" value={recoveryRate} onChange={event => setRecoveryRate(Number(event.target.value))} />
            <span>LPM</span>
          </div>
        </label>
      </div>

      <fieldset className="calculator-methods calculator-methods-compact">
        <legend>Intervalos de recuperación</legend>
        <label>
          <input type="radio" name="recovery-interval" value="60" checked={intervalSeconds === 60} onChange={() => setIntervalSeconds(60)} />
          <span>
            <strong>1 minuto</strong>
            <small>HRR60</small>
          </span>
        </label>
        <label>
          <input type="radio" name="recovery-interval" value="120" checked={intervalSeconds === 120} onChange={() => setIntervalSeconds(120)} />
          <span>
            <strong>2 minutos</strong>
            <small>HRR120</small>
          </span>
        </label>
      </fieldset>

      <div className="calculator-result" aria-live="polite">
        {result ? <>
            <p className="calculator-result-label">Cambio tras {intervalSeconds / 60} minuto{intervalSeconds === 120 ? "s" : ""}</p>
            <p className="calculator-result-number">
              {result.drop >= 0 ? result.drop : Math.abs(result.drop)} <span>LPM de {result.drop >= 0 ? "descenso" : "aumento"}</span>
            </p>
            <div className="calculator-result-details">
              <span>{result.percentage}% de la lectura al terminar el ejercicio</span>
              <span>{exerciseEndRate} − {recoveryRate} = {result.drop} LPM</span>
            </div>
          </> : <p className="calculator-error">Introduzca ambas lecturas entre 30 y 240 LPM.</p>}
      </div>

      <p className="calculator-disclaimer">
        La calculadora no califica el resultado. Tipo de ejercicio, esfuerzo máximo, recuperación activa o pasiva, medicación, equipo de medición y tiempo exacto todos afectan la interpretación.
      </p>
    </section>;
}
