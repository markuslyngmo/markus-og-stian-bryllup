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
   REDIGER HER: all informasjon om bryllupet samles i dette
   objektet. Resten av siden bygges automatisk ut fra dette.
   ============================================================ */
const WEDDING = {
  partner1: "Markus",
  partner2: "Stian",
  date: "2027-08-07T14:00:00", // ISO-dato+klokkeslett for vielsen, brukes til nedtelling og kalender

  ceremony: {
    time: "14:00",
    name: "Navn på kirke / vielsessted",
    address: "Gateadresse 1, 0000 Sted",
    mapUrl: "https://maps.google.com/?q=Gateadresse+1+0000+Sted"
  },
  reception: {
    time: "17:00",
    name: "Navn på selskapslokale",
    address: "Gateadresse 2, 0000 Sted",
    mapUrl: "https://maps.google.com/?q=Gateadresse+2+0000+Sted"
  },
  endTime: "01:00",

  directions: "Legg inn veibeskrivelse hit — f.eks. avkjøring, holdeplass eller gangavstand mellom kirke og selskapslokale.",
  parking: "Legg inn informasjon om parkeringsmuligheter hit.",
  transport: "Legg inn informasjon om kollektivtransport eller ev. buss til/fra festen hit.",

  rsvpDeadline: "1. mai 2027",
  rsvpFormEndpoint: "https://formspree.io/f/xjybajlj",

  program: [
    { time: "13:30", title: "Gjestene ankommer vielsesstedet" },
    { time: "14:00", title: "Vielse" },
    { time: "15:00", title: "Gratulasjon og mingling" },
    { time: "17:00", title: "Ankomst selskapslokale" },
    { time: "18:00", title: "Middag" },
    { time: "21:00", title: "Fest og dans" }
  ],

  dressCode: "Legg inn kleskode hit, f.eks. «Pynt deg» / mørk dress / antrekk nr. 2.",

  hotels: [
    { name: "Hotellnavn 1", note: "5 min gange fra selskapslokalet", code: "RABATTKODE1", url: "#" },
    { name: "Hotellnavn 2", note: "Gratis parkering, shuttlebuss tilgjengelig", code: "RABATTKODE2", url: "#" }
  ],

  toastmaster: { name: "Navn", phone: "+47 000 00 000", email: "toastmaster@epost.no" },
  speechDeadline: "1. juni 2027",

  couple: {
    name1: "Navn — +47 000 00 000",
    name2: "Navn — +47 000 00 000",
    email: "brudeparet@epost.no"
  },

  giftLinks: [
    { label: "Ønskeliste 1", url: "#" },
    { label: "Ønskeliste 2", url: "#" }
  ],
  giftMoneyNote: "Ønsker dere heller å bidra med en pengegave, kan dette gjøres via Vipps til #00000 eller kontonummer 0000.00.00000. Merk gjerne med navnet deres.",

  /* 90-talls-easter-egg: fritt å endre teksten, men la gjerne konseptet stå */
  secretMessage: "1989 💛 1990 — to 90-tallsbarn som fant hverandre. Du fant vår hemmelighet!"
};

/* ============================================================
   RENDERING
   ============================================================ */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
}

