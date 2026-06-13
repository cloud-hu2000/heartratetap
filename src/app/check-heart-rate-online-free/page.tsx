import type { Metadata } from "next";
import ToolLandingPage from "@/components/ToolLandingPage";

export const metadata: Metadata = {
  title: "Check Heart Rate Online Free - Online Heart Rate Checker | HeartRateTap",
  description:
    "Check heart rate online free with HeartRateTap. Use the online heart rate checker in your browser, tap with your pulse, and get an instant BPM reading with no device or signup.",
  alternates: {
    canonical: "https://www.heartratetap.com/check-heart-rate-online-free"
  },
  openGraph: {
    title: "Check Heart Rate Online Free - Online Heart Rate Checker",
    description:
      "Use HeartRateTap to check heart rate online free. Tap with your pulse and get an instant BPM reading in your browser.",
    url: "https://www.heartratetap.com/check-heart-rate-online-free",
    siteName: "HeartRateTap"
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Heart Rate Online Free - Online Heart Rate Checker",
    description: "Tap with your pulse and check your heart rate online for free in seconds."
  }
};

export default function CheckHeartRatePage() {
  return (
    <ToolLandingPage
      eyebrow="Free browser-based BPM check"
      title="Check Heart Rate Online Free"
      description="Use this online heart rate checker directly in your browser. Find your pulse, tap the tool with each heartbeat, and see your BPM update in real time. No app, wearable, camera permission, or signup required."
      primaryKeyword="check heart rate online free"
      secondaryKeywords={["online heart rate checker", "free online heart rate checker", "heart rate measure online"]}
      useCases={[
        "Quick resting heart rate checks in the morning",
        "Before and after workout recovery checks",
        "Stress or caffeine self-checks during the day",
        "A no-device backup when you do not have a watch or pulse oximeter"
      ]}
      faqs={[
        {
          question: "Is this online heart rate checker free?",
          answer:
            "Yes. The basic heart rate check is free and works in your browser without registration or a connected device."
        },
        {
          question: "How does it check my heart rate online?",
          answer:
            "You feel your pulse and tap in rhythm. HeartRateTap measures the time between taps and converts that rhythm into beats per minute."
        },
        {
          question: "Can I use it on my phone?",
          answer:
            "Yes. The checker works on phones, tablets, laptops, and desktop browsers. For best results, keep your hand and screen steady while tapping."
        },
        {
          question: "Can this replace medical equipment?",
          answer:
            "No. It is a wellness reference tool, not a medical device. Use certified equipment or talk to a healthcare professional for medical decisions."
        }
      ]}
    />
  );
}
