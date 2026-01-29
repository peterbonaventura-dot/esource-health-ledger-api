/**
 * Token Storage Utility
 * 
 * Provides secure localStorage-based token storage with fallback
 * for production-grade JWT authentication
 */

const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

/**
 * Store JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    
    // Decode token to get expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        localStorage.setItem(TOKEN_EXPIRY_KEY, payload.exp.toString());
      }
    } catch (e) {
      console.warn('Could not decode token expiry:', e);
    }
  } catch (e) {
    console.error('Failed to store token:', e);
  }
}

/**
 * Get JWT token from localStorage
 * @returns {string|null} The stored token or null if not found/expired
 */
export function getToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    // Check if token is expired
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (expiry) {
      const expiryTime = parseInt(expiry, 10) * 1000; // Convert to milliseconds
      if (Date.now() >= expiryTime) {
        // Token is expired, remove it
        removeToken();
        return null;
      }
    }
    
    return token;
  } catch (e) {
    console.error('Failed to get token:', e);
    return null;
  }
}

/**
 * Remove JWT token from localStorage
 */
export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
}

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean} True if authenticated, false otherwise
 */
export function isAuthenticated() {
  return getToken() !== null;
}
