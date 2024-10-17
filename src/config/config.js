import sv from './translations/sv';

const translationsConfig = {
  sv
};

export const cookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'bar',
      position: 'bottom right'
    },
    preferencesModal: {
      layout: 'box'
    }
  },
  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^_pk.*/
          }
        ]
      }
    }
  },
  onConsent: ({ cookie }) => {
    if (cookie.categories.includes('analytics')) {
      window._paq = window._paq || [];
      window._paq.push(['rememberConsentGiven']);
    }
  },
  onChange: ({ cookie }) => {
    if (cookie.categories.includes('analytics')) {
      window._paq = window._paq || [];
      window._paq.push(['rememberConsentGiven']);
    } else {
      window._paq.push(['forgetConsentGiven']);
    }
  },
  language: {
    default: 'sv',
    translations: translationsConfig
  }
};