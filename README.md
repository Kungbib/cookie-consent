# KB CookieConsent

Detta paket är en "wrapper" kring [CookieConsent v3](https://github.com/orestbida/cookieconsent).

Det innebär att man använder det på samma sätt som ovan nämda CookieConsent, men den skillnaden att detta paket innehåller CSS-styling anpassat efter KBs Stilguide och viss konfiguration som är gemensam för alla våra tjänster.

Med denna wrapper är det enklare att implementera CookieConsent med en grundplåt av inställningar anpassade för KB, samtidigt som man har möjligten att detaljanpassa enskida implementationer.

## Behöver min tjänst en CookieConsent banner?

Ja:
- Applikationer som riktar sig till externa användare och sätter någon form av kakor

Nej:
- Interna applikationer
- Applikationer som inte sätter några kakor överhuvudtaget

Om du ska implementera CookieConsent, behöver du veta vilka kakor som din tjänst sätter, vad de heter och vad de har för syfte.

En lista med 

## Användning

Implementationen kan ske på två olika sätt:

I modernare webbapplikationer genom att installera NPM-paketet som ett beroende till din applikation och använda `import` i ett javascript-fil.

I äldre applikationer som inte använder sig utav NPM-paket, genom att använda sig utav `<script>`-tag.

Är du osäker på vilken implemetation som är bäst i den tjänst som du är ansvarig för, [kontakta oss](#kontakt-och-ansvariga).

### Implementation med `import`

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
Detta räcker för att en CookieConsent banner ska dyka upp i din applikation, men förmodligen behöver du även skicka med viss konfiguration, tex. specificera just de kakor som din applikation sätter.

Funktionen `KbCookieConsent.run()` tar emot ett objekt med konfiguration, se avsnittet [Konfiguration](#konfiguration) för instruktioner.

Nedan följer exempel på implementationer i ramverk vi använder:

##### Vue / Nuxt

Kommer snart

##### Svelte / SvelteKit

Kommer snart


### Implementera med `<script>`-tag

Kommer snart

## Konfiguration

Konfigurationen är densamma som för CookieConsent v3, i denna avsnitt fokuserar vi på de mest relevanta bitarna, för fullständig dokumentation se: [CookieConsent configuration reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html).

### Specificera cookies som din tjänst sätter 

Kakor som sätts av Matomo (fd. Piwik), som börjar med `_pk` behöver inte specificeras, dessa hanteras automatiskt av KB CookieConsent.

### Förhindra att kakor sätts innan anvädaren godkänner eller nekar kakor

### Övriga inställningar

## Anpassa utseende

## Kontrollera att det fungerar

## Kontakt och ansvariga
