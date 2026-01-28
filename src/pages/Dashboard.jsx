/**
 * Dashboard Page
 * 
 * IMPORTANT: This file must NOT import Base44
 * All API calls must use src/services/apiClient.js
 */

import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient.js';

function Dashboard({ user }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Using apiClient instead of Base44
      const docs = await apiClient.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error('Failed to load documents:', err);
      setError('Failed to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="user-info">
        <h3>Welcome, {user?.name || 'User'}</h3>
        <p>Email: {user?.email}</p>
      </div>

      <div className="documents-section">
        <h3>Your Documents</h3>
        {documents.length === 0 ? (
          <p>No documents assigned yet.</p>
        ) : (
          <ul className="documents-list">
            {documents.map((doc) => (
              <li key={doc.id}>
                <strong>{doc.name}</strong> - {doc.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="actions">
        <button onClick={loadDocuments}>Refresh</button>
      </div>
    </div>
  );
}

export default Dashboard;
