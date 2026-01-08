export type ViewMode = "rest" | "sport";

export type HistoryEntry = {
  id: string;
  timestamp: string;
  bpm: number;
  context: ViewMode | "unknown";
};

export type Language = "en" | "es";

export interface HeartRateState {
  beats: number[];
  isFrozen: boolean;
  frozenBpm: number | null;
  displayBpm: number | null;
  viewMode: ViewMode;
  tapPulse: boolean;
  beatCount: number;
  accuracyHint: string | null;
}

export interface UIState {
  isMobile: boolean;
  isFirstTime: boolean;
  showTutorial: boolean;
  showUpgradePrompt: boolean;
  historyPage: number;
}

export interface AuthUser {
  account_tier: 'free' | 'pro' | 'premium' | 'enterprise';
}
