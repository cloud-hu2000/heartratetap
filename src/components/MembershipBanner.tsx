"use client";

import Link from "next/link";
import { AuthUser } from "@/lib/types";

interface MembershipBannerProps {
  user: AuthUser | null;
}

export default function MembershipBanner({ user }: MembershipBannerProps) {
  if (!user) return null;

  return (
    <div className="membership-banner">
      <div className="membership-content">
        <div className="membership-info">
          <span className="membership-tier">
            {user.account_tier === 'free' && 'Free Plan'}
            {user.account_tier === 'pro' && 'Professional Plan'}
            {user.account_tier === 'premium' && 'Premium Plan'}
            {user.account_tier === 'enterprise' && 'Enterprise Plan'}
          </span>
          {user.account_tier === 'free' && (
            <span className="membership-upgrade">
              Upgrade for advanced features like data export and personalized reports
            </span>
          )}
        </div>
        {user.account_tier === 'free' && (
          <Link href="/pricing" className="membership-upgrade-button">
            Upgrade Now
          </Link>
        )}
      </div>
    </div>
  );
}
