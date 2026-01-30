#!/usr/bin/env node

/**
 * Verify Backend Connection
 * 
 * This script tests the connection to the backend API
 * and verifies that the health endpoint is responding.
 * 
 * Requirements:
 * - Node.js 18+ (uses native fetch API)
 * 
 * Note: This script reads VITE_API_URL from process.env.
 * To use a different API URL, run with:
 *   VITE_API_URL=https://your-api-url.com node verify-backend.js
 */

const API_URL = process.env.VITE_API_URL || 'https://esourcehealthledger.com';

console.log('🔍 Verifying backend connection...');
console.log(`📍 API URL: ${API_URL}\n`);

// Test health endpoint
async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ Health check successful!');
    console.log(`Response: ${JSON.stringify(data, null, 2)}\n`);
    
    return true;
  } catch (error) {
    console.log('❌ Health check failed');
    console.log(`Error: ${error.message}\n`);
    
    return false;
  }
}

// Test auth endpoint (expected to fail with missing API key)
async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/auth/me`);
    
    console.log(`Auth endpoint status: ${response.status}`);
    
    if (response.status === 401 || response.status === 403) {
      console.log('✅ Auth endpoint is reachable (401/403 is expected without credentials)');
      console.log('   This confirms requests are reaching the backend correctly.\n');
      return true;
    }
    
    const data = await response.json();
    console.log(`Response: ${JSON.stringify(data, null, 2)}\n`);
    
    return true;
  } catch (error) {
    console.log('❌ Auth endpoint check failed');
    console.log(`Error: ${error.message}\n`);
    
    return false;
  }
}

async function main() {
  const healthOk = await checkHealth();
  
  if (healthOk) {
    await checkAuth();
    
    console.log('📝 Summary:');
    console.log('   - Backend is accessible at the configured domain');
    console.log('   - Next step: Configure backend environment variables in Render');
    console.log('   - After configuring, restart the Render service\n');
  } else {
    console.log('📝 Summary:');
    console.log('   - Backend is NOT accessible at the configured domain');
    console.log('   - Check if backend is deployed and running');
    console.log('   - Verify DNS settings for the custom domain');
    console.log('   - Check Render service logs for errors\n');
  }
}

main().catch(console.error);
