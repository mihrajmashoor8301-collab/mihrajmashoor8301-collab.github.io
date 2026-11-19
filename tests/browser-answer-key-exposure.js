'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const builder = require('../scripts/build-pages.js');
const dist = path.resolve(__dirname, '../dist');

builder.runBuild();
const forbiddenProperties = /["']?(?:acceptedAnswers|correctIndex|expectedAnswer|answerKey|accepted_answers|correct_index|expected_answer|answer_key)["']?\s*:/i;
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(target);
    else files.push(target);
  }
}
walk(dist);
for (const file of files.filter(file => /\.(?:js|html|json)$/i.test(file))) {
  const source = fs.readFileSync(file, 'utf8');
  assert(!forbiddenProperties.test(source), `production asset leaks answer-key property: ${path.relative(dist, file)}`);
}
assert(fs.existsSync(path.join(dist, 'learning-data.js')));
assert(!fs.existsSync(path.join(dist, 'curriculum-data.js')));
assert(!fs.existsSync(path.join(dist, 'learning.js')));
assert(!fs.existsSync(path.join(dist, 'curriculum')));
assert(!fs.existsSync(path.join(dist, 'server')));
console.log(`✓ Built ${files.length} public files; no answer-key property fields in HTML, JS, or JSON assets`);
console.log('✓ Private answer verification migration/source assets are excluded from the static distribution');
