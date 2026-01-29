import React from 'react';

// Phase 2: Receives user from Layout - no direct auth calls
export default function TherapeuticDashboard({ user }) {
  return (
    <div>
      <h2>Therapeutic Dashboard</h2>
      {user ? (
        <p>Welcome, {user.name || 'User'}</p>
      ) : (
        <p>Please log in to access this page</p>
      )}
    </div>
  );
}
