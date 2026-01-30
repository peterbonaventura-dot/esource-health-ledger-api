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

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
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
