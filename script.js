// =====================================================================
// EDIT ME — everything you need to personalize is in this one block.
// =====================================================================
const CONFIG = {

  // The site only opens between these dates (inclusive, her local time).
  // Outside them she just sees the matching message instead of the question.
  openFrom:  '2026-10-16',
  openUntil: '2026-10-25',
  notYetMessage: "Not yet — come back on the 16th.",
  closedMessage: "Happy birthday. The rest is in person.",

  // The heading counts down to her birthday by itself. {n} becomes the
  // number of nights left (10 on the 16th, 1 on the 25th) and {s} becomes
  // an "s" except when it's 1, so "{n} night{s}" reads "1 night".
  // A night can have its own heading: add `title:` to it in `days` below;
  // nights without one use this.
  birthday: '2026-10-26',
  title: "{n} night{s} until your birthday",
  subtitle: "Until then, one little piece of us every night.",

  // Background song for the question screen and the hearts page. It starts
  // the first time she touches the page (browsers don't allow sound before
  // that) and loops until she opens a heart, which switches to that
  // night's own song.
  menuSong: 'assets/audio/menu.mp3',

  // One entry per night. On each `date` that night's heart unlocks and
  // its `question` is the one she has to answer to get in that day.
  // `answer` is not case-sensitive, and extra spaces and punctuation are
  // ignored; to accept more than one answer use a list, e.g.
  // answer: ["babe", "baby"]. For a date, dateAnswers(day, month) accepts
  // every usual way of writing it ("7th sept", "september 7", "07/09"…).
  // `photo`, `song`, `note` are file paths — drop matching files into
  // assets/photos/, assets/audio/ and assets/notes/. A night's song starts
  // when she opens its heart. A note is a plain .txt file; line breaks in
  // it are kept. A missing photo shows the placeholder instead.
  days: [
    {
      day: 1,
      date: '2026-10-16',
      title: "Frontal lobe fully loads in {n} nights",
      question: "What's the best day to be born?",
      answer: dateAnswers(7, 9), // every way of writing 7th September
      photo: 'assets/photos/day1.jpg',
      song: 'assets/audio/day1.mp3',
      note: 'assets/notes/day1.txt',
    },
    {
      day: 2,
      date: '2026-10-17',
      title: "{n} more sleeps until it's your day",
      question: "What's the best place to have chai in Lahore?",
      // every way of writing Wazir Khan Mosque, with or without "the",
      // "outside", "masjid", "lahore" and the usual spellings
      answer: [
        ...combos(['', 'the', 'outside', 'outside the'],
                  ['wazir khan', 'wazirkhan', 'wazeer khan', 'wazir khans', 'wazir khan s'],
                  ['', 'mosque', 'masjid', 'ki masjid'],
                  ['', 'lahore']),
        ...combos(['', 'the', 'outside', 'outside the'],
                  ['masjid', 'masjid e', 'mosque', 'mosque of'],
                  ['wazir khan', 'wazirkhan', 'wazeer khan'],
                  ['', 'lahore']),
      ],
      photo: 'assets/photos/day2.jpg',
      song: 'assets/audio/day2.mp3',
      note: 'assets/notes/day2.txt',
    },
    {
      day: 3,
      date: '2026-10-18',
      question: "Night 3's question here?",
      answer: "answer3",
      photo: 'assets/photos/day3.jpg',
      song: 'assets/audio/day3.mp3',
      note: 'assets/notes/day3.txt',
    },
    {
      day: 4,
      date: '2026-10-19',
      question: "Night 4's question here?",
      answer: "answer4",
      photo: 'assets/photos/day4.jpg',
      song: 'assets/audio/day4.mp3',
      note: 'assets/notes/day4.txt',
    },
    {
      day: 5,
      date: '2026-10-20',
      question: "Night 5's question here?",
      answer: "answer5",
      photo: 'assets/photos/day5.jpg',
      song: 'assets/audio/day5.mp3',
      note: 'assets/notes/day5.txt',
    },
    {
      day: 6,
      date: '2026-10-21',
      question: "Night 6's question here?",
      answer: "answer6",
      photo: 'assets/photos/day6.jpg',
      song: 'assets/audio/day6.mp3',
      note: 'assets/notes/day6.txt',
    },
    {
      day: 7,
      date: '2026-10-22',
      question: "Night 7's question here?",
      answer: "answer7",
      photo: 'assets/photos/day7.jpg',
      song: 'assets/audio/day7.mp3',
      note: 'assets/notes/day7.txt',
    },
    {
      day: 8,
      date: '2026-10-23',
      question: "Night 8's question here?",
      answer: "answer8",
      photo: 'assets/photos/day8.jpg',
      song: 'assets/audio/day8.mp3',
      note: 'assets/notes/day8.txt',
    },
    {
      day: 9,
      date: '2026-10-24',
      question: "Night 9's question here?",
      answer: "answer9",
      photo: 'assets/photos/day9.jpg',
      song: 'assets/audio/day9.mp3',
      note: 'assets/notes/day9.txt',
    },
    {
      day: 10,
      date: '2026-10-25',
      question: "Night 10's question here?",
      answer: "answer10",
      photo: 'assets/photos/day10.jpg',
      song: 'assets/audio/day10.mp3',
      note: 'assets/notes/day10.txt',
    },
  ]
};
// =====================================================================


