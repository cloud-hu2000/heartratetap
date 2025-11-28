import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real-Time Heart Rate Monitor - No Device Needed | heartratetap.com",
  description:
    "Click to test your heart rate instantly. Real-time heart rate detection with no download required. Simply tap the page to automatically calculate your heart rate. Start testing now!",
  keywords: [
    "heart rate monitor",
    "real-time heart rate",
    "online heart rate test",
    "click to measure heart rate",
    "heart rate calculator",
    "pulse rate checker",
    "instant heart rate",
    "no device heart rate",
    "heart rate detection",
    "resting heart rate",
    "exercise heart rate"
  ],
  alternates: {
    canonical: "https://heartratetap.com"
  },
  openGraph: {
    title: "Real-Time Heart Rate Monitor - No Device Needed",
    description:
      "Click to test your heart rate instantly. Real-time heart rate detection with no download required. Simply tap the page to automatically calculate your heart rate.",
    url: "https://heartratetap.com",
    siteName: "heartratetap.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Real-time heart rate monitor - click to test instantly"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Heart Rate Monitor - No Device Needed",
    description: "Click to test your heart rate instantly. Real-time detection, no download required."
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
      <body>{children}</body>
    </html>
  );
}

