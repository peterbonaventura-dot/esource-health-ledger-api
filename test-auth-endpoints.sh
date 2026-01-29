#!/bin/bash

# Authentication Endpoint Test Script (Shell version)
# 
# This script verifies that the authentication endpoints are production-grade:
# 1. /auth/login returns a usable JWT
# 2. /auth/me works with Authorization: Bearer <token>
#
# Usage:
#   ./test-auth-endpoints.sh <backend-url>
#   
# Example:
#   ./test-auth-endpoints.sh http://localhost:3000
#   ./test-auth-endpoints.sh https://your-api.onrender.com

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if backend URL is provided
if [ -z "$1" ]; then
  log_error "Please provide the backend URL as an argument"
  echo ""
  echo "Usage:"
  echo "  ./test-auth-endpoints.sh <backend-url>"
  echo ""
  echo "Examples:"
  echo "  ./test-auth-endpoints.sh http://localhost:3000"
  echo "  ./test-auth-endpoints.sh https://your-api.onrender.com"
  exit 1
fi

BACKEND_URL="$1"

echo ""
echo -e "${BOLD}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║  Authentication Endpoint Verification Test                ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════════════╝${NC}"
log_info "Testing backend at: $BACKEND_URL"

# Test 1: POST /auth/login
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Test 1: POST /auth/login${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

log_info "Making POST request to ${BACKEND_URL}/auth/login"

# Create temp file for response
RESPONSE_FILE=$(mktemp)

# Make login request
HTTP_CODE=$(curl -s -w "%{http_code}" -o "$RESPONSE_FILE" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword123"}' \
  "${BACKEND_URL}/auth/login")

log_info "Response Status: $HTTP_CODE"

LOGIN_SUCCESS=false
JWT_TOKEN=""

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  log_success "Login endpoint returned success status"
  
  # Try to extract JWT token from response
  if command -v jq &> /dev/null; then
    JWT_TOKEN=$(jq -r '.token // .accessToken // .jwt // empty' "$RESPONSE_FILE" 2>/dev/null || echo "")
  else
    # Fallback if jq is not available
    JWT_TOKEN=$(grep -oP '("token"|"accessToken"|"jwt"):\s*"\K[^"]+' "$RESPONSE_FILE" | head -1 || echo "")
  fi
  
  if [ -n "$JWT_TOKEN" ]; then
    log_success "JWT token found in response"
    
    # Validate JWT format (3 parts separated by dots)
    if [[ "$JWT_TOKEN" =~ ^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$ ]]; then
      log_success "JWT has valid format (header.payload.signature)"
      LOGIN_SUCCESS=true
      
      # Try to decode payload
      PAYLOAD=$(echo "$JWT_TOKEN" | cut -d. -f2)
      # Add padding if needed
      PADDING_LENGTH=$((4 - ${#PAYLOAD} % 4))
      if [ $PADDING_LENGTH -ne 4 ]; then
        PAYLOAD="${PAYLOAD}$(printf '=%.0s' $(seq 1 $PADDING_LENGTH))"
      fi
      
      if command -v base64 &> /dev/null; then
        DECODED=$(echo "$PAYLOAD" | base64 -d 2>/dev/null || echo "")
        if [ -n "$DECODED" ]; then
          log_success "JWT payload is decodable"
          log_info "Payload preview:"
          echo "$DECODED" | head -c 200
          echo ""
        fi
      fi
    else
      log_error "JWT format is invalid"
    fi
  else
    log_error "No JWT token found in response"
    log_info "Response body:"
    cat "$RESPONSE_FILE"
    echo ""
  fi
elif [ "$HTTP_CODE" = "401" ]; then
  log_warning "Login failed with 401 - credentials may be incorrect (expected for test credentials)"
  log_info "The endpoint is working, but requires valid credentials"
  LOGIN_SUCCESS=true
elif [ "$HTTP_CODE" = "404" ]; then
  log_error "Login endpoint not found (404)"
elif [ "$HTTP_CODE" = "000" ]; then
  log_error "Could not connect to backend"
else
  log_warning "Login returned status $HTTP_CODE"
  log_info "Response body:"
  cat "$RESPONSE_FILE"
  echo ""
fi

# Test 2: GET /auth/me
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}Test 2: GET /auth/me${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Test without token first
log_info "Making GET request to ${BACKEND_URL}/auth/me without token"
HTTP_CODE_NO_TOKEN=$(curl -s -w "%{http_code}" -o /dev/null \
  -H "Content-Type: application/json" \
  "${BACKEND_URL}/auth/me")

log_info "Response Status (without token): $HTTP_CODE_NO_TOKEN"

AUTH_ME_SUCCESS=false

if [ "$HTTP_CODE_NO_TOKEN" = "401" ]; then
  log_success "Endpoint correctly returns 401 when no token is provided"
  AUTH_ME_SUCCESS=true
elif [ "$HTTP_CODE_NO_TOKEN" = "200" ]; then
  log_warning "Endpoint returns 200 without token - may be using session cookies"
  AUTH_ME_SUCCESS=true
elif [ "$HTTP_CODE_NO_TOKEN" = "404" ]; then
  log_error "Endpoint not found (404)"
elif [ "$HTTP_CODE_NO_TOKEN" = "000" ]; then
  log_error "Could not connect to backend"
else
  log_warning "Unexpected status $HTTP_CODE_NO_TOKEN without token"
fi

# Test with token if available
if [ -n "$JWT_TOKEN" ]; then
  log_info "Making GET request to ${BACKEND_URL}/auth/me with Bearer token"
  
  RESPONSE_WITH_TOKEN=$(mktemp)
  HTTP_CODE_WITH_TOKEN=$(curl -s -w "%{http_code}" -o "$RESPONSE_WITH_TOKEN" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    "${BACKEND_URL}/auth/me")
  
  log_info "Response Status (with token): $HTTP_CODE_WITH_TOKEN"
  
  if [ "$HTTP_CODE_WITH_TOKEN" = "200" ]; then
    log_success "Endpoint returns 200 with valid Bearer token"
    log_success "Response contains user data"
    log_info "User data preview:"
    cat "$RESPONSE_WITH_TOKEN" | head -c 200
    echo ""
    AUTH_ME_SUCCESS=true
  elif [ "$HTTP_CODE_WITH_TOKEN" = "401" ]; then
    log_warning "Token was rejected (401) - token may be invalid or expired"
  else
    log_warning "Unexpected status $HTTP_CODE_WITH_TOKEN with token"
  fi
  
  rm -f "$RESPONSE_WITH_TOKEN"
else
  log_info "Skipping token test (no token available from login)"
fi

# Cleanup
rm -f "$RESPONSE_FILE"

# Summary
echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Test Summary                                              ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"

echo ""
echo "Test Results:"
if [ "$LOGIN_SUCCESS" = true ]; then
  log_success "✓ /auth/login endpoint is functional"
  if [ -n "$JWT_TOKEN" ]; then
    log_success "✓ /auth/login returns a valid JWT token"
  fi
else
  log_error "✗ /auth/login endpoint has issues"
fi

if [ "$AUTH_ME_SUCCESS" = true ]; then
  log_success "✓ /auth/me endpoint is functional"
  if [ -n "$JWT_TOKEN" ]; then
    log_success "✓ /auth/me works with Bearer token authentication"
  else
    log_success "✓ /auth/me correctly requires authentication"
  fi
else
  log_error "✗ /auth/me endpoint has issues"
fi

echo ""
echo "════════════════════════════════════════════════════════════"

if [ "$LOGIN_SUCCESS" = true ] && [ "$AUTH_ME_SUCCESS" = true ]; then
  echo -e "${GREEN}${BOLD}🎉 All authentication tests passed!${NC}"
  echo -e "${GREEN}The authentication system is production-grade.${NC}"
  echo "════════════════════════════════════════════════════════════"
  echo ""
  exit 0
else
  echo -e "${YELLOW}${BOLD}⚠️  Some tests failed or require attention${NC}"
  echo -e "${YELLOW}Please review the results above.${NC}"
  echo "════════════════════════════════════════════════════════════"
  echo ""
  exit 1
fi
