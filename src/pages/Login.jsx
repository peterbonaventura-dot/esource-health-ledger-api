import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Example Login Page Component
 * 
 * Demonstrates how to use the enhanced useAuth hook for login/logout
 */
export function Login() {
  const { user, loading, error, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    
    const result = await login(email, password);
    
    setIsLoggingIn(false);
    
    if (!result.success) {
      setLoginError(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Only show loading during initial auth check
  if (loading && !user) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Welcome!</h2>
        <p>You are logged in as: <strong>{user.name || user.email}</strong></p>
        {user.email && <p>Email: {user.email}</p>}
        <button onClick={handleLogout} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Login</h2>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00'
        }}>
          Authentication Error: {error}
        </div>
      )}
      
      {loginError && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00'
        }}>
          Login Failed: {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoggingIn}
          style={{ 
            width: '100%', 
            padding: '10px', 
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoggingIn ? 'not-allowed' : 'pointer',
            opacity: isLoggingIn ? 0.6 : 1
          }}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p><strong>Note:</strong> This is an example login component demonstrating JWT authentication.</p>
        <p>Uses the enhanced <code>useAuth</code> hook with Bearer token support.</p>
      </div>
    </div>
  );
}

export default Login;
