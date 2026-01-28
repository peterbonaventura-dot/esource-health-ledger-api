import React, { useState, useEffect } from 'react';
// PHASE 1: Base44 import disabled
// import { base44 } from '@/api/base44Client'; // DISABLED

export function Layout({ children }) {
  const [user, setUser] = useState(null);

  // PHASE 1: Auth loop broken - base44.auth.me() removed
  useEffect(() => {
    // Original: base44.auth.me().then(setUser);
    // Phase 1: Stubbed - no auth call
    console.log('Phase 1: Layout auth disabled');
    setUser(null); // Temporary: set to null
  }, []);

  return (
    <div>
      <nav>
        <h1>eSource Health Ledger</h1>
        {user && <span>User: {user.name}</span>}
      </nav>
      <main>{children}</main>
    </div>
  );
}
