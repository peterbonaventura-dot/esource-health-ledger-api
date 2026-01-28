import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * Layout Component - Single Source of Truth for Auth + Routing
 * 
 * This component:
 * - Resolves authentication state once
 * - Renders children only if authenticated
 * - Redirects to login if not authenticated
 * - Provides user context to child pages
 * 
 * Key Rules:
 * - Layout decides auth once
 * - Layout renders children only if authenticated
 * - Pages never redirect themselves
 * - No page should call auth directly
 */
export default function Layout() {
  const { user, loading, error } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  // Note: error is available but we treat any non-authenticated state the same
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render authenticated layout with navigation
  return (
    <>
      <nav style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        marginBottom: '1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
            eSource Health Ledger
          </h1>
          {user && (
            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#666' }}>
              Welcome, {user.name || user.email || 'User'}
            </div>
          )}
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Pass user to child pages via outlet context */}
        <Outlet context={{ user }} />
      </main>
    </>
  );
}
