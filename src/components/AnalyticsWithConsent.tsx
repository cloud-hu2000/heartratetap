"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const CONSENT_KEY = "hrt-cookie-consent";

const AnalyticsWithConsent = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(CONSENT_KEY) : null;
    setAllowed(stored === "accepted");

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY) {
        setAllowed(event.newValue === "accepted");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-95CLQ9158L"
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-95CLQ9158L', { anonymize_ip: true });
        `}
      </Script>
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="F7PUf+eqUra9h+t+ok3o3w"
        async
        strategy="afterInteractive"
      />
      <SpeedInsights />
    </>
  );
};

export default AnalyticsWithConsent;

