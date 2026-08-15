import type { Metadata } from "next";

export const SOCIAL_IMAGE_URL = "https://www.heartratetap.com/og-heart-rate-tap.png";

export function buildSocialMetadata({
  title,
  description,
  url,
  type = "article"
}: {
  title: string;
  description: string;
  url: string;
  type?: "article" | "website";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const isSpanish = new URL(url).pathname === "/es" || new URL(url).pathname.startsWith("/es/");

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "HeartRateTap",
      type,
      locale: isSpanish ? "es_ES" : "en_US",
      alternateLocale: [isSpanish ? "en_US" : "es_ES"],
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: isSpanish
            ? "Estimador manual de LPM por toques de HeartRateTap"
            : "HeartRateTap manual tap BPM estimator"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE_URL]
    }
  };
}
