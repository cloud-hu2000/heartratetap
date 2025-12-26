# Vercel Environment Variables Setup for Sentry

## Quick Setup Steps

### 1. Get Your Sentry DSN

1. Go to [sentry.io](https://sentry.io) and sign in
2. Select your project: `cloudhu/javascript-nextjs`
3. Go to **Settings** → **Client Keys (DSN)**
4. Copy the **DSN** value (looks like: `https://abc123@sentry.io/123456`)

### 2. Get Your Sentry Auth Token

1. Go to [sentry.io/settings/auth-tokens/](https://sentry.io/settings/auth-tokens/)
2. Click **"Create New Token"**
3. Give it a name like "HeartRateTap Production"
4. Select scope: `project:releases` (and `org:read` if you want)
5. Copy the token value

### 3. Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your HeartRateTap project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
Name: SENTRY_DSN
Value: https://your-actual-dsn@sentry.io/project-id
Environment: Production, Preview, Development

Name: NEXT_PUBLIC_SENTRY_DSN
Value: https://your-actual-dsn@sentry.io/project-id
Environment: Production, Preview, Development

Name: SENTRY_AUTH_TOKEN
Value: your-sentry-auth-token
Environment: Production
```

### 4. Test Your Setup

1. Deploy your app to Vercel
2. Visit `/sentry-example-page`
3. Check your browser console for any errors
4. Check [sentry.io/issues/](https://sentry.io/issues/) for captured errors

### 5. Verify in Production

- Errors will appear in your Sentry dashboard
- Performance metrics will be collected
- Session replays will work (with user consent)

## Troubleshooting

- **No errors appearing?** Check that DSN is correct and environment variables are set
- **Auth token issues?** Make sure the token has the right scopes
- **Sourcemaps not uploading?** Check that `SENTRY_AUTH_TOKEN` is set in production only
- **Organization/project not found?** Verify your `.sentryclirc` configuration matches your Sentry account

## Sourcemap Upload

Sourcemaps are automatically uploaded after each production build via the `postbuild` script. This enables:

- **Readable stack traces** in error reports
- **Accurate error locations** in your source code
- **Better debugging** experience in Sentry dashboard

The upload happens only in production builds with valid `SENTRY_AUTH_TOKEN`.

## Current Configuration Status

✅ **Code Setup**: Sentry SDK integrated
✅ **Privacy Controls**: Consent-based user data collection
✅ **Error Boundaries**: React error boundaries configured
✅ **Performance Monitoring**: Core Web Vitals tracking enabled

🔄 **Next Step**: Add environment variables in Vercel dashboard
