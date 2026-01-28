# esource-health-ledger-api

Health Ledger API with enforced frontend code rules.

## Frontend Rules Enforcement

This repository enforces strict rules against using certain packages and patterns in frontend code. Any PR containing forbidden patterns will **fail CI**.

### Forbidden Patterns

The following are **strictly forbidden** in the `frontend/` directory:

1. **`@base44/*`** - Any imports from @base44 namespace packages (including @base44/sdk)
2. **`base44`** - The base44 identifier when used as a standalone variable/constant name
3. **`User.me`** - The User.me property access pattern

### Enforcement Mechanisms

1. **ESLint Rules** (`.eslintrc.json`)
   - `no-restricted-imports` blocks @base44/* packages
   - `no-restricted-syntax` blocks base44 identifier and User.me patterns
   - Run locally: `npm run lint:frontend`

2. **CI/CD Pipeline** (`.github/workflows/enforce-frontend-rules.yml`)
   - Runs ESLint on every PR
   - Runs grep-based pattern matching
   - **Fails CI if any forbidden patterns are found**

### Documentation

See [FRONTEND_RULES.md](FRONTEND_RULES.md) for detailed documentation and examples.

### Local Testing

```bash
# Install dependencies
npm install

# Run ESLint check
npm run lint:frontend
```