"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics/react";

const POST_TEMPLATES = [
  {
    id: "instant-bpm",
    label: "Instant BPM anywhere",
    text:
      "Just tested my pulse with HeartRateTap.com — no wearables, just taps. It shows resting + workout ranges with coaching tips. Sharing it here in case anyone else needs a quick BPM check."
  },
  {
    id: "workout-check-in",
    label: "Workout check-in",
    text:
      "Quick shout-out to HeartRateTap.com. I use it between cardio intervals to confirm I’m in the right zone. Tap along with your pulse, freeze the result, then compare rest vs sport advice. Super handy."
  },
  {
    id: "wellness-journal",
    label: "Wellness journal update",
    text:
      "I’ve added HeartRateTap.com to my daily wellness stack. It lets me log resting BPM each morning without wearing anything. Might help if you’re tracking HRV, recovery or just curious about your pulse."
  }
];

const DEFAULT_SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heartratetap.com";

const RedditShareCTA = () => {
  const [selectedTemplate] = useState(() => POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)]);
  const [shareUrl, setShareUrl] = useState(DEFAULT_SITE);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShare = () => {
    const redditUrl = new URL("https://www.reddit.com/submit");
    redditUrl.searchParams.set("url", shareUrl);
    redditUrl.searchParams.set("title", selectedTemplate.text);
    track("share_to_reddit", {
      templateId: selectedTemplate.id,
      location: "hero_gap",
      url: shareUrl
    });
    window.open(redditUrl.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="panel reddit-share">
      <div className="reddit-share-header">
        <p className="hero-sub">Share HeartRateTap on Reddit</p>
        <h2>Help the community discover instant heart-rate insights</h2>
      </div>

      <button type="button" className="reddit-share-button reddit-share-button-full" onClick={handleShare}>
        <span className="reddit-share-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img" focusable="false">
            <path
              fill="currentColor"
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a9.99 9.99 0 0 1 7.031-9.546 1 1 0 0 1 .55 1.924A8 8 0 1 0 20 12a1 1 0 0 1 2 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm1.5 3a.5.5 0 0 1 .5.5V10h4a.5.5 0 0 1 .354.854l-6 6a.5.5 0 0 1-.708 0l-6-6A.5.5 0 0 1 5.5 10h4V5.5a.5.5 0 0 1 .5-.5h3Z"
            />
          </svg>
        </span>
        <div>
          <p>Share on Reddit</p>
          <small>{selectedTemplate.text}</small>
        </div>
      </button>
    </section>
  );
};

export default RedditShareCTA;

