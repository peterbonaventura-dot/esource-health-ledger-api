# Frontend Integration Guide

This document explains how to integrate the API client in your frontend application, replacing Base44.

## Setup

1. Copy `src/services/apiClient.js` to your frontend project
2. Set the `VITE_API_URL` environment variable to point to this API

## Removing Base44

### Before (with Base44):
```jsx
// main.jsx
import Base44 from 'base44';

const base44 = new Base44({ apiUrl: '...' });
```

### After (with apiClient):
```jsx
// main.jsx
// No Base44 import needed!
// API client is imported only where needed
```

## Usage Example: AdminOnboardingQueue

### Before (with Base44):
```jsx
import Base44 from 'base44';

function AdminOnboardingQueue() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    Base44.getUsers().then(setUsers);
  }, []);
  
  const handleApprove = (userId) => {
    Base44.approveUser(userId).then(/* ... */);
  };
  
  return /* ... */;
}
```

### After (with apiClient):
```jsx
import apiClient from '../services/apiClient';

function AdminOnboardingQueue() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    apiClient.getUsers().then(setUsers);
  }, []);
  
  const handleApprove = (userId) => {
    apiClient.approveUser(userId).then(/* ... */);
  };
  
  return /* ... */;
}
```

## Key Differences

1. **No global initialization**: Base44 required initialization at app startup. The API client is a singleton that requires no initialization.

2. **Automatic token management**: The API client automatically manages JWT tokens in localStorage and includes them in requests.

3. **Environment-based configuration**: The API URL is configured via `VITE_API_URL` environment variable.

## API Methods

See `src/services/apiClient.js` for the complete API reference. Key methods include:

### Authentication
- `apiClient.login(credentials)`
- `apiClient.getCurrentUser()`
- `apiClient.logout()`

### Users
- `apiClient.getUsers()`
- `apiClient.createUser(userData)`
- `apiClient.assignDocuments(userId, documentData)`

### Documents
- `apiClient.getDocuments()`
- `apiClient.createDocument(documentData)`

### Approvals
- `apiClient.approveUser(userId, approvalData)`

### Notifications
- `apiClient.getNotifications()`
- `apiClient.createNotification(notificationData)`

## Migration Checklist

- [ ] Copy `src/services/apiClient.js` to frontend project
- [ ] Remove all `import` statements for Base44
- [ ] Replace `Base44.method()` calls with `apiClient.method()` calls
- [ ] Remove Base44 initialization from main.jsx
- [ ] Update environment variables to use `VITE_API_URL`
- [ ] Test all API-dependent components
