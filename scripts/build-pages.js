#!/usr/bin/env node
/**
 * CALION Academy - Static Cloudflare Pages Distribution Builder
 * 
 * Copies only public frontend assets into dist/ while strictly excluding
 * database migrations (supabase/), test suites (tests/), internal documentation (docs/),
 * server code (server/), and development scripts.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Specific directories to include
const INCLUDE_DIRS = [
  'curriculum',
  'handbook',
  'vendor',
  'cert_previews',
  'projects'
];

// File extensions to include from root
const INCLUDE_EXTS = new Set([
  '.html',
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.ico',
  '.xml',
  '.txt',
  '.json'
]);

// Root files explicitly included
const INCLUDE_SPECIAL_FILES = new Set([
  '_headers',
  '_redirects',
  'robots.txt',
  'sitemap.xml',
  '.nojekyll'
]);

// Root files/dirs explicitly excluded
const EXCLUDE_NAMES = new Set([
  'supabase',
  'tests',
  'docs',
  'server',
  'scripts',
  'node_modules',
  '.git',
  '.github',
  'dist'
]);

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry.startsWith('.git') || entry === 'node_modules') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Building clean static distribution in dist/ ...');

// Clean dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// 1. Copy selected root files
const rootEntries = fs.readdirSync(ROOT_DIR);
let fileCount = 0;

for (const entry of rootEntries) {
  if (EXCLUDE_NAMES.has(entry)) continue;

  const srcPath = path.join(ROOT_DIR, entry);
  const destPath = path.join(DIST_DIR, entry);
  const stat = fs.statSync(srcPath);

  if (stat.isFile()) {
    const ext = path.extname(entry).toLowerCase();
    if (INCLUDE_EXTS.has(ext) || INCLUDE_SPECIAL_FILES.has(entry)) {
      fs.copyFileSync(srcPath, destPath);
      fileCount++;
    }
  } else if (stat.isDirectory() && INCLUDE_DIRS.includes(entry)) {
    copyRecursive(srcPath, destPath);
    console.log(`  ✓ Directory copied: ${entry}/`);
  }
}

// Ensure _headers and _redirects are present
if (fs.existsSync(path.join(ROOT_DIR, '_headers'))) {
  fs.copyFileSync(path.join(ROOT_DIR, '_headers'), path.join(DIST_DIR, '_headers'));
}
if (fs.existsSync(path.join(ROOT_DIR, '_redirects'))) {
  fs.copyFileSync(path.join(ROOT_DIR, '_redirects'), path.join(DIST_DIR, '_redirects'));
}

console.log(`✓ Distribution build complete! ${fileCount} root files copied to dist/`);
console.log('✓ Non-public directories (supabase, tests, docs, server) strictly excluded.');
