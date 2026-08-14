"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { COPY } from "@/lib/constants";
import "@/app/HeartRateMonitor.css";

type ViewMode = "rest" | "sport";

type HistoryEntry = {
  id: string;
  timestamp: string;
  bpm: number;
  context: ViewMode | "unknown";
};

const HISTORY_STORAGE_KEY = "heartratetap-history-v1";
const HISTORY_PAGE_SIZE = 5;
const LANG_STORAGE_KEY = "heartratetap-lang";
const MIN_BEAT_INTERVAL = 150; // 最小点击间隔150ms，防止抖动
const FIRST_TIME_KEY = "heartratetap-first-time";
const TUTORIAL_SHOWN_KEY = "heartratetap-tutorial-shown";

const computeBpm = (beats: number[]): number | null => {
  if (beats.length < 2) return null;
  const deltas = beats.slice(1).map((stamp, index) => stamp - beats[index]);
  const average = deltas.reduce((sum, delta) => sum + delta, 0) / deltas.length;
  if (!Number.isFinite(average) || average <= 0) return null;
  return Math.round(60000 / average);
};

// 计算指定时间窗口内的心率（基于点击次数）
const computeBpmByCount = (beats: number[], windowMs: number): number | null => {
  const now = performance.now();
  const windowStart = now - windowMs;
  const beatsInWindow = beats.filter((beat) => beat >= windowStart);
  if (beatsInWindow.length < 2) return null;
  const count = beatsInWindow.length - 1; // 间隔数 = 点击次数 - 1
  const duration = beatsInWindow[beatsInWindow.length - 1] - beatsInWindow[0];
  if (duration <= 0) return null;
  return Math.round((count / duration) * 60000);
};

const clampIndicator = (bpm: number): number => {
  const min = 40;
  const max = 190;
  return ((Math.min(Math.max(bpm, min), max) - min) / (max - min)) * 100;
};

const analysisFor = (t: typeof COPY[keyof typeof COPY], mode: ViewMode, bpm: number | null): string => {
  if (!bpm) {
    return t.status.waiting;
  }
  if (mode === "rest") {
    if (bpm < 60) return t.advice.rest.low;
    if (bpm <= 90) return t.advice.rest.ideal;
    return t.advice.rest.high;
  }
  if (bpm < 120) return t.advice.sport.warm;
  if (bpm < 150) return t.advice.sport.burn;
  return t.advice.sport.cardio;
};

interface HeartRateMonitorProps {
  lang: "en" | "es";
  onLangChange: (lang: "en" | "es") => void;
}

