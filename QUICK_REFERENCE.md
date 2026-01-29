# Quick Reference Guide: Production-Grade Authentication

## Testing Backend Endpoints

### Test with Node.js (Recommended)
```bash
node test-auth-endpoints.cjs https://your-backend.com
```

### Test with Shell Script
```bash
./test-auth-endpoints.sh https://your-backend.com
```

## Expected Backend Responses

### POST /auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200/201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### GET /auth/me
**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com"
}
```

**Unauthorized Response (401):**
```json
{
  "message": "Unauthorized"
}
```

## Frontend Usage

### Basic Usage
```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, loading, error, login, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('user@example.com', 'pass')}>
          Login
        </button>
      )}
    </div>
  );
}
```

### Manual Token Management
```javascript
import { setToken, getToken, removeToken, isAuthenticated } from './lib/tokenStorage';

// Store token after login
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// Check if authenticated
if (isAuthenticated()) {
  console.log('User is logged in');
}

// Get token for API calls
const token = getToken(); // Returns null if expired

// Remove token on logout
removeToken();
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User visits app                                          │
│    └─> useAuth hook checks for stored token                │
│        └─> If token exists and not expired:                │
│            GET /api/auth/me with Authorization: Bearer      │
│        └─> If no token:                                     │
│            User not authenticated                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. User logs in                                             │
│    └─> Call login(email, password)                         │
│        └─> POST /api/auth/login                            │
│            └─> Backend returns JWT token                   │
│                └─> Token stored in localStorage           │
│                    └─> User data set in state             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. Authenticated requests                                   │
│    └─> All /api/* requests automatically include:          │
│        Authorization: Bearer <token>                        │
│    └─> Backend verifies token and returns data            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. Token expiry                                             │
│    └─> Before each request, token expiry checked          │
│        └─> If expired: Token removed, user logged out     │
│        └─> Backend returns 401: Token removed             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 5. User logs out                                            │
│    └─> Call logout()                                       │
│        └─> POST /api/auth/logout (optional)               │
│            └─> Token removed from localStorage            │
│                └─> User state cleared                     │
└─────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### "Could not connect to backend"
- Check backend URL is correct
- Verify backend is running
- Check network/firewall

### "JWT format is invalid"
- Backend must return token in correct format
- Token should have 3 parts: header.payload.signature

### "Token rejected (401)"
- Token may be expired
- Backend verification may be failing
- Check JWT secret configuration

### "No token found in response"
- Backend must return token field
- Supported fields: `token`, `accessToken`, `jwt`

## Security Checklist

- [ ] Backend uses HTTPS in production
- [ ] JWT tokens have expiry time (e.g., 1 hour)
- [ ] CORS configured properly
- [ ] Rate limiting on login endpoint
- [ ] Passwords hashed with bcrypt/argon2
- [ ] Content Security Policy (CSP) configured
- [ ] XSS protection enabled
- [ ] User input sanitized

## Files Overview

| File | Purpose |
|------|---------|
| `test-auth-endpoints.cjs` | Node.js test script for endpoint verification |
| `test-auth-endpoints.sh` | Shell script for endpoint verification |
| `src/hooks/useAuth.js` | Main authentication hook |
| `src/lib/tokenStorage.js` | JWT token management utilities |
| `src/pages/Login.jsx` | Example login component |
| `AUTH_VERIFICATION.md` | Complete verification guide |
| `PRODUCTION_AUTHENTICATION.md` | Implementation summary |
| `QUICK_REFERENCE.md` | This quick reference |

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test authentication endpoints
node test-auth-endpoints.cjs http://localhost:3000

# Test with deployed backend
node test-auth-endpoints.cjs https://your-api.onrender.com
```

## Need More Help?

- 📖 Full guide: [AUTH_VERIFICATION.md](./AUTH_VERIFICATION.md)
- 📋 Implementation details: [PRODUCTION_AUTHENTICATION.md](./PRODUCTION_AUTHENTICATION.md)
- 💻 Example: [src/pages/Login.jsx](./src/pages/Login.jsx)

---

**Quick Links:**
- [Test Scripts](#testing-backend-endpoints)
- [API Specs](#expected-backend-responses)
- [Code Examples](#frontend-usage)
- [Troubleshooting](#troubleshooting)