// ---- date helpers -----------------------------------------------------
// Plain `new Date('2026-10-01')` parses as UTC midnight, which can land
// on the *previous* day once converted to a timezone behind UTC — a
// classic JS gotcha. Parsing the pieces by hand and building a local
// Date avoids that, so "today" always means today where she opens this.
function parseLocalDate(str){
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}
// For testing: add ?preview=2026-10-16 to the URL and the site behaves as
// if it's that day. The plain link she gets always uses the real date.
const PREVIEW_DATE = (new URLSearchParams(location.search).get('preview') || '')
  .match(/^\d{4}-\d{2}-\d{2}$/)?.[0];

function todayLocalMidnight(){
  if (PREVIEW_DATE) return parseLocalDate(PREVIEW_DATE);
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

// Every usual way of writing a date as an answer, e.g. dateAnswers(7, 9):
// "7th september", "sept 7", "the seventh of september", "07/09", "9-7"…
// (punctuation is ignored when matching, so "07/09" is stored as "07 09").
// Spelled-out days are only listed for dates in use; add more to WORDS.
function dateAnswers(day, month){
  const MONTHS = ['january','february','march','april','may','june','july',
    'august','september','october','november','december'];
  const WORDS = { 7: ['seven', 'seventh'] };
  const suffix = (day % 100 >= 11 && day % 100 <= 13) ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
  const name = MONTHS[month - 1];

  const days = [String(day), day + suffix, String(day).padStart(2, '0'), ...(WORDS[day] || [])];
  const months = [name, name.slice(0, 3), name.slice(0, 4)];
  const numMonths = [String(month), String(month).padStart(2, '0')];

  const out = new Set();
  for (const d of days){
    for (const m of months){
      [`${d} ${m}`, `${m} ${d}`, `${d} of ${m}`, `the ${d} of ${m}`,
       `${m} the ${d}`, `the ${d} ${m}`].forEach(a => out.add(a));
    }
    // Numbers only, either order (07/09 or 09/07)
    if (/^\d/.test(d)) for (const n of numMonths){ out.add(`${d} ${n}`); out.add(`${n} ${d}`); }
  }
  return [...out];
}

// Every combination of one word/phrase from each list, joined with spaces;
// '' in a list means "this part is optional". For example
// combos(['', 'the'], ['big', 'small'], ['house']) gives
// "big house", "small house", "the big house", "the small house".
function combos(...lists){
  return lists.reduce(
    (acc, list) => acc.flatMap(a => list.map(b => [a, b].filter(Boolean).join(' '))),
    ['']
  );
}

// ---- starfield ----------------------------------------------------------
function initStars(count = 60){
  const el = document.getElementById('stars');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++){
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = (Math.random() * 4) + 's';
    s.style.setProperty('--size', (Math.random() * 1.5 + 1) + 'px');
    frag.appendChild(s);
  }
  el.appendChild(frag);
}

