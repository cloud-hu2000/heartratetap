export const locales = ["en", "es"] as const;
export const defaultLocale = "en" as const;

export type AppLocale = (typeof locales)[number];

const ENGLISH_ONLY_PATHS = new Set([
  "/blog/heart-rate-vs-heart-rate-variability",
  "/blog/how-to-measure-heart-rate-recovery",
  "/blog/target-heart-rate-formulas-compared",
  "/blog/factors-that-affect-resting-heart-rate"
]);

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function localizePath(pathname: string, locale: AppLocale): string {
  const normalized = pathname === "/es"
    ? "/"
    : pathname.startsWith("/es/")
      ? pathname.slice(3)
      : pathname || "/";

  if (locale === "es") {
    return normalized === "/" ? "/es" : `/es${normalized}`;
  }

  return normalized;
}

export function hasSpanishVersion(pathname: string): boolean {
  return !ENGLISH_ONLY_PATHS.has(localizePath(pathname, "en"));
}

export function getAlternates(pathname: string) {
  const englishPath = localizePath(pathname, "en");
  const spanishPath = localizePath(pathname, "es");
  const baseUrl = "https://www.heartratetap.com";

  return {
    canonical: `${baseUrl}${englishPath === "/" ? "" : englishPath}`,
    languages: {
      en: `${baseUrl}${englishPath === "/" ? "" : englishPath}`,
      ...(hasSpanishVersion(pathname) ? { es: `${baseUrl}${spanishPath}` } : {}),
      "x-default": `${baseUrl}${englishPath === "/" ? "" : englishPath}`
    }
  };
}
