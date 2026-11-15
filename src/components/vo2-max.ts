export type Vo2Method = "cooper-12" | "mile-15" | "rockport";
export type SexTerm = "male" | "female";

export const COOPER_12_MIN_METERS = 1000;
export const COOPER_12_MAX_METERS = 4500;
export const MILE_15_MIN_SECONDS = 6 * 60;
export const MILE_15_MAX_SECONDS = 30 * 60;
export const ROCKPORT_MIN_AGE = 20;
export const ROCKPORT_MAX_AGE = 69;
export const ROCKPORT_SAMPLE_MIN_AGE = 30;
export const ROCKPORT_MIN_POUNDS = 80;
export const ROCKPORT_MAX_POUNDS = 400;
export const ROCKPORT_MIN_SECONDS = 8 * 60;
export const ROCKPORT_MAX_SECONDS = 30 * 60;
export const ROCKPORT_MIN_HR = 40;
export const ROCKPORT_MAX_HR = 220;
export const POUNDS_TO_KILOGRAMS = 0.45359237;

export type Vo2Estimate = {
  method: Vo2Method;
  headline: string;
  primaryValue: string;
  primaryUnit: string;
  arithmetic: string[];
  formula: string;
  note: string;
};

function formatFixed(value: number, places: number): string {
  const factor = 10 ** places;
  return (Math.round(value * factor) / factor).toFixed(places);
}

export function estimateCooper12Minute(distanceMeters: number): Vo2Estimate | null {
  if (!Number.isInteger(distanceMeters) || distanceMeters < COOPER_12_MIN_METERS || distanceMeters > COOPER_12_MAX_METERS) {
    return null;
  }

  const vo2 = (distanceMeters - 504.9) / 44.73;

  return {
    method: "cooper-12",
    headline: "12-minute run estimate",
    primaryValue: formatFixed(vo2, 2),
    primaryUnit: "ml/kg/min",
    arithmetic: [`(${distanceMeters} − 504.9) / 44.73 = ${formatFixed(vo2, 2)}`],
    formula: "VO2max = (distance in meters − 504.9) / 44.73",
    note: "The 1968 comparison used 115 U.S. Air Force men. This equation has no age or sex term."
  };
}

export function estimateCooper15Mile(totalSeconds: number): Vo2Estimate | null {
  if (!Number.isInteger(totalSeconds) || totalSeconds < MILE_15_MIN_SECONDS || totalSeconds > MILE_15_MAX_SECONDS) {
    return null;
  }

  const minutes = totalSeconds / 60;
  const vo2 = 483 / minutes + 3.5;

  return {
    method: "mile-15",
    headline: "1.5-mile run estimate",
    primaryValue: formatFixed(vo2, 2),
    primaryUnit: "ml/kg/min",
    arithmetic: [`(483 / ${formatFixed(minutes, 3)}) + 3.5 = ${formatFixed(vo2, 2)}`],
    formula: "VO2max = (483 / time in minutes) + 3.5",
    note: "Time is the entered minutes and seconds divided by 60. The Cooper Institute publishes this equation for the 1.5-mile run."
  };
}

export function estimateRockportWalk(input: {
  sex: SexTerm;
  age: number;
  weightPounds: number;
  totalSeconds: number;
  heartRate: number;
}): Vo2Estimate | null {
  const { sex, age, weightPounds, totalSeconds, heartRate } = input;
  const weightIsTenth = Math.abs(weightPounds * 10 - Math.round(weightPounds * 10)) < 1e-8;

  if (
    (sex !== "male" && sex !== "female") ||
    !Number.isInteger(age) ||
    age < ROCKPORT_MIN_AGE ||
    age > ROCKPORT_MAX_AGE ||
    !weightIsTenth ||
    weightPounds < ROCKPORT_MIN_POUNDS ||
    weightPounds > ROCKPORT_MAX_POUNDS ||
    !Number.isInteger(totalSeconds) ||
    totalSeconds < ROCKPORT_MIN_SECONDS ||
    totalSeconds > ROCKPORT_MAX_SECONDS ||
    !Number.isInteger(heartRate) ||
    heartRate < ROCKPORT_MIN_HR ||
    heartRate > ROCKPORT_MAX_HR
  ) {
    return null;
  }

  const sexCoefficient = sex === "male" ? 1 : 0;
  const minutes = totalSeconds / 60;
  const liters =
    6.9652 +
    0.0091 * weightPounds -
    0.0257 * age +
    0.5955 * sexCoefficient -
    0.224 * minutes -
    0.0115 * heartRate;

  if (liters <= 0) {
    return null;
  }

  const kilograms = weightPounds * POUNDS_TO_KILOGRAMS;
  const relative = (liters * 1000) / kilograms;
  const sampleNote =
    age < ROCKPORT_SAMPLE_MIN_AGE
      ? ` Age ${age} is below the 1987 sample, which started at 30. The same coefficients are still applied.`
      : "";

  return {
    method: "rockport",
    headline: "One-mile walk estimate",
    primaryValue: formatFixed(relative, 2),
    primaryUnit: "ml/kg/min",
    arithmetic: [
      `${formatFixed(liters, 2)} L/min from the 1987 liter equation`,
      `${formatFixed(relative, 2)} ml/kg/min after dividing by ${formatFixed(kilograms, 2)} kg`
    ],
    formula: `L/min = 6.9652 + (0.0091 × ${formatFixed(weightPounds, 1)}) − (0.0257 × ${age}) + (0.5955 × ${sexCoefficient}) − (0.2240 × ${formatFixed(minutes, 3)}) − (0.0115 × ${heartRate})`,
    note: `The published equation outputs liters per minute. The larger figure divides that result by body mass. It is not a separately fitted relative regression.${sampleNote}`
  };
}