// ---- the opening gate -----------------------------------------------------
const gate = document.getElementById('gate');
const gateQuestion = document.getElementById('gate-question');
const gateInput = document.getElementById('gate-input');
const gateSubmit = document.getElementById('gate-submit');
const gateHint = document.getElementById('gate-hint');
const main = document.getElementById('main');

// Tonight's entry is the one whose date is today. If today somehow has no
// entry, fall back to the latest night that has already unlocked.
function tonight(){
  const today = todayLocalMidnight();
  const unlocked = CONFIG.days.filter(d => today >= parseLocalDate(d.date));
  return unlocked.find(d => parseLocalDate(d.date).getTime() === today.getTime())
    || unlocked[unlocked.length - 1]
    || CONFIG.days[0];
}

// Case, punctuation and spacing don't matter: "7th-Sept." -> "7th sept".
function normalize(s){
  return String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function tryUnlockGate(){
  const value = normalize(gateInput.value);
  const night = tonight();
  const answers = [].concat(night.answer).map(normalize);

  if (value.length === 0) return;

  if (answers.includes(value)){
    gate.classList.add('gate-hidden');
    setTimeout(() => gate.classList.add('hidden'), 700);
    main.classList.remove('hidden');
    renderHearts();
    // The menu song carries on here; a night's own song only starts when
    // she opens its heart. (Starting it now covers the rare case where she
    // got here without the first-touch listener having fired.)
    startMenuSong();
  } else {
    gateHint.textContent = "not quite — try again";
    const card = gate.querySelector('.gate-card');
    card.classList.remove('shake'); // restart animation if triggered twice
    void card.offsetWidth;
    card.classList.add('shake');
  }
}
gateSubmit.addEventListener('click', tryUnlockGate);
gateInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlockGate(); });

// ---- rendering the hearts -----------------------------------------------------
const heartsEl = document.getElementById('hearts');
const rotations = [-6, 4, -3, 7, -5, 2, 6, -4, 3, -2]; // gives the scattered, handmade feel

// '2026-10-16' -> { day: '16th', month: 'Oct' }
function prettyDate(str){
  const d = parseLocalDate(str);
  const n = d.getDate();
  const suffix = (n % 100 >= 11 && n % 100 <= 13) ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
  return { day: n + suffix, month: d.toLocaleString('en-GB', { month: 'short' }) };
}

// Two chains running from the heart's top corners down into a padlock, drawn
// in the heart's 100x100 box. Built once and reused for every locked heart.
function chainLinks(x1, y1, x2, y2){
  const len = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  const step = 7;
  let links = '';
  for (let i = 0; i * step < len; i++){
    const t = (i * step) / len;
    const x = (x1 + (x2 - x1) * t).toFixed(1);
    const y = (y1 + (y2 - y1) * t).toFixed(1);
    links += (i % 2 === 0)
      // a link seen face-on…
      ? `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="2.7" transform="rotate(${angle.toFixed(1)} ${x} ${y})"/>`
      // …then one seen edge-on, so it reads as interlocking
      : `<line x1="${(+x - 3.6).toFixed(1)}" y1="${y}" x2="${(+x + 3.6).toFixed(1)}" y2="${y}" transform="rotate(${angle.toFixed(1)} ${x} ${y})" class="edge"/>`;
  }
  return links;
}
const CHAINS_SVG = `
  <svg class="chains" viewBox="0 0 100 100" aria-hidden="true">
    <g class="chain">${chainLinks(3, 24, 45, 71)}${chainLinks(97, 24, 55, 71)}</g>
    <g class="padlock">
      <path class="shackle" d="M43.5 72v-6a6.5 6.5 0 0 1 13 0v6"/>
      <rect x="39.5" y="70" width="21" height="16" rx="3.5"/>
      <circle cx="50" cy="77" r="2.1" class="keyhole"/>
    </g>
  </svg>`;

let unlockedBefore = null; // which nights were open at the last render

// "{n} night{s} until…" -> "10 nights until…" / "1 night until…"
function fillTitle(template, today){
  const n = Math.round((parseLocalDate(CONFIG.birthday) - today) / 86400000);
  return template.replaceAll('{n}', n).replaceAll('{s}', n === 1 ? '' : 's');
}

