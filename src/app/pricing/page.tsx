'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth, MEMBERSHIP_TIERS, type MembershipTier } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const PricingPage = () => {
  const { user, upgradeMembership } = useAuth();
  const searchParams = useSearchParams();
  const [isUpgrading, setIsUpgrading] = useState<MembershipTier | null>(null);
  const canceled = searchParams.get('canceled');

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
          <h1 className="pricing-title">Choose Your Plan</h1>
          <p className="pricing-subtitle">
            Unlock advanced heart rate analysis and personalized health insights
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
              {MEMBERSHIP_TIERS.free.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  {feature}
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
            <div className="pricing-card-badge">Most Popular</div>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">{MEMBERSHIP_TIERS.basic.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.basic.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.basic.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  {feature}
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
              <h3 className="pricing-plan-name">{MEMBERSHIP_TIERS.pro.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.pro.price}</span>
                <span className="pricing-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.pro.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  {feature}
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

        {/* FAQ Section */}
        <section className="pricing-faq">
          <h2 className="pricing-faq-title">Frequently Asked Questions</h2>
          <div className="pricing-faq-grid">
            <div className="pricing-faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.</p>
            </div>
            <div className="pricing-faq-item">
              <h4>Is my data secure?</h4>
              <p>Absolutely. We use industry-standard encryption and never sell your personal health data. Your privacy is our top priority.</p>
            </div>
            <div className="pricing-faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and other popular payment methods through our secure payment processor.</p>
            </div>
            <div className="pricing-faq-item">
              <h4>Do you offer refunds?</h4>
              <p>We offer a 30-day money-back guarantee. If you're not satisfied with your subscription, contact us for a full refund.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <div className="pricing-cta">
            <h3>Ready to upgrade your heart health tracking?</h3>
            <p>Create a free account to get started, then upgrade anytime.</p>
            <Link href="/register" className="pricing-cta-button">
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return <PricingPage />;
}
