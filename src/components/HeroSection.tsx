"use client";

import { Language } from "@/lib/types";
import { COPY } from "@/lib/constants";

interface HeroSectionProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function HeroSection({ lang, onLanguageChange }: HeroSectionProps) {
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  return (
    <section className="panel hero">
      <div className="hero-header">
        <div className="hero-content">
          <p className="hero-sub">{t.heroSub}</p>
          <h1 className="hero-title">{t.heroHeadline}</h1>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className={`pill ${lang === "en" ? "active" : ""}`}
            onClick={() => onLanguageChange("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`pill ${lang === "es" ? "active" : ""}`}
            onClick={() => onLanguageChange("es")}
          >
            ES
          </button>
        </div>
      </div>
    </section>
  );
}
