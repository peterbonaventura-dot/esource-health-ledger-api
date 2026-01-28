/**
 * Main entry point for the frontend application
 * 
 * IMPORTANT: This file must NOT import Base44
 * All API calls must use src/services/apiClient.js
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// NO Base44 import here - using apiClient instead
// NO User.me() calls - use apiClient.getCurrentUser() instead

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
