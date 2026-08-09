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
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: "HeartRateTap",
      type,
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "HeartRateTap manual tap BPM estimator"
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
