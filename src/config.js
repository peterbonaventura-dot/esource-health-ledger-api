// API Configuration
// This file provides the API URL from environment variables
export const API_URL = import.meta.env.VITE_API_URL || 'https://esourcehealthledger.com';

// Helper function to make API calls
export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      // Try to get error details from response body
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.message) {
          errorMessage = `${errorMessage} - ${errorBody.message}`;
        }
      } catch {
        // If response body is not JSON, use status text
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    // Re-throw with context if not already an API error
    if (error.message.startsWith('API error:')) {
      throw error;
    }
    throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
  }
};

// Health check function to verify backend connectivity
export const checkHealth = async () => {
  try {
    const data = await fetchAPI('/health');
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};
