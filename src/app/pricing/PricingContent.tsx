'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, MEMBERSHIP_TIERS, type MembershipTier } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';

const LANG_STORAGE_KEY = "heartratetap-lang";

const PricingContent = () => {
  const { user, upgradeMembership, checkAuth } = useAuth();
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

  // Ensure we have the latest auth state when this page mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && checkAuth) {
      checkAuth().catch(err => console.warn('checkAuth failed on pricing mount', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // 检查 URL 参数，如果有升级成功或从其他页面返回，刷新用户状态
  useEffect(() => {
    const upgradeSuccess = searchParams.get('upgrade');
    if (upgradeSuccess === 'success' && user && checkAuth) {
      console.log('✅ 检测到升级成功，刷新用户状态...');
      // 延迟一下，确保 webhook 已经处理完成
      setTimeout(() => {
        checkAuth().catch(err => console.error('刷新用户状态失败:', err));
      }, 1000);
    }
  }, [searchParams, user, checkAuth]);

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
    return currentLang === 'en'
      ? `Upgrade to ${getText(MEMBERSHIP_TIERS[tier].name)}`
      : `Actualizar a ${getText(MEMBERSHIP_TIERS[tier].name)}`;
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

        <div className="payment-methods">
          <div className="payment-methods-label">
            {currentLang === 'en' ? 'Secure checkout is processed by Stripe' : 'El pago seguro se procesa con Stripe'}
          </div>
        </div>

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

          {/* Professional Plan */}
          <div className={`pricing-card pricing-card-featured ${isCurrentPlan('pro') ? 'pricing-card-current' : ''}`}>
            <div className="pricing-card-badge">
              {currentLang === 'en' ? 'Most Popular' : 'Más Popular'}
            </div>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">
                {getText(MEMBERSHIP_TIERS.pro.name)}
              </h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.pro.price}</span>
                <span className="pricing-period">
                  {currentLang === 'en' ? 'lifetime' : 'de por vida'}
                </span>
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

          {/* Premium Plan */}
          <div className={`pricing-card ${isCurrentPlan('premium') ? 'pricing-card-current' : ''}`}>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">
                {getText(MEMBERSHIP_TIERS.premium.name)}
              </h3>
              <div className="pricing-price">
                <span className="pricing-amount">${MEMBERSHIP_TIERS.premium.price}</span>
                <span className="pricing-period">
                  {currentLang === 'en' ? 'lifetime' : 'de por vida'}
                </span>
              </div>
            </div>
            <ul className="pricing-features">
              {MEMBERSHIP_TIERS.premium.features.map((feature, index) => (
                <li key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span className="pricing-feature-text">{getText(feature)}</span>
                </li>
              ))}
            </ul>
            <button
              className="pricing-button pricing-button-primary"
              disabled={isCurrentPlan('premium') || !user}
              onClick={() => handleUpgrade('premium')}
            >
              {getButtonText('premium')}
            </button>
          </div>
        </div>

        <section className="pricing-info-section">
          <h2>{currentLang === 'en' ? 'What each upgrade changes' : 'Que cambia con cada mejora'}</h2>
          <div className="pricing-info-grid">
            <article>
              <h3>{currentLang === 'en' ? 'Free plan' : 'Plan gratuito'}</h3>
              <p>
                {currentLang === 'en'
                  ? 'Use the online heart rate checker without an account, keep recent readings locally, and review basic BPM guidance after each session.'
                  : 'Use el medidor en linea sin cuenta, conserve lecturas recientes localmente y revise orientacion basica de BPM despues de cada sesion.'}
              </p>
            </article>
            <article>
              <h3>{currentLang === 'en' ? 'Pro plan' : 'Plan Pro'}</h3>
              <p>
                {currentLang === 'en'
                  ? 'Adds deeper trend context for people who check resting rate, workout recovery, or stress response regularly on the same account.'
                  : 'Agrega mas contexto de tendencias para quienes revisan reposo, recuperacion o respuesta al estres con regularidad.'}
              </p>
            </article>
            <article>
              <h3>{currentLang === 'en' ? 'Premium plan' : 'Plan Premium'}</h3>
              <p>
                {currentLang === 'en'
                  ? 'Designed for frequent self-tracking, with more personalized interpretation while keeping HeartRateTap a wellness reference rather than a medical device.'
                  : 'Pensado para seguimiento frecuente, con interpretacion mas personalizada sin convertir HeartRateTap en un dispositivo medico.'}
              </p>
            </article>
          </div>
        </section>

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

export default PricingContent;


