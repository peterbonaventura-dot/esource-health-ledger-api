import React, { useState, useEffect } from 'react';
// PHASE 1: Base44 import disabled
// import { base44 } from '@/api/base44Client'; // DISABLED

export default function IntakeHub() {
  const [user, setUser] = useState(null);

  // PHASE 1: Auth loop broken - base44.auth.me() removed
  useEffect(() => {
    // Original: base44.auth.me().then(async (userData) => { setUser(userData); });
    // Phase 1: Stubbed
    console.log('Phase 1: IntakeHub auth disabled');
    setUser(null);
  }, []);

  return (
    <div>
      <h2>Intake Hub</h2>
      <p>Phase 1: Empty state (acceptable)</p>
    </div>
  );
}
