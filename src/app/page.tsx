"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import FeedbackWidget from "@/components/FeedbackWidget";
import RedditShareCTA from "@/components/RedditShareCTA";
import { SEOContent } from "@/components/SEOContent";
import { useAuth } from "@/contexts/AuthContext";

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

const COPY = {
  en: {
  heroTitle: "Heart Rhythm Studio",
    heroHeadline: "Free Online Heart Rate Monitor – Check Your Heart Rate Online Free",
  heroSub: "Heart rate calculator",
  tapHint: "Tap pulse or hit space",
  frozenTag: "Result locked",
  diagramTitle: "Pulse map",
  diagramWrist: "Wrist",
  diagramNeck: "Neck",
  restLabel: "Rest",
  sportLabel: "Active",
  stop: "Stop",
  resume: "Reset",
    idleHint: "Ready to measure your heart rate",
    zoneHint: "Heart rate zone indicator",
    historyTitle: "Recent heart rate history",
    historyEmpty: "Once you lock a result, your last 20 readings will appear here — only stored in this browser.",
    historyMetaWorkout: "Workout",
    historyMetaRest: "Rest / calm",
    historyNewer: "Newer",
    historyOlder: "Older",
    historyPage: "Page",
    historyOf: "of",
    trendStable: "Relatively stable across recent measurements",
    trendHigher: "Trending slightly higher in recent checks",
    trendLower: "Trending slightly lower in recent checks",
    roadmapTitle: "Product roadmap",
    roadmapHeading: "See what the community is voting for next",
    roadmapDesc:
      "Ideas you share in the feedback box are connected to our public roadmap. Visit the roadmap to upvote your favorite ideas, track progress, and see what's planned, in progress, or already shipped.",
    roadmapCta: "Open roadmap & top ideas",
    wantInfluence: "Want to influence what comes next?",
  status: {
    waiting: "Tap to begin",
    measuring: "Listening",
    frozen: "Saved"
  },
  advice: {
    rest: {
      low: "Below 60 bpm • breathe slowly and stay warm.",
      ideal: "60-90 bpm • calm circulation, hydrated and steady.",
      high: "Above 90 bpm • decompress, stretch, watch stimulants."
    },
    sport: {
      warm: "50-60% HRmax • gentle warm-up, build rhythm.",
      burn: "65-75% HRmax • fat-burn efficiency peaks here.",
      cardio: "80-90% HRmax • short bursts for cardio power."
    }
  }
    ,
    seoIntro:
      "Our real-time heart rate monitor lets you click to test your heart rate instantly without any devices or downloads. Tap or press the spacebar in rhythm with your pulse and receive immediate BPM and coaching.",
    seoHowToTitle: "How to Use This Heart Rate Monitor",
    seoHowToBody:
      "Using our heart rate detection tool is simple and requires no special equipment. Here’s how to get started:",
    seoSteps: [
      "Find your pulse at the wrist or neck.",
      "Tap the surface or press the spacebar with each heartbeat.",
      "Watch the BPM update in real time and click Stop to lock the result."
    ],
    seoUnderstandingTitle: "Understanding Your Heart Rate Results",
    seoUnderstandingBody:
      "Your heart rate results can help you understand your cardiovascular health. The tool provides real-time monitoring for both resting and active heart rates, giving you insights into fitness and overall health.",
    seoStartTitle: "Start Your Heart Rate Test Now",
    seoStartBody:
      "Ready to begin? Use our real-time heart rate monitor to check your heart rate online instantly. No downloads, no devices—just tap and measure."
    ,
    restingTitle: "Resting Heart Rate Reference Values",
    restingIntro:
      "Resting heart rate is your heart rate when you're at rest, typically measured in the morning before any activity. Use our click to test heart rate feature to measure your resting heart rate and compare it with these reference values:",
    ageGroup: "Age Group",
    menBpm: "Men (bpm)",
    womenBpm: "Women (bpm)",
    note:
      "Note: Well-trained athletes may have resting heart rates as low as 40-60 bpm. If your resting heart rate is consistently above 100 bpm (tachycardia) or below 60 bpm (bradycardia) and you experience symptoms, consult a healthcare professional.",
    exerciseTitle: "Exercise Heart Rate Reference Values",
    exerciseIntro:
      "During exercise, your heart rate increases to supply more oxygen to your muscles. Use our real-time heart rate monitor in active mode to track your exercise heart rate. Here are target heart rate zones based on age and gender:",
    targetZonesTitle: "Target Heart Rate Zones (50-85% of Maximum Heart Rate)",
    intensityTitle: "Exercise Intensity Zones",
    intensityList: [
      "Light Activity (50-60% max HR): Warm-up, recovery, and gentle exercise. Good for beginners and active recovery.",
      "Moderate Activity (60-70% max HR): Fat-burning zone. Ideal for weight management and building endurance.",
      "Vigorous Activity (70-85% max HR): Cardiovascular fitness zone. Improves heart and lung function, builds aerobic capacity.",
      "Maximum Effort (85-100% max HR): Anaerobic zone. Short bursts for advanced athletes. Use with caution."
    ],
    accuracyTitle: "Accuracy and Limitations",
    accuracyBody:
      "Our online heart rate test provides a convenient way to click to test your heart rate and get real-time monitoring. However, it's important to understand that this tool is designed for general fitness and wellness purposes. The accuracy depends on your ability to tap consistently with your pulse.",
    targetMaxHr: "Max HR"
  },
  es: {
    heroTitle: "Estudio del ritmo cardíaco",
    heroHeadline: "Monitor de frecuencia cardíaca en línea gratuito: comprueba tu pulso gratis",
    heroSub: "Calculadora de frecuencia cardíaca",
    tapHint: "Toca al ritmo del pulso o pulsa la barra espaciadora",
    frozenTag: "Resultado guardado",
    diagramTitle: "Mapa del pulso",
    diagramWrist: "Muñeca",
    diagramNeck: "Cuello",
    restLabel: "Reposo",
    sportLabel: "Actividad",
    stop: "Detener",
    resume: "Reiniciar",
    idleHint: "Listo para medir tu frecuencia cardíaca",
    zoneHint: "Indicador de zona de frecuencia cardíaca",
    historyTitle: "Historial reciente de frecuencia cardíaca",
    historyEmpty:
      "Cuando guardes un resultado, tus últimas 20 lecturas aparecerán aquí — solo se almacenan en este navegador.",
    historyMetaWorkout: "Entrenamiento",
    historyMetaRest: "Reposo / calma",
    historyNewer: "Más recientes",
    historyOlder: "Más antiguas",
    historyPage: "Página",
    historyOf: "de",
    trendStable: "Relativamente estable en las mediciones recientes",
    trendHigher: "Tendencia ligeramente más alta en las mediciones recientes",
    trendLower: "Tendencia ligeramente más baja en las mediciones recientes",
    roadmapTitle: "Hoja de ruta del producto",
    roadmapHeading: "Mira qué está votando la comunidad",
    roadmapDesc:
      "Las ideas que compartes en el panel de feedback están conectadas a nuestra hoja de ruta pública. Visítala para votar, seguir el progreso y ver lo planificado, en progreso o ya entregado.",
    roadmapCta: "Abrir hoja de ruta e ideas principales",
    wantInfluence: "¿Quieres influir en lo que sigue?",
    status: {
      waiting: "Toca para empezar",
      measuring: "Escuchando",
      frozen: "Guardado"
    },
    advice: {
      rest: {
        low: "Por debajo de 60 lpm • respira lento y mantente abrigado.",
        ideal: "60-90 lpm • circulación calmada, hidratado y estable.",
        high: "Más de 90 lpm • relájate, estira y limita estimulantes."
      },
      sport: {
        warm: "50-60% FCmáx • calentamiento suave, crea ritmo.",
        burn: "65-75% FCmáx • máxima eficiencia de quema de grasa.",
        cardio: "80-90% FCmáx • ráfagas cortas para potencia cardiovascular."
      }
    }
    ,
    seoIntro:
      "Nuestro monitor de frecuencia cardíaca en tiempo real te permite medir tu pulso al instante sin dispositivos ni descargas. Toca o pulsa la barra espaciadora al ritmo de tu pulso y obtén BPM inmediato y recomendaciones.",
    seoHowToTitle: "Cómo usar este monitor de frecuencia cardíaca",
    seoHowToBody:
      "Usar nuestra herramienta de detección es sencillo y no requiere equipos especiales. Así es como empezar:",
    seoSteps: [
      "Encuentra tu pulso en la muñeca o el cuello.",
      "Toca la pantalla o pulsa la barra espaciadora con cada latido.",
      "Observa el BPM en tiempo real y pulsa Detener para guardar el resultado."
    ],
    seoUnderstandingTitle: "Cómo interpretar tus resultados",
    seoUnderstandingBody:
      "Tus resultados pueden ayudarte a comprender la salud cardiovascular. La herramienta ofrece monitorización en tiempo real tanto para la frecuencia en reposo como en actividad, brindándote información sobre tu forma física y salud general.",
    seoStartTitle: "Comienza tu prueba de frecuencia cardíaca ahora",
    seoStartBody:
      "¿Listo para empezar? Usa nuestro monitor en tiempo real para comprobar tu frecuencia cardíaca al instante. Sin descargas, sin dispositivos — solo toca y mide."
    ,
    restingTitle: "Valores de referencia de frecuencia cardíaca en reposo",
    restingIntro:
      "La frecuencia cardíaca en reposo es la que tienes cuando estás en reposo, normalmente medida por la mañana antes de cualquier actividad. Usa nuestra función de prueba para medir tu frecuencia en reposo y compárala con estos valores de referencia:",
    ageGroup: "Grupo de edad",
    menBpm: "Hombres (lpm)",
    womenBpm: "Mujeres (lpm)",
    note:
      "Nota: Los atletas bien entrenados pueden tener frecuencias en reposo de 40-60 lpm. Si tu frecuencia está consistentemente por encima de 100 lpm o por debajo de 60 lpm y tienes síntomas, consulta a un profesional sanitario.",
    exerciseTitle: "Valores de frecuencia cardíaca durante el ejercicio",
    exerciseIntro:
      "Durante el ejercicio, tu frecuencia aumenta para suministrar más oxígeno a los músculos. Usa nuestro monitor en modo activo para seguir tu frecuencia durante el ejercicio. Aquí tienes las zonas objetivo según la edad:",
    targetZonesTitle: "Zonas objetivo (50-85% de la frecuencia máxima)",
    intensityTitle: "Zonas de intensidad del ejercicio",
    intensityList: [
      "Actividad ligera (50-60% FCmáx): Calentamiento, recuperación y ejercicio suave. Bueno para principiantes y recuperación activa.",
      "Actividad moderada (60-70% FCmáx): Zona de quema de grasa. Ideal para controlar el peso y mejorar la resistencia.",
      "Actividad vigorosa (70-85% FCmáx): Zona cardiovascular. Mejora la función cardíaca y pulmonar y la capacidad aeróbica.",
      "Esfuerzo máximo (85-100% FCmáx): Zona anaeróbica. Ráfagas cortas para atletas avanzados. Usar con precaución."
    ],
    accuracyTitle: "Precisión y limitaciones",
    accuracyBody:
      "Nuestra prueba en línea ofrece una manera conveniente de medir tu frecuencia y obtener monitorización en tiempo real. Sin embargo, está diseñada para bienestar y fitness; la precisión depende de que toques de forma consistente con tu pulso.",
    targetMaxHr: "FC máx"
  }
} as const;

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

