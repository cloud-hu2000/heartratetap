-- Migration: Create users, subscriptions, payments and webhook log tables
-- Generated: 2025-12-28
BEGIN;

-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  email_verified boolean DEFAULT false,
  name text,
  avatar_url text,
  auth_provider text,       -- 'email' | 'google' | 'magic_link' | ...
  provider_id text,         -- external provider subject/id
  password_hash text,       -- nullable if oauth-only
  role text NOT NULL DEFAULT 'user', -- 'user'|'admin'|'support'
  account_tier text NOT NULL DEFAULT 'free', -- 'free'|'pro'|'premium'|'enterprise'
  billing_customer_id text, -- ID from Wanlihui (or other provider)
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  consent jsonb DEFAULT '{}'::jsonb
);

-- Subscriptions table (recurring plans)
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_id text,                     -- internal plan identifier
  provider text NOT NULL DEFAULT 'wanlihui',
  provider_subscription_id text,    -- subscription id at provider
  status text NOT NULL,             -- 'active'|'past_due'|'canceled'|'trialing'|'incomplete'
  price_amount bigint NOT NULL,     -- stored in minor units (e.g., cents)
  price_currency text NOT NULL DEFAULT 'CNY',
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Payments table (one-off charges and payment attempts)
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  order_id text,                    -- merchant order id (our system)
  provider text NOT NULL DEFAULT 'wanlihui',
  provider_payment_id text,         -- payment id returned by provider
  amount bigint NOT NULL,           -- stored in minor units (e.g., cents)
  currency text NOT NULL DEFAULT 'CNY',
  status text NOT NULL,             -- 'pending'|'succeeded'|'failed'|'refunded'
  payment_method text,              -- e.g., 'wechat','alipay','card'
  description text,
  receipt_url text,
  raw_payload jsonb DEFAULT '{}'::jsonb, -- raw provider response for audit
  attempts int DEFAULT 0,
  idempotency_key text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Webhook events log for audit and replay
CREATE TABLE IF NOT EXISTS payment_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'wanlihui',
  event_type text,
  provider_event_id text,
  payload jsonb,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed boolean DEFAULT false,
  processed_at timestamptz,
  error text
);

-- Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_payment_id ON payments(provider_payment_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_event_id ON payment_webhooks(provider_event_id);

COMMIT;


