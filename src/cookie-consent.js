import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cookie-consent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { cookieConsentConfig } from './config/config';

function deepMerge(obj1, obj2) {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}

const runWrapper = function(func) {
  return function(customConfig) {
    console.log(cookieConsentConfig);
    console.log(customConfig);
    deepMerge(cookieConsentConfig, customConfig);
    return func(cookieConsentConfig);
  }
}

const KbCookieConsent = {
  ...CookieConsent,
  run: runWrapper(CookieConsent.run)
};

export default KbCookieConsent;