function renderHearts(){
  heartsEl.innerHTML = '';
  const today = todayLocalMidnight();
  document.getElementById('title').textContent = fillTitle(tonight().title || CONFIG.title, today);
  document.getElementById('subtitle').textContent = CONFIG.subtitle;
  const unlockedNow = new Set();

  CONFIG.days.forEach((day, i) => {
    const unlocked = today >= parseLocalDate(day.date);
    const { day: dayLabel, month } = prettyDate(day.date);
    if (unlocked) unlockedNow.add(day.day);
    // Unlocked while she had the page open (just after midnight)? Celebrate it.
    const justUnlocked = unlocked && unlockedBefore && !unlockedBefore.has(day.day);

    const btn = document.createElement('button');
    btn.className = 'heart-tile ' + (unlocked ? 'is-unlocked' : 'is-locked') + (justUnlocked ? ' just-unlocked' : '');
    btn.style.setProperty('--rot', rotations[i % rotations.length] + 'deg');
    btn.disabled = !unlocked;
    btn.setAttribute(
      'aria-label',
      unlocked ? `Open ${dayLabel} ${month}` : `${dayLabel} ${month} — locked until then`
    );
    btn.innerHTML = `
      <span class="heart-wrap"><span class="heart"></span>${unlocked ? '' : CHAINS_SVG}</span>
      <span class="heart-date"><span class="heart-day">${dayLabel}</span><span class="heart-month">${month}</span></span>`;

    if (unlocked){
      btn.addEventListener('click', () => openKeepsake(day));
    }
    heartsEl.appendChild(btn);
  });

  unlockedBefore = unlockedNow;
  renderedFor = today.getTime();
}

// If she leaves the page open past midnight, the next heart unlocks on its own.
let renderedFor = null; // the day the hearts were last drawn for
setInterval(() => {
  if (renderedFor !== null && todayLocalMidnight().getTime() !== renderedFor) renderHearts();
}, 30 * 1000);

// ---- the keepsake modal (photo + note + song) -----------------------------------------------------
const keepsake = document.getElementById('keepsake');
const keepsakePhoto = document.getElementById('keepsake-photo');
const keepsakeNote = document.getElementById('keepsake-note');
const keepsakeClose = document.getElementById('keepsake-close');
const songToggle = document.getElementById('song-toggle');
const audioPlayer = document.getElementById('audio-player');

// A photo that isn't there yet falls back to the placeholder.
const PLACEHOLDER_PHOTO = 'assets/photos/placeholder.svg';
keepsakePhoto.addEventListener('error', () => {
  if (!keepsakePhoto.src.endsWith(PLACEHOLDER_PHOTO)) keepsakePhoto.src = PLACEHOLDER_PHOTO;
});

// Notes live in their own .txt files, fetched the first time a heart is
// opened and remembered after that.
const noteCache = {};
function loadNote(day){
  if (!noteCache[day.day]){
    noteCache[day.day] = fetch(day.note)
      .then(r => r.ok ? r.text() : '')
      .catch(() => '') // e.g. opened by double-clicking index.html: browsers block this over file://
      .then(t => t.trim());
  }
  return noteCache[day.day];
}

// Tap the polaroid to turn it over: photo on the front, note on the back.
const polaroid = document.getElementById('polaroid');
function setFlipped(flipped){
  polaroid.classList.toggle('is-flipped', flipped);
  polaroid.setAttribute('aria-pressed', String(flipped));
  polaroid.setAttribute('aria-label', flipped ? 'Flip back to the photo' : 'Flip the photo over to read the note');
}
function flipPolaroid(){
  setFlipped(!polaroid.classList.contains('is-flipped'));
  // restart the little "lift" animation on every flip
  polaroid.classList.remove('is-turning');
  void polaroid.offsetWidth;
  polaroid.classList.add('is-turning');
}
polaroid.addEventListener('click', flipPolaroid);
polaroid.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flipPolaroid(); }
});

