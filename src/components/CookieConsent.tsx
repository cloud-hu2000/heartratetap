"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "hrt-cookie-consent";

type ConsentState = "accepted" | "rejected" | null;

const CookieConsent = () => {
  const [status, setStatus] = useState<ConsentState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(CONSENT_KEY) as ConsentState;
    setStatus(stored ?? null);
    setReady(true);
  }, []);

  const updateConsent = (next: ConsentState) => {
    if (typeof window === "undefined" || !next) return;
    window.localStorage.setItem(CONSENT_KEY, next);
    setStatus(next);
    window.dispatchEvent(
      new StorageEvent("storage", { key: CONSENT_KEY, newValue: next, oldValue: status ?? undefined })
    );
  };

  if (!ready || status) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__card" role="dialog" aria-modal="true" aria-label="Cookie consent">
        <div className="cookie-consent__text">
          <h3>Cookies & Privacy</h3>
          <p>
            We use essential cookies for site functionality. Analytics cookies are only activated if you choose
            &quot;Accept&quot;. You can change your choice anytime in your browser storage. Read our{" "}
            <Link href="/privacy-policy" className="blog-inline-cta">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button type="button" className="pill" onClick={() => updateConsent("rejected")}>
            Reject non-essential
          </button>
          <button type="button" className="pill active" onClick={() => updateConsent("accepted")}>
            Accept all
          </button>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent {
          position: fixed;
          bottom: 1rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 1200;
          pointer-events: none;
        }
        .cookie-consent__card {
          width: min(960px, 92vw);
          background: #111;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
          padding: 1rem 1.25rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: center;
          pointer-events: auto;
        }
        .cookie-consent__text h3 {
          margin: 0 0 0.35rem 0;
          font-size: 1.05rem;
        }
        .cookie-consent__text p {
          margin: 0;
          color: #d8d8d8;
          line-height: 1.5;
        }
        .cookie-consent__actions {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        @media (max-width: 720px) {
          .cookie-consent__card {
            grid-template-columns: 1fr;
          }
          .cookie-consent__actions {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;

