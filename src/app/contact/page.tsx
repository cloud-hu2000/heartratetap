import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact HeartRateTap",
  description:
    "Contact the HeartRateTap team for product support, accessibility help, privacy requests, or factual corrections.",
  alternates: {
    canonical: "https://www.heartratetap.com/contact"
  }
};

export default function ContactPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            HeartRateTap • Contact
          </p>
          <h1>Contact HeartRateTap</h1>
          <p className="blog-intro">
            Use the email below to reach the team that maintains the HeartRateTap tool and its editorial content. We
            welcome product questions, accessibility reports, privacy requests and factual corrections.
          </p>
        </header>

        <section className="blog-section">
          <h2>Email us</h2>
          <p>
            For support and general questions, email{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. Please include the page URL, your
            browser or device when relevant, and a short description of what happened. This helps us reproduce and
            investigate a technical issue.
          </p>
          <p>
            This is the public contact channel for Heart Rhythm Studio, the independent team behind HeartRateTap.
          </p>
        </section>

        <section className="blog-section">
          <h2>Corrections and content questions</h2>
          <p>
            If you think a guide is inaccurate, tell us the article URL and quote the specific statement. We review
            reports against the cited source and the current product behavior. Confirmed factual corrections are made
            on the relevant page and its review date is updated. Our <Link href="/about#editorial-standards">editorial
            standards</Link> explain this process in more detail.
          </p>
        </section>

        <section className="blog-section">
          <h2>Privacy and account requests</h2>
          <p>
            For an account, feedback or privacy request, email either address above from the account email when
            possible and state whether you are asking to access, correct or delete information. Do not send passwords,
            payment-card details, full medical history or other sensitive information by email. Read the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> before making a data request.
          </p>
        </section>

        <section className="blog-section">
          <h2>Medical and urgent concerns</h2>
          <p>
            HeartRateTap cannot provide medical advice or emergency support. If you have chest pain, shortness of
            breath, fainting, severe dizziness or another urgent symptom, contact local emergency services or a
            qualified health professional instead of waiting for an email response or relying on this website.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Learn how the tool works</h2>
          <p>
            The guide library explains how tap timing becomes a BPM estimate, what it cannot tell you, and how the
            site maintains its content.
          </p>
          <Link href="/guides" className="pill active">
            Browse the guides
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  );
}
