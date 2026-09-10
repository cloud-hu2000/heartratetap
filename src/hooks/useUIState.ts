import { useState, useEffect } from "react";
import { UIState } from "@/lib/types";
import { FIRST_TIME_KEY, TUTORIAL_SHOWN_KEY } from "@/lib/heart-rate-constants";
import { isMobileDevice } from "@/lib/heart-rate-utils";

export const useUIState = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [historyPage, setHistoryPage] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 检测移动设备
    setIsMobile(isMobileDevice());

    // 检查是否首次使用
    const hasUsedBefore = window.localStorage.getItem(FIRST_TIME_KEY);
    if (!hasUsedBefore) {
      setIsFirstTime(true);
      window.localStorage.setItem(FIRST_TIME_KEY, "true");
    }

    // 检查是否已显示教程
    const tutorialShown = window.localStorage.getItem(TUTORIAL_SHOWN_KEY);
    if (!tutorialShown && isMobileDevice()) {
      setShowTutorial(true);
    }
  }, []);

  const dismissTutorial = () => {
    setShowTutorial(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TUTORIAL_SHOWN_KEY, "true");
    }
  };

  const state: UIState = {
    isMobile,
    isFirstTime,
    showTutorial,
    historyPage
  };

  return {
    state,
    actions: {
      setHistoryPage,
      dismissTutorial
    }
  };
};
