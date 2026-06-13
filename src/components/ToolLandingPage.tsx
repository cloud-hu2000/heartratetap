"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useHeartRate } from "@/hooks/useHeartRate";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/hooks/useLanguage";
import HistoryPanel from "@/components/HistoryPanel";
import PulseZone from "@/components/PulseZone";
import Footer from "@/components/Footer";

type ToolLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  useCases: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export default function ToolLandingPage({
  eyebrow,
  title,
  description,
  primaryKeyword,
  secondaryKeywords,
  useCases,
  faqs
}: ToolLandingPageProps) {
  const { hasPermission } = useAuth();
  const { lang, changeLanguage } = useLanguage();
  const { state: heartRateState, computed, actions: heartRateActions } = useHeartRate();
  const {
    history,
    historyPage,
    pagedHistory,
    totalHistoryPages,
    clampedHistoryPage,
    trendLabel,
    chartData,
    actions: historyActions
  } = useHistory({ lang, hasPermission });

  const handleFreeze = () => {
    heartRateActions.freeze();
    if (heartRateState.displayBpm) {
      historyActions.appendHistory(heartRateState.displayBpm, heartRateState.viewMode);
    }
  };

  return (
    <div className="frame tool-landing-page">
      <main className="tool-hero" aria-labelledby="tool-landing-title">
        <section className="tool-hero-copy">
          <p className="tool-eyebrow">{eyebrow}</p>
          <h1 id="tool-landing-title">{title}</h1>
          <p className="tool-intro">{description}</p>
          <div className="tool-keyword-row" aria-label="Related heart rate tools">
            <span>{primaryKeyword}</span>
            {secondaryKeywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <div className="tool-language-row" aria-label="Language">
            <button
              type="button"
              className={`pill ${lang === "en" ? "active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`pill ${lang === "es" ? "active" : ""}`}
              onClick={() => changeLanguage("es")}
            >
              ES
            </button>
          </div>
        </section>

        <div className="tool-hero-monitor">
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
        </div>
      </main>

      <section className="tool-support-grid" aria-label="Heart rate monitor details">
        <article className="panel tool-info-panel">
          <h2>How to use this online heart rate tool</h2>
          <ol>
            <li>Find your pulse on your wrist or neck and sit still for a few seconds.</li>
            <li>Tap the heart area each time you feel a beat. Keep tapping for at least 10 steady beats.</li>
            <li>Press Stop to lock your BPM, review the guidance, and repeat if the rhythm felt uneven.</li>
          </ol>
        </article>

        <article className="panel tool-info-panel">
          <h2>Best moments to check</h2>
          <ul>
            {useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </article>

        <HistoryPanel
          lang={lang}
          history={history}
          historyPage={historyPage}
          pagedHistory={pagedHistory}
          totalHistoryPages={totalHistoryPages}
          clampedHistoryPage={clampedHistoryPage}
          trendLabel={trendLabel}
          chartData={chartData}
          onExportHistory={historyActions.exportHistoryToCSV}
          onClearHistory={historyActions.clearHistory}
          onSetHistoryPage={historyActions.setHistoryPage}
        />
      </section>

      <section className="panel tool-info-panel tool-faq">
        <h2>Online heart rate checker FAQ</h2>
        <div className="tool-faq-grid">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel tool-info-panel tool-blog-links">
        <h2>Learn more, then measure here</h2>
        <p>
          These guides stay informational, while the landing pages keep the measurement tool front and center.
        </p>
        <div className="tool-link-grid">
          <Link href="/blog/free-online-heart-rate-checker">Free online heart rate checker guide</Link>
          <Link href="/blog/free-online-heart-rate-monitor">Free online heart rate monitor guide</Link>
          <Link href="/blog/heart-rate-monitor-online">Heart rate monitor online trust guide</Link>
          <Link href="/blog/daily-resting-heart-rate-check">Daily resting heart rate check</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
