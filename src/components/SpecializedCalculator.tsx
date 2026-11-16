"use client";
import { useState } from "react";

type Kind = "fat" | "threshold" | "cycling";
const zones = [
  ["Zone 1 · Active recovery", 0, 81], ["Zone 2 · Endurance", 81, 90],
  ["Zone 3 · Tempo", 90, 94], ["Zone 4 · Threshold", 94, 100],
  ["Zone 5a · Above threshold", 100, 103], ["Zone 5b · Aerobic capacity", 103, 107],
  ["Zone 5c · Anaerobic capacity", 107, 0]
] as const;
export default function SpecializedCalculator({ kind }: { kind: Kind }) {
  const [value, setValue] = useState(kind === "cycling" ? "160" : "40");
  const [method, setMethod] = useState("age");
  const n = Number(value);
  const valid = value.trim() !== "" && Number.isInteger(n) && (kind === "cycling" || method === "max" ? n >= 80 && n <= 230 : n >= 18 && n <= 100);
  const max = method === "age" ? 220 - n : n;
  return <section className="calculator-card" aria-labelledby="special-calculator-title">
    <div className="calculator-card-header"><p className="calculator-kicker">Interactive estimate</p><h2 id="special-calculator-title">Calculate your {kind === "cycling" ? "cycling zones" : kind === "fat" ? "heart rate range" : "threshold estimate"}</h2></div>
    {kind !== "cycling" && <label className="calculator-field"><span>Start with</span><select value={method} onChange={e => { setMethod(e.target.value); setValue(e.target.value === "age" ? "40" : "180"); }}><option value="age">Age (220 − age)</option><option value="max">Known maximum heart rate</option></select></label>}
    <label className="calculator-field"><span>{kind === "cycling" ? "Cycling lactate threshold heart rate (BPM)" : method === "age" ? "Age (years)" : "Maximum heart rate (BPM)"}</span><small id="special-hint">{kind === "cycling" || method === "max" ? "Enter a whole number from 80 to 230 BPM." : "Enter a whole number from 18 to 100 years."}</small><input type="number" inputMode="numeric" min={kind === "cycling" || method === "max" ? 80 : 18} max={kind === "cycling" || method === "max" ? 230 : 100} step="1" value={value} aria-describedby="special-hint" onChange={e => setValue(e.target.value)} /></label>
    {valid ? <div className="calculator-result" aria-live="polite">{kind === "cycling" ? <><p>Percentages of {n} BPM LTHR; limits shown to one decimal:</p><ul>{zones.map(([label, low, high]) => <li key={label}><strong>{label}:</strong> {low === 0 ? `below ${(n * high / 100).toFixed(1)}` : high === 0 ? `${(n * low / 100).toFixed(1)} and above` : `${(n * low / 100).toFixed(1)} to below ${(n * high / 100).toFixed(1)}`} BPM</li>)}</ul></> : <><p className="calculator-result-label">{kind === "fat" ? "60–80% of maximum" : "85% of maximum"}</p><p className="calculator-result-number">{kind === "fat" ? `${Math.round(max * .6)}–${Math.round(max * .8)}` : Math.round(max * .85)} <span>BPM</span></p><p>{method === "age" ? "Estimated" : "Entered"} maximum: {max} BPM{kind === "fat" ? ` · 60–70% reference: ${Math.round(max * .6)}–${Math.round(max * .7)} BPM` : ""}</p></>}</div> : <p className="calculator-error">Enter a valid whole number in the range shown above.</p>}
    <p className="calculator-disclaimer">For education and planning only, not diagnosis, exercise clearance, or a personal safety limit.</p>
  </section>;
}
