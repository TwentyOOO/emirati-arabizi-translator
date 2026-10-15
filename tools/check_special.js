// Every special Arabic letter must show up in the Arabizi spelling: ء ؤ ئ → 2, ذ → dh, ض → 9', ظ → 6', ث → th, غ → 3', خ → 5, ح → 7, ع → 3, ص → 9, ط → 6.
const E = require('../src/en2ae.js');
const R = E._debug.raw();
const RULES = [
  ['ء|ؤ|ئ', /2/g, '2'], ['ذ', /dh/g, 'dh'], ['ض', /9'/g, "9'"], ['ظ', /6'/g, "6'"], ['ث', /th/g, 'th'], ['غ', /3'/g, "3'"],
  ['خ', /5/g, '5'], ['ح', /7/g, '7'], ['ع', /3(?!')/g, '3'], ['ص', /9(?!')/g, '9'], ['ط', /6(?!')/g, '6']
];
const bad = [];
function check(where, az, ar) {
  if (!az || !ar || /[A-Za-z]/.test(ar)) return;
  az = az.replace(/_/g, ' '); ar = ar.replace(/_/g, ' ');
  // a hamza on a word's first letter (أ إ آ) is not written in Arabizi; inside a word it is (رأي → ra2y)
  const arMid = ar.split(/\s+/).map((w) => w.replace(/^(و|ب|ف|ل|ال|بال|وال|فال)?[أإآ]/, '$1ا').replace(/^(ال|وال|بال|فال|لل)/, '')).join(' ');
  for (const [letters, re, sym] of RULES) {
    const nAr = (arMid.match(new RegExp(letters + (letters === 'ء|ؤ|ئ' ? '|(?<=\\S)[أإ]' : ''), 'g')) || []).length;
    const nAz = (az.match(re) || []).length;
    if (nAz < nAr) bad.push(`${where}: "${az}" | ${ar}   missing ${sym}`);
  }
}
const pairOf = (s) => { const k = s.indexOf('|'); return [s.slice(0, k), s.slice(k + 1)]; };
for (const [k, v] of Object.entries(R.NOUN_RAW)) { const [a, b] = pairOf(v); const az = a.split(' '), ar = b.split(' '); check('noun ' + k, az[0], ar[0]); check('noun ' + k + ' pl', az[1], ar[1]); }
for (const [k, v] of Object.entries(R.ADJ_RAW)) { const [a, b] = pairOf(v); const az = a.replace(/^[\^!+]+/, '').split(' '), ar = b.split(' '); if (az.length >= 3) az.forEach((x, i) => check('adj ' + k, x, ar[i])); else check('adj ' + k, az.join(' '), b); }
for (const [k, [spec]] of Object.entries(R.VERB_RAW)) { if (spec[0] === '=') continue; const [a, b] = pairOf(spec); const az = a.split(' '), ar = b.split(' '); az.forEach((x, i) => check('verb ' + k, x, ar[i])); }
for (const [k, v] of Object.entries(R.ADV_RAW)) { const [a, b] = pairOf(v); if (a.startsWith('@')) continue; check('adv ' + k, a.replace(/^[*~]/, ''), b); }
for (const [k, v] of Object.entries(R.NUM_RAW)) { const [a, b] = pairOf(v); check('num ' + k, a, b); }
for (const [k, v] of Object.entries(R.FIXED_RAW)) {
  if (typeof v === 'string') { const [a, b] = pairOf(v); check('fixed ' + k, a, b); }
  else for (const g of ['m', 'f', 'pl']) { const [a, b] = pairOf(v[g]); check('fixed ' + k + ' ' + g, a, b); }
}
for (const [k, v] of Object.entries(R.WH)) check('wh ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.CONJ)) check('conj ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.DEM)) check('dem ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.PREP_PRON)) { const a = v[0].split(' '), b = v[1].split(' '); a.forEach((x, i) => check('prep ' + k, x, b[i])); }
for (const [k, v] of Object.entries(R.MULTI)) if (v.az) check('multi ' + k, v.az, v.ar);
console.log(bad.join('\n') || 'all special letters are written');
console.log(bad.length + ' problems');
