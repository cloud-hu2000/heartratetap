"use client";

import { useEffect, useRef } from "react";

const BANNER_SCRIPT_URL =
  "https://www.highrevenueformat.com/28464b4166770f80df118e880227ffbc/invoke.js";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, string>;
    };
  }
}

export default function MobileBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    window.atOptions = {
      key: "28464b4166770f80df118e880227ffbc",
      format: "iframe",
      height: 50,
      width: 320,
      params: {}
    };

    const script = document.createElement("script");
    script.src = BANNER_SCRIPT_URL;
    script.async = false;
    container.appendChild(script);

    return () => {
      script.remove();
      container.replaceChildren();
    };
  }, []);

  return (
    <section className="mobile-banner-container" aria-label="Advertisement">
      <div ref={containerRef} className="mobile-banner-ad" />
    </section>
  );
}
