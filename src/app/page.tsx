"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import FeedbackWidget from "@/components/FeedbackWidget";

type ViewMode = "rest" | "sport";

const COPY = {
  heroTitle: "Heart Rhythm Studio",
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
};

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

const analysisFor = (mode: ViewMode, bpm: number | null): string => {
  if (!bpm) {
    return COPY.status.waiting;
  }
  if (mode === "rest") {
    if (bpm < 60) return COPY.advice.rest.low;
    if (bpm <= 90) return COPY.advice.rest.ideal;
    return COPY.advice.rest.high;
  }
  if (bpm < 120) return COPY.advice.sport.warm;
  if (bpm < 150) return COPY.advice.sport.burn;
  return COPY.advice.sport.cardio;
};

const HeartRatePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("rest");
  const [beats, setBeats] = useState<number[]>([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenBpm, setFrozenBpm] = useState<number | null>(null);
  const [displayBpm, setDisplayBpm] = useState<number | null>(null);

  // 计算三种心率方式
  const liveBpm = useMemo(() => computeBpm(beats), [beats]);
  const bpm5s = useMemo(() => computeBpmByCount(beats, 5000), [beats]);
  const bpm10s = useMemo(() => computeBpmByCount(beats, 10000), [beats]);
  
  // 选择显示的心率（优先使用10秒，其次5秒，最后是间隔计算）
  const currentBpm = isFrozen ? frozenBpm : (bpm10s ?? bpm5s ?? liveBpm);

  // 平滑更新显示的心率数字 - 使用统一的定时器
  useEffect(() => {
    const interval = setInterval(() => {
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
        // 每次更新20%的差值，实现平滑过渡
        return Math.round(prev + diff * 0.2);
      });
    }, 50); // 每50ms更新一次
    
    return () => clearInterval(interval);
  }, [currentBpm]);

  const handleBeat = useCallback(() => {
    // 如果已停止，点击开始则清零重新测量，并记录第一次点击
    if (isFrozen) {
      setIsFrozen(false);
      setFrozenBpm(null);
      setBeats([]);
      setDisplayBpm(null);
      // 清零后立即记录第一次点击
      const now = performance.now();
      setBeats([now]);
      return;
    }
    const now = performance.now();
    setBeats((prev) => {
      const next = [...prev, now];
      return next.slice(-16);
    });
  }, [isFrozen]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleBeat();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleBeat]);

  const freeze = useCallback(() => {
    const bpmToFreeze = bpm10s ?? bpm5s ?? liveBpm;
    if (!bpmToFreeze) return;
    setIsFrozen(true);
    setFrozenBpm(bpmToFreeze);
    setDisplayBpm(bpmToFreeze);
  }, [bpm10s, bpm5s, liveBpm]);


  const statusLabel = isFrozen
    ? COPY.status.frozen
    : beats.length > 1
      ? COPY.status.measuring
      : COPY.status.waiting;

  // 只在停止后显示建议
  const analysisText = isFrozen ? analysisFor(viewMode, displayBpm ?? null) : null;

  return (
    <div className="frame">
      <section className="panel hero">
        <div>
          <p className="hero-sub">{COPY.heroSub}</p>
          <h1 className="hero-title">Click to Know Your Heartbeat Anytime, Anywhere</h1>
        </div>
      </section>

      <main className="canvas">
        <section className={`panel pulse-zone ${beats.length === 0 ? "pulse-zone-idle" : ""} ${isFrozen ? "pulse-zone-frozen" : ""}`}>
          <div className="pulse-zone-header">
            <div className="metric">
              {displayBpm ?? "--"}
              <span style={{ fontSize: "1rem", marginLeft: "0.5rem", color: "var(--muted)" }}>
                bpm
              </span>
            </div>
            <p className="status-label">{statusLabel}</p>
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
              <div className="heart-icon">❤️</div>
              <p className="idle-hint">Ready to measure your heart rate</p>
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
                {COPY.restLabel}
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
                {COPY.sportLabel}
              </button>
            </div>
          )}

          <div className="zone-bar">
            {displayBpm && (
              <span
                className="zone-indicator"
                style={{ left: `${clampIndicator(displayBpm)}%` }}
              />
            )}
            {!displayBpm && (
              <div className="zone-bar-placeholder">
                <span className="zone-bar-hint">Heart rate zone indicator</span>
              </div>
            )}
          </div>

          {analysisText && (
            <div className="analysis">
              <div className="analysis-icon">✓</div>
              <div className="analysis-text">{analysisText}</div>
            </div>
          )}

          <div className="tap-surface" onPointerDown={handleBeat}>
            <p style={{ margin: 0, fontSize: "1.15rem" }}>{COPY.tapHint}</p>
          </div>

          <div className="controls">
            <button type="button" className="pill active" onClick={freeze}>
              {COPY.stop}
            </button>
          </div>
        </section>

        <section className="panel">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            {COPY.diagramTitle}
          </p>
          <div className="diagram">
            <Image
              src="/pause.png"
              alt={COPY.diagramTitle}
              width={400}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </section>
      </main>

      {/* SEO Content Section */}
      <section className="panel seo-content" style={{ marginTop: "2rem" }}>
        
        <div style={{ lineHeight: "1.8", color: "var(--ink)" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Our <strong>real-time heart rate monitor</strong> allows you to <strong>click to test your heart rate</strong> instantly without any devices or downloads. Simply tap the page or press the spacebar in rhythm with your pulse, and our system will automatically calculate your heart rate. This <strong>online heart rate test</strong> provides immediate results, making it perfect for quick <strong>heart rate detection</strong> and <strong>real-time monitoring</strong>.
          </p>

          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem" }}>
            How to Use This Heart Rate Monitor
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Using our <strong>heart rate detection</strong> tool is simple and requires no special equipment. Here&apos;s how to get started with your <strong>real-time heart rate</strong> measurement:
          </p>
          <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Find your pulse:</strong> Place your fingers on your wrist (radial artery) or neck (carotid artery) to feel your heartbeat.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Start clicking:</strong> Click the tap surface or press the spacebar each time you feel a heartbeat. The system will track your rhythm in real-time.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Monitor your heart rate:</strong> Watch as your <strong>heart rate</strong> is calculated and displayed instantly. The tool uses advanced algorithms to provide accurate <strong>real-time monitoring</strong>.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Stop and review:</strong> Click the stop button to lock your result and see personalized recommendations based on your heart rate.
            </li>
          </ol>

          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem" }}>
            Understanding Your Heart Rate Results
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Your <strong>heart rate detection</strong> results can help you understand your cardiovascular health. The tool provides <strong>real-time monitoring</strong> for both resting and active heart rates, giving you insights into your fitness level and overall health.
          </p>

          <h2 id="resting-heart-rate" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem", scrollMarginTop: "2rem" }}>
            Resting Heart Rate Reference Values
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Resting heart rate is your heart rate when you&apos;re at rest, typically measured in the morning before any activity. Use our <strong>click to test heart rate</strong> feature to measure your resting heart rate and compare it with these reference values:
          </p>
          
          <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "var(--accent-soft)", borderBottom: "2px solid var(--accent)" }}>
                  <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600" }}>Age Group</th>
                  <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "600" }}>Men (bpm)</th>
                  <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "600" }}>Women (bpm)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>18-25 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>60-90</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>60-90</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>26-35 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>60-95</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>60-95</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>36-45 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>62-98</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>62-98</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>46-55 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>64-100</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>64-100</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>56-65 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>66-100</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>66-100</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem" }}>65+ years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>68-100</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>68-100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "2rem", fontStyle: "italic" }}>
            Note: Well-trained athletes may have resting heart rates as low as 40-60 bpm. If your resting heart rate is consistently above 100 bpm (tachycardia) or below 60 bpm (bradycardia) and you experience symptoms, consult a healthcare professional.
          </p>

          <h2 id="exercise-heart-rate" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem", scrollMarginTop: "2rem" }}>
            Exercise Heart Rate Reference Values
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            During exercise, your heart rate increases to supply more oxygen to your muscles. Use our <strong>real-time heart rate monitor</strong> in active mode to track your exercise heart rate. Here are target heart rate zones based on age and gender:
          </p>

          <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", marginTop: "2rem", marginBottom: "1rem" }}>
            Target Heart Rate Zones (50-85% of Maximum Heart Rate)
          </h3>
          
          <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "var(--accent-soft)", borderBottom: "2px solid var(--accent)" }}>
                  <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600" }}>Age Group</th>
                  <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "600" }}>Men (bpm)</th>
                  <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "600" }}>Women (bpm)</th>
                  <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: "600" }}>Max HR</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>18-25 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>98-166</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>98-166</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>195</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>26-35 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>97-165</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>97-165</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>194</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>36-45 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>93-157</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>93-157</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>185</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>46-55 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>88-149</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>88-149</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>175</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.75rem" }}>56-65 years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>83-141</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>83-141</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>166</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem" }}>65+ years</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>78-132</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>78-132</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>155</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", marginTop: "2rem", marginBottom: "1rem" }}>
            Exercise Intensity Zones
          </h3>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Light Activity (50-60% max HR):</strong> Warm-up, recovery, and gentle exercise. Good for beginners and active recovery.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Moderate Activity (60-70% max HR):</strong> Fat-burning zone. Ideal for weight management and building endurance.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Vigorous Activity (70-85% max HR):</strong> Cardiovascular fitness zone. Improves heart and lung function, builds aerobic capacity.
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <strong>Maximum Effort (85-100% max HR):</strong> Anaerobic zone. Short bursts for advanced athletes. Use with caution.
            </li>
          </ul>

          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem" }}>
            Accuracy and Limitations
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Our <strong>online heart rate test</strong> provides a convenient way to <strong>click to test your heart rate</strong> and get <strong>real-time monitoring</strong>. However, it&apos;s important to understand that this tool is designed for general fitness and wellness purposes. The accuracy depends on your ability to tap consistently with your pulse.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            For medical diagnosis or if you have concerns about your heart rate, please consult a healthcare professional. This <strong>heart rate detection</strong> tool should not replace professional medical advice or monitoring equipment.
          </p>

          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginTop: "2.5rem", marginBottom: "1rem" }}>
            Start Your Heart Rate Test Now
          </h2>
          <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            Ready to begin? Use our <strong>real-time heart rate monitor</strong> above to <strong>click to test your heart rate</strong> instantly. No download required, no devices needed—just tap and get immediate results. Start your <strong>heart rate detection</strong> and <strong>real-time monitoring</strong> journey today!
          </p>
        </div>
      </section>

      <footer className="footnote">© {new Date().getFullYear()} Heart Rhythm Studio</footer>
      <FeedbackWidget />
    </div>
  );
};

export default function Page() {
  return <HeartRatePage />;
}

