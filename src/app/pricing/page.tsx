import type { Metadata } from 'next';
import { Suspense } from 'react';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing & Lifetime Plans | HeartRateTap',
  description:
    'Compare HeartRateTap free and supporter plans. Paid tiers use a one-time payment and the currently listed functional upgrade is CSV export.',
  alternates: {
    canonical: 'https://www.heartratetap.com/pricing',
  },
  robots: {
    index: false,
    follow: true,
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
