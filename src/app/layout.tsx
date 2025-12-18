import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
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
        url: "/og.png",
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
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="gjZiC-RxIRbV11DFbLLx5X7wESoAEDrQC0p5p0g8qU4"
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

