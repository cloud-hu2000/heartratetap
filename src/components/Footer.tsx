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
          <Link href="/target-heart-rate-calculator" className="blog-inline-cta">
            Target HR Calculator
          </Link>
          <Link href="/heart-rate-recovery-calculator" className="blog-inline-cta">
            Recovery Calculator
          </Link>
          <Link href="/guides" className="blog-inline-cta">
            Guides
          </Link>
          <Link href="/about" className="blog-inline-cta">
            About & Editorial Policy
          </Link>
          <Link href="/contact" className="blog-inline-cta">
            Contact
          </Link>
          <Link href="/privacy-policy" className="blog-inline-cta">
            Privacy
          </Link>
          <Link href="/terms" className="blog-inline-cta">
            Terms
          </Link>
        </div>
      </div>

      <p className="footer-text">
        HeartRateTap estimates BPM from the timing of taps you make while feeling your pulse. It does not sense your
        heartbeat and is not a medical device. Recent measurements stay in this browser by default.
      </p>

      <div className="footer-row footer-row-center">
        <Link href="/contact" className="footer-label">
          Contact
        </Link>
        <div className="footer-contact">
          <Link href="mailto:cloudhu2000@gmail.com" className="blog-inline-cta">
            cloudhu2000@gmail.com
          </Link>
        </div>
      </div>

      <p className="footer-text">
        If you have chest pain, shortness of breath, fainting or another urgent symptom, contact local emergency
        services; do not wait for or rely on this website.
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
