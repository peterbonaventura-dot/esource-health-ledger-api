const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting eSource Health Ledger API...');
    
    // Test database connection (non-blocking)
    await db.testConnection().catch(err => {
      console.warn('⚠️  Database connection failed, but server will start anyway');
      console.warn('   Make sure to configure DATABASE_URL in .env');
    });
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

startServer();
