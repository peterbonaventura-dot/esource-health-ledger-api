import React from 'react';

// Phase 2: Receives user from Layout - no direct auth calls
export default function PayerLogin({ user }) {
  return (
    <div>
      <h2>Payer Login</h2>
      {user ? (
        <p>Welcome, {user.name || 'User'}</p>
      ) : (
        <p>Please log in to access this page</p>
      )}
    </div>
  );
}
