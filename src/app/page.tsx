"use client";

import { lazy, Suspense } from "react";
import Image from "next/image";
import { COPY } from "@/lib/constants";

// Hooks
import { useLanguage } from "@/hooks/useLanguage";
import { useHeartRate } from "@/hooks/useHeartRate";
import { useHistory } from "@/hooks/useHistory";
import { useUIState } from "@/hooks/useUIState";

// Components
import HeroSection from "@/components/HeroSection";
import PulseZone from "@/components/PulseZone";
import HistoryPanel from "@/components/HistoryPanel";
import Footer from "@/components/Footer";
import PublisherContentAdditions from "@/components/PublisherContentAdditions";
import FAQStructuredData from "@/components/FAQStructuredData";
import { SEOContent } from "@/components/SEOContent";

// Lazy load non-critical components
const FeedbackWidget = lazy(() => import("@/components/FeedbackWidget"));

const HOME_FAQS = {
  en: [
  {
    question: "Why ask for at least 10 taps?",
    answer:
      "More intervals make one slightly early or late tap a smaller part of the average. Ten taps improve repeatability; they do not guarantee that the estimate matches a certified instrument."
  },
  {
    question: "Why can two correct attempts differ?",
    answer:
      "Heart rate can change from moment to moment, and tap timing also varies. Repeat in the same posture and conditions, and restart any attempt where you know a beat was missed or added."
  },
  {
    question: "What if the pulse feels irregular?",
    answer:
      "Do not use an averaged tap number to evaluate an irregular rhythm. Record what you noticed and seek appropriate professional advice, especially if the pattern repeats or symptoms are present."
  }
  ],
  es: [
    {
      question: "¿Por qué se piden al menos 10 toques?",
      answer:
        "Con más intervalos, un toque ligeramente adelantado o atrasado influye menos en el promedio. Diez toques mejoran la repetibilidad; no garantizan que la estimación coincida con un instrumento certificado."
    },
    {
      question: "¿Por qué pueden diferir dos intentos correctos?",
      answer:
        "La frecuencia cardíaca puede cambiar de un momento a otro y el ritmo de los toques también varía. Repite con la misma postura y en las mismas condiciones, y reinicia si sabes que omitiste o añadiste un latido."
    },
    {
      question: "¿Qué hago si el pulso parece irregular?",
      answer:
        "No uses un promedio de toques para evaluar un ritmo irregular. Anota lo que percibiste y busca orientación profesional adecuada, sobre todo si se repite o aparecen síntomas."
    }
  ]
};

const HeartRatePage = () => {
  // 使用自定义 hooks
  const { lang, changeLanguage } = useLanguage();
  const { state: heartRateState, computed, actions: heartRateActions } = useHeartRate(lang);
  const { state: uiState, actions: uiActions } = useUIState();
  const {
    history,
    pagedHistory,
    totalHistoryPages,
    clampedHistoryPage,
    trendLabel,
    chartData,
    actions: historyActions
  } = useHistory({ lang });

  // 冻结心率并添加到历史记录
  const handleFreeze = () => {
    heartRateActions.freeze();
    if (heartRateState.displayBpm) {
      historyActions.appendHistory(heartRateState.displayBpm, heartRateState.viewMode);
    }
  };

  return (
    <div className="frame">
      <HeroSection lang={lang} onLanguageChange={changeLanguage} />

      <main className="canvas">
        <PulseZone
          lang={lang}
          beats={heartRateState.beats}
          isFrozen={heartRateState.isFrozen}
          displayBpm={heartRateState.displayBpm}
          viewMode={heartRateState.viewMode}
          tapPulse={heartRateState.tapPulse}
          beatCount={heartRateState.beatCount}
          accuracyHint={heartRateState.accuracyHint}
          isMobile={computed.isMobile}
          currentBpm={computed.currentBpm}
          bpm5s={computed.bpm5s}
          bpm10s={computed.bpm10s}
          onBeat={heartRateActions.handleBeat}
          onFreeze={handleFreeze}
          onSetViewMode={heartRateActions.setViewMode}
        />

        <section className="panel">
          <p className="hero-sub hero-sub-margin">
            {COPY[lang].diagramTitle}
          </p>
          <div className="diagram">
            <picture>
              <source srcSet="/pause.avif" type="image/avif" />
              <source srcSet="/pause.webp" type="image/webp" />
              <Image
                src="/pause-optimized.png"
                alt={COPY[lang].diagramTitle}
                width={400}
                height={300}
                className="pause-image"
                priority={false}
              />
            </picture>
          </div>
        </section>

        <HistoryPanel
          lang={lang}
          history={history}
          historyPage={uiState.historyPage}
          pagedHistory={pagedHistory}
          totalHistoryPages={totalHistoryPages}
          clampedHistoryPage={clampedHistoryPage}
          trendLabel={trendLabel}
          chartData={chartData}
          onExportHistory={historyActions.exportHistoryToCSV}
          onClearHistory={historyActions.clearHistory}
          onSetHistoryPage={uiActions.setHistoryPage}
        />
      </main>

      {/* Keep the primary explanatory content in the initial document. It must not
          depend on a client-side lazy import for readers or crawlers to reach it. */}
      <SEOContent lang={lang} />

      <PublisherContentAdditions lang={lang} />
      <FAQStructuredData
        url={lang === "es" ? "https://www.heartratetap.com/es" : "https://www.heartratetap.com/"}
        items={HOME_FAQS[lang]}
      />

      <Footer />

      <Suspense fallback={<div>{lang === "es" ? "Cargando comentarios…" : "Loading feedback…"}</div>}>
        <FeedbackWidget />
      </Suspense>
    </div>
  );
};

export default function Page() {
  return <HeartRatePage />;
}
