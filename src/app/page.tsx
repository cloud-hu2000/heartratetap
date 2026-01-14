"use client";

import { lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { COPY } from "@/lib/constants";

// Hooks
import { useLanguage } from "@/hooks/useLanguage";
import { useHeartRate } from "@/hooks/useHeartRate";
import { useHistory } from "@/hooks/useHistory";
import { useUIState } from "@/hooks/useUIState";

// Components
import HeroSection from "@/components/HeroSection";
import MembershipBanner from "@/components/MembershipBanner";
import PulseZone from "@/components/PulseZone";
import HistoryPanel from "@/components/HistoryPanel";
import RoadmapPreview from "@/components/RoadmapPreview";
import Footer from "@/components/Footer";
import TutorialOverlay from "@/components/TutorialOverlay";
import UpgradeModal from "@/components/UpgradeModal";

// Lazy load non-critical components
const FeedbackWidget = lazy(() => import("@/components/FeedbackWidget"));
const SEOContent = lazy(() => import("@/components/SEOContent").then(module => ({ default: module.SEOContent })));

const HeartRatePage = () => {
  const { hasPermission, user } = useAuth();

  // 使用自定义 hooks
  const { lang, changeLanguage } = useLanguage();
  const { state: heartRateState, computed, actions: heartRateActions } = useHeartRate();
  const { state: uiState, actions: uiActions } = useUIState();
  const {
    history,
    pagedHistory,
    totalHistoryPages,
    clampedHistoryPage,
    showUpgradePrompt,
    trendLabel,
    chartData,
    actions: historyActions
  } = useHistory({ lang, hasPermission });

  // 冻结心率并添加到历史记录
  const handleFreeze = () => {
    heartRateActions.freeze();
    if (heartRateState.displayBpm) {
      historyActions.appendHistory(heartRateState.displayBpm, heartRateState.viewMode);
    }
  };

  return (
    <div className="frame">
      <MembershipBanner user={user} />

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

        {showUpgradePrompt && <UpgradeModal onClose={historyActions.handleCancelUpgrade} />}
      </main>

      <RoadmapPreview lang={lang} />

      <Suspense fallback={<div>Loading...</div>}>
        <SEOContent lang={lang} />
      </Suspense>

      <Footer />

      <Suspense fallback={<div>Loading feedback...</div>}>
        <FeedbackWidget />
      </Suspense>
    </div>
  );
};

export default function Page() {
  return <HeartRatePage />;
}

