import React, { useState, useEffect } from 'react';
import { API_URL, checkHealth } from './config';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyBackend = async () => {
      try {
        setLoading(true);
        const health = await checkHealth();
        setHealthStatus(health);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHealthStatus(null);
      } finally {
        setLoading(false);
      }
    };

    verifyBackend();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '50px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h1>eSource Health Ledger</h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>API Configuration</h2>
        <p><strong>Backend URL:</strong> <code>{API_URL}</code></p>
        
        <h3>Backend Health Check</h3>
        {loading && <p>Checking backend connection...</p>}
        
        {!loading && healthStatus && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724',
            padding: '10px',
            borderRadius: '5px'
          }}>
            <strong>✓ Backend is reachable!</strong>
            <pre style={{ marginTop: '10px' }}>
              {JSON.stringify(healthStatus, null, 2)}
            </pre>
          </div>
        )}
        
        {!loading && error && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px'
          }}>
            <strong>✗ Backend connection failed</strong>
            <p style={{ marginTop: '10px' }}>{error}</p>
            <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
              Expected: The backend should respond at <code>{API_URL}/health</code>
            </p>
          </div>
        )}
      </div>
      
      <div style={{ 
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <h3>Next Steps</h3>
        <ol>
          <li>Verify backend is accessible at <code>{API_URL}/health</code></li>
          <li>Configure Render Environment Variables:
            <ul>
              <li>API key / JWT secret</li>
              <li>Auth middleware secrets</li>
              <li>Database connection string</li>
            </ul>
          </li>
          <li>Restart the Render service</li>
          <li>Test auth endpoint at <code>{API_URL}/auth/me</code></li>
        </ol>
      </div>
    </div>
  );
}

export default App;
