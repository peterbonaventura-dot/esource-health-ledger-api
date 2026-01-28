# eSource Health Ledger API

## 🎉 Phase 2.5 Complete: Centralized Auth + Routing

This repository implements a clean React architecture where **Layout.jsx is the single source of truth** for authentication and routing decisions.

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Architecture Highlights

- ✅ **Single Auth Gatekeeper**: Layout.jsx owns all auth decisions
- ✅ **Pure Page Components**: Pages never call auth or redirect
- ✅ **One Auth Call**: Only `/auth/me` on app load
- ✅ **Zero Base44**: No external SDK dependencies
- ✅ **Clean Separation**: Auth logic completely isolated from UI

### Documentation

See [PHASE_2.5.md](./PHASE_2.5.md) for complete architecture documentation.

### Project Status

- ✅ **Phase 1**: Base44 fully disabled at runtime
- ✅ **Phase 2.5**: App skeleton stabilization with centralized auth
- 🔜 **Phase 3**: Replace one page end-to-end with real data

---

Built with React 18, React Router v6, and Vite.