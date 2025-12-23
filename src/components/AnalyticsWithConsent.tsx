"use client";

import { useEffect, useState } from "react";
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
  return <SpeedInsights />;
};

export default AnalyticsWithConsent;

