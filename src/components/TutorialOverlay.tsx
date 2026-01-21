"use client";

interface TutorialOverlayProps {
  onClose: () => void;
}

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <h3>📱 Quick Tutorial</h3>
        <ol>
          <li>Find your pulse on wrist or neck</li>
          <li>Tap the heart area in rhythm</li>
          <li>Wait for stable BPM reading</li>
          <li>Tap &quot;Stop&quot; to save result</li>
        </ol>
        <button
          type="button"
          className="pill active tutorial-close"
          onClick={() => {
            onClose();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("heartratetap-tutorial-shown", "true");
            }
          }}
        >
          Got it! 🎯
        </button>
      </div>
    </div>
  );
}
