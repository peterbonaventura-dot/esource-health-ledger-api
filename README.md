# esource-health-ledger-api

## Production-Grade JWT Authentication

This repository implements a production-grade authentication system with JWT Bearer token support.

### 🔐 Authentication Features

- ✅ JWT Bearer token authentication
- ✅ Secure token storage and management
- ✅ Automatic token expiry handling
- ✅ Login/logout functionality
- ✅ Session cookie fallback support

### 📋 Quick Start

#### Verify Backend Authentication Endpoints

Run the test scripts to verify your backend supports production-grade authentication:

```bash
# Using Node.js
node test-auth-endpoints.cjs https://your-backend-url.com

# Using Shell script
./test-auth-endpoints.sh https://your-backend-url.com
```

#### Frontend Integration

```javascript
import { useAuth } from './hooks/useAuth';

function MyApp() {
  const { user, login, logout } = useAuth();
  
  // Login
  await login('user@example.com', 'password');
  
  // User data automatically available
  console.log(user);
  
  // Logout
  await logout();
}
```

### 📚 Documentation

- **[AUTH_VERIFICATION.md](./AUTH_VERIFICATION.md)** - Complete testing and verification guide
- **[PRODUCTION_AUTHENTICATION.md](./PRODUCTION_AUTHENTICATION.md)** - Implementation summary and architecture

### 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### 🧪 Testing

Test scripts are provided to verify authentication endpoints:
- `test-auth-endpoints.cjs` - Node.js-based test script
- `test-auth-endpoints.sh` - Shell-based test script

### 🔒 Security

- CodeQL verified: 0 vulnerabilities
- Production-ready security features
- XSS mitigation documented
- HTTPS recommended for production

### 📦 Project Structure

```
src/
├── hooks/
│   └── useAuth.js          # Production-grade auth hook
├── lib/
│   └── tokenStorage.js     # JWT token management
├── pages/
│   └── Login.jsx           # Example login component
└── ...

test-auth-endpoints.cjs      # Node.js test script
test-auth-endpoints.sh       # Shell test script
AUTH_VERIFICATION.md         # Testing guide
PRODUCTION_AUTHENTICATION.md # Implementation summary
```

### 🚀 Deployment

See [PRODUCTION_AUTHENTICATION.md](./PRODUCTION_AUTHENTICATION.md) for production deployment guidelines and security recommendations.
