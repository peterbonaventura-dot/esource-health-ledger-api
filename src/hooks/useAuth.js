import { useState, useEffect } from 'react';

/**
 * Global authentication hook for Phase 2
 * Calls /auth/me endpoint via Render API
 * This is the ONLY hook that should call auth endpoints
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Phase 2: Single auth call to /auth/me via Render API
    const fetchAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Include cookies for session management
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401) {
          // Not authenticated - this is okay
          setUser(null);
        } else {
          throw new Error(`Auth check failed: ${response.status}`);
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  return { user, loading, error };
}
