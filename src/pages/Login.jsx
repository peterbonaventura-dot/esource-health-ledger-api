import { useState } from "react";

/**
 * Login Page - Public Route
 * 
 * This is a placeholder login page for demonstration.
 * In production, this would handle actual authentication.
 * 
 * Note: This page is rendered OUTSIDE of the Layout component,
 * so it doesn't require authentication.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder - in production, this would call an auth API
    // Note: Do not log passwords in production
    if (import.meta.env.DEV) {
      console.log('Login attempted for email:', email);
    }
    alert('This is a placeholder login page. In production, this would authenticate the user.');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          eSource Health Ledger
        </h1>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', textAlign: 'center' }}>
          Login
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="your@email.com"
              aria-label="Email address"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="••••••••"
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          <strong>Phase 2.5 Note:</strong> This is a placeholder login page.
          Authentication is handled by Layout.jsx checking /auth/me endpoint.
        </div>
      </div>
    </div>
  );
}
