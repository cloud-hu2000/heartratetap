'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useAuth, MEMBERSHIP_TIERS, type MembershipTier } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const PricingContent = () => {
  const { user, upgradeMembership } = useAuth();
  const searchParams = useSearchParams();
  const [isUpgrading, setIsUpgrading] = useState<MembershipTier | null>(null);
  const canceled = searchParams.get('canceled');

  // Parse bilingual features
  const parseFeature = (feature: string) => {
    const match = feature.match(/EN: (.+?) \| ES: (.+)/);
    return match ? { en: match[1], es: match[2] } : { en: feature, es: feature };
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
    if (isUpgrading === tier) return 'Processing...';
    if (user?.account_tier === tier) return 'Current Plan';
    return `Upgrade to ${MEMBERSHIP_TIERS[tier].name}`;
  };

  const isCurrentPlan = (tier: MembershipTier) => user?.account_tier === tier;

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* Header */}
        <header className="pricing-header">
          <h1 className="pricing-title">
            <span className="pricing-title-en">Choose Your Plan</span>
            <span className="pricing-title-es">Elija Su Plan</span>
          </h1>
          <p className="pricing-subtitle">
            <span className="pricing-subtitle-en">Unlock advanced heart rate analysis and personalized health insights</span>
            <span className="pricing-subtitle-es">Desbloquee análisis avanzado de frecuencia cardíaca y perspectivas de salud personalizadas</span>
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
              <h3 className="pricing-plan-name">{MEMBERSHIP_TIERS.free.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">$0</span>
                <span className="pricing-period">forever</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.free.features.map((feature, index) => {
                const parsed = parseFeature(feature);
                return (
                  <li key={index} className="pricing-feature">
                    <span className="pricing-feature-check">✓</span>
                    <div className="pricing-feature-text">
                      <span className="pricing-feature-en">{parsed.en}</span>
                      <span className="pricing-feature-es">{parsed.es}</span>
                    </div>
                  </li>
                );
              })}
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
            <div className="pricing-card-badge">Most Popular</div>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">{MEMBERSHIP_TIERS.basic.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.basic.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.basic.features.map((feature, index) => {
                const parsed = parseFeature(feature);
                return (
                  <li key={index} className="pricing-feature">
                    <span className="pricing-feature-check">✓</span>
                    <div className="pricing-feature-text">
                      <span className="pricing-feature-en">{parsed.en}</span>
                      <span className="pricing-feature-es">{parsed.es}</span>
                    </div>
                  </li>
                );
              })}
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
              <h3 className="pricing-plan-name">{MEMBERSHIP_TIERS.pro.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.pro.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.pro.features.map((feature, index) => {
                const parsed = parseFeature(feature);
                return (
                  <li key={index} className="pricing-feature">
                    <span className="pricing-feature-check">✓</span>
                    <div className="pricing-feature-text">
                      <span className="pricing-feature-en">{parsed.en}</span>
                      <span className="pricing-feature-es">{parsed.es}</span>
                    </div>
                  </li>
                );
              })}
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
              <span className="pricing-cta-en">Ready to upgrade your heart health tracking?</span>
              <span className="pricing-cta-es">¿Listo para mejorar el seguimiento de su salud cardíaca?</span>
            </h3>
            <p>
              <span className="pricing-cta-text-en">Create a free account to get started, then upgrade anytime.</span>
              <span className="pricing-cta-text-es">Cree una cuenta gratuita para comenzar, luego actualice en cualquier momento.</span>
            </p>
            <Link href="/register" className="pricing-cta-button">
              <span className="pricing-cta-button-en">Get Started Free</span>
              <span className="pricing-cta-button-es">Comenzar Gratis</span>
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
