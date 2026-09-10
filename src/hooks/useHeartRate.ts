import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { ViewMode, HeartRateState } from "@/lib/types";
import { MIN_BEAT_INTERVAL, BPM_CALCULATION_CONSTANTS } from "@/lib/heart-rate-constants";
import { computeBpm, computeBpmByCount, isMobileDevice } from "@/lib/heart-rate-utils";
import { COPY } from "@/lib/constants";

export const useHeartRate = (lang: "en" | "es" = "en") => {
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];
  const [beats, setBeats] = useState<number[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenBpm, setFrozenBpm] = useState<number | null>(null);
  const [displayBpm, setDisplayBpm] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("rest");
  const [tapPulse, setTapPulse] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [accuracyHint, setAccuracyHint] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const lastBeatTime = useRef<number>(0);

  // 初始化移动设备检测
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // 计算三种心率方式
  const liveBpm = useMemo(() => computeBpm(beats), [beats]);
  const bpm5s = useMemo(() => computeBpmByCount(beats, 5000), [beats]);
  const bpm10s = useMemo(() => computeBpmByCount(beats, 10000), [beats]);

  // 选择显示的心率（优先使用10秒，其次5秒，最后是间隔计算）
  const currentBpm = isFrozen ? frozenBpm : (bpm10s ?? bpm5s ?? liveBpm);

  // 平滑更新显示的心率数字
  useEffect(() => {
    let animationId: number;
    let lastUpdateTime = 0;

    const updateDisplay = (timestamp: number) => {
      if (timestamp - lastUpdateTime >= BPM_CALCULATION_CONSTANTS.UPDATE_INTERVAL) {
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

          return Math.round(prev + diff * BPM_CALCULATION_CONSTANTS.SMOOTHING_FACTOR);
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
      setAccuracyHint(t.stableHint);
    } else if (newBeatCount === 3 && !accuracyHint) {
      setAccuracyHint(t.keepTappingHint);
    }
  }, [isFrozen, triggerTapPulse, isMobile, beatCount, accuracyHint, t]);

  // 当测量开始时，自动将焦点转移到tap-surface按钮
  useEffect(() => {
    if (beats.length > 0 && !isFrozen) {
      setTimeout(() => {
        const tapSurfaceButton = document.querySelector('.tap-surface') as HTMLButtonElement;
        if (tapSurfaceButton) {
          tapSurfaceButton.focus();
        }
      }, 100);
    }
  }, [beats.length, isFrozen]);

  const freeze = useCallback(() => {
    if (isFrozen) return;
    const bpmToFreeze = bpm10s ?? bpm5s ?? liveBpm;
    if (!bpmToFreeze) return;
    setIsFrozen(true);
    setFrozenBpm(bpmToFreeze);
    setDisplayBpm(bpmToFreeze);
  }, [bpm10s, bpm5s, liveBpm, isFrozen]);

  const resetMeasurement = useCallback(() => {
    setIsFrozen(false);
    setFrozenBpm(null);
    setBeats([]);
    setDisplayBpm(null);
    setBeatCount(0);
    setAccuracyHint(null);
  }, []);

  const state: HeartRateState = {
    beats,
    isFrozen,
    frozenBpm,
    displayBpm,
    viewMode,
    tapPulse,
    beatCount,
    accuracyHint
  };

  return {
    state,
    computed: {
      liveBpm,
      bpm5s,
      bpm10s,
      currentBpm,
      isMobile
    },
    actions: {
      handleBeat,
      freeze,
      setViewMode,
      resetMeasurement
    }
  };
};
