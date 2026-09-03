/* ============================================================
   PASSORDBESKYTTELSE
   Merk: dette er kun en lett sperre (klient-side), ikke ekte
   sikkerhet — endre WEDDING_PASSWORD_HASH ved å regne ut en
   SHA-256-hash av det nye passordet.
   ============================================================ */
const WEDDING_PASSWORD_HASH = "1bdb7c2d8f2972c4eab8404826b21c6130007d3abd1a20984e5c5eda9c2eca78";

async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function initPasswordGate() {
  const form = document.getElementById('passwordForm');
  const input = document.getElementById('passwordInput');
  const error = document.getElementById('passwordError');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hash = await sha256Hex(input.value.trim());
    if (hash === WEDDING_PASSWORD_HASH) {
      localStorage.setItem('wedding_unlocked', 'true');
      document.body.classList.remove('locked');
    } else {
      error.classList.add('show');
      input.value = '';
      input.focus();
    }
  });
}

/* ============================================================
   SPRÅK / LANGUAGE
   Felter i WEDDING kan enten være en ren tekst (samme på alle
   språk) eller et objekt { no: "...", en: "..." } for tekst som
   bør oversettes. Bruk t(...) for å hente riktig språkversjon.
   ============================================================ */
function getLang() {
  return localStorage.getItem('wedding_lang') || 'no';
}
function setLang(lang) {
  localStorage.setItem('wedding_lang', lang);
  document.documentElement.lang = lang;
}
function t(val) {
  if (val && typeof val === 'object') {
    return val[getLang()] || val.no || val.en || '';
  }
  return val;
}

