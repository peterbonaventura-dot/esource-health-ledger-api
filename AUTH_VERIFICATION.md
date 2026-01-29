# Authentication Verification Guide

This guide explains how to verify that the authentication endpoints are production-grade.

## Overview

The authentication system has been enhanced to support production-grade JWT Bearer token authentication with the following features:

- ✅ JWT token storage in localStorage
- ✅ Automatic token expiry checking
- ✅ Authorization: Bearer header support
- ✅ Fallback to session cookie authentication
- ✅ Login/logout functionality
- ✅ Secure token management

## Requirements Verification

### 1. `/auth/login` Returns a Usable JWT

The login endpoint should:
- Accept POST requests with email/password
- Return a JWT token in the response
- Token should have proper format (header.payload.signature)
- Token should be decodable and contain user information
- Token should have expiry information

### 2. `/auth/me` Works with Authorization: Bearer

The /auth/me endpoint should:
- Accept GET requests
- Require authentication (return 401 without valid token)
- Accept JWT token via `Authorization: Bearer <token>` header
- Return user information when authenticated
- Fallback to session cookies if no Bearer token provided

## Testing the Authentication Endpoints

Two test scripts are provided to verify the endpoints:

### Option 1: Node.js Test Script (Recommended)

**Prerequisites:** Node.js installed

**Usage:**
```bash
node test-auth-endpoints.js <backend-url>
```

**Examples:**
```bash
# Test local backend
node test-auth-endpoints.js http://localhost:3000

# Test deployed backend
node test-auth-endpoints.js https://your-api.onrender.com
```

**Features:**
- Comprehensive JWT validation
- Token decoding and inspection
- Color-coded output
- Detailed error reporting
- Exit codes for CI/CD integration

### Option 2: Shell Script (Curl-based)

**Prerequisites:** curl, bash (Linux/Mac)

**Usage:**
```bash
./test-auth-endpoints.sh <backend-url>
```

**Examples:**
```bash
# Test local backend
./test-auth-endpoints.sh http://localhost:3000

# Test deployed backend
./test-auth-endpoints.sh https://your-api.onrender.com
```

**Features:**
- No dependencies except curl
- Works on any Unix-like system
- Color-coded output
- Simple and fast

## Frontend Integration

The frontend has been updated to support JWT authentication:

### Token Storage (`src/lib/tokenStorage.js`)

Provides secure token management:
- `setToken(token)` - Store JWT token
- `getToken()` - Retrieve token (null if expired)
- `removeToken()` - Clear token
- `isAuthenticated()` - Check if user has valid token

### Enhanced useAuth Hook (`src/hooks/useAuth.js`)

Now supports:
- Automatic JWT token inclusion in requests
- Login/logout functions
- Both Bearer token and session cookie authentication
- Automatic token expiry handling

**Usage:**
```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, loading, error, login, logout } = useAuth();
  
  // Login
  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      console.log('Logged in!', result.user);
    }
  };
  
  // Logout
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
```

## Expected Backend API

### POST /auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200/201):**
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

**Alternative formats supported:**
- `accessToken` instead of `token`
- `jwt` instead of `token`
- User data at root level without nested `user` object

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

### GET /auth/me

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Alternative:** Session cookie (automatic fallback)

**Response (Success - 200):**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com"
}
```

**Response (Not Authenticated - 401):**
```json
{
  "message": "Unauthorized"
}
```

## Security Considerations

### ✅ Production-Grade Features

1. **JWT Token Security:**
   - Tokens stored in localStorage (accessible only to same origin)
   - Automatic expiry checking
   - Invalid tokens automatically removed

2. **Authentication Flow:**
   - Bearer token sent in Authorization header (standard practice)
   - Session cookie fallback for compatibility
   - Secure credential handling

3. **Error Handling:**
   - Proper 401 handling for expired/invalid tokens
   - Graceful fallback on errors
   - No sensitive data in client code

### ⚠️ Additional Recommendations

For maximum security in production:

1. **Use HTTPS:** Always use HTTPS in production to prevent token interception
2. **Token Expiry:** Set reasonable token expiry times (e.g., 1 hour)
3. **Refresh Tokens:** Implement refresh token mechanism for long sessions
4. **CORS:** Configure proper CORS headers on backend
5. **Rate Limiting:** Implement rate limiting on login endpoint
6. **Password Security:** Use bcrypt/argon2 for password hashing on backend

## Troubleshooting

### Test Script Shows "Could not connect to backend"
- Verify the backend URL is correct
- Check if backend is running
- Check for network/firewall issues

### Test Script Shows "Endpoint not found (404)"
- Verify the backend has `/auth/login` and `/auth/me` endpoints
- Check API documentation for correct endpoint paths

### JWT Token Rejected (401)
- Token may be expired
- Token signature verification may be failing
- Check backend JWT secret configuration

### Frontend Not Sending Token
- Check browser localStorage for `auth_token`
- Verify token is not expired
- Check browser console for errors

## CI/CD Integration

Both test scripts support CI/CD pipelines:

**Exit Codes:**
- `0` - All tests passed
- `1` - Tests failed

**Example GitHub Actions:**
```yaml
- name: Test Authentication Endpoints
  run: |
    node test-auth-endpoints.js ${{ secrets.BACKEND_URL }}
```

**Example in npm scripts:**
```json
{
  "scripts": {
    "test:auth": "node test-auth-endpoints.js http://localhost:3000"
  }
}
```

## Summary

The authentication system is now production-grade with:
- ✅ JWT Bearer token support
- ✅ Secure token storage
- ✅ Automatic expiry handling
- ✅ Comprehensive test scripts
- ✅ Full documentation
- ✅ CI/CD ready

Run the test scripts to verify your backend endpoints meet production standards!
