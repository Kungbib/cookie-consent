# KB CookieConsent

Detta paket är en "wrapper" kring [CookieConsent v3](https://github.com/orestbida/cookieconsent).

Det innebär att man använder det på samma sätt som ovan nämda CookieConsent, med skillnaden att detta paket innehåller CSS-styling anpassat efter KBs Stilguide och viss konfiguration som är gemensam för alla våra tjänster.

Med denna wrapper är det enklare att implementera CookieConsent med en grundplåt av inställningar anpassade för KB, samtidigt som man fortfarande har möjligheten att detaljanpassa enskilda implementationer.

## Bra att veta innan påbörjad implementation

Innan du påbörjar att implementera CookieConsent-dialogen, behöver du veta följande: 

- vilka kakor sätts av din tjänst, vad de heter och vad de har för syfte
- vilka kakor är nödvändiga
- vilka script sätter de frivilliga kakorna

Gemensamt för många tjänster är kakorna som sätts av Matomo (fd. Piwik), se nedan för information om just Matomo.

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

Import av CookieConsent kan se olika ut beroende på om du använder dig av ett ramverk eller ren javascript.
Nedan följer exempel på de vanligaste fallen:

##### Vanilla Javascript
```js
import KbCookieConsent from '@kungbib/cookie-consent';
// aktivera CookieConsent
KbCookieConsent.run();
```
Detta räcker för att CookieConsent-dialogen ska dyka upp i din applikation, testa gärna att det fungerar! 
Du kommer dock att behöva skicka med viss konfiguration, tex. specificera just de kakor som din applikation sätter, samt genomföra förändringar i script som sätter kakor.

##### Vue / Nuxt

Kommer snart

##### SvelteKit

Kommer snart


### Implementera med `<script>`-tag

Kommer snart

## Steg 2: Specificera kakor som din tjänst sätter 

Funktionen `KbCookieConsent.run()` tar emot ett konfigurations-objekt som följer samma struktur som för CookieConsent v3.
För att underlätta innehåller KBCookieConsent en del fördefinierade värden (tex. översättningar, sektioner, egenskaper som styr dialogens utseende och placering). 

Vill du dyka ner i ytterligare detaljer, se fullständig dokumentation: [CookieConsent configuration reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html).

### Nödvändiga kakor
KbCookieConsent är fördefinierad med en sektion som informerar om nödvändiga kakor. 
Om din tjänst innehåller *inga* nödvändiga kakor, se avsnittet "Dölj en fördefinierad sektion"

Om du vill ändra den fördefinierade texten för denna sektion, se avsnittet "Ändra 

### Analytiska kakor
Analytiska kakor ska kunna nekas av användaren. I de flesta fallen innebär detta kakor som sätts av Matomo (fd. Piwik).
Även denna sektion är fördefinierad för att hantera Matomo-kakor (alla kakor som innehåller strängen `_pk.`). 
Om din tjänst använder *inga* analytiska kakor, dölj sektionen:

### Funktionella kakor
Om din tjänst använder funktionella kakor (kakor som förbättrar användarupplevelsen, men är inte nödvändiga för att tjänsten ska fungera), lägg till följande sektion:

```
KbCookieConsent.run({
  categories: {
    functional: {
      autoClear: {
        cookies: [
          {
            name: 'name-of-your-cookie' // namnet på din funktionella kaka
          },
          {
            name: 'name-of-your-another-cookie' // namnet på din funktionella kaka
          }
        ]
      }
    }
  }
});
```

## Steg 3: Förhindra att kakor sätts innan anvädaren godkänner eller nekar kakor

kommer snart


## Steg 4: Ytterligare konfiguration

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

## Övrigt

### Dölj en fördefinierad sektion

```
KbCookieConsent.run({
  categories: {
    analytics: null
  }
});
```

### Anpassa texter för sektioner i dialogen

```
KbCookieConsent.run({
  language: {
    translations: {
      sv: {
        preferencesModal: {
          sections: [
            sections: [
              {
                title: 'Om användning av kakor',
                description:
                  'Tjänsten Svenska tidningar använder kakor (cookies). En kaka är en liten textfil som lagras i besökarens dator. KB:s tjänster är designade för att minska risken för spridning av dina uppgifter. Informationen som lagras via kakor kan aldrig användas av tredje part i marknadsföringssyfte.'
              },
              {
                title: 'Nödvändiga kakor',
                description:
                'Dessa kakor krävs för att tjänsten ska vara säker och fungera som den ska. Därför går de inte att inaktivera.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analytiska kakor',
                description:
                'Kakor som ger oss information om hur webbplatsen används som gör att vi kan underhålla, driva och förbättra användarupplevelsen.',
                linkedCategory: 'analytics'
              },
              {
                title: 'Mer information',
                description:
                'Du kan alltid ändra dina val genom att klicka på “Hantera cookies” längst ner på sidan i sidfoten.'
              }
            ]
          ]
        }
      }
    }
  }
})
```

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
