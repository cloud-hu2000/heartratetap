'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MEMBERSHIP_TIERS } from '@/contexts/AuthContext';

const CheckoutSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tier = searchParams.get('tier');

  useEffect(() => {
    const processUpgrade = async () => {
      if (!tier) {
        setError('Invalid upgrade request');
        setIsProcessing(false);
        return;
      }

      try {
        // In production, this would verify the payment with your payment processor
        // and update the user's membership tier in the database

        console.log('✅ 模拟支付成功处理，会员等级:', tier);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Redirect to profile with success message
        router.push('/profile?upgrade=success&tier=' + tier);

      } catch (err) {
        console.error('Payment processing error:', err);
        setError('Failed to process your upgrade. Please contact support.');
        setIsProcessing(false);
      }
    };

    processUpgrade();
  }, [tier, router]);

  if (error) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-card">
            <div className="checkout-error">
              <div className="checkout-icon checkout-icon-error">❌</div>
              <h1 className="checkout-title">Payment Failed</h1>
              <p className="checkout-message">{error}</p>
              <Link href="/pricing" className="checkout-button">
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-card">
            <div className="checkout-processing">
              <div className="checkout-spinner"></div>
              <h1 className="checkout-title">Processing Your Upgrade</h1>
              <p className="checkout-message">Please wait while we activate your new membership...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // This will redirect
};

export default function Page() {
  return <CheckoutSuccessPage />;
}
