import { useState, useEffect } from 'react';
import { getToken, setToken as storeToken, removeToken } from '../lib/tokenStorage';

/**
 * Production-grade authentication hook
 * 
 * Supports both:
 * 1. JWT Bearer token authentication (production-grade)
 * 2. Session cookie authentication (fallback)
 * 
 * This is the ONLY hook that should call auth endpoints
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get stored JWT token if available
        const token = getToken();
        
        // Build headers with Authorization if token exists
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth (fallback)
          headers,
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else if (response.status === 401) {
          // Not authenticated - remove any invalid token
          removeToken();
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

  /**
   * Login function for manual authentication
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Extract token from response (various common formats)
        const token = data.token || data.accessToken || data.jwt;
        
        if (token) {
          // Store token for future requests
          storeToken(token);
        }
        
        // Extract user data
        const userData = data.user || data;
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Login failed: ${response.status}`;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      setLoading(true);
      
      // Call logout endpoint if it exists
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      }).catch(() => {
        // Ignore errors from logout endpoint
      });
      
      // Clear local state and token
      removeToken();
      setUser(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, logout };
}
