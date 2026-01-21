import { useState, useEffect, useCallback } from "react";
import { Language } from "@/lib/types";
import { LANG_STORAGE_KEY } from "@/lib/heart-rate-constants";

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (stored === "es" || stored === "en") {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const changeLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    }
  }, []);

  return {
    lang,
    changeLanguage
  };
};
