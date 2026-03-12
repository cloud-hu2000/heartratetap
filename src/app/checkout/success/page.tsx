'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MEMBERSHIP_TIERS, useAuth } from '@/contexts/AuthContext';

const CheckoutSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkAuth } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const tier = searchParams.get('tier');
  const requestId = searchParams.get('requestId');

  useEffect(() => {
    if (!tier) {
      console.error('❌ 缺少tier参数');
      return;
    }

    console.log('✅ 支付成功回调:', { tier, requestId });

    // 刷新用户状态（等待 webhook 更新 tier）
    checkAuth();

    // 支付成功后，重定向到profile页面
    const redirectTimer = setTimeout(() => {
      setIsRedirecting(true);
      router.push('/profile?upgrade=success&tier=' + tier);
    }, 3000); // 3秒后自动重定向

    return () => clearTimeout(redirectTimer);
  }, [tier, requestId, router, checkAuth]);

  if (!tier) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-card">
            <div className="checkout-error">
              <div className="checkout-icon checkout-icon-error">❌</div>
              <h1 className="checkout-title">Invalid Request</h1>
              <p className="checkout-message">Missing required parameters for payment processing.</p>
              <Link href="/pricing" className="checkout-button">
                Back to Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const plan = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS];

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="checkout-processing">
            <div className="checkout-icon checkout-icon-success">✅</div>
            <h1 className="checkout-title">Payment Successful!</h1>
            <p className="checkout-message">
              Thank you for upgrading to {plan?.name || tier} membership.
              Your account has been upgraded and you now have access to premium features.
            </p>
            {isRedirecting ? (
              <p className="checkout-message" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Redirecting to your profile...
              </p>
            ) : (
              <Link href="/profile" className="checkout-button">
                Go to Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-card">
            <div className="checkout-processing">
              <div className="checkout-spinner"></div>
              <h1 className="checkout-title">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccessPage;
