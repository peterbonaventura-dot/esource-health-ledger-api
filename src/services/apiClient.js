/**
 * API Client for authentication and data fetching
 * This is the only place where auth API calls should be made
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Fetch current user from /auth/me endpoint
 * @returns {Promise<Object>} User object if authenticated
 * @throws {Error} If user is not authenticated or request fails
 */
export async function me() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Auth check failed:', error);
    throw error;
  }
}

/**
 * Additional API client methods can be added here
 * All API calls should go through this centralized client
 */
