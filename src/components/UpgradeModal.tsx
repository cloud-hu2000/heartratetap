"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface UpgradeModalProps {
  onClose: () => void;
}

export default function UpgradeModal({ onClose }: UpgradeModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="upgrade-modal-overlay" onClick={onClose}>
      <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upgrade-modal-header">
          <h3>Upgrade to Export Data</h3>
          <button
            type="button"
            className="upgrade-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="upgrade-modal-body">
          <div className="upgrade-modal-icon">📊</div>
          <p className="upgrade-modal-message">
            Data export is available for Professional and Premium plans. Upgrade your membership to unlock this feature and get access to advanced analytics.
          </p>
          <div className="upgrade-modal-features">
            <h4>Professional Plan includes:</h4>
            <ul>
              <li>✅ Data export (CSV)</li>
              <li>✅ Advanced health insights</li>
              <li>✅ Trend analysis</li>
              <li>✅ Ad-free experience</li>
            </ul>
          </div>
        </div>
        <div className="upgrade-modal-actions">
          <button
            type="button"
            className="pill"
            onClick={onClose}
          >
            Maybe Later
          </button>
          <button
            type="button"
            className="pill active"
            onClick={() => {
              onClose();
              window.location.href = '/pricing';
            }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
