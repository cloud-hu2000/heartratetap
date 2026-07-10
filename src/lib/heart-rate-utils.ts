import { ViewMode, HistoryEntry } from "./types";
import { COPY } from "./constants";

/**
 * 计算心率（基于点击时间戳）
 */
export const computeBpm = (beats: number[]): number | null => {
  if (beats.length < 2) return null;
  const deltas = beats.slice(1).map((stamp, index) => stamp - beats[index]);
  const average = deltas.reduce((sum, delta) => sum + delta, 0) / deltas.length;
  if (!Number.isFinite(average) || average <= 0) return null;
  return Math.round(60000 / average);
};

/**
 * 计算指定时间窗口内的心率（基于点击次数）
 */
export const computeBpmByCount = (beats: number[], windowMs: number): number | null => {
  const now = performance.now();
  const windowStart = now - windowMs;
  const beatsInWindow = beats.filter((beat) => beat >= windowStart);
  if (beatsInWindow.length < 2) return null;
  const count = beatsInWindow.length - 1; // 间隔数 = 点击次数 - 1
  const duration = beatsInWindow[beatsInWindow.length - 1] - beatsInWindow[0];
  if (duration <= 0) return null;
  return Math.round((count / duration) * 60000);
};

/**
 * 将BPM值映射到进度条位置（0-100%）
 */
export const clampIndicator = (bpm: number): number => {
  const min = 40;
  const max = 190;
  return ((Math.min(Math.max(bpm, min), max) - min) / (max - min)) * 100;
};

/**
 * 获取心率分析文本
 */
export const analysisFor = (t: typeof COPY[keyof typeof COPY], mode: ViewMode, bpm: number | null): string => {
  if (!bpm) {
    return t.status.waiting;
  }
  if (mode === "rest") {
    if (bpm < 60) return t.advice.rest.low;
    if (bpm <= 100) return t.advice.rest.ideal;
    return t.advice.rest.high;
  }
  if (bpm < 120) return t.advice.sport.warm;
  if (bpm < 150) return t.advice.sport.burn;
  return t.advice.sport.cardio;
};

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

/**
 * 检测是否为移动设备
 */
export const isMobileDevice = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 格式化日期时间
 */
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

/**
 * 创建历史记录条目
 */
export const createHistoryEntry = (bpm: number, mode?: ViewMode): HistoryEntry => {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    bpm,
    context: mode ?? "unknown"
  };
};

/**
 * 计算趋势标签
 */
export const calculateTrendLabel = (
  history: HistoryEntry[],
  t: typeof COPY[keyof typeof COPY]
): string | null => {
  if (history.length < 2) return null;

  const recentBpms = history.slice(0, 20).map(h => h.bpm);
  const latestBpm = recentBpms[0];
  const previousBpm = recentBpms[recentBpms.length - 1];

  if (typeof latestBpm !== "number" || typeof previousBpm !== "number") return null;

  const diff = latestBpm - previousBpm;
  if (Math.abs(diff) < 3) {
    return t.trendStable;
  } else if (diff > 0) {
    return t.trendHigher;
  } else {
    return t.trendLower;
  }
};

/**
 * 获取图表数据
 */
export const getChartData = (history: HistoryEntry[]) => {
  const chartSource = history.slice(0, 20).slice().reverse();
  const hasChart = chartSource.length >= 2;
  const chartBpms = chartSource.map((h) => h.bpm);
  const chartMin = Math.min(...chartBpms);
  const chartMax = Math.max(...chartBpms);
  const chartRange = chartMax - chartMin || 1;

  return {
    chartSource,
    hasChart,
    chartBpms,
    chartMin,
    chartMax,
    chartRange
  };
};
