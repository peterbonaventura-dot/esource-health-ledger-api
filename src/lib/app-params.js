// PHASE 1: Base44 app-params disabled
// This file originally contained Base44-specific localStorage key management

/**
 * Phase 1: Stubbed app params
 * Base44-specific storage keys have been removed
 */
export function getAppParamValue(paramName) {
  // Original used base44_ prefixed keys
  // Phase 1: Return null for all params
  console.log('Phase 1: App params disabled');
  return null;
}
