# Bryllupsside

## Slik redigerer du innholdet

Alt innhold (navn, dato, adresser, program, hoteller, kontaktpersoner, gavelenker osv.) ligger samlet i `WEDDING`-objektet øverst i [script.js](script.js). Endre verdiene der — resten av siden (nedtelling, kalenderlenke, program-tidslinje osv.) oppdateres automatisk.

## Koble til OSA-skjemaet

Skjemaet fungerer i "testmodus" til du kobler det til en mottaker. Enkleste løsning:

1. Opprett en gratis konto på [formspree.io](https://formspree.io)
2. Lag et nytt skjema og kopier endepunkt-URLen
3. Lim den inn i `rsvpFormEndpoint` i `script.js`

Alternativt kan du bruke Netlify Forms (hvis du hoster på Netlify) eller et innebygd Google Forms-skjema.

## Publisere siden

Dette er en ren statisk side (`index.html`, `styles.css`, `script.js`) — den kan hostes gratis f.eks. via:
- **Netlify** — dra og slipp mappen på netlify.com/drop
- **GitHub Pages**
- **Vercel**

## Easter eggs 🥚

Siden har et par skjulte overraskelser som passer to 90-tallsbarn:

- **Konami-koden** (↑ ↑ ↓ ↓ ← → ← → B A) utløser "retro-modus" — hele siden gjør et 90-talls-webdesign-stup, med konfetti og en liten 8-bit-lyd.
- **Klikk på navnene deres i toppen 5 ganger raskt** for å avsløre en skjult 1989♥1990-melding.
- En liten usynlig prikk nederst i venstre hjørne fungerer som en alternativ knapp for retro-modus (for mobil, uten tastatur).
- Åpne nettleserkonsollen (F12) for en hemmelig hilsen.

Du kan endre teksten i det skjulte badet ved å redigere `secretMessage` i `script.js`.
