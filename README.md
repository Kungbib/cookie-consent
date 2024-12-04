# KB CookieConsent

Detta paket är en "wrapper" kring [CookieConsent v3](https://github.com/orestbida/cookieconsent).

Det innebär att man använder det på samma sätt som ovan nämda CookieConsent, med skillnaden att detta paket innehåller CSS-styling anpassat efter KBs Stilguide och viss konfiguration som är gemensam för alla våra tjänster.

Med denna wrapper är det enklare att implementera CookieConsent med en grundplåt av inställningar anpassade för KB, samtidigt som man fortfarande har möjligheten att detaljanpassa enskida implementationer.

## Behöver min tjänst en CookieConsent banner?

Ja:
- Applikationer som riktar sig till externa användare och sätter någon form av kakor

Nej:
- Interna applikationer
- Applikationer som inte sätter några kakor överhuvudtaget

Om du ska implementera CookieConsent, behöver du veta vilka kakor som din tjänst sätter, vad de heter och vad de har för syfte.

En lista med tjänster och kakor finns att hitta i Confluence.

## Användning

Implementationen sker på två olika sätt:

I modernare webbapplikationer genom att installera NPM-paketet som ett beroende till din applikation och använda `import` i ett javascript-fil.

I äldre applikationer som inte använder sig utav NPM-paket, genom att använda sig utav `<script>`-tag.

Är du osäker på vilken implemetation som är bäst i den tjänst som du är ansvarig för, [kontakta oss](#kontakt-och-ansvariga).

### Implementation med NPM och `import`

#### Installera paketet i ditt projekt

`npm install @kungbib/cookie-consent`

eller

`yarn install @kungbib/cookie-consent`

#### Importera i din applikation

```
import KbCookieConsent from '@kungbib/cookie-consent';
// aktivera CookieConsent
KbCookieConsent.run();
```
Detta räcker för att en CookieConsent banner ska dyka upp i din applikation, men förmodligen behöver du även skicka med viss konfiguration, tex. specificera just de kakor som din applikation sätter, samt genomföra förändringar i script som sätter kakor.

Funktionen `KbCookieConsent.run()` tar emot ett objekt med konfiguration, se avsnittet [Konfiguration](#konfiguration) för instruktioner.

Nedan följer exempel på implementationer i ramverk vi använder:

##### Vue / Nuxt

Kommer snart

##### Svelte / SvelteKit

Kommer snart


### Implementera med `<script>`-tag

Kommer snart

## Konfiguration

Konfigurationen av KB CookieConsent fungerar på samma sätt som för CookieConsent v3, i detta avsnitt fokuserar vi på de mest relevanta bitarna.

KB CookieConsent innehåller en fördefinierad konfiguration anpassad för KBs tjänster,
vilket innebär att du behöver till exempel inte definiera egenskaperna `categories` och `language`.

Däremot, beroende på hur just din tjänst fungerar, kan du behöva skriva över denna standardkonfiguration.

För fullständig dokumentation se: [CookieConsent configuration reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html).

Nedan ser du standardkonfigurationen som skickas med när du exekverar funktionen `KbCookieConsent.run()`:

```
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
```

### Specificera cookies som din tjänst sätter 

Kakor som sätts av Matomo (fd. Piwik), som börjar med `_pk` behöver inte specificeras, dessa hanteras automatiskt av KB CookieConsent. Däremot behöver man förhindra att Matomo sätter en kaka innan användaren har bestämt sig för att tillåta kakor.

### Förhindra att kakor sätts innan anvädaren godkänner eller nekar kakor

## Vanligt förekommande fall och lösningar

### Vilka steg måste jag göra för att få dialogen att fungera med Matomo?

kommer snart

### Hur anpassar jag texter i bannern och dialogen?

kommer snart

### Hur lägger jag till en lista på nödvändiga kakor?

kommer snart

### Hur byter jag alla texter till engelska?

kommer snart

## Anpassa utseende

kommer snart

## Kontrollera att det fungerar

kommer snart

## Kontakt och ansvariga

Krzysztof Bergendahl, systemutvecklare
