"use client";

import Link from "next/link";
import { Language } from "@/lib/types";
import { COPY } from "@/lib/constants";

interface RoadmapPreviewProps {
  lang: Language;
}

export default function RoadmapPreview({ lang }: RoadmapPreviewProps) {
  const t = COPY[lang] as typeof COPY[keyof typeof COPY];

  return (
    <section className="panel roadmap-preview section-margin-top">
      <p className="hero-sub hero-sub-margin">
        {t.roadmapTitle}
      </p>
      <h2 className="roadmap-preview-title">{t.roadmapHeading}</h2>
      <p className="roadmap-desc">{t.roadmapDesc}</p>
      <Link href="/roadmap" className="pill active">
        {t.roadmapCta}
      </Link>
    </section>
  );
}
