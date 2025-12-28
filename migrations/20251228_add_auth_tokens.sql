-- Migration: Add auth_tokens table for email verification and password reset
-- Generated: 2025-12-29
BEGIN;

CREATE TABLE IF NOT EXISTS auth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  token text NOT NULL,
  type text NOT NULL, -- 'email_verification' | 'password_reset'
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  consumed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_auth_tokens_user ON auth_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_token_type ON auth_tokens(token, type);

COMMIT;


