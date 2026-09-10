import { useState, useEffect, useCallback } from "react";
import { HistoryEntry, ViewMode } from "@/lib/types";
import { HISTORY_STORAGE_KEY, HISTORY_PAGE_SIZE } from "@/lib/heart-rate-constants";
import { createHistoryEntry, calculateTrendLabel, getChartData } from "@/lib/heart-rate-utils";
import { COPY } from "@/lib/constants";

interface UseHistoryProps {
  lang: "en" | "es";
}

export const useHistory = ({ lang }: UseHistoryProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyPage, setHistoryPage] = useState(0);

  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

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
    const entry = createHistoryEntry(bpm, mode);
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
      [t.csvTimestamp, "BPM", t.csvMode].join(","),
      ...history.map(entry => [
        new Date(entry.timestamp).toLocaleString(),
        entry.bpm,
        entry.context === "sport" ? t.sportLabel : entry.context === "rest" ? t.restLabel : t.csvUnknown
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
  }, [history, t]);

  // 清除历史数据
  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      if (confirm(t.clearHistoryConfirm)) {
        setHistory([]);
        window.localStorage.removeItem(HISTORY_STORAGE_KEY);
      }
    }
  }, [t]);


  // 计算分页和趋势
  const totalHistoryPages = Math.max(Math.ceil(history.length / HISTORY_PAGE_SIZE), 1);
  const clampedHistoryPage = Math.min(historyPage, totalHistoryPages - 1);
  const pagedHistory = history.slice(
    clampedHistoryPage * HISTORY_PAGE_SIZE,
    clampedHistoryPage * HISTORY_PAGE_SIZE + HISTORY_PAGE_SIZE
  );

  const trendLabel = calculateTrendLabel(history, t);
  const chartData = getChartData(history);

  return {
    history,
    historyPage,
    pagedHistory,
    totalHistoryPages,
    clampedHistoryPage,
    trendLabel,
    chartData,
    actions: {
      setHistoryPage,
      appendHistory,
      exportHistoryToCSV,
      clearHistory
    }
  };
};
