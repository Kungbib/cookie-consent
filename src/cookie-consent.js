import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cookie-consent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { cookieConsentConfig } from './config/config';

function deepMerge(...objects) {
  // Create a new object to hold the merged result
  const result = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Object && result[key] instanceof Object) {
          // If both values are objects, merge them recursively
          result[key] = deepMerge(result[key], obj[key]);
        } else {
          // Otherwise, assign the value from the current object
          result[key] = obj[key];
        }
      }
    }
  }

  return result;
}

function runWrapper(func) {
  return function(customConfig) {
    const mergedConfig = deepMerge(cookieConsentConfig, customConfig);
    return func(mergedConfig);
  }
}

const KbCookieConsent = {
  ...CookieConsent,
  run: runWrapper(CookieConsent.run)
};

export default KbCookieConsent;
