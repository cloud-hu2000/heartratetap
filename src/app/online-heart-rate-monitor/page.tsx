import type { Metadata } from "next";
import ToolLandingPage from "@/components/ToolLandingPage";

export const metadata: Metadata = {
  title: "Online Heart Rate Monitor - Heart Rate Monitor Online | HeartRateTap",
  description:
    "Use HeartRateTap as an online heart rate monitor. Tap along with your pulse to monitor BPM online in real time, save recent readings, and check trends without extra hardware.",
  alternates: {
    canonical: "https://www.heartratetap.com/online-heart-rate-monitor"
  },
  openGraph: {
    title: "Online Heart Rate Monitor - Heart Rate Monitor Online",
    description:
      "Monitor your heart rate online with HeartRateTap. Tap with your pulse, see real-time BPM, and save recent readings in your browser.",
    url: "https://www.heartratetap.com/online-heart-rate-monitor",
    siteName: "HeartRateTap"
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Heart Rate Monitor - Heart Rate Monitor Online",
    description: "A real-time online heart rate monitor you can use in your browser."
  }
};

export default function OnlineHeartRateMonitorPage() {
  return (
    <ToolLandingPage
      eyebrow="Real-time online BPM monitor"
      title="Online Heart Rate Monitor"
      description="Monitor your heart rate online by tapping with each pulse. HeartRateTap calculates live BPM, lets you stop on a stable reading, and keeps recent measurements locally so you can compare checks over time."
      primaryKeyword="online heart rate monitor"
      secondaryKeywords={["heart rate monitor online", "free online heart rate monitor", "real-time heart rate monitor"]}
      useCases={[
        "Daily pulse monitoring without a wearable device",
        "Post-exercise recovery checks after training",
        "Comparing recent BPM readings from the same browser",
        "Fast online monitoring when you only need a quick reference"
      ]}
      faqs={[
        {
          question: "What makes this an online heart rate monitor?",
          answer:
            "The page includes the live measurement tool at the top. It updates BPM while you tap and can save locked readings to your local browser history."
        },
        {
          question: "Do I need a camera or wearable?",
          answer:
            "No. This monitor uses rhythmic taps from your pulse, so you can measure from any modern browser without camera access or hardware pairing."
        },
        {
          question: "How long should I tap?",
          answer:
            "Aim for at least 10 steady beats. Longer, consistent tapping usually gives the monitor a more stable BPM estimate."
        },
        {
          question: "Where is my heart rate history stored?",
          answer:
            "Recent readings are stored locally in your browser by default. Clearing browser storage or using another device may remove that local history."
        }
      ]}
    />
  );
}
