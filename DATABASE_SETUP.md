# Database Setup Guide for HeartRateTap

## Overview

HeartRateTap uses a PostgreSQL database (hosted on Neon) for storing user feedback and comments. The comment page functionality requires database connectivity to work properly.

## Environment Variables Required

To enable database functionality, you need to set the following environment variables:

### Production (Vercel)
```
POSTGRES_URL=your_neon_database_connection_string
```

### Development (.env.local)
```
POSTGRES_URL=your_neon_database_connection_string
```

## Database Connection String Format

Your Neon database connection string should look like:
```
postgresql://username:password@hostname/database?sslmode=require
```

Or if using the pooled connection:
```
postgres://username:password@hostname/database?sslmode=require
```

## Setup Steps

### 1. Create a Neon Database
1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from the dashboard

### 2. Configure Environment Variables

#### For Vercel (Production)
1. Go to your Vercel dashboard
2. Select the HeartRateTap project
3. Go to Settings → Environment Variables
4. Add:
   - Name: `POSTGRES_URL`
   - Value: Your Neon connection string
   - Environment: Production

#### For Local Development
1. Create a `.env.local` file in the project root
2. Add the database connection string:
   ```
   POSTGRES_URL=your_neon_database_connection_string
   ```

### 3. Test Database Connection

You can test the database connection using the provided test script:

```bash
node test-db.js
```

This will verify that:
- The database connection works
- Required tables are created
- Basic CRUD operations function

## Database Schema

The application automatically creates the following tables:

- `feedback_items`: Stores user feedback and feature requests
- `feedback_votes`: Stores user votes on feedback items

## Graceful Degradation

The comment page is designed to work even without database connectivity:

- If database is unavailable, the page still renders
- Users can still submit feedback (though it won't be saved)
- The page shows appropriate messages when database is down
- No 500 errors occur due to database issues

## Troubleshooting

### Common Issues

1. **500 Error on /comment page**: Check database connection string
2. **"Database not available" warnings**: Environment variable not set
3. **Connection timeout**: Verify Neon database is active and accessible

### Verification Commands

```bash
# Test database connection
node test-db.js

# Check environment variables
echo $POSTGRES_URL

# Test comment page functionality
curl -I https://heartratetap.com/comment
```

## Security Notes

- Never commit database credentials to version control
- Use environment variables for all sensitive configuration
- Ensure your Neon database has proper access controls
- Use SSL connections (sslmode=require) in production
