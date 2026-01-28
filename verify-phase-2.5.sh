#!/bin/bash

# Phase 2.5 Verification Script
# Run this script to verify Phase 2.5 compliance

echo "======================================"
echo "Phase 2.5 Compliance Verification"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

pass_count=0
fail_count=0

# Test 1: Check for Base44 references
echo "Test 1: Checking for Base44 references..."
if grep -r "base44" src/ --include="*.js" --include="*.jsx" 2>/dev/null; then
  echo -e "${RED}❌ FAIL: Base44 references found${NC}"
  ((fail_count++))
else
  echo -e "${GREEN}✅ PASS: No Base44 references${NC}"
  ((pass_count++))
fi
echo ""

# Test 2: Check for direct auth calls in pages
echo "Test 2: Checking for auth calls in pages..."
if grep -r "\.me()" src/pages/ --include="*.js" --include="*.jsx" 2>/dev/null; then
  echo -e "${RED}❌ FAIL: Auth calls found in pages${NC}"
  ((fail_count++))
else
  echo -e "${GREEN}✅ PASS: No auth calls in pages${NC}"
  ((pass_count++))
fi
echo ""

# Test 3: Verify auth hook exists
echo "Test 3: Verifying auth hook exists..."
if [ -f "src/hooks/useAuth.js" ]; then
  echo -e "${GREEN}✅ PASS: useAuth.js exists${NC}"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL: useAuth.js not found${NC}"
  ((fail_count++))
fi
echo ""

# Test 4: Verify Layout.jsx exists
echo "Test 4: Verifying Layout.jsx exists..."
if [ -f "src/Layout.jsx" ]; then
  echo -e "${GREEN}✅ PASS: Layout.jsx exists${NC}"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL: Layout.jsx not found${NC}"
  ((fail_count++))
fi
echo ""

# Test 5: Verify apiClient exists
echo "Test 5: Verifying apiClient exists..."
if [ -f "src/services/apiClient.js" ]; then
  echo -e "${GREEN}✅ PASS: apiClient.js exists${NC}"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL: apiClient.js not found${NC}"
  ((fail_count++))
fi
echo ""

# Test 6: Verify Layout uses useAuth
echo "Test 6: Verifying Layout uses useAuth..."
if grep -q "useAuth" src/Layout.jsx 2>/dev/null; then
  echo -e "${GREEN}✅ PASS: Layout imports useAuth${NC}"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL: Layout doesn't import useAuth${NC}"
  ((fail_count++))
fi
echo ""

# Test 7: Verify pages use useOutletContext
echo "Test 7: Verifying pages use useOutletContext..."
if grep -q "useOutletContext" src/pages/Dashboard.jsx 2>/dev/null; then
  echo -e "${GREEN}✅ PASS: Dashboard uses useOutletContext${NC}"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL: Dashboard doesn't use useOutletContext${NC}"
  ((fail_count++))
fi
echo ""

# Test 8: Verify no useEffect with auth in pages
echo "Test 8: Verifying no useEffect with auth in pages..."
if grep -A 5 "useEffect" src/pages/Dashboard.jsx 2>/dev/null | grep -q "me()"; then
  echo -e "${RED}❌ FAIL: Found useEffect with auth call in Dashboard${NC}"
  ((fail_count++))
else
  echo -e "${GREEN}✅ PASS: No useEffect with auth in Dashboard${NC}"
  ((pass_count++))
fi
echo ""

# Summary
echo "======================================"
echo "Summary"
echo "======================================"
echo -e "Passed: ${GREEN}${pass_count}${NC}"
echo -e "Failed: ${RED}${fail_count}${NC}"
echo ""

if [ $fail_count -eq 0 ]; then
  echo -e "${GREEN}🎉 All Phase 2.5 compliance checks passed!${NC}"
  exit 0
else
  echo -e "${RED}⚠️  Some compliance checks failed. Please review.${NC}"
  exit 1
fi
