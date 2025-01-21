// kb-cookie-consent.d.ts

// Import types from vanilla-cookieconsent
import {CookieConsentConfig } from 'vanilla-cookieconsent';

// Type definition for the deepMerge function
declare function deepMerge(
  obj1: CookieConsentConfig,
  obj2: CookieConsentConfig
): CookieConsentConfig;

// Define the KbCookieConsent object
declare const KbCookieConsent: {
  run: (config: CookieConsentConfig) => void; // Using imported type
  // You can add other properties or methods if needed
};

// Export the KbCookieConsent object as default
export default KbCookieConsent;
