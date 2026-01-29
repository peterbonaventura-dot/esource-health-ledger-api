require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set!');
  console.error('Please set JWT_SECRET in your .env file or environment variables.');
  process.exit(1);
}

// Import routes
const authRoutes = require('./routes/auth');
const residentsRoutes = require('./routes/residents');
const employeesRoutes = require('./routes/employees');
const documentsRoutes = require('./routes/documents');
const auditLogsRoutes = require('./routes/auditLogs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/residents', residentsRoutes);
app.use('/employees', employeesRoutes);
app.use('/documents', documentsRoutes);
app.use('/audit-logs', auditLogsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'eSource Health Ledger API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      auth: {
        login: 'POST /auth/login',
        me: 'GET /auth/me (protected)'
      },
      residents: 'GET|POST|PUT|DELETE /residents',
      employees: 'GET|POST|PUT|DELETE /employees',
      documents: 'GET|POST|PUT|DELETE /documents',
      auditLogs: 'GET /audit-logs'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});
