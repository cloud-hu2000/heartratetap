"use client";

import { HistoryEntry } from "@/lib/types";
import { formatTimestamp } from "@/lib/heart-rate-utils";
import { COPY } from "@/lib/constants";
import { HISTORY_PAGE_SIZE } from "@/lib/heart-rate-constants";

interface HistoryPanelProps {
  lang: "en" | "es";
  history: HistoryEntry[];
  historyPage: number;
  pagedHistory: HistoryEntry[];
  totalHistoryPages: number;
  clampedHistoryPage: number;
  trendLabel: string | null;
  chartData: {
    chartSource: HistoryEntry[];
    hasChart: boolean;
    chartBpms: number[];
    chartMin: number;
    chartMax: number;
    chartRange: number;
  };
  onExportHistory: () => void;
  onClearHistory: () => void;
  onSetHistoryPage: (page: number) => void;
}

export default function HistoryPanel({
  lang,
  history,
  historyPage,
  pagedHistory,
  totalHistoryPages,
  clampedHistoryPage,
  trendLabel,
  chartData,
  onExportHistory,
  onClearHistory,
  onSetHistoryPage
}: HistoryPanelProps) {
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  return (
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
              onClick={onExportHistory}
              title="Export history as CSV"
            >
              📊 Export
            </button>
            <button
              type="button"
              className="pill danger"
              onClick={onClearHistory}
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

          {chartData.hasChart && history.length > HISTORY_PAGE_SIZE && (
            <div className="history-chart">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                  points={chartData.chartSource
                    .map((entry, index) => {
                      const x = (index / Math.max(chartData.chartSource.length - 1, 1)) * 100;
                      const normalized = (entry.bpm - chartData.chartMin) / chartData.chartRange;
                      const y = 35 - normalized * 25;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              </svg>
              <div className="history-chart-caption">
                Last {chartData.chartSource.length} locked readings •{" "}
                <span>
                  {chartData.chartMin}–{chartData.chartMax} bpm
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
                    {formatTimestamp(entry.timestamp)}
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
                onClick={() => onSetHistoryPage(Math.max(historyPage - 1, 0))}
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
                  onSetHistoryPage(Math.min(historyPage + 1, Math.max(totalHistoryPages - 1, 0)))
                }
              >
                {t.historyOlder}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
