import type { Metadata } from 'next';
import { Suspense } from 'react';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing & Lifetime Plans | HeartRateTap',
  description:
    'Compare the free, Pro, and Premium lifetime plans for HeartRateTap. Unlock advanced heart rate analysis and personalized insights with one-time upgrades.',
  alternates: {
    canonical: 'https://www.heartratetap.com/pricing',
  },
};

const PricingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="pricing-page">
          <div className="pricing-container">
            <div className="pricing-header">
              <h1 className="pricing-title">Loading...</h1>
            </div>
          </div>
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
};

export default PricingPage;
