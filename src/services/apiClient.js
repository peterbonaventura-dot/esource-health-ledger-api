/**
 * API Client for eSource Health Ledger
 * Replaces Base44 with direct API calls to the Express backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  constructor() {
    this.token = null;
  }

  /**
   * Set the authentication token
   * @param {string} token - JWT token
   */
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Get the current authentication token
   * @returns {string|null}
   */
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /**
   * Make an authenticated API request
   * @param {string} endpoint - API endpoint path
   * @param {object} options - Fetch options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // ==================== Auth Endpoints ====================

  /**
   * Login with credentials
   * @param {object} credentials - Login credentials
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  /**
   * Get current user info
   * @returns {Promise<object>}
   */
  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  /**
   * Logout the current user
   */
  logout() {
    this.setToken(null);
  }

  // ==================== User Endpoints ====================

  /**
   * Get all users
   * @returns {Promise<Array>}
   */
  async getUsers() {
    return await this.request('/users');
  }

  /**
   * Create a new user
   * @param {object} userData - User data
   * @returns {Promise<object>}
   */
  async createUser(userData) {
    return await this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Assign documents to a user
   * @param {string} userId - User ID
   * @param {object} documentData - Document assignment data
   * @returns {Promise<object>}
   */
  async assignDocuments(userId, documentData) {
    return await this.request(`/users/${userId}/documents`, {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  // ==================== Document Endpoints ====================

  /**
   * Get all documents
   * @returns {Promise<Array>}
   */
  async getDocuments() {
    return await this.request('/documents');
  }

  /**
   * Create a new document
   * @param {object} documentData - Document data
   * @returns {Promise<object>}
   */
  async createDocument(documentData) {
    return await this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  // ==================== Approval Endpoints ====================

  /**
   * Approve a user
   * @param {string} userId - User ID to approve
   * @param {object} approvalData - Approval data
   * @returns {Promise<object>}
   */
  async approveUser(userId, approvalData = {}) {
    return await this.request(`/approvals/${userId}`, {
      method: 'POST',
      body: JSON.stringify(approvalData),
    });
  }

  // ==================== Notification Endpoints ====================

  /**
   * Get all notifications
   * @returns {Promise<Array>}
   */
  async getNotifications() {
    return await this.request('/notifications');
  }

  /**
   * Create a new notification
   * @param {object} notificationData - Notification data
   * @returns {Promise<object>}
   */
  async createNotification(notificationData) {
    return await this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  }

  // ==================== Health Check ====================

  /**
   * Check API health
   * @returns {Promise<{ok: boolean}>}
   */
  async healthCheck() {
    return await this.request('/health');
  }
}

// Export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
