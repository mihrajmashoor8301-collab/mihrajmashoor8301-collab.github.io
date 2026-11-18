#!/usr/bin/env node
/** Build the standalone CALION landing page bundle for Cloudflare Pages. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist-landing');
const files = [
  ['index.html', 'index.html'],
  ['cover.png', 'cover.png'],
  ['dp4.jpeg', 'dp4.jpeg'],
  ['tailwind.cdn.js', 'tailwind.cdn.js'],
  ['handbook/assets/favicon.svg', 'handbook/assets/favicon.svg']
];

fs.rmSync(output, { recursive: true, force: true });
for (const [source, destination] of files) {
  const sourcePath = path.join(root, source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Required landing page asset is missing: ${source}`);
  }
  const destinationPath = path.join(output, destination);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

console.log(`Built standalone landing page bundle: ${files.length} files in ${path.relative(root, output)}`);
