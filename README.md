# esource-health-ledger-api

A health ledger API backend service built with Express.js.

## Features

- Express.js server
- Health check endpoint
- Environment-based port configuration
- Graceful shutdown handling

## Installation

```bash
npm install
```

## Running the Server

```bash
# Start the server (default port: 3000)
npm start

# Or specify a custom port
PORT=8080 npm start
```

## Endpoints

### Health Check
- **URL**: `/health`
- **Method**: GET
- **Success Response**: 
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-01-30T02:36:02.113Z",
    "uptime": 5.99060073
  }
  ```

## Environment Variables

- `PORT` - Port number for the server (default: 3000)

## Render Deployment

The server is configured to run with the command:
```
node src/server.js
```

Make sure to set the `PORT` environment variable in your Render service configuration.