const UI_TEXT = {
  no: {
    eyebrow: "Vi skal gifte oss",
    passwordTitle: "Skriv inn passord",
    passwordHint: "Du har fått passordet av brudeparet",
    passwordPlaceholder: "Passord",
    passwordSubmit: "Åpne siden",
    passwordError: "Feil passord, prøv igjen.",
    heroIntro: "Vi vil så gjerne at du er med og feirer dagen med oss.",
    days: "dager",
    hours: "timer",
    minutes: "minutter",
    seconds: "sekunder",
    heroCta: "Svar på invitasjonen",
    navInfo: "Info",
    navOsa: "OSA",
    navProgram: "Program",
    navPraktisk: "Praktisk",
    navFaq: "FAQ",
    navKontakt: "Kontakt",
    navGaver: "Gaver",
    faqTitle: "Ofte stilte spørsmål",
    infoTitle: "Dato & sted",
    ceremonyLabel: "Vielse",
    receptionLabel: "Middag & fest",
    openMap: "Åpne i kart ↗",
    atTimePrefix: "Kl.",
    directionsLabel: "Veibeskrivelse",
    parkingLabel: "Parkering",
    transportLabel: "Transport",
    addCalendar: "+ Legg til i kalender",
    osaTitle: "OSA",
    rsvpDeadlineLabel: "Vi trenger svar innen",
    fullNameLabel: "Fullt navn",
    emailLabel: "E-post",
    attendingLabel: "Kommer du?",
    attendingYes: "Ja, gleder meg!",
    attendingNo: "Kan dessverre ikke",
    guestsLabel: "Antall gjester (inkl. deg selv)",
    messageLabel: "Hilsen til brudeparet (valgfritt)",
    submitLabel: "Send svar",
    testModeNote: "✓ Testmodus: svaret ble ikke sendt noe sted ennå. Legg inn rsvpFormEndpoint i script.js.",
    submitError: "Noe gikk galt — prøv igjen, eller ta kontakt direkte.",
    submitSuccess: "Takk for svaret ditt! 💛",
    programTitle: "Dagens program",
    programEndLabel: "Arrangementet avsluttes ca. kl.",
    praktiskTitle: "Praktiske detaljer",
    dressCodeLabel: "Kleskode",
    hotelsTitle: "Anbefalte hoteller",
    discountCodeLabel: "Rabattkode:",
    kontaktTitle: "Kontaktpersoner",
    toastmasterLabel: "Toastmaster",
    speechDeadlineLabel: "Frist for å melde inn tale/innslag:",
    coupleLabel: "Brudeparet",
    gaverTitle: "Gaver",
    giftIntro: "Deres tilstedeværelse er den beste gaven — men ønsker dere å gi noe, setter vi stor pris på følgende:",
    giftMoneyLabel: "Pengegave",
    footerText: "Vi gleder oss til å feire med deg! ❧",
    guestSelfLabel: "Gjest 1 (deg)",
    guestNameLabel: (n) => `Navn på gjest ${n}`,
    songWishLabel: "Sangønske til festen (valgfritt)",
    songWishPlaceholder: "Én sang du gjerne vil høre på dansegulvet",
    speechWishLabel: "Ønsker å holde en tale",
    allergiesLabel: "Matallergier / spesialdiett (valgfritt)",
    allergiesPlaceholder: "F.eks. gluten, nøtter, vegetar, veganer …",
    summaryName: "Navn",
    summaryEmail: "E-post",
    summaryAttending: "Kommer",
    summaryGuestCount: "Antall gjester",
    summaryGuest: (n, name) => `— Gjest ${n}: ${name} —`,
    summarySong: "Sangønske",
    summarySpeech: "Ønsker å holde tale",
    summaryAllergies: "Matallergier",
    summaryYes: "Ja",
    summaryNo: "Nei",
    summaryNone: "(ingen)",
    summaryNoName: "(uten navn)",
    summaryMessage: "Hilsen til brudeparet:",
    calendarEventTitle: "Bryllup",
    calendarCeremonyPrefix: "Vielse:"
  },
  en: {
    eyebrow: "We're getting married",
    passwordTitle: "Enter password",
    passwordHint: "You received the password from the couple",
    passwordPlaceholder: "Password",
    passwordSubmit: "Open the site",
    passwordError: "Wrong password, try again.",
    heroIntro: "We'd love for you to join us in celebrating the day.",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    heroCta: "RSVP now",
    navInfo: "Info",
    navOsa: "RSVP",
    navProgram: "Program",
    navPraktisk: "Practical",
    navFaq: "FAQ",
    navKontakt: "Contact",
    navGaver: "Gifts",
    faqTitle: "Frequently asked questions",
    infoTitle: "Date & venue",
    ceremonyLabel: "Ceremony",
    receptionLabel: "Dinner & party",
    openMap: "Open in maps ↗",
    atTimePrefix: "At",
    directionsLabel: "Directions",
    parkingLabel: "Parking",
    transportLabel: "Transport",
    addCalendar: "+ Add to calendar",
    osaTitle: "RSVP",
    rsvpDeadlineLabel: "Please respond by",
    fullNameLabel: "Full name",
    emailLabel: "Email",
    attendingLabel: "Will you attend?",
    attendingYes: "Yes, looking forward to it!",
    attendingNo: "Sadly, I can't make it",
    guestsLabel: "Number of guests (incl. yourself)",
    messageLabel: "Message to the couple (optional)",
    submitLabel: "Send response",
    testModeNote: "✓ Test mode: the response hasn't been sent anywhere yet. Add rsvpFormEndpoint in script.js.",
    submitError: "Something went wrong — please try again, or contact us directly.",
    submitSuccess: "Thank you for your response! 💛",
    programTitle: "Schedule for the day",
    programEndLabel: "The event ends approximately at",
    praktiskTitle: "Practical details",
    dressCodeLabel: "Dress code",
    hotelsTitle: "Recommended hotels",
    discountCodeLabel: "Discount code:",
    kontaktTitle: "Contact",
    toastmasterLabel: "Toastmaster",
    speechDeadlineLabel: "Deadline to sign up for a speech/act:",
    coupleLabel: "The couple",
    gaverTitle: "Gifts",
    giftIntro: "Your presence is the best gift — but if you'd like to give something, we'd greatly appreciate the following:",
    giftMoneyLabel: "Monetary gift",
    footerText: "We can't wait to celebrate with you! ❧",
    guestSelfLabel: "Guest 1 (you)",
    guestNameLabel: (n) => `Name of guest ${n}`,
    songWishLabel: "Song request for the party (optional)",
    songWishPlaceholder: "One song you'd love to hear on the dance floor",
    speechWishLabel: "Would like to give a speech",
    allergiesLabel: "Food allergies / special diet (optional)",
    allergiesPlaceholder: "E.g. gluten, nuts, vegetarian, vegan …",
    summaryName: "Name",
    summaryEmail: "Email",
    summaryAttending: "Attending",
    summaryGuestCount: "Number of guests",
    summaryGuest: (n, name) => `— Guest ${n}: ${name} —`,
    summarySong: "Song request",
    summarySpeech: "Would like to give a speech",
    summaryAllergies: "Allergies",
    summaryYes: "Yes",
    summaryNo: "No",
    summaryNone: "(none)",
    summaryNoName: "(no name)",
    summaryMessage: "Message to the couple:",
    calendarEventTitle: "Wedding",
    calendarCeremonyPrefix: "Ceremony:"
  }
};
function ui(key) {
  return UI_TEXT[getLang()][key];
}

