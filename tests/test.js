// Checks the translator against reviewed translations. Usage: node tests/test.js
const fs = require('fs');
const path = require('path');
const E = require('../src/en2ae.js');
const gold = require('./golden.json');
const keep = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'aqw_names.json'), 'utf8'));
let bad = 0;
for (const g of gold) {
  const r = E.translate(g.en, { addr: g.addr, keep });
  if (r.az !== g.az || r.ar !== g.ar) {
    bad++;
    console.log(`✗ [${g.addr}] ${g.en}\n   want: ${g.az}  |  ${g.ar}\n   got:  ${r.az}  |  ${r.ar}`);
  }
}
console.log(`${gold.length - bad}/${gold.length} pass`);
process.exitCode = bad ? 1 : 0;
