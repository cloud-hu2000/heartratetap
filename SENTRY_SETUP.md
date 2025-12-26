# Sentry Error & Performance Monitoring Setup

This guide explains how to set up Sentry monitoring for the HeartRateTap application.

## Prerequisites

1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new Next.js project in Sentry
3. Get your DSN and Auth Token

## Environment Variables

Add these environment variables to your Vercel project or `.env.local`:

```bash
# Sentry DSN (from your Sentry project settings)
SENTRY_DSN=https://your-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Sentry Auth Token (for sourcemap uploads)
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

## How to Get Sentry Credentials

### 1. DSN (Data Source Name)
1. Go to [sentry.io](https://sentry.io) and sign in
2. Select your project or create a new Next.js project
3. Go to Settings → Client Keys (DSN)
4. Copy the DSN value

### 2. Auth Token
1. Go to [sentry.io](https://sentry.io/settings/auth-tokens/)
2. Create a new token with `project:releases` scope
3. Copy the token value

## User Privacy & Consent

The application implements privacy-first monitoring:

- **No user tracking by default**: Sentry only collects technical error data
- **User consent required**: Personal data association only after explicit user consent
- **Data minimization**: Only essential error information is collected
- **GDPR compliant**: Users can opt-out at any time

## Monitoring Features

### Error Tracking
- JavaScript errors and unhandled exceptions
- React component errors
- API route errors
- Performance issues

### Performance Monitoring
- Page load times
- API response times
- Core Web Vitals
- User interaction tracking

### Session Replays (with consent)
- User session recordings (only when consented)
- Error context visualization
- Privacy-preserving (text masked, media blocked)

## Deployment

1. Set environment variables in Vercel dashboard
2. Deploy the application
3. Check Sentry dashboard for incoming events

## Testing

Visit `/sentry-example-page` to trigger a test error and verify monitoring is working.

## Configuration Files

- `sentry.client.config.js` - Client-side error tracking
- `sentry.server.config.js` - Server-side error tracking
- `instrumentation.ts` - Next.js instrumentation
- `vercel.json` - Vercel deployment configuration

## Privacy Compliance

- ✅ No personal data collection without consent
- ✅ Right to erasure (delete account data)
- ✅ Data minimization principles
- ✅ Transparent data practices
- ✅ Cookie consent integration
