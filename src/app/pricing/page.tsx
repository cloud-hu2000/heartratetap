'use client';

import React, { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, MEMBERSHIP_TIERS, type MembershipTier } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const LANG_STORAGE_KEY = "heartratetap-lang";

const PricingContent = () => {
  const { user, upgradeMembership } = useAuth();
  const searchParams = useSearchParams();
  const [isUpgrading, setIsUpgrading] = useState<MembershipTier | null>(null);
  const [currentLang, setCurrentLang] = useState<"en" | "es">(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as "en" | "es" | null;
      if (stored === "en" || stored === "es") {
        return stored;
      }
    }
    return "en";
  });
  const canceled = searchParams.get('canceled');

  // Listen for language changes from navbar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LANG_STORAGE_KEY && (e.newValue === "en" || e.newValue === "es")) {
        setCurrentLang(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Smooth transition for language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLang;
      // Add a subtle transition effect
      document.documentElement.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    }
  }, [currentLang]);

  // Parse bilingual text
  const parseBilingual = (text: string) => {
    const match = text.match(/EN: (.+?) \| ES: (.+)/);
    return match ? { en: match[1], es: match[2] } : { en: text, es: text };
  };

  // Get text for current language
  const getText = (text: string) => {
    const parsed = parseBilingual(text);
    return currentLang === 'en' ? parsed.en : parsed.es;
  };

  const handleUpgrade = async (tier: MembershipTier) => {
    if (!user) return;

    setIsUpgrading(tier);
    try {
      const result = await upgradeMembership(tier);
      if (result.success && result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        alert(result.error || 'Failed to start upgrade process');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsUpgrading(null);
    }
  };

  const getButtonText = (tier: MembershipTier) => {
    if (isUpgrading === tier) return currentLang === 'en' ? 'Processing...' : 'Procesando...';
    if (user?.account_tier === tier) return currentLang === 'en' ? 'Current Plan' : 'Plan Actual';
    return currentLang === 'en' ? `Upgrade to ${getText(MEMBERSHIP_TIERS[tier].name)}` : `Actualizar a ${getText(MEMBERSHIP_TIERS[tier].name)}`;
  };

  const isCurrentPlan = (tier: MembershipTier) => user?.account_tier === tier;

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* Header */}
        <header className="pricing-header">
          <h1 className="pricing-title">
            {currentLang === 'en' ? 'Choose Your Plan' : 'Elija Su Plan'}
          </h1>
          <p className="pricing-subtitle">
            {currentLang === 'en'
              ? 'Unlock advanced heart rate analysis and personalized health insights'
              : 'Desbloquee análisis avanzado de frecuencia cardíaca y perspectivas de salud personalizadas'
            }
          </p>
          {canceled && (
            <div className="pricing-notice">
              <p>Upgrade canceled. You can try again anytime.</p>
            </div>
          )}
        </header>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {/* Free Plan */}
          <div className={`pricing-card ${isCurrentPlan('free') ? 'pricing-card-current' : ''}`}>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">
                {getText(MEMBERSHIP_TIERS.free.name)}
              </h3>
              <div className="pricing-price">
                <span className="pricing-amount">$0</span>
                <span className="pricing-period">forever</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.free.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span className="pricing-feature-text">{getText(feature)}</span>
                </li>
              ))}
            </ul>
            <button
              className="pricing-button pricing-button-secondary"
              disabled={isCurrentPlan('free')}
              onClick={() => handleUpgrade('free')}
            >
              {getButtonText('free')}
            </button>
          </div>

          {/* Basic Plan */}
          <div className={`pricing-card pricing-card-featured ${isCurrentPlan('basic') ? 'pricing-card-current' : ''}`}>
            <div className="pricing-card-badge">
              {currentLang === 'en' ? 'Most Popular' : 'Más Popular'}
            </div>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">
                {getText(MEMBERSHIP_TIERS.basic.name)}
              </h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.basic.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.basic.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span className="pricing-feature-text">{getText(feature)}</span>
                </li>
              ))}
            </ul>
            <button
              className="pricing-button pricing-button-primary"
              disabled={isCurrentPlan('basic') || !user}
              onClick={() => handleUpgrade('basic')}
            >
              {getButtonText('basic')}
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`pricing-card ${isCurrentPlan('pro') ? 'pricing-card-current' : ''}`}>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">
                {getText(MEMBERSHIP_TIERS.pro.name)}
              </h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.pro.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.pro.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span className="pricing-feature-text">{getText(feature)}</span>
                </li>
              ))}
            </ul>
            <button
              className="pricing-button pricing-button-primary"
              disabled={isCurrentPlan('pro') || !user}
              onClick={() => handleUpgrade('pro')}
            >
              {getButtonText('pro')}
            </button>
          </div>
        </div>


        {/* CTA Section */}
        {!user && (
          <div className="pricing-cta">
            <h3>
              {currentLang === 'en'
                ? 'Ready to upgrade your heart health tracking?'
                : '¿Listo para mejorar el seguimiento de su salud cardíaca?'
              }
            </h3>
            <p>
              {currentLang === 'en'
                ? 'Create a free account to get started, then upgrade anytime.'
                : 'Cree una cuenta gratuita para comenzar, luego actualice en cualquier momento.'
              }
            </p>
            <Link href="/register" className="pricing-cta-button">
              {currentLang === 'en' ? 'Get Started Free' : 'Comenzar Gratis'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const PricingPage = () => {
  return (
    <Suspense fallback={
      <div className="pricing-page">
        <div className="pricing-container">
          <div className="pricing-header">
            <h1 className="pricing-title">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
};

export default PricingPage;
