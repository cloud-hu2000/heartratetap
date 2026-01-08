export const HISTORY_STORAGE_KEY = "heartratetap-history-v1";
export const HISTORY_PAGE_SIZE = 5;
export const LANG_STORAGE_KEY = "heartratetap-lang";
export const MIN_BEAT_INTERVAL = 150; // 最小点击间隔150ms，防止抖动
export const FIRST_TIME_KEY = "heartratetap-first-time";
export const TUTORIAL_SHOWN_KEY = "heartratetap-tutorial-shown";

// BPM计算相关常量
export const BPM_CALCULATION_CONSTANTS = {
  MIN_BPM: 40,
  MAX_BPM: 190,
  SMOOTHING_FACTOR: 0.15, // 平滑过渡因子
  UPDATE_INTERVAL: 100, // 显示更新间隔(ms)
} as const;
