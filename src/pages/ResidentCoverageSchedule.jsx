import React from 'react';

// Phase 2: Receives user from Layout - no direct auth calls
export default function ResidentCoverageSchedule({ user }) {
  return (
    <div>
      <h2>Resident Coverage Schedule</h2>
      {user ? (
        <p>Welcome, {user.name || 'User'}</p>
      ) : (
        <p>Please log in to access this page</p>
      )}
    </div>
  );
}
