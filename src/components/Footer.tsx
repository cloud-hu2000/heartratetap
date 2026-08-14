"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localizePath, type AppLocale } from "@/i18n/routing";

export default function Footer() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Footer");

  return (
    <footer className="footnote footer-block">
      <div className="footer-head">
        <div className="footer-brand">
          <span className="footer-name">HeartRateTap</span>
          <span className="footer-dot">•</span>
          <span>© {new Date().getFullYear()} Heart Rhythm Studio</span>
        </div>
        <div className="footer-links">
          <Link href={localizePath("/target-heart-rate-calculator", locale)} className="blog-inline-cta">
            {t("targetCalculator")}
          </Link>
          <Link href={localizePath("/heart-rate-recovery-calculator", locale)} className="blog-inline-cta">
            {t("recoveryCalculator")}
          </Link>
          <Link href={localizePath("/guides", locale)} className="blog-inline-cta">
            {t("guides")}
          </Link>
          <Link href={localizePath("/about", locale)} className="blog-inline-cta">
            {t("about")}
          </Link>
          <Link href={localizePath("/write-for-us", locale)} className="blog-inline-cta">
            {t("writeForUs")}
          </Link>
          <Link href={localizePath("/contact", locale)} className="blog-inline-cta">
            {t("contact")}
          </Link>
          <Link href={localizePath("/privacy-policy", locale)} className="blog-inline-cta">
            {t("privacy")}
          </Link>
          <Link href={localizePath("/terms", locale)} className="blog-inline-cta">
            {t("terms")}
          </Link>
        </div>
      </div>

      <p className="footer-text">
        {t("description")}
      </p>

      <div className="footer-row footer-row-center">
        <Link href={localizePath("/contact", locale)} className="footer-label">
          {t("contact")}
        </Link>
        <div className="footer-contact">
          <Link href="mailto:cloudhu2000@gmail.com" className="blog-inline-cta">
            cloudhu2000@gmail.com
          </Link>
        </div>
      </div>

      <p className="footer-text">
        {t("emergency")}
      </p>

      <style jsx>{`
        .footer-block {
          padding-top: 1.5rem;
          border-top: 1px solid var(--line, rgba(255, 255, 255, 0.08));
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
        }
        .footer-name {
          font-size: 1rem;
        }
        .footer-dot {
          opacity: 0.6;
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .footer-text {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .footer-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-wrap: wrap;
          color: var(--muted);
        }
        .footer-row-center {
          justify-content: center;
          text-align: center;
        }
        .footer-label {
          font-weight: 600;
          color: var(--ink);
        }
        .footer-contact {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .footer-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
