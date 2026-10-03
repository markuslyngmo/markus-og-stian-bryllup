# Bryllupsside — Markus & Stian

Ren statisk side (ingen byggesteg): `index.html`, `fest.html`, `styles.css`, `script.js`. Hostes på GitHub Pages på lyngmojakobsen.no (se `CNAME`).

## To sider, ett passord-skjermbilde

- `index.html` — hele bryllupet (vielse + fest)
- `fest.html` — kun festen, for gjester som ikke er med på vielsen

Begge sider har samme passordskjerm, og **passordet avgjør hvor gjesten havner**, uansett hvilken lenke de åpnet: ett passord gir hele dagen, det andre kun festen. Dele én lenke (lyngmojakobsen.no) er nok.

Passordene står ikke i klartekst i koden, bare som SHA-256-hasher øverst i `script.js`. Slik bytter du: regn ut hash av det nye passordet i små bokstaver, f.eks.

```
printf '%s' "nyttpassord" | shasum -a 256
```

og lim den inn i `WEDDING_PASSWORD_HASH` (hele dagen) eller `WEDDING_PASSWORD_HASH_FEST` (kun fest). Innskrevet passord sammenlignes i små bokstaver.

**Merk:** dette er bare en lett sperre, ikke ekte sikkerhet. Repoet er offentlig, og alt innholdet ligger i `script.js` og kan leses av alle som åpner fila.

## Slik redigerer du innholdet

Alt innhold (navn, dato, adresser, program, FAQ, tekster) ligger samlet i `WEDDING`-objektet i `script.js`, og faste tekster i `UI_TEXT`. Endre der — nedtelling, kalenderlenke og tidslinje oppdateres automatisk.

Siden er på tre språk: norsk (`no`), engelsk (`en`) og svensk (`sv`). Tekst som skal oversettes skrives som `{ no: "...", en: "...", sv: "..." }`. Mangler en språkversjon, faller siden tilbake til norsk. Legger du til en ny tekst i `UI_TEXT`, må den inn under alle tre språk, ellers feiler siden på det språket.

Program-poster merket `ceremonyOnly: true` skjules på `fest.html`.

## OSA-skjemaet

Svarene sendes til [Formspree](https://formspree.io) (endepunktet står i `rsvpFormEndpoint`). Gratisplanen tillater 50 innsendinger per måned. Hver e-post har gjestetypen i emnelinjen og som egen linje (`Kun fest` / `Vielse + fest`).

Får Formspree en feil, ser gjesten en feilmelding i stedet for "Takk for svaret".

## Publisere

Push til `main` — GitHub Pages bygger og publiserer automatisk. Endringer kan ta et par minutter, og nettleseren cacher `script.js` i opptil ti minutter.

## Easter eggs 🥚

- **Konami-koden** (↑ ↑ ↓ ↓ ← → ← → B A) utløser "retro-modus" med konfetti og en liten 8-bit-lyd.
- **Klikk på navnene i toppen 5 ganger raskt** for å avsløre en skjult 1989♥1990-melding.
- **Joystick-knappen** nede til venstre er en alternativ knapp for retro-modus (for mobil, uten tastatur).
- Åpne nettleserkonsollen (F12) for en hemmelig hilsen.

Teksten i meldingen redigeres via `secretMessage` i `script.js`.