function applyStaticTranslations() {
  const dict = UI_TEXT[getLang()];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (typeof dict[key] === 'string') el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (typeof dict[key] === 'string') el.setAttribute('placeholder', dict[key]);
  });
}

function initLangToggle() {
  const buttons = document.querySelectorAll('.lang-btn');
  function updateActive() {
    const lang = getLang();
    buttons.forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
  }
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === getLang()) return;
      setLang(btn.dataset.lang);
      updateActive();
      applyStaticTranslations();
      render();
      renderGuestDetailFields();
      updateCountdown();
    });
  });
  document.documentElement.lang = getLang();
  updateActive();
}

/* ============================================================
   REDIGER HER: all informasjon om bryllupet samles i dette
   objektet. Tekst som gjestene ser kan enten skrives som en
   vanlig streng (samme på norsk og engelsk), eller som
   { no: "...", en: "..." } for å gi en egen engelsk versjon.
   Resten av siden bygges automatisk ut fra dette.
   ============================================================ */
const WEDDING = {
  partner1: "Markus",
  partner2: "Stian",
  date: "2027-08-07T15:00:00+02:00", // ISO-dato+klokkeslett for vielsen (norsk sommertid), brukes til nedtelling og kalender

  ceremony: {
    time: "15:00",
    name: "Bymuseet",
    address: "Frognerveien 67, 0266 Oslo",
    mapUrl: "https://maps.google.com/?q=Bymuseet+Frognerveien+67+0266+Oslo"
  },
  reception: {
    time: "17:00",
    name: "Ekebergrestauranten",
    address: "Kongsveien 15, 0193 Oslo",
    mapUrl: "https://maps.google.com/?q=Ekebergrestauranten+Kongsveien+15+0193+Oslo"
  },
  endTime: "03:00",

  directions: {
    no: "Dere ordner selv reisen frem til vielsen på Bymuseet — vær der senest kl. 14:45. Etter vielsen ordner vi transport videre til Ekebergrestauranten, så da trenger dere ikke tenke på noe mer.",
    en: "You'll need to make your own way to the ceremony at Bymuseet — please be there by 14:45 at the latest. After the ceremony we've arranged transport onward to Ekebergrestauranten, so there's nothing more to plan after that."
  },
  parking: {
    no: "Legg inn informasjon om parkeringsmuligheter hit.",
    en: "Add parking information here."
  },
  transport: {
    no: "Kom dere selv frem til Bymuseet senest kl. 14:45. Derfra tar vi oss av resten — felles transport til Ekebergrestauranten rett etter vielsen.",
    en: "Make your own way to Bymuseet by 14:45 at the latest. From there we've got it covered — shared transport to Ekebergrestauranten right after the ceremony."
  },

  rsvpDeadline: { no: "1. mai 2027", en: "1 May 2027" },
  rsvpFormEndpoint: "https://formspree.io/f/xjybajlj",

  program: [
    { time: "14:45", title: { no: "Gjestene ankommer vielsesstedet", en: "Guests arrive at the ceremony venue" } },
    { time: "15:00", title: { no: "Vielse", en: "Ceremony" } },
    { time: "16:00", title: { no: "Gratulasjon og mingling", en: "Congratulations & mingling" } },
    { time: "17:00", title: { no: "Ankomst selskapslokale", en: "Arrival at the reception venue" } },
    { time: "18:00", title: { no: "Middag", en: "Dinner" } },
    { time: "21:00", title: { no: "Fest og dans", en: "Party & dancing" } }
  ],

  dressCode: {
    no: "Legg inn kleskode hit, f.eks. «Pynt deg» / mørk dress / antrekk nr. 2.",
    en: "Add dress code here, e.g. \"Dress to impress\" / dark suit / black tie."
  },

  hotels: [
    { name: "Hotellnavn 1", note: { no: "5 min gange fra selskapslokalet", en: "5 min walk from the reception venue" }, code: "RABATTKODE1", url: "#" },
    { name: "Hotellnavn 2", note: { no: "Gratis parkering, shuttlebuss tilgjengelig", en: "Free parking, shuttle bus available" }, code: "RABATTKODE2", url: "#" }
  ],

  faq: [
    {
      q: { no: "Kan jeg ta med barn?", en: "Can I bring my kids?" },
      a: { no: "Barn er velkomne på selve vielsen, men festen etterpå på Ekebergrestauranten er for voksne.", en: "Kids are welcome at the ceremony itself, but the party afterwards at Ekebergrestauranten is adults only." }
    },
    {
      q: { no: "Kan jeg ta med en date/pluss én?", en: "Can I bring a plus-one?" },
      a: { no: "Vi har dessverre ikke mulighet til det denne gangen — antallet i OSA-skjemaet er nøyaktig hvor mange vi har plass til fra hver husstand.", en: "Unfortunately we don't have room for that this time — the guest count in the RSVP form is exactly how many we have space for from each household." }
    },
    {
      q: { no: "Når bør jeg ankomme?", en: "When should I arrive?" },
      a: { no: "Vær på Bymuseet senest kl. 14:45 — vielsen starter kl. 15:00.", en: "Be at Bymuseet by 14:45 at the latest — the ceremony starts at 15:00." }
    },
    {
      q: { no: "Har dere flere spørsmål vi ikke har svart på her?", en: "Have more questions we haven't answered here?" },
      a: { no: "Ta gjerne kontakt med oss direkte — se kontaktinfo lenger ned på siden.", en: "Feel free to reach out to us directly — see the contact info further down the page." }
    }
  ],

  toastmaster: { name: "Navn", phone: "+47 000 00 000", email: "toastmaster@epost.no" },
  speechDeadline: { no: "1. juni 2027", en: "1 June 2027" },

  couple: {
    name1: "Navn — +47 000 00 000",
    name2: "Navn — +47 000 00 000",
    email: "brudeparet@epost.no"
  },

  giftLinks: [
    { label: { no: "Ønskeliste 1", en: "Wishlist 1" }, url: "#" },
    { label: { no: "Ønskeliste 2", en: "Wishlist 2" }, url: "#" }
  ],
  giftMoneyNote: {
    no: "Ønsker dere heller å bidra med en pengegave, kan dette gjøres via Vipps til #00000 eller kontonummer 0000.00.00000. Merk gjerne med navnet deres.",
    en: "If you'd rather contribute a monetary gift, you can do so via Vipps to #00000 or account number 0000.00.00000. Please mark it with your name."
  },

  /* 90-talls-easter-egg: fritt å endre teksten, men la gjerne konseptet stå */
  secretMessage: {
    no: "1989 💛 1990 — to 90-tallsbarn som fant hverandre. Du fant vår hemmelighet!",
    en: "1989 💛 1990 — two 90s kids who found each other. You found our secret!"
  }
};

