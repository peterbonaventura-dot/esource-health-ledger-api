# eSource Health Ledger API

Frontend application for the eSource Health Ledger system.

## Configuration

### Environment Variables

The frontend requires the following environment variable to be set:

- `VITE_API_URL`: Backend API URL (default: `https://esourcehealthledger.com`)

### Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your backend URL (if different from default):
   ```bash
   VITE_API_URL=https://esourcehealthledger.com
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Backend Configuration

The backend is deployed at: `https://esourcehealthledger.com`

### Verify Backend Access

Open in a browser:
- Health check: `https://esourcehealthledger.com/health`
  - Expected response: `{ "status": "ok" }`

### Required Backend Environment Variables

The following environment variables must be configured in Render:

1. **API Key / JWT Secret**: For authentication
2. **Auth Middleware Secrets**: Required for auth middleware
3. **Database Connection String**: If database is used

After setting these variables, restart the Render service and test:
- Auth endpoint: `https://esourcehealthledger.com/auth/me`

## Deployment

The frontend should be rebuilt and redeployed after any environment variable changes:

```bash
npm run build
```

Then deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.).

## Important Notes

- All API calls now point to the verified Render backend domain (`esourcehealthledger.com`)
- No longer using old Base44 endpoints or onrender.com URLs
- The "Invalid or missing API key" error means requests are reaching the backend correctly, but backend secrets need to be configured