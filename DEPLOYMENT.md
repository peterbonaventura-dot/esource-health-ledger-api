# Deployment Guide

## Frontend Deployment

### Prerequisites
- Backend is deployed at `https://esourcehealthledger.com`
- Backend health endpoint is accessible

### Step 1: Verify Backend
Before deploying the frontend, verify the backend is accessible:

```bash
curl https://esourcehealthledger.com/health
```

Expected response:
```json
{ "status": "ok" }
```

### Step 2: Build Frontend
```bash
npm install
npm run build
```

This creates a `dist/` directory with the production build.

### Step 3: Deploy to Hosting Service

#### Option A: Vercel
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Netlify
```bash
# Install Netlify CLI if not already installed
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option C: Render (Static Site)
1. Connect your repository to Render
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Add Environment Variable: `VITE_API_URL=https://esourcehealthledger.com`

### Step 4: Configure Backend Environment Variables

After deploying the frontend, configure the following environment variables in Render for the backend service:

1. **JWT_SECRET** or **API_KEY**: Required for authentication
2. **DATABASE_URL**: Database connection string (if applicable)
3. **CORS_ORIGIN**: Set to your frontend URL to allow cross-origin requests
4. Any other auth middleware secrets required by your backend

### Step 5: Restart Backend Service

After adding environment variables to Render:
1. Go to your Render dashboard
2. Find your backend service
3. Click "Manual Deploy" → "Clear build cache & deploy"

### Step 6: Verify Deployment

1. Open your frontend URL
2. The app should display the API configuration and attempt to connect to the backend
3. Check browser console for any errors
4. If backend is properly configured, you should see a green success message

### Troubleshooting

#### "Invalid or missing API key" error
This is expected if backend environment variables are not yet configured. This actually means:
- ✅ Requests ARE reaching the backend
- ✅ Auth middleware IS running
- ❌ Backend secrets are missing

**Solution**: Configure the backend environment variables and restart the service.

#### CORS errors
Add your frontend URL to the `CORS_ORIGIN` environment variable in the backend.

#### Connection refused or network errors
- Verify the backend URL is correct
- Check if the backend service is running in Render
- Verify DNS settings for the custom domain

## Backend Configuration Checklist

- [ ] Backend deployed to Render
- [ ] Custom domain configured: `esourcehealthledger.com`
- [ ] Health endpoint responds: `https://esourcehealthledger.com/health`
- [ ] Environment variables configured:
  - [ ] JWT_SECRET or API_KEY
  - [ ] DATABASE_URL (if needed)
  - [ ] CORS_ORIGIN
  - [ ] Other auth secrets
- [ ] Service restarted after env var changes
- [ ] Auth endpoint tested: `https://esourcehealthledger.com/auth/me`

## Important Notes

- The frontend **must** be rebuilt (`npm run build`) after any environment variable changes
- The API URL is embedded at build time, not runtime
- Always verify backend connectivity before troubleshooting frontend issues
- "Invalid or missing API key" is a good sign - it means routing works, just needs backend config
