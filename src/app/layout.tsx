import type { Metadata } from "next";
import Script from "next/script";
import * as Sentry from "@sentry/nextjs";
import "./globals.css";
import AnalyticsWithConsent from "@/components/AnalyticsWithConsent";
import CookieConsent from "@/components/CookieConsent";
import NavBar from "@/components/NavBar";
import { StructuredData } from "@/components/StructuredData";
import { AuthProvider } from "@/contexts/AuthContext";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL("https://www.heartratetap.com"),
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
      canonical: "https://www.heartratetap.com"
    },
    openGraph: {
      title: "Free Online Heart Rate Monitor - Check Heart Rate Online Free",
      description:
        "Free online heart rate checker - measure your heart rate online instantly with no device needed. Tap to check heart rate online free in seconds!",
      url: "https://www.heartratetap.com",
      siteName: "HeartRateTap",
      images: [
        {
          url: "https://www.heartratetap.com/favicon.png",
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-64x64.png" type="image/png" sizes="64x64" />
        <link rel="icon" href="/favicon-128x128.png" type="image/png" sizes="128x128" />
        <link rel="icon" href="/favicon-256x256.png" type="image/png" sizes="256x256" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="gjZiC-RxIRbV11DFbLLx5X7wESoAEDrQC0p5p0g8qU4"
        />
        <meta name="yandex-verification" content="a65c35f1e7bbadb7" />
        <meta name="google-adsense-account" content="ca-pub-4356459181693102" />

        {/* Google tag (gtag.js) - 使用 next/script 以符合 Next.js 建议 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-95CLQ9158L"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-95CLQ9158L');
          `}
        </Script>

        <Script
          async
          src="//shockedmirror.com/b/X.VAsQdAGGl/0pYiWucc/fedmA9/uzZGUQlQk/PsTbYx3/NkTuEK2eOXTOMitVNyjSca1-MGTXYl5VNrAE"
          referrerPolicy="no-referrer-when-downgrade"
          strategy="afterInteractive"
        />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="jmJyFaXCFey64pIyVeFUyg"
          async
          strategy="afterInteractive"
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

