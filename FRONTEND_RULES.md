# Frontend Rules Enforcement

This repository enforces strict rules against using certain packages and patterns in frontend code.

## Forbidden Patterns in Frontend

The following patterns are **strictly forbidden** in the `frontend/` directory:

1. **`@base44/*`** - Any imports from @base44 namespace packages
2. **`@base44/sdk`** - Specifically the @base44/sdk package
3. **`base44`** - The base44 identifier in any context
4. **`User.me`** - The User.me property access pattern

## Enforcement

These rules are enforced through:

### 1. ESLint Rules
- Configured in `.eslintrc.json`
- Uses `no-restricted-imports` to block @base44/* packages
- Uses `no-restricted-syntax` to block base44 identifier and User.me patterns
- Run locally with: `npm run lint:frontend`

### 2. CI/CD Pipeline
- GitHub Actions workflow: `.github/workflows/enforce-frontend-rules.yml`
- Runs on every PR and push to main/master
- Includes both ESLint check and grep-based pattern matching
- **Any PR containing these patterns will fail CI**

## Testing Locally

```bash
# Install dependencies
npm install

# Run ESLint on frontend code
npm run lint:frontend

# Check for forbidden patterns manually
grep -r "@base44/" frontend/
grep -r "User\.me" frontend/
```

## Examples

### ❌ Forbidden (will fail CI):

```javascript
// frontend/components/UserProfile.js
import { auth } from '@base44/sdk';  // ❌ Forbidden
import utils from '@base44/utils';   // ❌ Forbidden

const base44 = require('some-lib');   // ❌ Forbidden

function getUserInfo() {
  return User.me;                     // ❌ Forbidden
}
```

### ✅ Allowed:

```javascript
// frontend/components/UserProfile.js
import { auth } from 'our-internal-auth';  // ✅ OK
import utils from 'lodash';                // ✅ OK

const myVariable = require('some-lib');    // ✅ OK

function getUserInfo() {
  return currentUser;                      // ✅ OK
}
```
