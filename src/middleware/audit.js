// Audit logging middleware - logs all API requests

const auditLog = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  
  // Capture response
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    
    // TODO: Store audit logs in database
    // await db.query('INSERT INTO audit_logs ...', [...]);
  });
  
  next();
};

module.exports = {
  auditLog
};
