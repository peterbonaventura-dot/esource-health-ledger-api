import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

// Phase 2: Auth is now owned by Layout component
function App() {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

// Phase 2: HomePage receives user from Layout via props
function HomePage({ user }) {
  return (
    <div>
      <h2>Welcome to eSource Health Ledger</h2>
      <p>Phase 2: Global auth via Render API</p>
      {user ? (
        <p>Authenticated as: {user.name || user.email || 'User'}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}

export default App;
