# eSource Health Ledger API

Backend API replacing Base44.

## Responsibilities
- Authentication (JWT)
- Users & onboarding
- Document assignment
- Approvals
- Email notifications
- Audit ledger (future blockchain)

## Deployment
- Hosted on Render
- PostgreSQL required

## Frontend Integration

Frontend connects via `VITE_API_URL`.

The API client (`src/services/apiClient.js`) provides a complete replacement for Base44. See [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) for migration instructions.