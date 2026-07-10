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
            CSV data export is available for Professional and Premium supporter plans. The upgrade is a one-time
            payment for the features listed on the pricing page.
          </p>
          <div className="upgrade-modal-features">
            <h4>Professional Plan includes:</h4>
            <ul>
              <li>✅ Data export (CSV)</li>
              <li>✅ Professional supporter account tier</li>
              <li>✅ One-time payment</li>
              <li>✅ Lifetime access to the listed features</li>
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
