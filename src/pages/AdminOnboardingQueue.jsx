/**
 * Admin Onboarding Queue Page
 * 
 * IMPORTANT: This file must NOT import Base44
 * All API calls must use src/services/apiClient.js
 */

import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient.js';

function AdminOnboardingQueue({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Using apiClient instead of Base44.getUsers() or User.me()
      const allUsers = await apiClient.getUsers();
      
      // Filter to show only pending onboarding users
      const pendingUsers = allUsers.filter(user => user.status === 'pending' || user.status === 'onboarding');
      setUsers(pendingUsers);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Failed to load onboarding queue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      setProcessingId(userId);
      setError('');
      
      // Using apiClient instead of Base44.approveUser()
      await apiClient.approveUser(userId, {
        approvedBy: user.id,
        approvedAt: new Date().toISOString(),
      });
      
      // Reload users after approval
      await loadUsers();
      
      alert('User approved successfully!');
    } catch (err) {
      console.error('Failed to approve user:', err);
      setError(`Failed to approve user: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleAssignDocuments = async (userId) => {
    try {
      setProcessingId(userId);
      setError('');
      
      // Using apiClient instead of Base44
      await apiClient.assignDocuments(userId, {
        documentIds: ['orientation_checklist', 'compliance_forms'],
        assignedBy: user.id,
      });
      
      alert('Documents assigned successfully!');
    } catch (err) {
      console.error('Failed to assign documents:', err);
      setError(`Failed to assign documents: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSendNotification = async (userId) => {
    try {
      setProcessingId(userId);
      setError('');
      
      // Using apiClient instead of Base44
      await apiClient.sendOrientationNotification({
        userId,
        sentBy: user.id,
      });
      
      alert('Notification sent successfully!');
    } catch (err) {
      console.error('Failed to send notification:', err);
      setError(`Failed to send notification: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <div className="admin-onboarding-queue">Loading onboarding queue...</div>;
  }

  return (
    <div className="admin-onboarding-queue">
      <h2>Admin Onboarding Queue</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="queue-stats">
        <p>Pending Users: {users.length}</p>
      </div>

      {users.length === 0 ? (
        <p>No users in onboarding queue.</p>
      ) : (
        <table className="onboarding-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button 
                    onClick={() => handleApprove(user.id)}
                    disabled={processingId === user.id}
                  >
                    {processingId === user.id ? 'Processing...' : 'Approve'}
                  </button>
                  <button 
                    onClick={() => handleAssignDocuments(user.id)}
                    disabled={processingId === user.id}
                  >
                    Assign Docs
                  </button>
                  <button 
                    onClick={() => handleSendNotification(user.id)}
                    disabled={processingId === user.id}
                  >
                    Send Notification
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="actions">
        <button onClick={loadUsers}>Refresh Queue</button>
      </div>
    </div>
  );
}

export default AdminOnboardingQueue;
