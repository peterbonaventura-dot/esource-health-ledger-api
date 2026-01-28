import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PHASE 1: Base44 imports removed
// import { base44 } from '@/api/base44Client'; // DISABLED

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // PHASE 1: Auth loop broken - base44.auth.me() call removed
  useEffect(() => {
    // Original: base44.auth.me().then(setUser);
    // Phase 1: Stubbed out - no Base44 auth
    console.log('Phase 1: Base44 auth disabled - skipping auth check');
    setLoading(false);
    // Optionally set user to null or fetch from /api/auth/me
    // setUser(null);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <header>
          <h1>eSource Health Ledger</h1>
          {user && <div>Welcome, {user.name}</div>}
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function HomePage({ user }) {
  return (
    <div>
      <h2>Welcome to eSource Health Ledger</h2>
      <p>Phase 1: Base44 disabled. App loads without redirect.</p>
      {user ? (
        <p>User: {user.name}</p>
      ) : (
        <p>Not authenticated (expected in Phase 1)</p>
      )}
    </div>
  );
}

export default App;
