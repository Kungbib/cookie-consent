# KB CookieConsent

Ett kodbibliotek för att underlätta implementationen av dialogrutan för cookie-samtycke.
Bygger på javascript-pluginet [CookieConsent v3](https://github.com/orestbida/cookieconsent).

## Bra att veta innan du påbörjar implementationen

Innan du påbörjar implementationen av detta script, behöver du veta följande: 

- vilka kakor sätts av din tjänst, vad de heter, dess syfte
- vilka kakor räknas till nödvändiga och vilka till icke-nödvändiga
- vilken kategori respektive kaka tillhör (nödvändiga, analytiska, funktionella)

Gemensamt för många tjänster är kakorna som sätts av Matomo (fd. Piwik). Dessa kakor ska tillhöra kategorin Analytiska kakor och ska kunna nekas av besökaren.

En lista med tjänster och kakor finns att hitta i Confluence, dubbelkolla gärna att informationen stämmer för din tjänst.

## Lägg till CookieConsent i din tjänst

Implementationen sker på två olika sätt:

- I modernare webbapplikationer genom att installera NPM-paketet som ett beroende till din applikation och använda `import` i en javascript-fil.

- I äldre applikationer som inte använder sig utav NPM-paket, genom att använda sig utav `<script>`-tag.

Är du osäker på vilken implementation som är bäst i den tjänst som du är ansvarig för, [kontakta oss](#kontakt-och-ansvariga).

### Implementation med NPM och `import`

Följ instruktionerna nedan om din tjänsts källkod är anpassad för att konsumera NPM-paket.

#### Installera paketet i ditt projekt

```shell
npm install @kungbib/cookie-consent

// eller

yarn add @kungbib/cookie-consent
```

#### Importera i din applikation

Import av CookieConsent kan se olika ut beroende på om du använder dig av ett ramverk eller ren javascript.

```js
import KbCookieConsent from '@kungbib/cookie-consent';
```

### Implementera med `<script>`-tag

Kommer snart

## Steg 2: Definiera kategorier och sektioner

Funktionen `KbCookieConsent.run()` är den funktionen som aktiverar cookie-dialogen.

Fuktionen tar emot ett konfigurations-objekt som följer samma struktur som för CookieConsent v3.
För att underlätta innehåller `KbCookieConsent` en del fördefinierade värden (tex. översättningar och egenskaper som styr dialogens utseende och placering). 

Vill du dyka ner i ytterligare detaljer, se fullständig dokumentation: [CookieConsent configuration reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html).

### Exempel på konfiguration

Nedan följer ett exempel på hur vi definierar kategorier "necessary" och "analytics".

**Använd gärna denna konfiguration som utgångspunkt.**

De flesta av våra tjänster sätter nödvändiga och analytiska kakor

Varje kategori kopplas till respektive sektion i dialogen för inställningar. Dessa sektioner definierar vi under `language`.


```js
// aktivera CookieConsent
KbCookieConsent.run({
  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            // alla kakor som har "_pk." i namnet = Matomo-kakor
            name: /^_pk.*/
          }
        ]
      }
    }
  },
  language: {
    translations: {
      sv: {
        preferencesModal: {
          sections: [
            // Toppsektion med allmän information
            {
              title: "Om användning av kakor",
              description: "Den här tjänsten använder kakor (cookies). En kaka är en liten textfil som lagras i besökarens dator. KB:s tjänster är designade för att minska risken för spridning av dina uppgifter. Informationen som lagras via kakor kan aldrig användas av tredje part i marknadsföringssyfte."
            },
            // Sektionen för nödvändiga kakor
            {
              title: "Nödvändiga kakor",
              description: "Dessa kakor krävs för att tjänsten ska vara säker och fungera som den ska. Därför går de inte att inaktivera.",
              linkedCategory: "necessary", // här länkar vi samman beskrivningen med respektive kategori
            },
            // Sektionen för analytiska kakor
            {
              title: "Analytiska kakor",
              description:
                "Kakor som ger oss information om hur webbplatsen används som gör att vi kan underhålla, driva och förbättra användarupplevelsen.",
              linkedCategory: "analytics"
            },
            // Sektionen i botten för ytterligare allmän information
            {
              title: "Mer information",
              description: "Du kan alltid ändra dina val genom att klicka på “Hantera cookies” längst ner på sidan i sidfoten."
            }
          ]
        }
      }
    }
  }
});
```


### Mer om olika typer av kakor
#### Nödvändiga kakor
Om din tjänst använder *inga* nödvändiga kakor, ta bort kategorin `necessary` och respektive sektion.

#### Analytiska kakor
Analytiska kakor ska kunna nekas av användaren. I de flesta fallen innebär detta kakor som sätts av Matomo (fd. Piwik).
Kakor som sätts av Matomo börjar i regel med `_pk.`. 

Om din tjänst använder *inga* analytiska kakor, ta bort kategorin `analytics` och respektive sektion.

## Steg 3: Hantera script som sätter kakor

Hittills har vi endast definierat kategorier och tillhörande kakor.

I detta steg förhindrar vi att kakorna sätts tills användaren har accepterat respektive kakor.

### Förhindra analytiska kakor

Det finns två sätt att se till att Matomo-script är inaktivt så länge användaren inte har gett sitt godkännande.

#### Alt. 1: Inaktivera script-taggen

Om tjänsten implementerar Matomo genom en script-tagg, till exempel:

```html
<script type="text/javascript">
  var _paq = window._paq || [];

  // ... 
</script>
```

Modifiera script-taggen på följande sätt:

```html
<script
  type="text/plain"
  data-category="analytics"
>

  var _paq = window._paq || [];

  // ... 
</script>
```

Detta förhindrar att scriptet körs. När användaren godkänner kakor av kategorin `analytics`, ser CookieConsent till att scriptet aktiveras.
 
#### Alt 2: Använd callbacks

Om tjänsten aktiverar Matomo inuti egna scripts genom till exempel wrappers, kan det vara enklare att använda sig utav callbacks.

Exempel på Matomo implementation i Vue:

```js
Vue.use(VueMatomo, {
  router: app.router,
  host: 'https://analytics.kb.se',
  siteId: $config.matomoId,
  requireConsent: true // lägg till detta
});
```

`requireConsent: true` ska läggas till och det talar om för Matomo att inte börja samla data omedelbart.

Lägg till följande callbacks i konfigurationen:

```js
// aktivera CookieConsent
KbCookieConsent.run({
  categories: {
    // ...
  },
  language: {
    // ...
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
  }
});
```

#### Läs mer om scripthantering

https://cookieconsent.orestbida.com/advanced/manage-scripts.html


## Steg 4: Lägg till en länk i footer

Det är önskvärt att användaren ska kunna revidera och ändra sina inställningar.
Genom att lägga följande länk, förslagsvis i tjänstens footer, möjliggör vi detta:

```html

<a data-cc="show-preferencesModal" href="#" aria-haspopup="dialog">
    Hantera kakor
</a>

```

## Steg 5: Testa att allt fungerar

I Chrome:

##### Kontrollera "Tillåt alla kakor"

- Öppna tjänsten du testar i incognito mode
- Cookie-dialogen borde vara synlig
- Öppna DevTools, öppna Application > Cookies > Din tjänsts url
- Kontrollera att kakor som är frivilliga inte finns i listan över Cookies
- Godkänn alla kakor
- Kontrollera att de kakor som är frivilliga nu finns i listan

##### Kontrollera "Tillåt endast nödvändiga kakor"

- Öppna tjänsten du testar i incognito mode
- Cookie-dialogen borde vara synlig
- Öppna DevTools, öppna Application > Cookies > Din tjänsts url
- Kontrollera att kakor som är frivilliga inte finns i listan över Cookies
- Godkänn endast nödvändiga kakor
- Frivilliga kakor ska inte dyka upp i listan med Cookies

##### Kontrollera "Inställningar"

- Öppna tjänsten du testar i incognito mode
- Cookie-dialogen borde vara synlig
- Klicka på knappen "Inställningar"
- Kontrollera att texter, kategorier och sektioner stämmer
- Öppna DevTools, öppna Application > Cookies > Din tjänsts url
- Aktivera någon sektion med frivilliga kakor (tex. analytiska)
- Klicka "Spara och godkänn"
- Kontrollera att de frivilliga kakorna dyker upp i listan med Cookies
- Klicka på footer-länken "Hantera kakor"
- Inställningar bör dyka upp
- Deaktivera analytiska kakor om dessa var aktiverade
- Klicka "Spara och godkänn"
- Ladda om sidan
- Kakor som tillhör kategorin du precis stängde av bör försvinna från listan med Cookies


## Ytterligare konfiguration

I dialogen "Inställningar för kakor" finns det möjlighet att visa en lista på kakor som ingår i en viss kategori, i `language.translations.sv.preferencesModal.sections[].cookieTable`

Observera att denna lista är endast till för att förtydliga och beskriva för användaren syftet med varje enskild kaka. Den är inte nödvändig för att dialogen ska fungera.

Läs mer om hur du sätter ihop en sådan lista:
https://cookieconsent.orestbida.com/reference/configuration-reference.html#translation-preferencesmodal-sections


## ## Kontakt och ansvariga

Krzysztof Bergendahl, systemutvecklare
