import React from 'react';
import { useAuth } from './hooks/useAuth';

// Phase 2: Layout owns global auth state via useAuth hook
export function Layout({ children }) {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div>
        <nav>
          <h1>eSource Health Ledger</h1>
        </nav>
        <main>
          <div>Loading authentication...</div>
        </main>
      </div>
    );
  }

  if (error) {
    console.error('Auth error in Layout:', error);
  }

  // Clone children and pass user prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user });
    }
    return child;
  });

  return (
    <div>
      <nav>
        <h1>eSource Health Ledger</h1>
        {user && <span>User: {user.name}</span>}
      </nav>
      <main>{childrenWithProps}</main>
    </div>
  );
}
