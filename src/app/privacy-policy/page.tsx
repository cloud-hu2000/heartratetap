import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | HeartRateTap",
  description:
    "Learn how HeartRateTap handles local measurements, accounts, feedback, optional analytics and Google advertising technologies.",
  alternates: {
    canonical: "https://www.heartratetap.com/privacy-policy"
  },
  openGraph: {
    title: "Privacy Policy | HeartRateTap",
    description: "How HeartRateTap handles browser data, service providers, analytics and advertising choices.",
    url: "https://www.heartratetap.com/privacy-policy",
    siteName: "HeartRateTap"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="frame blog-page">
      <article className="panel blog-article">
        <header className="blog-hero">
          <p className="hero-sub" style={{ marginBottom: "0.5rem" }}>
            Legal • Last updated August 5, 2026
          </p>
          <h1>Privacy Policy</h1>
          <p className="blog-intro">
            This policy explains what HeartRateTap stores in your browser, what reaches our service providers, how
            optional analytics and advertising technologies work, and the choices available to you.
          </p>
        </header>

        <section className="blog-section">
          <h2>Information processed by the basic calculator</h2>
          <ul>
            <li>
              <strong>Tap timestamps:</strong> while a measurement is active, the page uses browser timing values to
              calculate the intervals between your taps.
            </li>
            <li>
              <strong>Recent readings:</strong> locked BPM values, timestamps and the selected rest/active context are
              stored in your browser&apos;s local storage by default. They are not sent to our server by the basic calculator.
            </li>
            <li>
              <strong>Preferences:</strong> language, tutorial state and consent choices are stored locally so the site
              can remember them.
            </li>
          </ul>
          <p>
            You can remove local data through the history controls where available or by clearing site data in your
            browser. Private browsing and switching browsers or devices create separate storage.
          </p>
        </section>

        <section className="blog-section">
          <h2>Accounts and authentication</h2>
          <p>
            If you create an account, we process the email address and profile information you provide, authentication
            records and security/session data. Passwords are stored as one-way hashes rather than plain
            text. If you use Google sign-in, Google provides the identity data necessary to create or locate your
            account under the permissions shown during sign-in.
          </p>
        </section>

        <section className="blog-section">
          <h2>Feedback</h2>
          <p>
            A feedback submission can include a title, description and optional email. Feedback is sent privately to
            the team and is not published publicly. Do not submit medical, confidential or identifying
            details that are not needed to understand the product request. Contact us to request removal and include
            enough information to locate the entry.
          </p>
        </section>

        <section className="blog-section">
          <h2>Analytics, reliability and consent</h2>
          <p>
            Google Analytics, Ahrefs Analytics and Vercel Speed Insights are optional. Their browser scripts load only
            after you choose “Accept all” in the consent notice. They can process device/browser information, approximate
            location derived from an IP address, page visits, referrers and interaction or performance events according
            to their own policies. Rejecting non-essential cookies prevents these optional scripts from loading through
            our application.
          </p>
          <p>
            Hosting, security and error-monitoring providers may process request data, IP addresses, device details,
            URLs, timestamps and diagnostic information when necessary to deliver the service, prevent abuse and fix
            failures. Do not place sensitive personal information in URLs or feedback fields.
          </p>
        </section>

        <section className="blog-section">
          <h2>Google AdSense and advertising cookies</h2>
          <p>
            HeartRateTap has applied to Google AdSense. When Google advertising is enabled on an eligible content page,
            third-party vendors, including Google and its advertising partners, may use cookies, web beacons, IP
            addresses or other identifiers to serve ads based on a visitor&apos;s prior visits to this and other websites,
            limit repetition, measure performance, prevent fraud and—where permitted by consent choices—personalize
            ads. AdSense advertising cookies may be associated with domains such as doubleclick.net or google.com.
          </p>
          <p>
            Google explains how AdSense uses cookies in its{" "}
            <a href="https://support.google.com/adsense/answer/7549925" rel="noopener noreferrer">
              AdSense cookie documentation
            </a>
            . You can control personalized Google advertising through{" "}
            <a href="https://adssettings.google.com/" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            . Where required, Google&apos;s certified consent controls will be used before advertising is activated.
          </p>
          <p>
            Google-served ads are not placed on sign-in, registration, password reset, profile, error,
            alert or other non-content screens. Advertising should remain visibly separate from navigation and the
            calculator controls.
          </p>
        </section>

        <section className="blog-section">
          <h2>Service providers and disclosure</h2>
          <p>
            We use providers for hosting, databases, authentication, email, security, analytics and—after
            approval—advertising. They process data for the service they provide under their own terms and our
            configuration. We may also disclose information when required by law, to protect users and the service, or
            in connection with a business transfer subject to appropriate safeguards. We do not sell your heart-rate
            measurement history.
          </p>
        </section>

        <section className="blog-section">
          <h2>Retention and your choices</h2>
          <ul>
            <li>Local history remains until you delete it or browser storage is cleared.</li>
            <li>Account, payment and security records are kept as needed to provide the service, meet legal duties and prevent fraud.</li>
            <li>Feedback is kept while it remains useful for product improvement or until an appropriate deletion request is completed.</li>
            <li>You can reject optional analytics, clear local consent, use browser cookie controls and manage Google ad personalization.</li>
            <li>You may ask to access, correct or delete applicable account or feedback data, subject to legal and security requirements.</li>
          </ul>
        </section>

        <section className="blog-section">
          <h2>Children and international use</h2>
          <p>
            HeartRateTap is a general-audience service and is not directed to children under 13. Do not create an
            account or submit personal information if you cannot legally consent in your location. The service and its
            providers may process data in countries different from the one where you live.
          </p>
        </section>

        <section className="blog-section">
          <h2>Contact and policy changes</h2>
          <p>
            For a privacy request or question, use our <Link href="/contact">Contact page</Link> or email{" "}
            <a href="mailto:cloudhu2000@gmail.com">cloudhu2000@gmail.com</a>. We may revise this policy as features,
            providers or legal requirements change; the date at the top identifies the current version. Our{" "}
            <Link href="/about">About page</Link> explains the editorial and correction process.
          </p>
        </section>

        <section className="blog-section blog-cta">
          <h2>Return to the calculator</h2>
          <p>The basic tap calculation works without an account and keeps recent readings in this browser by default.</p>
          <Link href="/" className="pill active">
            Go to HeartRateTap
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  );
}
