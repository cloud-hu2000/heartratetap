import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { headers } from "next/headers";
import "./globals.css";
import AnalyticsWithConsent from "@/components/AnalyticsWithConsent";
import CookieConsent from "@/components/CookieConsent";
import NavBar from "@/components/NavBar";
import { StructuredData } from "@/components/StructuredData";
import { AuthProvider } from "@/contexts/AuthContext";
import { hasSpanishVersion, localizePath } from "@/i18n/routing";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL("https://www.heartratetap.com"),
    title: "Manual Tap BPM Estimator | HeartRateTap",
    description:
      "Estimate BPM by tapping in time with a pulse you locate manually. See the formula, limitations, local history and cited resting and exercise context.",
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
      title: "Manual Tap BPM Estimator | HeartRateTap",
      description:
        "A transparent tap-interval BPM estimator with local history, documented limitations and cited reference context.",
      url: "https://www.heartratetap.com",
      siteName: "HeartRateTap",
      images: [
        {
          url: "https://www.heartratetap.com/og-heart-rate-tap.png",
          width: 1200,
          height: 630,
          alt: "HeartRateTap manual pulse-timing BPM estimator"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Manual Tap BPM Estimator | HeartRateTap",
      description: "Estimate BPM from your own pulse-timed taps and read the documented calculation and limitations.",
      images: ["https://www.heartratetap.com/og-heart-rate-tap.png"]
    },
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const pathname = headers().get("X-HRT-PATHNAME") || "/";
  const englishPath = localizePath(pathname, "en");
  const spanishPath = localizePath(pathname, "es");
  const spanishVersionAvailable = hasSpanishVersion(pathname);
  const baseUrl = "https://www.heartratetap.com";

  return (
    <html lang={locale}>
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
        <link rel="alternate" hrefLang="en" href={`${baseUrl}${englishPath === "/" ? "" : englishPath}`} />
        {spanishVersionAvailable && (
          <link rel="alternate" hrefLang="es" href={`${baseUrl}${spanishPath}`} />
        )}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${englishPath === "/" ? "" : englishPath}`} />

        <StructuredData />
      </head>
      <body style={{ paddingTop: "56px" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <NavBar />
            {children}
            <AnalyticsWithConsent />
            <CookieConsent />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
