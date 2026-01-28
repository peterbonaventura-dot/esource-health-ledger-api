const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { auditLog } = require('./middleware/audit');

// Import routes
const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const documentsRouter = require('./routes/documents');
const approvalsRouter = require('./routes/approvals');
const notificationsRouter = require('./routes/notifications');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auditLog);

// Mount routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/documents', documentsRouter);
app.use('/approvals', approvalsRouter);
app.use('/notifications', notificationsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'eSource Health Ledger API',
    version: '1.0.0',
    status: 'online'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

module.exports = app;
