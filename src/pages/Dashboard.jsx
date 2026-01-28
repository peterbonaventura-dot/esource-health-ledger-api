import { useOutletContext } from "react-router-dom";

/**
 * Dashboard Page - Pure Render Component
 * 
 * Key principles:
 * ✅ Assumes user exists (provided by Layout)
 * ✅ Receives user via outlet context
 * ✅ No auth checks
 * ✅ No redirects
 * ✅ No user fetching
 */
export default function Dashboard() {
  const { user } = useOutletContext();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard, {user?.name || user?.email || 'User'}!</p>
      
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px'
      }}>
        <h3>User Information</h3>
        <pre style={{ fontSize: '0.875rem' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e8f4f8',
        borderRadius: '4px',
        border: '1px solid #b3d9e6'
      }}>
        <h3>Phase 2.5 Status</h3>
        <ul>
          <li>✅ No direct auth calls</li>
          <li>✅ No redirect logic</li>
          <li>✅ Pure render component</li>
          <li>✅ User from outlet context</li>
        </ul>
      </div>
    </div>
  );
}
