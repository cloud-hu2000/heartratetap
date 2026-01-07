# Billing schema documentation

Generated: 2025-12-28

This document describes the database tables added by `migrations/20251228_create_billing.sql`.
It explains purpose, important fields, and notes about usage, constraints, and indexing.

## Overview

Tables:

- `users` — user accounts and identity metadata.  
- `subscriptions` — recurring subscription records linked to users.  
- `payments` — one-off charges, payment attempts, and receipts.  
- `payment_webhooks` — raw webhook events received from payment provider (Wanlihui).

All UUID primary keys use `gen_random_uuid()` from `pgcrypto`. Amounts are stored as integers in minor currency units (e.g., cents).

## Table: users

Purpose:
- Stores account identity, authentication provider info, billing customer id and consent/metadata for each user.

Important fields:
- `id (uuid)` — Primary key, server-generated UUID.  
- `email (text)` — User email address, unique index `idx_users_email`. Nullable for oauth-only accounts without email.  
- `email_verified (boolean)` — Whether email is verified.  
- `name (text)` — Display name.  
- `avatar_url (text)` — User avatar image URL.  
- `auth_provider (text)` — Which auth provider issued identity: `email`, `google`, `magic_link`, etc.  
- `provider_id (text)` — Provider-specific subject identifier (e.g. Google sub).  
- `password_hash (text)` — Hashed password (nullable for OAuth-only accounts). Use Argon2/bcrypt.  
- `role (text)` — `user`, `admin`, or `support`. Default `user`.  
- `account_tier (text)` — `free`, `pro`, `premium`, or `enterprise`. Default `free`.  
- `billing_customer_id (text)` — External customer identifier from Wanlihui (or other provider) used for mapping payments/subscriptions.  
- `metadata (jsonb)` — Arbitrary app metadata.  
- `consent (jsonb)` — Stores consent states and timestamps (e.g., { marketing: true, marketing_ts: "..." }).  
- `created_at`, `updated_at` — Timestamps.

Notes:
- Do not store sensitive payment details in this table. Use `billing_customer_id` to reference provider-managed payment methods.  
- Keep `email` indexed for fast lookup.

## Table: subscriptions

Purpose:
- Tracks recurring subscriptions for users (provider-managed). Useful for billing cycles, proration, and trial periods.

Important fields:
- `id (uuid)` — Primary key.  
- `user_id (uuid)` — Foreign key -> `users(id)`. ON DELETE CASCADE; deleting a user removes subscriptions.  
- `plan_id (text)` — Internal identifier for the plan (e.g., `pro_monthly`).  
- `provider (text)` — Payment provider, default `wanlihui`.  
- `provider_subscription_id (text)` — Provider's subscription identifier for lookups and webhook correlation.  
- `status (text)` — `active`, `past_due`, `canceled`, `trialing`, `incomplete`, etc.  
- `price_amount (bigint)` — Amount in minor units (e.g., cents).  
- `price_currency (text)` — Currency ISO code (e.g., `CNY`).  
- `current_period_start`, `current_period_end` — Active period bounds.  
- `trial_start`, `trial_end` — Trial period bounds if applicable.  
- `cancel_at_period_end (boolean)` — If true, subscription will not auto-renew.  
- `metadata (jsonb)` — Provider or application-specific metadata.  
- `created_at`, `updated_at`.

Notes:
- Implement idempotency on subscription creation: if provider returns duplicate events, use `provider_subscription_id` to deduplicate.  
- For upgrades/downgrades, record changes in metadata or a separate audit table if needed.

## Table: payments

Purpose:
- Records one-off payments and payment attempts (e.g., buying a premium feature, donations, or immediate charges).

Important fields:
- `id (uuid)` — Primary key.  
- `user_id (uuid)` — FK to `users(id)` (nullable for guest payments). ON DELETE SET NULL.  
- `order_id (text)` — Merchant order id (internal). Should be unique for idempotency; indexed `idx_payments_order_id`.  
- `provider (text)` — `wanlihui` by default.  
- `provider_payment_id (text)` — Provider payment id; indexed for quick lookup.  
- `amount (bigint)` — Amount in minor units.  
- `currency (text)` — ISO currency code.  
- `status (text)` — `pending`, `succeeded`, `failed`, `refunded`.  
- `payment_method (text)` — For provider channel segmentation (e.g., `wechat`, `alipay`, `card`).  
- `description (text)` — Optional merchant description.  
- `receipt_url (text)` — Link to provider receipt or invoice if provided.  
- `raw_payload (jsonb)` — Save provider response for auditing and reconciliation.  
- `attempts (int)` — Number of attempts for this payment.  
- `idempotency_key (text)` — Optional idempotency key to prevent duplicate creation.  
- `created_at`, `updated_at`.

Notes:
- Always write a payments row with `status = 'pending'` before calling provider APIs; update after provider response. This ensures correct reconciliation if provider callback/webhook arrives before local update.  
- Use `raw_payload` to store provider webhook contents and responses for audit and dispute resolution.

## Table: payment_webhooks

Purpose:
- Store raw webhook events from provider for audit, replay, and troubleshooting.

Important fields:
- `id (uuid)` — Primary key.  
- `provider (text)` — Provider name (default `wanlihui`).  
- `event_type (text)` — e.g., `payment.succeeded`, `payment.failed`, `subscription.updated`. Align with Wanlihui's event names.  
- `provider_event_id (text)` — Provider event id for deduplication.  
- `payload (jsonb)` — Raw webhook JSON.  
- `received_at (timestamptz)` — When webhook was received.  
- `processed (boolean)` — Whether local processing succeeded.  
- `processed_at (timestamptz)` — When processed.  
- `error (text)` — Error message if processing failed.

Notes:
- Webhook endpoint should write this table as soon as a request is received, then process the event; update `processed` and `processed_at` to avoid reprocessing.  
- Validate provider signature before marking processed.

## Indexes & Performance

- `idx_users_email` on `users(email)` for fast user lookup.  
- `idx_payments_user` on `payments(user_id)` for querying user payments.  
- `idx_payments_order_id` on `payments(order_id)` for idempotent lookup.  
- `idx_payments_provider_payment_id` on `payments(provider_payment_id)` for reconciliation.  
- `idx_subscriptions_user` on `subscriptions(user_id)` for querying user subscriptions.  
- `idx_webhooks_event_id` on `payment_webhooks(provider_event_id)` for deduplication and lookup.

## Conventions & Best Practices

- Amounts: store monetary values as integers in smallest currency unit (avoid floats).  
- Idempotency: always provide merchant order IDs or idempotency keys to provider calls.  
- Auditing: keep `raw_payload` from provider responses for at least 180 days for reconciliation.  
- Security: provider secrets and webhook secrets must be stored in env vars and never committed.  
- Testing: use Wanlihui sandbox credentials and an ngrok/public URL to test webhook flows locally.

## Next steps

1. Create a lightweight migration runner or include this SQL in your CI/CD deploy step to run against Neon Postgres.  
2. Implement server-side helpers to insert/update these tables in `src/lib/db.ts`.  
3. Implement `/api/pay/initiate` and `/api/pay/webhook` handlers that use these tables with idempotency and signature verification.


