"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footnote footer-block">
      <div className="footer-head">
        <div className="footer-brand">
          <span className="footer-name">HeartRateTap</span>
          <span className="footer-dot">•</span>
          <span>© {new Date().getFullYear()} Heart Rhythm Studio</span>
        </div>
        <div className="footer-links">
          <Link href="/privacy-policy" className="blog-inline-cta">
            Privacy Policy
          </Link>
        </div>
      </div>

      <p className="footer-text">
        HeartRateTap is a free, zero-device online heart rate checker. We aim to let everyone track heart rate anytime
        with simple taps—no apps or hardware required. Your measurements stay in your browser by default and we do not
        sell data. Share your ideas through the feedback panel to help us improve the experience together.
      </p>

      <div className="footer-row footer-row-center">
        <span className="footer-label">Contact</span>
        <div className="footer-contact">
          <Link href="mailto:cloudhu2000@gmail.com" className="blog-inline-cta">
            cloudhu2000@gmail.com
          </Link>
          <span className="footer-sep">/</span>
          <Link href="mailto:cloudhu2000@zohomail.cn" className="blog-inline-cta">
            cloudhu2000@zohomail.cn
          </Link>
        </div>
      </div>

      <p className="footer-text">
        Terms of Service: By using HeartRateTap you agree this tool is for personal wellness reference only and does
        not provide medical diagnosis or treatment advice—doctor&apos;s judgment prevails. Results may be affected by
        how you tap and your device environment and cannot serve as accurate medical test results. If you disagree,
        please stop using this site.
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
        .footer-sep {
          opacity: 0.6;
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