export default function HeartRateMonitor({ lang, onLangChange }: HeartRateMonitorProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("rest");
  const [beats, setBeats] = useState<number[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenBpm, setFrozenBpm] = useState<number | null>(null);
  const [displayBpm, setDisplayBpm] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [tapPulse, setTapPulse] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const lastBeatTime = useRef<number>(0);

  // 移动端检测和优化
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [accuracyHint, setAccuracyHint] = useState<string | null>(null);
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as "en" | "es" | null;
    if (stored === "es" || stored === "en") {
      onLangChange(stored);
    }

    // 检测移动设备
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);

    // 检查是否首次使用
    const hasUsedBefore = window.localStorage.getItem(FIRST_TIME_KEY);
    if (!hasUsedBefore) {
      setIsFirstTime(true);
      window.localStorage.setItem(FIRST_TIME_KEY, "true");
    }

    // 检查是否已显示教程
    const tutorialShown = window.localStorage.getItem(TUTORIAL_SHOWN_KEY);
    if (!tutorialShown && mobileCheck) {
      setShowTutorial(true);
    }
  }, [onLangChange]);

  const toggleLang = useCallback(() => {
    onLangChange(lang === "en" ? "es" : "en");
  }, [lang, onLangChange]);

  // 计算三种心率方式
  const liveBpm = useMemo(() => computeBpm(beats), [beats]);
  const bpm5s = useMemo(() => computeBpmByCount(beats, 5000), [beats]);
  const bpm10s = useMemo(() => computeBpmByCount(beats, 10000), [beats]);

  // 选择显示的心率（优先使用10秒，其次5秒，最后是间隔计算）
  const currentBpm = isFrozen ? frozenBpm : (bpm10s ?? bpm5s ?? liveBpm);

  // 平滑更新显示的心率数字 - 使用requestAnimationFrame优化性能
  useEffect(() => {
    let animationId: number;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 100; // 降低到100ms以减少CPU消耗

    const updateDisplay = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= UPDATE_INTERVAL) {
        setDisplayBpm((prev) => {
          if (currentBpm === null) {
            return null;
          }

          if (prev === null) {
            return currentBpm;
          }

          const diff = currentBpm - prev;
          if (Math.abs(diff) < 0.5) {
            return currentBpm;
          }
          // 每次更新15%的差值，实现更平滑的过渡
          return Math.round(prev + diff * 0.15);
        });
        lastUpdateTime = timestamp;
      }

      animationId = requestAnimationFrame(updateDisplay);
    };

    animationId = requestAnimationFrame(updateDisplay);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentBpm]);

  // 加载本地历史记录
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as HistoryEntry[];
      if (Array.isArray(parsed)) {
        setHistory(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const appendHistory = useCallback((bpm: number, mode?: ViewMode) => {
    const entry: HistoryEntry = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: new Date().toISOString(),
      bpm,
      context: mode ?? "unknown"
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  // 导出历史数据为CSV
  const exportHistoryToCSV = useCallback(() => {
    if (history.length === 0) return;

    const csvContent = [
      ["Timestamp", "BPM", "Mode"].join(","),
      ...history.map(entry => [
        new Date(entry.timestamp).toLocaleString(),
        entry.bpm,
        entry.context === "sport" ? "Active" : entry.context === "rest" ? "Rest" : "Unknown"
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `heartrate-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [history]);

  // 清除历史数据
  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      if (confirm("Are you sure you want to clear all heart rate history? This action cannot be undone.")) {
        setHistory([]);
        window.localStorage.removeItem(HISTORY_STORAGE_KEY);
      }
    }
  }, []);



  const triggerTapPulse = useCallback(() => {
    setTapPulse(true);
    setBeatCount((c) => c + 1);
    setTimeout(() => setTapPulse(false), 200);
  }, []);

  const handleBeat = useCallback(() => {
    const now = performance.now();

    // 去抖：防止短时间内重复点击
    if (now - lastBeatTime.current < MIN_BEAT_INTERVAL) {
      return;
    }
    lastBeatTime.current = now;

    triggerTapPulse();

    // 移动端震动反馈
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // 如果已停止，点击开始则清零重新测量，并记录第一次点击
    if (isFrozen) {
      setIsFrozen(false);
      setFrozenBpm(null);
      setBeats([]);
      setDisplayBpm(null);
      setBeatCount(1);
      // 清零后立即记录第一次点击
      setBeats([now]);
      return;
    }

    setBeats((prev) => {
      const next = [...prev, now];
      return next.slice(-16);
    });

    // 精确度提示
    const newBeatCount = beatCount + 1;
    if (newBeatCount >= 10 && !accuracyHint) {
      setAccuracyHint("Great! You have enough beats for a stable reading.");
    } else if (newBeatCount === 3 && !accuracyHint) {
      setAccuracyHint("Keep tapping! Aim for at least 10 beats for better accuracy.");
    }
  }, [isFrozen, triggerTapPulse, isMobile, beatCount, accuracyHint]);

  // 当测量开始时，自动将焦点转移到tap-surface按钮
  useEffect(() => {
    if (beats.length > 0 && !isFrozen) {
      // 延迟一点时间确保DOM更新后再转移焦点
      setTimeout(() => {
        const tapSurfaceButton = document.querySelector('.tap-surface') as HTMLButtonElement;
        if (tapSurfaceButton) {
          tapSurfaceButton.focus();
        }
      }, 100);
    }
  }, [beats.length, isFrozen]);

  const freeze = useCallback(() => {
    // Avoid recording multiple entries for the same measurement
    if (isFrozen) return;
    const bpmToFreeze = bpm10s ?? bpm5s ?? liveBpm;
    if (!bpmToFreeze) return;
    setIsFrozen(true);
    setFrozenBpm(bpmToFreeze);
    setDisplayBpm(bpmToFreeze);
    appendHistory(bpmToFreeze, viewMode);
  }, [appendHistory, bpm10s, bpm5s, liveBpm, isFrozen, viewMode]);

  const statusLabel = isFrozen
    ? t.status.frozen
    : beats.length > 1
      ? t.status.measuring
      : t.status.waiting;

  // 只在停止后显示建议
  const analysisText = isFrozen ? analysisFor(t, viewMode, displayBpm ?? null) : null;

  const recentBpm = history.map((h) => h.bpm);
  const latestBpm = recentBpm[0];
  const previousBpm = recentBpm[recentBpm.length - 1];
  let trendLabel: string | null = null;
  if (recentBpm.length >= 2 && typeof latestBpm === "number" && typeof previousBpm === "number") {
    const diff = latestBpm - previousBpm;
    if (Math.abs(diff) < 3) {
      trendLabel = t.trendStable;
    } else if (diff > 0) {
      trendLabel = t.trendHigher;
    } else {
      trendLabel = t.trendLower;
    }
  }

  const totalHistoryPages = Math.max(Math.ceil(history.length / HISTORY_PAGE_SIZE), 1);
  const clampedHistoryPage = Math.min(historyPage, totalHistoryPages - 1);
  const pagedHistory = history.slice(
    clampedHistoryPage * HISTORY_PAGE_SIZE,
    clampedHistoryPage * HISTORY_PAGE_SIZE + HISTORY_PAGE_SIZE
  );

  const chartSource = history.slice(0, 20).slice().reverse();
  const hasChart = chartSource.length >= 2;
  const chartBpms = chartSource.map((h) => h.bpm);
  const chartMin = Math.min(...chartBpms);
  const chartMax = Math.max(...chartBpms);
  const chartRange = chartMax - chartMin || 1;

  return (
    <div className="frame">
      <section className="panel hero">
        <div className="hero-header">
          <div className="hero-content">
            <p className="hero-sub">{t.heroSub}</p>
            <h1 className="hero-title">{t.heroHeadline}</h1>
          </div>
          <div className="hero-actions">
            <button
              type="button"
              className={`pill ${lang === "en" ? "active" : ""}`}
              onClick={() => onLangChange("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`pill ${lang === "es" ? "active" : ""}`}
              onClick={() => onLangChange("es")}
            >
              ES
            </button>
          </div>
        </div>
      </section>

      <main className="canvas">
        <section className={`panel pulse-zone ${beats.length === 0 ? "pulse-zone-idle" : ""} ${isFrozen ? "pulse-zone-frozen" : ""}`}>
          <div className="pulse-zone-header">
            <div className={`metric ${tapPulse ? "metric-pulse" : ""}`} aria-live="polite" aria-atomic="true">
              {displayBpm ?? "--"}
              <span className="metric-unit">bpm</span>
              {beats.length > 0 && !isFrozen && (
                <span className="beat-indicator">
                  <span className={`beat-dot ${tapPulse ? "beat-dot-active" : ""}`} />
                </span>
              )}
            </div>
            <p className="status-label">
              {statusLabel}
              {beats.length > 0 && !isFrozen && (
                <span className="tap-counter"> • {beatCount} taps</span>
              )}
            </p>
            {!isFrozen && (bpm5s || bpm10s) && (
              <div className="bpm-details">
                {bpm10s && (
                  <span>10s: {bpm10s} bpm</span>
                )}
                {bpm5s && (
                  <span>5s: {bpm5s} bpm</span>
                )}
              </div>
            )}
          </div>

          {/* 未开始时的引导视觉 */}
          {beats.length === 0 && (
            <div className="idle-visual">
              <button
                type="button"
                className="heart-icon-button"
                onClick={handleBeat}
                onPointerDown={handleBeat}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBeat();
                  }
                }}
                tabIndex={0}
                aria-label="Start measuring heart rate"
                title="Click to start measuring your heart rate"
              >
                ❤️
              </button>
              <p className="idle-hint">{t.idleHint}</p>
              {showTutorial && (
                <div className="tutorial-overlay">
                  <div className="tutorial-content">
                    <h3>📱 Quick Tutorial</h3>
                    <ol>
                      <li>Find your pulse on wrist or neck</li>
                      <li>Tap the heart area in rhythm</li>
                      <li>Wait for stable BPM reading</li>
                      <li>Tap &quot;Stop&quot; to save result</li>
                    </ol>
                    <button
                      type="button"
                      className="pill active tutorial-close"
                      onClick={() => {
                        setShowTutorial(false);
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem(TUTORIAL_SHOWN_KEY, "true");
                        }
                      }}
                    >
                      Got it! 🎯
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isFrozen && (
            <div className="view-row">
              <button
                type="button"
                className={`pill ${viewMode === "rest" ? "active" : ""}`}
                onClick={() => {
                  setViewMode("rest");
                  const section = document.getElementById("resting-heart-rate");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {t.restLabel}
              </button>
              <button
                type="button"
                className={`pill ${viewMode === "sport" ? "active" : ""}`}
                onClick={() => {
                  setViewMode("sport");
                  const section = document.getElementById("exercise-heart-rate");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {t.sportLabel}
              </button>
            </div>
          )}

          <div className="zone-bar">
            {displayBpm && (
              <span
                className="zone-indicator zone-indicator-positioned"
                style={{ left: `${clampIndicator(displayBpm)}%` }}
              />
            )}
            {!displayBpm && (
              <div className="zone-bar-placeholder">
                <span className="zone-bar-hint" title={t.zoneHint}>
                  {t.zoneHint}
                </span>
              </div>
            )}
          </div>

          {analysisText && (
            <div className="analysis">
              <div className="analysis-icon">✓</div>
              <div className="analysis-text">{analysisText}</div>
            </div>
          )}

          <button
            type="button"
            className={`tap-surface ${tapPulse ? "tap-surface-active" : ""} ${isMobile ? "tap-surface-mobile" : ""}`}
            onPointerDown={handleBeat}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBeat();
              }
            }}
            tabIndex={0}
            aria-label={t.tapHint}
            role="button"
          >
            <div className="tap-surface-content">
              <span className={`tap-heart ${tapPulse ? "tap-heart-pulse" : ""}`}>💓</span>
              <p className="tap-hint-text">{t.tapHint}</p>
              {accuracyHint && (
                <p className="accuracy-hint">{accuracyHint}</p>
              )}
            </div>
            {tapPulse && <span className="tap-ripple" key={beatCount} />}
          </button>

          <div className="controls">
            <button type="button" className="pill active" onClick={freeze}>
              {t.stop}
            </button>
          </div>
        </section>

        <section className="panel">
          <p className="hero-sub hero-sub-margin">
            {t.diagramTitle}
          </p>
          <div className="diagram">
            <picture>
              <source srcSet="/pause.avif" type="image/avif" />
              <source srcSet="/pause.webp" type="image/webp" />
              <Image
                src="/pause-optimized.png"
                alt={t.diagramTitle}
                width={400}
                height={300}
                className="pause-image"
                priority={false}
              />
            </picture>
          </div>
        </section>

        <section className="panel history-panel">
          <div className="history-header">
            <p className="hero-sub hero-sub-margin">
              {t.historyTitle}
            </p>
            {history.length > 0 && (
              <div className="history-controls">
                <button
                  type="button"
                  className="pill"
                  onClick={exportHistoryToCSV}
                  title="Export history as CSV"
                >
                  📊 Export
                </button>
                <button
                  type="button"
                  className="pill danger"
                  onClick={clearHistory}
                  title="Clear all history"
                >
                  🗑️ Clear
                </button>
              </div>
            )}
          </div>
          {history.length === 0 && (
            <p className="history-empty">
              {t.historyEmpty}
            </p>
          )}
          {history.length > 0 && (
            <>
              <div className="history-header-row">
                {trendLabel && <p className="history-trend">{trendLabel}</p>}
              </div>
              {hasChart && history.length > HISTORY_PAGE_SIZE && (
                <div className="history-chart">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.8"
                      points={chartSource
                        .map((entry, index) => {
                          const x = (index / Math.max(chartSource.length - 1, 1)) * 100;
                          const normalized = (entry.bpm - chartMin) / chartRange;
                          const y = 35 - normalized * 25;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  </svg>
                  <div className="history-chart-caption">
                    Last {chartSource.length} locked readings •{" "}
                    <span>
                      {chartMin}–{chartMax} bpm
                    </span>
                  </div>
                </div>
              )}
              {trendLabel && <p className="history-trend">{trendLabel}</p>}
              <ul className="history-list">
                {pagedHistory.map((entry) => (
                  <li key={entry.id} className="history-item">
                    <div>
                      <div className="history-bpm">
                        {entry.bpm}
                        <span> bpm</span>
                      </div>
                      <p className="history-meta">
                        {entry.context === "sport" ? t.historyMetaWorkout : t.historyMetaRest} •{" "}
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {history.length > HISTORY_PAGE_SIZE && (
                <div className="history-pagination">
                  <button
                    type="button"
                    className="pill"
                    disabled={clampedHistoryPage === 0}
                    onClick={() => setHistoryPage((page) => Math.max(page - 1, 0))}
                  >
                    {t.historyNewer}
                  </button>
                  <span className="history-page-label">
                    {t.historyPage} {clampedHistoryPage + 1} {t.historyOf} {totalHistoryPages}
                  </span>
                  <button
                    type="button"
                    className="pill"
                    disabled={clampedHistoryPage >= totalHistoryPages - 1}
                    onClick={() =>
                      setHistoryPage((page) => Math.min(page + 1, Math.max(totalHistoryPages - 1, 0)))
                    }
                  >
                    {t.historyOlder}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

      </main>
    </div>
  );
}