const HeartRatePage = () => {
  const { hasPermission, user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("rest");
  const [beats, setBeats] = useState<number[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenBpm, setFrozenBpm] = useState<number | null>(null);
  const [displayBpm, setDisplayBpm] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [tapPulse, setTapPulse] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [lang, setLang] = useState<"en" | "es">("en");
  const lastBeatTime = useRef<number>(0);

  // 移动端检测和优化
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [accuracyHint, setAccuracyHint] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as "en" | "es" | null;
    if (stored === "es" || stored === "en") {
      setLang(stored);
      document.documentElement.lang = stored;
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

    const onStorage = (ev: StorageEvent) => {
      if (ev.key === LANG_STORAGE_KEY) {
        const val = ev.newValue as "en" | "es" | null;
        if (val === "en" || val === "es") {
          setLang(val);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "es" : "en";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
        document.documentElement.lang = next;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

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

    // 检查会员权限
    if (!hasPermission('export_data')) {
      setShowUpgradePrompt(true);
      return;
    }

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
  }, [history, hasPermission]);

  // 清除历史数据
  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      if (confirm("Are you sure you want to clear all heart rate history? This action cannot be undone.")) {
        setHistory([]);
        window.localStorage.removeItem(HISTORY_STORAGE_KEY);
      }
    }
  }, []);

  // 处理升级会员
  const handleUpgradeClick = useCallback(() => {
    setShowUpgradePrompt(false);
    window.location.href = '/pricing';
  }, []);

  // 取消升级提示
  const handleCancelUpgrade = useCallback(() => {
    setShowUpgradePrompt(false);
  }, []);

  // Portal-based upgrade modal so it overlays entire viewport regardless of parent stacking contexts
  const UpgradeModalPortal = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
      <div className="upgrade-modal-overlay" onClick={onClose}>
        <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
          <div className="upgrade-modal-header">
            <h3>Upgrade to Export Data</h3>
            <button
              type="button"
              className="upgrade-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="upgrade-modal-body">
            <div className="upgrade-modal-icon">📊</div>
            <p className="upgrade-modal-message">
              Data export is available for Professional and Premium plans. Upgrade your membership to unlock this feature and get access to advanced analytics.
            </p>
            <div className="upgrade-modal-features">
              <h4>Professional Plan includes:</h4>
              <ul>
                <li>✅ Data export (CSV)</li>
                <li>✅ Advanced health insights</li>
                <li>✅ Trend analysis</li>
                <li>✅ Ad-free experience</li>
              </ul>
            </div>
          </div>
          <div className="upgrade-modal-actions">
            <button
              type="button"
              className="pill"
              onClick={onClose}
            >
              Maybe Later
            </button>
            <button
              type="button"
              className="pill active"
              onClick={handleUpgradeClick}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

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

  // Removed global space key listener - now handled by tap-surface button

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
      {/* Membership Status Banner */}
      {user && (
        <div className="membership-banner">
          <div className="membership-content">
            <div className="membership-info">
              <span className="membership-tier">
                {user.account_tier === 'free' && 'Free Plan'}
                {user.account_tier === 'basic' && 'Professional Plan'}
                {user.account_tier === 'pro' && 'Premium Plan'}
                {user.account_tier === 'enterprise' && 'Enterprise Plan'}
              </span>
              {user.account_tier === 'free' && (
                <span className="membership-upgrade">
                  Upgrade for advanced features like data export and personalized reports
                </span>
              )}
            </div>
            {user.account_tier === 'free' && (
              <Link href="/pricing" className="membership-upgrade-button">
                Upgrade Now
              </Link>
            )}
          </div>
        </div>
      )}

      <section className="panel hero">
        <p className="hero-sub">{t.heroSub}</p>
        <h1 className="hero-title">{t.heroHeadline}</h1>
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

        {/* 升级会员提示对话框（通过 portal 渲染） */}
        {showUpgradePrompt && <UpgradeModalPortal onClose={handleCancelUpgrade} />}
      </main>

      <section className="panel roadmap-preview section-margin-top">
        <p className="hero-sub hero-sub-margin">
          {t.roadmapTitle}
        </p>
        <h2 className="roadmap-preview-title">{t.roadmapHeading}</h2>
        <p className="roadmap-desc">{t.roadmapDesc}</p>
        <Link href="/roadmap" className="pill active">
          {t.roadmapCta}
        </Link>
      </section>

      <RedditShareCTA />

      <SEOContent lang={lang} />
      <footer className="footnote footer-block">
        <div className="footer-head">
          <div className="footer-brand">
            <span className="footer-name">HeartRateTap</span>
            <span className="footer-dot">•</span>
            <span>© {new Date().getFullYear()} Heart Rhythm Studio</span>
          </div>
          <div className="footer-links">
            <Link href="/privacy-policy" className="blog-inline-cta">
              Privacy Policy
            </Link>
          </div>
        </div>

        <p className="footer-text">
          HeartRateTap is a free, zero-device online heart rate checker. We aim to let everyone track heart rate anytime
          with simple taps—no apps or hardware required. Your measurements stay in your browser by default and we do not
          sell data. Share your ideas through the feedback panel to help us improve the experience together.
        </p>

        <div className="footer-row footer-row-center">
          <span className="footer-label">Contact</span>
          <div className="footer-contact">
            <Link href="mailto:cloudhu2000@gmail.com" className="blog-inline-cta">
              cloudhu2000@gmail.com
            </Link>
            <span className="footer-sep">/</span>
            <Link href="mailto:cloudhu2000@zohomail.cn" className="blog-inline-cta">
              cloudhu2000@zohomail.cn
            </Link>
          </div>
        </div>

        <p className="footer-text">
          Terms of Service: By using HeartRateTap you agree this tool is for personal wellness reference only and does
          not provide medical diagnosis or treatment advice—doctor&apos;s judgment prevails. Results may be affected by
          how you tap and your device environment and cannot serve as accurate medical test results. If you disagree,
          please stop using this site.
        </p>

        <style jsx>{`
          .topbar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0;
          }
          .topbar .pill {
            min-width: 180px;
            padding: 0.6rem 1.1rem;
            font-weight: 700;
            text-align: center;
            border-radius: 999px;
          }
          :global(.upgrade-modal-overlay) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1rem;
            backdrop-filter: blur(2px);
          }
          :global(.upgrade-modal) {
            background: var(--bg, #ffffff);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
          }
          :global(.upgrade-modal-header) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 1.5rem 1rem;
            border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.08));
          }
          :global(.upgrade-modal-header h3) {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--ink, #000);
          }
          :global(.upgrade-modal-close) {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--muted, #666);
            cursor: pointer;
            padding: 0.25rem;
            line-height: 1;
            border-radius: 4px;
            transition: all 0.2s;
          }
          :global(.upgrade-modal-close:hover) {
            background: var(--line, rgba(255, 255, 255, 0.08));
            color: var(--ink, #000);
          }
          :global(.upgrade-modal-body) {
            padding: 1.5rem;
            text-align: center;
          }
          :global(.upgrade-modal-icon) {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          :global(.upgrade-modal-message) {
            margin: 0 0 1.5rem;
            color: var(--ink, #000);
            line-height: 1.6;
            font-size: 1rem;
          }
          :global(.upgrade-modal-features) {
            text-align: left;
            margin-bottom: 1.5rem;
          }
          :global(.upgrade-modal-features h4) {
            margin: 0 0 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            color: var(--ink, #000);
          }
          :global(.upgrade-modal-features ul) {
            margin: 0;
            padding-left: 1.25rem;
          }
          :global(.upgrade-modal-features li) {
            margin-bottom: 0.5rem;
            color: var(--muted, #666);
            font-size: 0.9rem;
          }
          :global(.upgrade-modal-actions) {
            display: flex;
            gap: 0.75rem;
            padding: 0 1.5rem 1.5rem;
            justify-content: center;
          }
          :global(.upgrade-modal-actions .pill) {
            flex: 1;
            min-width: 120px;
            padding: 0.75rem 1rem;
            font-weight: 600;
          }
          @media (max-width: 480px) {
            :global(.upgrade-modal-overlay) {
              padding: 0.5rem;
            }
            :global(.upgrade-modal) {
              max-width: none;
            }
            :global(.upgrade-modal-actions) {
              flex-direction: column;
            }
            :global(.upgrade-modal-actions .pill) {
              width: 100%;
            }
          }
          .footer-block {
            padding-top: 1.5rem;
            border-top: 1px solid var(--line, rgba(255, 255, 255, 0.08));
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .footer-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .footer-brand {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: 600;
          }
          .footer-name {
            font-size: 1rem;
          }
          .footer-dot {
            opacity: 0.6;
          }
          .footer-links {
            display: flex;
            gap: 0.75rem;
          }
          .footer-text {
            margin: 0;
            color: var(--muted);
            line-height: 1.6;
          }
          .footer-row {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            flex-wrap: wrap;
            color: var(--muted);
          }
          .footer-row-center {
            justify-content: center;
            text-align: center;
          }
          .footer-label {
            font-weight: 600;
            color: var(--ink);
          }
          .footer-contact {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          }
          .footer-sep {
            opacity: 0.6;
          }
          .hero-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .hero-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          @media (max-width: 640px) {
            .footer-head {
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}</style>
      </footer>
        <FeedbackWidget />
      </div>
    );
  };

export default function Page() {
  return <HeartRatePage />;
}

