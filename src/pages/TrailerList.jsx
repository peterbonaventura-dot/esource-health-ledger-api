import React, { useState, useEffect } from 'react';
// PHASE 1: Base44 import disabled
// import { base44 } from '@/api/base44Client'; // DISABLED

export default function TrailerList() {
  const [user, setUser] = useState(null);

  // PHASE 1: Auth loop broken
  useEffect(() => {
    // Original: base44.auth.me().then(setUser).catch(() => navigate(createPageUrl('Landing')));
    // Phase 1: Stubbed
    console.log('Phase 1: TrailerList auth disabled');
    setUser(null);
  }, [navigate]);

  return (
    <div>
      <h2>Trailer List</h2>
      <p>Phase 1: Empty state</p>
    </div>
  );
}
