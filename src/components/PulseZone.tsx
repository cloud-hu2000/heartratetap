"use client";

import { useCallback, useRef } from "react";
import { ViewMode } from "@/lib/types";
import { clampIndicator, analysisFor } from "@/lib/heart-rate-utils";
import { COPY } from "@/lib/constants";

interface PulseZoneProps {
  lang: "en" | "es";
  beats: number[];
  isFrozen: boolean;
  displayBpm: number | null;
  viewMode: ViewMode;
  tapPulse: boolean;
  beatCount: number;
  accuracyHint: string | null;
  isMobile: boolean;
  currentBpm: number | null;
  bpm5s: number | null;
  bpm10s: number | null;
  onBeat: () => void;
  onFreeze: () => void;
  onSetViewMode: (mode: ViewMode) => void;
}

export default function PulseZone({
  lang,
  beats,
  isFrozen,
  displayBpm,
  viewMode,
  tapPulse,
  beatCount,
  accuracyHint,
  isMobile,
  currentBpm,
  bpm5s,
  bpm10s,
  onBeat,
  onFreeze,
  onSetViewMode
}: PulseZoneProps) {
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  const statusLabel = isFrozen
    ? t.status.frozen
    : beats.length > 1
      ? t.status.measuring
      : t.status.waiting;

  const analysisText = isFrozen ? analysisFor(t, viewMode, displayBpm ?? null) : null;

  // 用于跟踪触摸事件的引用
  const touchStartRef = useRef<{ x: number; y: number; time: number; scrollY: number } | null>(null);

  // 处理触摸开始
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      scrollY: window.scrollY
    };
  }, []);

  // 处理触摸移动，如果检测到滑动则取消触摸
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // 如果移动距离超过阈值，认为是滑动意图，取消触摸处理
    if (deltaX > 10 || deltaY > 10) {
      touchStartRef.current = null;
    }
  }, []);

  // 处理触摸结束，判断是否为有效点击
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    const deltaTime = Date.now() - touchStartRef.current.time;
    const deltaScroll = Math.abs(window.scrollY - touchStartRef.current.scrollY);

    // 更严格的点击检测：
    // 1. 移动距离必须很小（< 5px）
    // 2. 触摸时间必须很短（< 200ms）
    // 3. 页面滚动距离必须很小（< 3px）
    const isValidTap = deltaX < 5 && deltaY < 5 && deltaTime < 200 && deltaScroll < 3;

    if (isValidTap) {
      onBeat();
    }

    touchStartRef.current = null;
  }, [onBeat]);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    onSetViewMode(mode);
    const section = document.getElementById(mode === "rest" ? "resting-heart-rate" : "exercise-heart-rate");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [onSetViewMode]);

  return (
    <section className={`panel pulse-zone ${beats.length === 0 ? "pulse-zone-idle" : ""} ${isFrozen ? "pulse-zone-frozen" : ""}`}>
      <div className="pulse-zone-header">
        <div className={`metric ${tapPulse ? "metric-pulse" : ""}`} aria-live="polite" aria-atomic="true">
          {displayBpm ?? "--"}
          <span className="metric-unit">{t.bpmUnit}</span>
          {beats.length > 0 && !isFrozen && (
            <span className="beat-indicator">
              <span className={`beat-dot ${tapPulse ? "beat-dot-active" : ""}`} />
            </span>
          )}
        </div>
        <p className="status-label">
          {statusLabel}
          {beats.length > 0 && !isFrozen && (
            <span className="tap-counter"> • {beatCount} {t.tapsUnit}</span>
          )}
        </p>
        {!isFrozen && (bpm5s || bpm10s) && (
          <div className="bpm-details">
            {bpm10s && (
              <span>10s: {bpm10s} {t.bpmUnit}</span>
            )}
            {bpm5s && (
              <span>5s: {bpm5s} {t.bpmUnit}</span>
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
            onClick={onBeat}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onBeat();
              }
            }}
            tabIndex={0}
            aria-label={t.startAria}
            title={t.startTitle}
          >
            ❤️
          </button>
          <p className="idle-hint">{t.idleHint}</p>
        </div>
      )}

      {isFrozen && (
        <div className="view-row">
          <button
            type="button"
            className={`pill ${viewMode === "rest" ? "active" : ""}`}
            onClick={() => handleViewModeChange("rest")}
          >
            {t.restLabel}
          </button>
          <button
            type="button"
            className={`pill ${viewMode === "sport" ? "active" : ""}`}
            onClick={() => handleViewModeChange("sport")}
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
          <div className="analysis-icon" aria-hidden="true">i</div>
          <div className="analysis-text">{analysisText}</div>
        </div>
      )}

      <button
        type="button"
        className={`tap-surface ${tapPulse ? "tap-surface-active" : ""} ${isMobile ? "tap-surface-mobile" : ""}`}
        onClick={onBeat}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onBeat();
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
        <button type="button" className="pill active" onClick={onFreeze}>
          {t.stop}
        </button>
      </div>
    </section>
  );
}
