// Refreshes the list of real English words that the spelling fixer must leave alone (fever is not a typo of never).
// Needs the SCOWL lists: npm install wordlist-english   Then: node tools/gen_real_words.js
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'src', 'en2ae.js');
const WL = path.dirname(require.resolve('wordlist-english/package.json'));
let src = fs.readFileSync(P, 'utf8');
src = src.replace(/\/\*EN_REAL\*\/'[^']*'\/\*END\*\//, "/*EN_REAL*/''/*END*/");
fs.writeFileSync(P, src);
const E = require(P);
const all = new Set();
for (const lv of [10, 20, 35]) for (const v of ['english', 'american', 'british']) {
  for (const w of JSON.parse(fs.readFileSync(path.join(WL, `${v}-words-${lv}.json`), 'utf8'))) { const x = w.toLowerCase(); if (/^[a-z]{4,}$/.test(x) && x === w) all.add(x); }
}
const vocab = E._debug.vocab();
const risky = [...all].filter((w) => !vocab.has(w) && E._debug.correctWord(w, null, true)).sort();
src = fs.readFileSync(P, 'utf8').replace(/\/\*EN_REAL\*\/'[^']*'\/\*END\*\//, "/*EN_REAL*/'" + risky.join(' ') + "'/*END*/");
fs.writeFileSync(P, src);
console.log('protected words:', risky.length);
