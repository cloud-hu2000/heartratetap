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
4. **IMPORTANT**: Select these exact scopes:
   - `project:releases` (for sourcemap uploads)
   - `project:read` (for project access)
   - `org:read` (for organization access)
   - `team:read` (for team access)
5. Copy the token value (starts with `sntrys_...`)

**⚠️ Required Scopes for Sourcemap Upload:**
- `project:releases` - Upload releases and sourcemaps
- `project:read` - Read project information
- `org:read` - Read organization information

**🔍 Verify Token:**
After creating, you should see a token that looks like: `sntrys_abc123...`

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

### ❌ Common Errors & Solutions

#### **401 Invalid Token Error**
```
error: API request failed - sentry reported an error: Invalid token (http status: 401)
```

**Solutions:**
1. **Check Token Scopes**: Ensure your auth token has these scopes:
   - `project:releases` ✅
   - `project:read` ✅
   - `org:read` ✅
2. **Verify Token Format**: Should start with `sntrys_`
3. **Regenerate Token**: Create a new token if the old one expired
4. **Check Vercel Environment**: Make sure `SENTRY_AUTH_TOKEN` is set in **Production** environment

#### **No Errors Appearing**
- Check that `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` are set correctly
- Verify DSN format: `https://xxx@sentry.io/project-id`

#### **Sourcemaps Not Uploading**
- Check that `SENTRY_AUTH_TOKEN` is set in **Production** only (not Preview)
- Verify token has `project:releases` scope
- Check build logs for upload confirmation

#### **Organization/Project Not Found**
- Verify your Sentry account has access to `cloudhu/javascript-nextjs`
- Check that project exists and is not suspended

## Sourcemap Upload

Sourcemaps are automatically uploaded after each production build via the `postbuild` script. This enables:

- **Readable stack traces** in error reports
- **Accurate error locations** in your source code
- **Better debugging** experience in Sentry dashboard

The upload happens only in production builds with valid `SENTRY_AUTH_TOKEN`.

## Token Validation Checklist

Before deploying, verify:

- ✅ **Token Format**: Starts with `sntrys_` (not the old format)
- ✅ **Scopes Include**: `project:releases`, `project:read`, `org:read`
- ✅ **Environment**: Set in Vercel **Production** environment only
- ✅ **No Spaces**: Token value has no leading/trailing spaces
- ✅ **Not Expired**: Tokens don't expire, but can be revoked

## Quick Token Test

You can test your token locally (optional):

```bash
# Install sentry-cli if not already installed
npm install -g @sentry/cli

# Test token (replace YOUR_TOKEN with actual token)
export SENTRY_AUTH_TOKEN=YOUR_TOKEN
sentry-cli info --org cloudhu --project javascript-nextjs
```

If successful, you'll see project information. If not, you'll get the same 401 error.

## Current Configuration Status

✅ **Code Setup**: Sentry SDK integrated
✅ **Privacy Controls**: Consent-based user data collection
✅ **Error Boundaries**: React error boundaries configured
✅ **Performance Monitoring**: Core Web Vitals tracking enabled

🔄 **Next Step**: Add environment variables in Vercel dashboard
