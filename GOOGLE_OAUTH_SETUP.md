# Google OAuth Setup Guide

This guide will help you set up Google OAuth for both user and partner authentication in your food cravings app.

## Prerequisites

You need to create a Google OAuth 2.0 client ID and client secret from the Google Cloud Console.

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application"
7. Add the following to "Authorized redirect URIs":
   - `http://localhost:3000/api/auth/google/user/callback`
   - `http://localhost:3000/api/auth/google/partner/callback`
8. Copy the Client ID and Client Secret

## Step 2: Configure Environment Variables

Update your backend `.env` file with the Google OAuth credentials:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-session-secret-key-here
```

## Step 3: Database Schema Updates

The user and food partner models have been updated to support Google OAuth:

### User Model Changes:
- Added `googleId` field for storing Google user ID
- Added `profileImage` field for storing Google profile picture
- Added `authProvider` field to distinguish between 'local' and 'google' authentication
- Made `password` field optional (not required for Google OAuth users)

### Food Partner Model Changes:
- Added `googleId` field for storing Google user ID
- Added `profileImage` field for storing Google profile picture  
- Added `authProvider` field to distinguish between 'local' and 'google' authentication
- Made `password`, `phone`, and `address` fields optional (Google OAuth partners can complete profile later)

## Step 4: How It Works

### For Users:
1. User clicks "Continue with Google" on login/register page
2. Redirected to Google OAuth consent screen
3. After consent, Google redirects to `/api/auth/google/user/callback`
4. Backend processes the OAuth callback and creates/updates user account
5. JWT token is set in cookies and user is redirected to home page

### For Partners:
1. Partner clicks "Continue with Google" on login/register page
2. Redirected to Google OAuth consent screen
3. After consent, Google redirects to `/api/auth/google/partner/callback`
4. Backend processes the OAuth callback and creates/updates partner account
5. JWT token is set in cookies and partner is redirected to create-food page
6. If it's a new partner, they'll need to complete their profile with business details

## Step 5: Frontend Integration

The following components have been updated with Google Sign-In buttons:
- `UserLogin.jsx`
- `UserRegister.jsx`
- `PartnerLogin.jsx`
- `PartnerRegister.jsx`

A new `GoogleSignIn` component has been created to handle the Google OAuth flow.

## Step 6: Testing

1. Start your backend server: `npm start`
2. Start your frontend development server: `npm run dev`
3. Visit the login/register pages and test the Google Sign-In functionality
4. Make sure your Google OAuth app is configured for the correct redirect URIs

## Security Considerations

- The `SESSION_SECRET` should be a strong, randomly generated secret in production
- Consider using HTTPS in production and updating the `secure` cookie setting
- The Google OAuth credentials should be kept secure and not committed to version control

## Troubleshooting

1. **Invalid Redirect URI**: Make sure the redirect URIs in Google Console match exactly with the ones in your code
2. **Authentication Failed**: Check that your Google Client ID and Secret are correctly configured
3. **CORS Issues**: Ensure your frontend URL is properly configured in CORS settings

## Production Deployment

When deploying to production:
1. Update the `CLIENT_URL` in your environment variables
2. Update the authorized redirect URIs in Google Console
3. Set `secure: true` for cookies if using HTTPS
4. Use strong session secrets