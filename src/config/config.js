import sv from './translations/sv';
import en from './translations/en';

const translationsConfig = {
  sv,
  en
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
  language: {
    default: 'sv',
    translations: translationsConfig
  }
};