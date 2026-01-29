# esource-health-ledger-api

Node.js + Express backend for eSource Health Ledger application.

## Features

- ✅ Express.js REST API
- ✅ JWT Authentication (Bearer token)
- ✅ Health check endpoint
- ✅ Authentication endpoints (login, user profile)
- ✅ CRUD route placeholders for:
  - Residents
  - Employees
  - Documents
  - Audit Logs
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Request logging

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/peterbonaventura-dot/esource-health-ledger-api.git
cd esource-health-ledger-api

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update JWT_SECRET in .env with a secure random string
```

### Running the Server

```bash
# Production
npm start

# Development (with hot reload on Node 18+)
npm run dev
```

The server will start on port 3000 (or the PORT specified in .env).

## API Endpoints

### Health Check

```bash
GET /health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-29T17:58:13.525Z",
  "uptime": 14.852864172
}
```

### Authentication

#### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Get Current User (Protected)

```bash
GET /auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Protected Resources

All resource endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### Residents

- `GET /residents` - List all residents
- `GET /residents/:id` - Get resident by ID
- `POST /residents` - Create new resident
- `PUT /residents/:id` - Update resident
- `DELETE /residents/:id` - Delete resident

#### Employees

- `GET /employees` - List all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

#### Documents

- `GET /documents` - List all documents
- `GET /documents/:id` - Get document by ID
- `POST /documents` - Create new document
- `PUT /documents/:id` - Update document
- `DELETE /documents/:id` - Delete document

#### Audit Logs

- `GET /audit-logs` - List all audit logs
- `GET /audit-logs/:id` - Get audit log by ID

## Default Test Users

For testing purposes, the following users are available:

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | admin |
| user | user123 | user |

**Note:** In production, connect to a real database and implement proper user management.

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
```

## Render Deployment

This application is configured for deployment on Render:

- **Build Command:** `npm install`
- **Start Command:** `node src/server.js`

Set the following environment variables in Render:
- `JWT_SECRET` - A secure random string
- `NODE_ENV` - Set to `production`
- `PORT` - Will be set automatically by Render

## Project Structure

```
esource-health-ledger-api/
├── src/
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── errorHandler.js   # Global error handler
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── residents.js      # Resident routes (placeholder)
│   │   ├── employees.js      # Employee routes (placeholder)
│   │   ├── documents.js      # Document routes (placeholder)
│   │   └── auditLogs.js      # Audit log routes (placeholder)
│   └── server.js             # Main application entry point
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Next Steps

- [ ] Connect to a database (PostgreSQL, MongoDB, etc.)
- [ ] Implement actual CRUD operations for all resources
- [ ] Add input validation
- [ ] Add proper user management and registration
- [ ] Implement file upload for documents
- [ ] Add pagination and filtering
- [ ] Add comprehensive testing
- [ ] Add API documentation (Swagger/OpenAPI)

## License

ISC