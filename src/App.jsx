import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

/**
 * Main App Component
 * 
 * Routing Structure:
 * - /login: Public route (no auth required)
 * - All other routes: Protected by Layout component
 * 
 * Phase 2.5 Architecture:
 * - Layout.jsx owns all auth + routing decisions
 * - Pages are pure render components
 * - No page-level auth checks or redirects
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route - no authentication required */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - all require authentication via Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Additional protected routes can be added here */}
        </Route>

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