function openKeepsake(day){
  setFlipped(false); // every card opens photo-side up
  polaroid.classList.remove('is-turning');
  keepsakePhoto.src = day.photo;
  keepsakePhoto.alt = `Photo from night ${day.day}`;
  keepsakeNote.textContent = '';
  loadNote(day).then(text => {
    // Only fill it in if she's still looking at this night's card.
    if (keepsakePhoto.alt === `Photo from night ${day.day}`) keepsakeNote.textContent = text;
  });
  keepsake.classList.remove('hidden');

  // Each heart plays its own night's song. Opening the heart whose song is
  // already loaded (e.g. tonight's, which started at the gate) carries on
  // from where it is instead of restarting — and resumes it if she'd paused.
  if (currentSong !== day.song) playSong(day.song);
  else if (audioPlayer.paused) audioPlayer.play().catch(() => {});
}

// ---- the song player -----------------------------------------------------
// One <audio> element shared by everything, set to loop, so the chosen
// night's song keeps going on the home screen after she closes its card,
// until she pauses it or opens a different heart. The speaker icon in the
// corner mutes/unmutes (and stays muted as she opens other hearts); the
// button inside the keepsake card plays/pauses.
const muteToggle = document.getElementById('mute-toggle');
let currentSong = null;

function updateSongButtons(){
  songToggle.textContent = audioPlayer.paused ? '\u25B6 play the song' : '\u23F8 pause';
  muteToggle.classList.toggle('is-muted', audioPlayer.muted);
  muteToggle.setAttribute('aria-label', audioPlayer.muted ? 'Unmute music' : 'Mute music');
}
['play', 'pause', 'ended', 'volumechange'].forEach(t => audioPlayer.addEventListener(t, updateSongButtons));

function playSong(src){
  currentSong = src;
  audioPlayer.pause();
  audioPlayer.src = src;
  audioPlayer.currentTime = 0;
  muteToggle.classList.remove('hidden');

  // This is always called from inside a click or Enter press, which counts
  // as the "user gesture" browsers require before they'll play sound.
  return audioPlayer.play().then(() => true, () => {
    // Autoplay was blocked, or the file isn't there yet — the button in
    // the keepsake card still works as a manual play control either way.
    updateSongButtons();
    return false;
  });
}

// The menu song plays until she opens her first heart. Once any song is
// playing (menu or a night's), this does nothing. If the browser refused
// that particular touch (e.g. it was a scroll, not a tap), it simply tries
// again on her next one.
const firstTouchEvents = ['click', 'touchend', 'keydown'];
function startMenuSong(){
  if (currentSong !== null && currentSong !== CONFIG.menuSong) return; // a heart already chose
  if (currentSong === CONFIG.menuSong && !audioPlayer.paused) return;  // already playing
  playSong(CONFIG.menuSong).then(ok => {
    if (ok) firstTouchEvents.forEach(t => document.removeEventListener(t, startMenuSong));
  });
}

songToggle.addEventListener('click', () => {
  if (audioPlayer.paused){
    audioPlayer.muted = false; // pressing play means she wants to hear it
    audioPlayer.play().catch(() => {});
  } else {
    audioPlayer.pause();
  }
});

muteToggle.addEventListener('click', () => {
  audioPlayer.muted = !audioPlayer.muted;
});

function closeKeepsake(){
  keepsake.classList.add('hidden');
}
keepsakeClose.addEventListener('click', closeKeepsake);
keepsake.addEventListener('click', (e) => { if (e.target === keepsake) closeKeepsake(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !keepsake.classList.contains('hidden')) closeKeepsake();
});

// ---- go -----------------------------------------------------
initStars();

const today = todayLocalMidnight();
const notYet = today < parseLocalDate(CONFIG.openFrom);
const closed = today > parseLocalDate(CONFIG.openUntil);

if (notYet || closed){
  // Outside the window: show only the message, no way past the gate.
  gateQuestion.textContent = notYet ? CONFIG.notYetMessage : CONFIG.closedMessage;
  gateInput.classList.add('hidden');
  gateSubmit.classList.add('hidden');
} else {
  gateQuestion.textContent = tonight().question;
  gateInput.focus();

  // Menu song on her first tap or key press anywhere — the earliest moment
  // a browser will allow sound. (Chrome on touch screens counts the end of
  // a tap, not the start, so listen for click / touchend rather than
  // pointerdown.)
  firstTouchEvents.forEach(t => document.addEventListener(t, startMenuSong));
}
