# KB CookieConsent

Detta paket är en "wrapper" kring [CookieConsent v3](https://github.com/orestbida/cookieconsent).

Det innebär att man använder det på samma sätt som ovan nämda CookieConsent, med skillnaden att detta paket innehåller CSS-styling anpassat efter KBs Stilguide och viss konfiguration som är gemensam för alla våra tjänster.

Med denna wrapper är det enklare att implementera CookieConsent med en grundplåt av inställningar anpassade för KB, samtidigt som man fortfarande har möjligheten att detaljanpassa enskilda implementationer.

## Behöver min tjänst en CookieConsent-dialog?

Ja:
- Tjänster som riktar sig till externa användare och sparar information i form av kakor eller local storage, som inte än nödvändiga för att tjänsten ska fungera

Nej:
- Interna applikationer
- Tjänster som inte sätter några kakor överhuvudtaget
- Tjänster som använder sig av cookies som krävs för att tjänsten ska fungera (tjänsten måste dock innehålla information om att nödvändiga cookies används)

Om du ska implementera CookieConsent, behöver du veta vilka kakor som din tjänst sätter, vad de heter och vad de har för syfte.

En lista med tjänster och kakor finns att hitta i Confluence, dubbekolla gärna att informationen stämmer för din tjänst.

## Steg 1: Lägg till CookieConsent i din tjänst

Implementationen sker på två olika sätt:

I modernare webbapplikationer genom att installera NPM-paketet som ett beroende till din applikation och använda `import` i ett javascript-fil.

I äldre applikationer som inte använder sig utav NPM-paket, genom att använda sig utav `<script>`-tag.

Är du osäker på vilken implemetation som är bäst i den tjänst som du är ansvarig för, [kontakta oss](#kontakt-och-ansvariga).

### Implementation med NPM och `import`

Följ instruktionerna nedan om din tjänsts källkod är anpassad för att konsumera NPM-paket.

#### Installera paketet i ditt projekt

`npm install @kungbib/cookie-consent`

eller

`yarn install @kungbib/cookie-consent`

#### Importera i din applikation

```js
import KbCookieConsent from '@kungbib/cookie-consent';
// aktivera CookieConsent
KbCookieConsent.run();
```
Detta räcker för att en CookieConsent-dialog ska dyka upp i din applikation, men förmodligen kommer du att behöva skicka med viss konfiguration, tex. specificera just de kakor som din applikation sätter, samt genomföra förändringar i script som sätter kakor.

Funktionen `KbCookieConsent.run()` tar emot ett objekt med konfiguration, se avsnittet [Konfiguration](#konfiguration) för instruktioner.

Nedan följer exempel på implementationer i ramverk vi använder:

##### Vue / Nuxt

Kommer snart

##### Svelte / SvelteKit

Kommer snart


### Implementera med `<script>`-tag

Kommer snart

## Steg 2: Specificera kakor som din tjänst sätter 

## Steg 3: Förhindra att kakor sätts innan anvädaren godkänner eller nekar kakor

kommer snart

## Steg 4: Ytterligare konfiguration

Konfigurationen av KB CookieConsent fungerar på samma sätt som för CookieConsent v3, i detta avsnitt fokuserar vi på de mest relevanta bitarna.

Vill du dyka ner i ytterligare detaljer, se fullständig dokumentation: [CookieConsent configuration reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html).

KB CookieConsent innehåller en fördefinierad konfiguration anpassad för KBs tjänster,
vilket innebär att du behöver till exempel inte definiera egenskaperna `categories` och `language`.

Däremot, beroende på hur just din tjänst fungerar, kan du behöva skriva över denna standardkonfiguration.

Nedan ser du standardkonfigurationen som skickas med när du exekverar funktionen `KbCookieConsent.run()`:

```js
{
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
}
```

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
