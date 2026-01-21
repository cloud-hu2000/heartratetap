import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";
import "./globals.css";
import AnalyticsWithConsent from "@/components/AnalyticsWithConsent";
import CookieConsent from "@/components/CookieConsent";
import NavBar from "@/components/NavBar";
import { StructuredData } from "@/components/StructuredData";
import { AuthProvider } from "@/contexts/AuthContext";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL("https://heartratetap.com"),
    title: "Free Online Heart Rate Monitor - Check Heart Rate Online Free | HeartRateTap",
    description:
      "Free online heart rate checker - measure your heart rate online instantly with no device needed. Tap to check heart rate online free in seconds. The easiest free heart rate monitor online!",
    keywords: [
      "online heart rate",
      "check heart rate online free",
      "free heart rate monitor online",
      "heart rate measure online",
      "free online heart rate checker",
      "heart rate monitor",
      "real-time heart rate",
      "online heart rate test",
      "heart rate calculator",
      "pulse rate checker",
      "instant heart rate",
      "no device heart rate",
      "resting heart rate",
      "exercise heart rate"
    ],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" }
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.png"
    },
    alternates: {
      canonical: "https://heartratetap.com"
    },
    openGraph: {
      title: "Free Online Heart Rate Monitor - Check Heart Rate Online Free",
      description:
        "Free online heart rate checker - measure your heart rate online instantly with no device needed. Tap to check heart rate online free in seconds!",
      url: "https://heartratetap.com",
      siteName: "HeartRateTap",
      images: [
        {
          url: "https://heartratetap.com/favicon.png",
          width: 1200,
          height: 630,
          alt: "Free online heart rate monitor - check heart rate online free"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Online Heart Rate Monitor - Check Heart Rate Online Free",
      description: "Free online heart rate checker. Measure your heart rate online instantly - no device needed!"
    },
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="gjZiC-RxIRbV11DFbLLx5X7wESoAEDrQC0p5p0g8qU4"
        />
        <meta name="yandex-verification" content="a65c35f1e7bbadb7" />
        <meta name="google-adsense-account" content="ca-pub-4356459181693102" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-95CLQ9158L"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-95CLQ9158L');
            `
          }}
        />

        <script
          async
          src="//shockedmirror.com/b/X.VAsQdAGGl/0pYiWucc/fedmA9/uzZGUQlQk/PsTbYx3/NkTuEK2eOXTOMitVNyjSca1-MGTXYl5VNrAE"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <StructuredData />
      </head>
      <body style={{ paddingTop: "56px" }}>
        <AuthProvider>
          <NavBar />
          {children}
          <AnalyticsWithConsent />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}

