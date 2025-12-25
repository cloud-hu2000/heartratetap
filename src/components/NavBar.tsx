"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const LANG_STORAGE_KEY = "heartratetap-lang";

export default function NavBar() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as "en" | "es" | null;
    if (stored === "en" || stored === "es") setLang(stored);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "es" : "en";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
        window.dispatchEvent(new StorageEvent("storage", { key: LANG_STORAGE_KEY, newValue: next }));
        document.documentElement.lang = next;
      }
      return next;
    });
  }, []);

  return (
    <header className="nav">
      <div className="nav-left">
        <span className="logo" aria-hidden="true">❤️</span>
        <Link href="/" className="nav-title">
          Online Heart Rate Monitor
        </Link>
      </div>
      <nav className="nav-right" aria-label="Primary">
        <Link href="/" className="nav-link">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" style={{marginRight:8}}>
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Home
        </Link>
        <button className="nav-link pill" onClick={toggleLang} aria-label="Toggle language">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" style={{marginRight:8}}>
            <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 3v2H8.1A8.02 8.02 0 0111 5zm6.9 7H13v2h4.9A8.03 8.03 0 0117.9 12zM12 19a8.03 8.03 0 01-3.9-1.1V15H12v4z"/>
          </svg>
          {lang === "en" ? "EN" : "ES"}
        </button>
        <Link href="/privacy-policy" className="nav-link">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" style={{marginRight:8}}>
            <path fill="currentColor" d="M12 1L3 5v6c0 5.25 3.84 10.74 9 12 5.16-1.26 9-6.75 9-12V5l-9-4z"/>
          </svg>
          Privacy
        </Link>
        <Link href="mailto:cloudhu2000@gmail.com" className="nav-link">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" style={{marginRight:8}}>
            <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          Contact
        </Link>
      </nav>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          background: var(--accent, #0f8c8c);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          gap: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          z-index: 1200;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .logo {
          font-size: 1.05rem;
          margin-right: 0.25rem;
        }
        .nav-title {
          color: white;
          font-weight: 600;
          text-decoration: none;
        }
        .nav-right {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .nav-link {
          color: rgba(255,255,255,0.95);
          text-decoration: none !important;
          padding: 0.45rem 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 12px;
          transition: background 0.18s ease, transform 0.08s ease, color 0.18s ease,
            box-shadow 0.18s ease;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .nav-link svg {
          color: rgba(255,255,255,0.95);
          background: rgba(255,255,255,0.06);
          padding: 6px;
          border-radius: 8px;
          width: 22px;
          height: 22px;
          display: inline-block;
        }
        /* stronger rule to prevent global link underline styles */
        .nav-link,
        .nav-link:link,
        .nav-link:visited,
        .nav-link:hover,
        .nav-link:active,
        .nav-link:focus {
          text-decoration: none !important;
        }
        .pill {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          cursor: pointer;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
        }
        .nav-link:hover, .pill:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .nav-link:focus {
          outline: 2px solid rgba(255,255,255,0.14);
          outline-offset: 4px;
        }
        /* subtle separator between nav items on large screens */
        .nav-right > :not(:last-child) {
          margin-right: 0;
        }
        @media (max-width: 720px) {
          .nav-right { gap: 0.4rem; }
          .nav-title { font-size: 0.95rem; }
        }
      `}</style>
    </header>
  );
}


