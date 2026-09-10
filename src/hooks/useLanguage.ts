import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Language } from "@/lib/types";
import { LANG_STORAGE_KEY } from "@/lib/heart-rate-constants";
import { localizePath } from "@/i18n/routing";

export const useLanguage = () => {
  const locale = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<Language>(locale);

  useEffect(() => {
    setLang(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    }
    router.push(localizePath(pathname, newLang));
  }, [pathname, router]);

  return {
    lang,
    changeLanguage
  };
};
