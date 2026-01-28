# eSource Health Ledger API

Backend API for eSource Health Ledger - System of Record

## 🚀 Overview

This is the permanent backend API that replaces Base44. Built with Node.js, Express, and PostgreSQL.

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd esource-health-ledger-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## 🔗 Endpoints

### Health Check
- `GET /health` - Returns `{ status: "ok" }`

### Authentication
- `POST /auth/login` - User login (placeholder)
- `GET /auth/me` - Get current user (requires authentication)

### Users
- `GET /users` - List users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Documents
- `GET /documents` - List documents
- `GET /documents/:id` - Get document by ID
- `POST /documents` - Create document
- `PUT /documents/:id` - Update document
- `DELETE /documents/:id` - Delete document

### Approvals
- `GET /approvals` - List approvals
- `GET /approvals/:id` - Get approval by ID
- `POST /approvals` - Create approval
- `PUT /approvals/:id` - Update approval

### Notifications
- `GET /notifications` - List notifications
- `GET /notifications/:id` - Get notification by ID
- `PUT /notifications/:id/read` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

## 🏗️ Architecture

```
src/
├── routes/          # API route handlers
├── middleware/      # Express middleware (auth, audit)
├── services/        # Business logic (email, tokens)
├── db/              # Database connection and queries
├── app.js           # Express app configuration
└── server.js        # Server entry point
```

## 🔐 Authentication

JWT-based authentication is implemented in the middleware. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Environment Variables

See `.env.example` for all required environment variables:
- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed CORS origin

## 🚦 Current Status

**Phase 3: Backend Scaffold Complete** ✅
- Express app bootstrapped
- Database connection configured
- Routes mounted
- Auth middleware implemented
- Health endpoint operational

**Next Steps:**
- Implement SQL schema
- Add full authentication logic
- Implement business logic for all endpoints

## 📄 License

ISC