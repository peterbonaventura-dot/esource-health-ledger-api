/**
 * API Client for authentication and data fetching
 * This is the only place where auth API calls should be made
 */

// Use Vite environment variables (VITE_ prefix, not REACT_APP_)
// In development, use the proxy configured in vite.config.js
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch current user from /auth/me endpoint
 * @returns {Promise<Object>} User object if authenticated
 * @throws {Error} If user is not authenticated or request fails
 */
export async function me() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // Log generic error without exposing sensitive details
    if (import.meta.env.DEV) {
      console.error('Auth check failed:', error.message);
    }
    throw error;
  }
}

/**
 * Additional API client methods can be added here
 * All API calls should go through this centralized client
 */
