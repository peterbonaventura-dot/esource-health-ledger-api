// Email service - placeholder for email functionality

const sendEmail = async (to, subject, body) => {
  // TODO: Implement email sending logic
  // This could use SendGrid, AWS SES, or other email service
  
  console.log('📧 Email (simulated):', {
    to,
    subject,
    body: body ? body.substring(0, 50) + '...' : '(empty)'
  });
  
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, messageId: Date.now().toString() });
    }, 100);
  });
};

const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to eSource Health Ledger';
  const body = `Hello ${userName},\n\nWelcome to eSource Health Ledger!\n\nBest regards,\nThe Team`;
  
  return sendEmail(userEmail, subject, body);
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const subject = 'Password Reset Request';
  const body = `You requested a password reset.\n\nReset token: ${resetToken}\n\nIf you didn't request this, please ignore.`;
  
  return sendEmail(userEmail, subject, body);
};

const sendNotificationEmail = async (userEmail, notification) => {
  const subject = `Notification: ${notification.type}`;
  const body = notification.message;
  
  return sendEmail(userEmail, subject, body);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNotificationEmail
};
