"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "hrt-cookie-consent";

type ConsentState = "accepted" | "rejected" | null;

const CookieConsent = () => {
  const [status, setStatus] = useState<ConsentState>(null);
  const [ready, setReady] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  const updateConsent = useCallback((next: ConsentState) => {
    if (typeof window === "undefined" || !next) return;
    window.localStorage.setItem(CONSENT_KEY, next);

    // 同时设置分析同意状态
    if (next === "accepted") {
      window.localStorage.setItem("hrt-analytics-consent", "accepted");
    } else {
      window.localStorage.setItem("hrt-analytics-consent", "rejected");
    }

    setStatus(next);
    window.dispatchEvent(
      new StorageEvent("storage", { key: CONSENT_KEY, newValue: next, oldValue: status ?? undefined })
    );
  }, [status]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(CONSENT_KEY) as ConsentState;
    setStatus(stored ?? null);
    setReady(true);
  }, []);

  // Focus trap functionality
  useEffect(() => {
    if (!ready || status || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = acceptButtonRef.current || focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Set initial focus
    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        updateConsent("rejected");
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ready, status, updateConsent]);

  if (!ready || status) return null;

  return (
    <div className="cookie-consent">
      <div
        ref={dialogRef}
        className="cookie-consent__card"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent dialog"
        aria-describedby="cookie-description"
      >
        <div className="cookie-consent__header">
          <h3>Cookies & Privacy</h3>
          <button
            type="button"
            className="cookie-consent__close"
            onClick={() => updateConsent("rejected")}
            aria-label="Close cookie consent dialog"
          >
            ×
          </button>
        </div>
        <div className="cookie-consent__text" id="cookie-description">
          <p>
            We use essential cookies for site functionality. Analytics cookies and error monitoring are only activated if you choose
            &quot;Accept&quot;. Your privacy is protected - no personal data is collected without consent. You can change your choice anytime in your browser storage. Read our{" "}
            <Link href="/privacy-policy" className="blog-inline-cta">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="pill"
            onClick={() => updateConsent("rejected")}
          >
            Reject non-essential
          </button>
          <button
            ref={acceptButtonRef}
            type="button"
            className="pill active"
            onClick={() => updateConsent("accepted")}
          >
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
          display: flex;
          flex-direction: column;
          gap: 1rem;
          pointer-events: auto;
        }
        .cookie-consent__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        .cookie-consent__header h3 {
          margin: 0;
          font-size: 1.05rem;
        }
        .cookie-consent__close {
          background: none;
          border: none;
          color: #d8d8d8;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color 0.2s ease, background-color 0.2s ease;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cookie-consent__close:hover,
        .cookie-consent__close:focus {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.1);
          outline: 2px solid #fff;
          outline-offset: 2px;
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