function fillText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function render() {
  fillText('coupleNames', `${WEDDING.partner1} & ${WEDDING.partner2}`);
  fillText('heroDate', formatDate(WEDDING.date));

  fillText('ceremonyTime', `Kl. ${WEDDING.ceremony.time}`);
  fillText('ceremonyName', WEDDING.ceremony.name);
  fillText('ceremonyAddress', WEDDING.ceremony.address);
  document.getElementById('ceremonyMapLink').href = WEDDING.ceremony.mapUrl;

  fillText('receptionTime', `Kl. ${WEDDING.reception.time}`);
  fillText('receptionName', WEDDING.reception.name);
  fillText('receptionAddress', WEDDING.reception.address);
  document.getElementById('receptionMapLink').href = WEDDING.reception.mapUrl;

  fillText('directions', WEDDING.directions);
  fillText('parking', WEDDING.parking);
  fillText('transport', WEDDING.transport);

  fillText('rsvpDeadline', WEDDING.rsvpDeadline);
  fillText('endTime', WEDDING.endTime);
  fillText('dressCode', WEDDING.dressCode);

  fillText('toastmasterName', WEDDING.toastmaster.name);
  const tmPhone = document.getElementById('toastmasterPhone');
  tmPhone.textContent = WEDDING.toastmaster.phone;
  tmPhone.href = `tel:${WEDDING.toastmaster.phone.replace(/\s/g, '')}`;
  const tmEmail = document.getElementById('toastmasterEmail');
  tmEmail.textContent = WEDDING.toastmaster.email;
  tmEmail.href = `mailto:${WEDDING.toastmaster.email}`;
  fillText('speechDeadline', WEDDING.speechDeadline);

  fillText('contact1', WEDDING.couple.name1);
  fillText('contact2', WEDDING.couple.name2);
  const coupleEmail = document.getElementById('coupleEmail');
  coupleEmail.textContent = WEDDING.couple.email;
  coupleEmail.href = `mailto:${WEDDING.couple.email}`;

  fillText('giftMoneyNote', WEDDING.giftMoneyNote);

  // Program timeline
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = WEDDING.program.map(item => `
    <li>
      <span class="t-time">${item.time}</span>
      <span class="t-dot"></span>
      <span class="t-title">${item.title}</span>
    </li>
  `).join('');

  // Hotels
  const hotelGrid = document.getElementById('hotelGrid');
  hotelGrid.innerHTML = WEDDING.hotels.map(h => `
    <div class="hotel-card">
      <h5>${h.name}</h5>
      <p>${h.note}</p>
      ${h.code ? `<span class="code">Rabattkode: ${h.code}</span>` : ''}
    </div>
  `).join('');

  // Gift links
  const giftLinks = document.getElementById('giftLinks');
  giftLinks.innerHTML = WEDDING.giftLinks.map(g => `
    <a class="btn btn-outline" href="${g.url}" target="_blank" rel="noopener">${g.label}</a>
  `).join('');

  // Calendar link (Google Calendar)
  const start = new Date(WEDDING.date);
  const end = new Date(start.getTime() + 10 * 60 * 60 * 1000);
  const fmt = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(WEDDING.partner1 + ' & ' + WEDDING.partner2 + ' - Bryllup')}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(WEDDING.ceremony.address)}&details=${encodeURIComponent('Vielse: ' + WEDDING.ceremony.name)}`;
  document.getElementById('calendarLink').href = calUrl;
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function updateCountdown() {
  const now = new Date();
  const target = new Date(WEDDING.date);
  const diff = target - now;
  if (diff <= 0) {
    fillText('cdDays', '🎉');
    fillText('cdHours', '');
    fillText('cdMinutes', '');
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  fillText('cdDays', days);
  fillText('cdHours', hours);
  fillText('cdMinutes', minutes);
}

/* ============================================================
   OSA — én boks per gjest (navn, sang, tale, matallergi)
   ============================================================ */
function renderGuestDetailFields() {
  const guestsInput = document.getElementById('guests');
  const container = document.getElementById('guestDetails');
  const count = Math.max(1, Math.min(10, parseInt(guestsInput.value, 10) || 1));

  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'guest-card';

    const nameFieldHtml = i === 1
      ? '<p class="guest-card-title">Gjest 1 (deg)</p>'
      : `
        <div class="form-row">
          <label for="guestName${i}">Navn på gjest ${i}</label>
          <input type="text" id="guestName${i}" name="guestName${i}" required>
        </div>
      `;

    card.innerHTML = `
      ${nameFieldHtml}
      <div class="form-row">
        <label for="songWish${i}">Sangønske til festen (valgfritt)</label>
        <input type="text" id="songWish${i}" name="songWish${i}" placeholder="Én sang du gjerne vil høre på dansegulvet">
      </div>
      <div class="form-row">
        <label class="radio-opt"><input type="checkbox" id="speechWish${i}" name="speechWish${i}"> Ønsker å holde en tale</label>
      </div>
      <div class="form-row">
        <label for="allergies${i}">Matallergier / spesialdiett (valgfritt)</label>
        <textarea id="allergies${i}" name="allergies${i}" rows="2" placeholder="F.eks. gluten, nøtter, vegetar, veganer …"></textarea>
      </div>
    `;
    container.appendChild(card);
  }
}

function initGuestDetailFields() {
  const guestsInput = document.getElementById('guests');
  guestsInput.addEventListener('input', renderGuestDetailFields);
  renderGuestDetailFields();
}

/* ============================================================
   RSVP FORM (client-side demo — se README for backend-kobling)
   ============================================================ */
function initRsvpForm() {
  const form = document.getElementById('rsvpForm');
  const note = document.getElementById('rsvpNote');
  if (!WEDDING.rsvpFormEndpoint) {
    note.textContent = 'Merk: skjemaet må kobles til en mottaker (f.eks. Formspree) for å faktisk sende svar videre — se README.md.';
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!WEDDING.rsvpFormEndpoint) {
      note.textContent = '✓ Testmodus: svaret ble ikke sendt noe sted ennå. Legg inn rsvpFormEndpoint i script.js.';
      note.style.color = 'var(--gold)';
      return;
    }
    const data = new FormData(form);
    try {
      await fetch(WEDDING.rsvpFormEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      form.innerHTML = '<p style="text-align:center;">Takk for svaret ditt! 💛</p>';
    } catch (err) {
      note.textContent = 'Noe gikk galt — prøv igjen, eller ta kontakt direkte.';
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

function toggleRetroMode() {
  document.body.classList.toggle('retro-mode');
  if (document.body.classList.contains('retro-mode')) {
    playChime();
    burstConfetti();
    showBadge(WEDDING.secretMessage);
  }
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
      showBadge(WEDDING.secretMessage);
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
  initPasswordGate();
  render();
  initGuestDetailFields();
  initRsvpForm();
  initEasterEggs();
  updateCountdown();
  setInterval(updateCountdown, 60000);
});
