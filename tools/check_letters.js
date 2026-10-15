// Compares the Arabizi spelling of every word with its Arabic spelling, letter by letter (consonants only).
// Usage: node check_letters.js
const E = require('../src/en2ae.js');
const R = E._debug.raw();

const AR_MAP = {
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': '7', 'خ': '5', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
  'ص': '9', 'ض': "9'", 'ط': '6', 'ظ': "6'", 'ع': '3', 'غ': "3'", 'ف': 'f', 'ق': 'g', 'ك': 'k', 'چ': 'ch', 'ل': 'l', 'م': 'm',
  'ن': 'n', 'ه': 'h', 'ء': '2', 'ؤ': '2', 'ئ': '2'
};
function arSkeleton(ar) {
  const out = [];
  for (let w of ar.split(/\s+/)) {
    if (!w) continue;
    w = w.replace(/[ً-ْـ]/g, '');            // harakat, tatweel
    if (/^(ال|وال|بال|فال|كال)/.test(w) && w.length > 3) w = w.replace(/^(و|ب|ف|ك)?ال/, '$1');  // article
    if (/^لل/.test(w) && w.length > 3) w = w.replace(/^لل/, 'ل');
    for (let i = 0; i < w.length; i++) {
      const c = w[i];
      if ('اأإآ'.includes(c)) { if (i > 0 && c !== 'ا') out.push('2'); continue; }
      if (c === 'و' || c === 'ي' || c === 'ى' || c === 'ة') continue;
      if (AR_MAP[c]) out.push(AR_MAP[c]);
    }
  }
  return collapse(out);
}
function azSkeleton(az) {
  const out = [];
  for (let w of az.toLowerCase().split(/\s+/)) {
    if (!w) continue;
    w = w.replace(/^(il|al|el)-/, '').replace(/^(i|fi|bi|li)(sh|[tdrzsn]|9|6)-\2/, '$1').replace(/^(fil|bil|lil)-/, '');
    const units = w.match(/[369]'|sh|ch|th|dh|kh|gh|[a-z0-9]/g) || [];
    for (const u of units) {
      if (/^[aeiouwy]$/.test(u)) continue;
      out.push({ kh: '5', gh: "3'", q: 'g' }[u] || u);
    }
  }
  return collapse(out);
}
function collapse(list) { return list.filter((x, i) => x !== list[i - 1]); }

const problems = [];
function check(where, az, ar) {
  if (!az || !ar || az === '-' || ar === '-') return;
  az = az.replace(/_/g, ' ');
  ar = ar.replace(/_/g, ' ');
  if (!/[؀-ۿ]/.test(ar) || /[A-Za-z]/.test(ar)) return;   // brand words written in Latin
  const a = azSkeleton(az).join('.'), b = arSkeleton(ar).join('.');
  if (a !== b) problems.push(`${where}: ${az}  |  ${ar}    [${a}] vs [${b}]`);
}
const pairOf = (s) => { const k = s.indexOf('|'); return [s.slice(0, k), s.slice(k + 1)]; };

for (const [k, v] of Object.entries(R.NOUN_RAW)) {
  const [a, b] = pairOf(v); const az = a.split(' '), ar = b.split(' ');
  check('noun ' + k, az[0], ar[0]); check('noun ' + k + ' pl', az[1], ar[1]);
}
for (const [k, v] of Object.entries(R.ADJ_RAW)) {
  const [a, b] = pairOf(v); const az = a.replace(/^[\^!+]+/, '').split(' '), ar = b.split(' ');
  if (az.length >= 3) az.forEach((x, i) => check('adj ' + k + ' ' + i, x, ar[i])); else check('adj ' + k, az.join(' '), b);
}
for (const [k, [spec]] of Object.entries(R.VERB_RAW)) {
  const [a, b] = pairOf(spec); const az = a.split(' '), ar = b.split(' ');
  az.forEach((x, i) => check('verb ' + k + ' ' + i, x, ar[i]));
}
for (const [k, v] of Object.entries(R.ADV_RAW)) {
  const [a, b] = pairOf(v);
  if (a.startsWith('@')) continue;
  check('adv ' + k, a.replace(/^[*~]/, ''), b);
}
for (const [k, v] of Object.entries(R.NUM_RAW)) { const [a, b] = pairOf(v); check('num ' + k, a, b); }
for (const [k, v] of Object.entries(R.NUM_CONS)) { const [a, b] = pairOf(v); check('numc ' + k, a, b); }
for (const [k, v] of Object.entries(R.FIXED_RAW)) {
  if (typeof v === 'string') { const [a, b] = pairOf(v); check('fixed ' + k, a, b); }
  else for (const g of ['m', 'f', 'pl']) { const [a, b] = pairOf(v[g]); check('fixed ' + k + ' ' + g, a, b); }
}
for (const [k, v] of Object.entries(R.WH)) check('wh ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.CONJ)) check('conj ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.DEM)) check('dem ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.SUBJ_FORM)) check('pron ' + k, v[0], v[1]);
for (const [k, v] of Object.entries(R.PREP_PRON)) { const a = v[0].split(' '), b = v[1].split(' '); a.forEach((x, i) => check('prep ' + k + ' ' + i, x, b[i])); }
for (const t of [R.STILL, R.TAWW]) { const a = t.az.split(' '), b = t.ar.split(' '); a.forEach((x, i) => check('still/taww ' + i, x, b[i])); }
for (const [k, v] of Object.entries(R.MULTI)) if (v.az) check('multi ' + k, v.az, v.ar);

console.log(problems.join('\n'));
console.log('\n' + problems.length + ' differences');
