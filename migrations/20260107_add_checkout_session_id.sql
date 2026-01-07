-- Migration: Add checkout_session_id column to payments for Stripe integration
-- Generated: 2026-01-07
BEGIN;

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS checkout_session_id text;

-- Index to speed up lookups by checkout_session_id
CREATE INDEX IF NOT EXISTS idx_payments_checkout_session ON payments (checkout_session_id);

COMMIT;


