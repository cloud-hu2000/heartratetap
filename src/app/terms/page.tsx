import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | HeartRateTap",
  description: "Terms for using the HeartRateTap wellness tool, local history, accounts, feedback and paid features.",
  alternates: {
    canonical: "https://www.heartratetap.com/terms"
  }
};

export default function TermsPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Legal • Last updated July 10, 2026
          </p>
          <h1>Terms of Use</h1>
          <p className="blog-intro">
            These terms explain the conditions for using HeartRateTap. If you do not agree, do not use the service.
          </p>
        </header>

        <section className="blog-section">
          <h2>Wellness tool, not medical care</h2>
          <p>
            HeartRateTap estimates BPM from taps that you provide. It does not sense, diagnose, monitor or treat a
            medical condition and is not a substitute for professional care or certified equipment. Do not use a result
            to change medication, ignore symptoms, set a clinician-prescribed exercise limit or delay emergency help.
          </p>
        </section>

        <section className="blog-section">
          <h2>Your responsibility</h2>
          <p>
            You are responsible for the timing and accuracy of your taps, the device and browser you use, and how you
            interpret a result. You must not misuse the service, interfere with its operation, probe accounts you do not
            own, submit unlawful feedback or automate traffic in a way that degrades the site.
          </p>
        </section>

        <section className="blog-section">
          <h2>Accounts, paid features and availability</h2>
          <p>
            The basic tap measurement is available without an account. Optional account or paid features may change as
            the product develops. Prices and included features shown at checkout control the purchase. Payment providers
            process payment information under their own terms. Unless applicable law requires otherwise, access may be
            suspended for fraud, abuse or a security threat.
          </p>
        </section>

        <section className="blog-section">
          <h2>Local history and feedback</h2>
          <p>
            Recent readings are stored in browser storage by default and can disappear when storage is cleared, a
            private session ends or a different device is used. Do not rely on local history as your only medical or
            personal record. Feedback may be reviewed, summarized and used to improve the product; do not submit
            confidential health information.
          </p>
        </section>

        <section className="blog-section">
          <h2>No guarantee and limitation of liability</h2>
          <p>
            The service is provided on an “as available” basis. We do not guarantee that a reading is accurate,
            uninterrupted or suitable for a particular purpose. To the extent permitted by law, HeartRateTap is not
            liable for indirect or consequential loss arising from use of, or inability to use, the service. Rights that
            cannot legally be excluded remain unaffected.
          </p>
        </section>

        <section className="blog-section">
          <h2>Changes and contact</h2>
          <p>
            We may update these terms when the product or applicable requirements change. The date above identifies the
            current version. Questions may be sent to{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. See the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> for information about data handling.
          </p>
        </section>
      </article>
      <Footer />
    </div>
  );
}