/* ============================================================
   RENDERING
   ============================================================ */
function formatDate(iso) {
  const d = new Date(iso);
  const locale = getLang() === 'en' ? 'en-GB' : 'nb-NO';
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

function fillText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setMapLink(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (url && url !== '#') {
    el.href = url;
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

function render() {
  applyStaticTranslations();

  fillText('coupleNames', `${WEDDING.partner1} & ${WEDDING.partner2}`);
  fillText('heroDate', formatDate(WEDDING.date));

  fillText('ceremonyTime', `${ui('atTimePrefix')} ${WEDDING.ceremony.time}`);
  fillText('ceremonyName', t(WEDDING.ceremony.name));
  fillText('ceremonyAddress', t(WEDDING.ceremony.address));
  setMapLink('ceremonyMapLink', WEDDING.ceremony.mapUrl);

  fillText('receptionTime', `${ui('atTimePrefix')} ${WEDDING.reception.time}`);
  fillText('receptionName', t(WEDDING.reception.name));
  fillText('receptionAddress', t(WEDDING.reception.address));
  setMapLink('receptionMapLink', WEDDING.reception.mapUrl);

  fillText('directions', t(WEDDING.directions));
  fillText('parking', t(WEDDING.parking));
  fillText('transport', t(WEDDING.transport));

  fillText('rsvpDeadline', t(WEDDING.rsvpDeadline));
  fillText('endTime', WEDDING.endTime);
  fillText('dressCode', t(WEDDING.dressCode));

  fillText('toastmasterName', WEDDING.toastmaster.name);
  const tmPhone = document.getElementById('toastmasterPhone');
  tmPhone.textContent = WEDDING.toastmaster.phone;
  tmPhone.href = `tel:${WEDDING.toastmaster.phone.replace(/\s/g, '')}`;
  const tmEmail = document.getElementById('toastmasterEmail');
  tmEmail.textContent = WEDDING.toastmaster.email;
  tmEmail.href = `mailto:${WEDDING.toastmaster.email}`;
  fillText('speechDeadline', t(WEDDING.speechDeadline));

  fillText('contact1', WEDDING.couple.name1);
  fillText('contact2', WEDDING.couple.name2);
  const coupleEmail = document.getElementById('coupleEmail');
  coupleEmail.textContent = WEDDING.couple.email;
  coupleEmail.href = `mailto:${WEDDING.couple.email}`;

  fillText('giftMoneyNote', t(WEDDING.giftMoneyNote));

  // Program timeline
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = WEDDING.program.map(item => `
    <li>
      <span class="t-time">${item.time}</span>
      <span class="t-dot"></span>
      <span class="t-title">${t(item.title)}</span>
    </li>
  `).join('');

  // Hotels
  const hotelGrid = document.getElementById('hotelGrid');
  hotelGrid.innerHTML = WEDDING.hotels.map(h => `
    <div class="hotel-card">
      <h5>${h.name}</h5>
      <p>${t(h.note)}</p>
      ${h.code ? `<span class="code">${ui('discountCodeLabel')} ${h.code}</span>` : ''}
    </div>
  `).join('');

  // FAQ
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = WEDDING.faq.map(item => `
    <details class="faq-item">
      <summary>${t(item.q)}</summary>
      <p>${t(item.a)}</p>
    </details>
  `).join('');

  // Gift links
  const giftLinks = document.getElementById('giftLinks');
  giftLinks.innerHTML = WEDDING.giftLinks.map(g => `
    <a class="btn btn-outline" href="${g.url}" target="_blank" rel="noopener">${t(g.label)}</a>
  `).join('');

  // Calendar link (Google Calendar)
  const start = new Date(WEDDING.date);
  const datePart = WEDDING.date.slice(0, 10);
  let end = new Date(`${datePart}T${WEDDING.endTime}:00+02:00`);
  if (end <= start) end = new Date(end.getTime() + 24 * 60 * 60 * 1000); // endTime is after midnight
  const fmt = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(WEDDING.partner1 + ' & ' + WEDDING.partner2 + ' - ' + ui('calendarEventTitle'))}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(t(WEDDING.ceremony.address))}&details=${encodeURIComponent(ui('calendarCeremonyPrefix') + ' ' + t(WEDDING.ceremony.name))}`;
  document.getElementById('calendarLink').href = calUrl;
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function setCdValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = String(value);
  if (el.textContent === text) return;
  el.textContent = text;
  el.classList.remove('flip');
  void el.offsetWidth; // reflow to restart the animation
  el.classList.add('flip');
}

function updateCountdown() {
  const now = new Date();
  const target = new Date(WEDDING.date);
  const diff = target - now;
  if (diff <= 0) {
    fillText('cdDays', '🎉');
    fillText('cdHours', '');
    fillText('cdMinutes', '');
    fillText('cdSeconds', '');
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  setCdValue('cdDays', days);
  setCdValue('cdHours', hours);
  setCdValue('cdMinutes', minutes);
  setCdValue('cdSeconds', seconds);
}

/* ============================================================
   OSA — én boks per gjest (navn, sang, tale, matallergi)
   ============================================================ */
function renderGuestDetailFields() {
  const guestsInput = document.getElementById('guests');
  const container = document.getElementById('guestDetails');
  const count = Math.max(1, Math.min(10, parseInt(guestsInput.value, 10) || 1));

  // Preserve already-entered values (e.g. across a language switch) before rebuilding
  const previous = {};
  container.querySelectorAll('input, textarea').forEach((el) => {
    previous[el.name] = el.type === 'checkbox' ? el.checked : el.value;
  });

  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'guest-card';

    const nameFieldHtml = i === 1
      ? `<p class="guest-card-title">${ui('guestSelfLabel')}</p>`
      : `
        <div class="form-row">
          <label for="guestName${i}">${ui('guestNameLabel')(i)}</label>
          <input type="text" id="guestName${i}" name="guestName${i}" required>
        </div>
      `;

    card.innerHTML = `
      ${nameFieldHtml}
      <div class="form-row">
        <label for="songWish${i}">${ui('songWishLabel')}</label>
        <input type="text" id="songWish${i}" name="songWish${i}" placeholder="${ui('songWishPlaceholder')}">
      </div>
      <div class="form-row">
        <label class="radio-opt"><input type="checkbox" id="speechWish${i}" name="speechWish${i}"> ${ui('speechWishLabel')}</label>
      </div>
      <div class="form-row">
        <label for="allergies${i}">${ui('allergiesLabel')}</label>
        <textarea id="allergies${i}" name="allergies${i}" rows="2" placeholder="${ui('allergiesPlaceholder')}"></textarea>
      </div>
    `;
    container.appendChild(card);
  }

  // Restore preserved values
  container.querySelectorAll('input, textarea').forEach((el) => {
    if (!(el.name in previous)) return;
    if (el.type === 'checkbox') el.checked = previous[el.name];
    else el.value = previous[el.name];
  });
}

function initGuestDetailFields() {
  const guestsInput = document.getElementById('guests');
  guestsInput.addEventListener('input', renderGuestDetailFields);
  renderGuestDetailFields();
}

/* ============================================================
   RSVP FORM (client-side demo — se README for backend-kobling)
   ============================================================ */
function buildRsvpSummary(fd, guestsCount, attendingLabel) {
  const lines = [];
  lines.push(`${ui('summaryName')}: ${fd.get('fullName') || ''}`);
  lines.push(`${ui('summaryEmail')}: ${fd.get('email') || ''}`);
  lines.push(`${ui('summaryAttending')}: ${attendingLabel}`);
  lines.push(`${ui('summaryGuestCount')}: ${guestsCount}`);
  lines.push('');

  for (let i = 1; i <= guestsCount; i++) {
    const guestName = i === 1 ? fd.get('fullName') : fd.get(`guestName${i}`);
    lines.push(ui('summaryGuest')(i, guestName || ui('summaryNoName')));
    lines.push(`  ${ui('summarySong')}: ${fd.get(`songWish${i}`) || ui('summaryNone')}`);
    lines.push(`  ${ui('summarySpeech')}: ${fd.get(`speechWish${i}`) === 'on' ? ui('summaryYes') : ui('summaryNo')}`);
    lines.push(`  ${ui('summaryAllergies')}: ${fd.get(`allergies${i}`) || ui('summaryNone')}`);
    lines.push('');
  }

  const message = fd.get('message');
  if (message) {
    lines.push(ui('summaryMessage'));
    lines.push(message);
  }

  return lines.join('\n');
}

function initRsvpForm() {
  const form = document.getElementById('rsvpForm');
  const note = document.getElementById('rsvpNote');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!WEDDING.rsvpFormEndpoint) {
      note.textContent = ui('testModeNote');
      note.style.color = 'var(--gold)';
      return;
    }

    const fd = new FormData(form);
    const guestsCount = Math.max(1, Math.min(10, parseInt(fd.get('guests'), 10) || 1));
    const attendingLabel = fd.get('attending') === 'ja' ? ui('attendingYes') : ui('attendingNo');

    const payload = new FormData();
    payload.append('name', fd.get('fullName') || '');
    payload.append('email', fd.get('email') || '');
    payload.append('_subject', `OSA fra ${fd.get('fullName') || '?'} — ${attendingLabel}, ${guestsCount} gjester`);
    payload.append('Oppsummering', buildRsvpSummary(fd, guestsCount, attendingLabel));

    try {
      await fetch(WEDDING.rsvpFormEndpoint, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      });
      form.innerHTML = `<p style="text-align:center;">${ui('submitSuccess')}</p>`;
    } catch (err) {
      note.textContent = ui('submitError');
    }
  });
}

/* ============================================================
   EASTER EGGS 🥚 — because two 90s kids deserve a website with secrets
   ============================================================ */

// Tiny synthesized 8-bit jingle, no audio files needed
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch (e) { /* audio not available, silently skip */ }
}

function burstConfetti() {
  const pieces = ['💛', '✨', '💍', '🌸', '🥂'];
  for (let i = 0; i < 40; i++) {
    const span = document.createElement('span');
    span.className = 'confetti-piece';
    span.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    span.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 5000);
  }
}

function showBadge(text) {
  const badge = document.getElementById('badge9089');
  badge.textContent = text;
  badge.classList.add('show');
  setTimeout(() => badge.classList.remove('show'), 5000);
}

function updateRetroBannerOffset() {
  const banner = document.getElementById('retroBanner');
  if (!banner) return;
  document.documentElement.style.setProperty('--retro-banner-h', banner.offsetHeight + 'px');
}

function toggleRetroMode() {
  document.body.classList.toggle('retro-mode');
  if (document.body.classList.contains('retro-mode')) {
    playChime();
    burstConfetti();
    showBadge(t(WEDDING.secretMessage));
    requestAnimationFrame(updateRetroBannerOffset);
    window.addEventListener('resize', updateRetroBannerOffset);
  } else {
    window.removeEventListener('resize', updateRetroBannerOffset);
  }
}

/* ============================================================
   SCROLL REVEAL — window sections and dividers rise into view
   ============================================================ */
function initScrollReveal() {
  const wins = document.querySelectorAll('.win');
  wins.forEach((w) => w.classList.add('reveal'));

  const targets = [...wins, ...document.querySelectorAll('.divider')];

  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((t) => io.observe(t));
}

/* ============================================================
   BOOT SEQUENCE — a short typewriter intro before the hero
   content fades in (hero reveals itself via CSS regardless,
   so nothing depends on this ever completing)
   ============================================================ */
function initBootSequence() {
  const el = document.getElementById('bootSeq');
  if (!el) return;

  const lines = getLang() === 'en'
    ? ['> loading markus.exe + stian.exe', '> link established ♥', '> status: getting married']
    : ['> laster markus.exe + stian.exe', '> tilkobling opprettet ♥', '> status: skal gifte oss'];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = lines[lines.length - 1];
    return;
  }

  let lineIndex = 0;
  function typeLine() {
    if (lineIndex >= lines.length) {
      setTimeout(() => { el.style.opacity = '0'; }, 500);
      return;
    }
    const line = lines[lineIndex];
    let charIndex = 0;
    const iv = setInterval(() => {
      el.textContent = line.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= line.length) {
        clearInterval(iv);
        lineIndex++;
        setTimeout(typeLine, 200);
      }
    }, 20);
  }
  el.style.transition = 'opacity 0.4s ease';
  typeLine();
}

function initEasterEggs() {
  // Konami code: ↑ ↑ ↓ ↓ ← → ← → b a
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  window.addEventListener('keydown', (e) => {
    pos = (e.key === konami[pos]) ? pos + 1 : 0;
    if (pos === konami.length) {
      pos = 0;
      toggleRetroMode();
    }
  });

  // Click the couple's names 5 times to reveal the birth-year secret
  const title = document.getElementById('coupleNames');
  let clicks = 0;
  let clickTimer;
  title.style.cursor = 'default';
  title.addEventListener('click', () => {
    clicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clicks = 0; }, 1500);
    if (clicks >= 5) {
      clicks = 0;
      showBadge(t(WEDDING.secretMessage));
      burstConfetti();
      playChime();
    }
  });

  // Hidden trigger button for retro mode (for those without a keyboard, e.g. mobile)
  document.getElementById('retroTrigger').addEventListener('click', toggleRetroMode);

  // A little something for anyone who opens devtools
  console.log('%c✨ 1989 + 1990 = ♥ ✨', 'font-size:18px;font-weight:bold;color:#b8925a;');
  console.log('%cPsst — prøv Konami-koden på siden: ↑ ↑ ↓ ↓ ← → ← → B A', 'color:#6b6156;');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initPasswordGate();
  render();
  initGuestDetailFields();
  initRsvpForm();
  initEasterEggs();
  initScrollReveal();
  initBootSequence();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
