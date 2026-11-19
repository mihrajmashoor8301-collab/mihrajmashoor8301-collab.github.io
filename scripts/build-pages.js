#!/usr/bin/env node
/**
 * CALION Academy - Static Cloudflare Pages Distribution Builder
 * 
 * Securely builds the production distribution in dist/:
 * 1. Reads ONLY CALION_SUPABASE_URL and CALION_SUPABASE_ANON_KEY from environment (or local .env/.env.local).
 * 2. Strictly validates that no service_role or secret keys are exposed.
 * 3. Generates the client runtime configuration file inside dist/calion-runtime-config.js.
 * 4. Ensures calion-runtime-config.js is loaded before academy-config.js on every Academy page.
 * 5. Strictly excludes non-public folders (supabase/, tests/, docs/, server/, node_modules/).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Specific directories to include in distribution
const INCLUDE_DIRS = [
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
const EXCLUDE_ROOT_FILES = new Set([
  'calion-curriculum-pre-security.js',
  'pre-security-data.js',
  'curriculum-data.js',
  'learning.js'
]);

const EXCLUDE_NAMES = new Set([
  'supabase',
  'tests',
  'docs',
  'server',
  'scripts',
  'node_modules',
  '.git',
  '.github',
  'dist',
  '.env',
  '.env.local',
  '.env.example'
]);

/**
 * Minimal, zero-dependency .env file parser for local development.
 */
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
    return env;
  } catch (err) {
    console.warn(`[CALION Build] Warning reading env file ${filePath}:`, err.message);
    return {};
  }
}

/**
 * Validate that an anon key does not belong to the Supabase service_role.
 */
function assertNotServiceRoleKey(key) {
  if (!key || typeof key !== 'string') return;
  const normalizedKey = key.trim().toLowerCase();

  // Supabase's current secret API keys use the sb_secret_ prefix and are not
  // JWTs, so the legacy role-claim check below cannot identify them.
  if (normalizedKey.startsWith('sb_secret_')) {
    throw new Error('[CRITICAL SECURITY ERROR] CALION_SUPABASE_ANON_KEY contains a Supabase secret API key! Secret keys must NEVER be exposed to frontend clients.');
  }
  
  // Guard 1: Plaintext keyword check
  if (normalizedKey.includes('service_role')) {
    throw new Error('[CRITICAL SECURITY ERROR] CALION_SUPABASE_ANON_KEY contains "service_role"! Service role keys must NEVER be exposed to frontend clients.');
  }

  // Guard 2: JWT role claim decode
  const parts = key.split('.');
  if (parts.length === 3) {
    try {
      const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
      const payload = JSON.parse(payloadJson);
      if (payload && payload.role === 'service_role') {
        throw new Error('[CRITICAL SECURITY ERROR] CALION_SUPABASE_ANON_KEY is a Supabase service_role JWT! Service role keys must NEVER be exposed to frontend clients.');
      }
    } catch (e) {
      if (e.message.includes('CRITICAL SECURITY ERROR')) throw e;
      // Non-JWT dummy key in testing - allow test stubs to proceed
    }
  }
}

/**
 * Validate URL structure
 */
function validateSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' ||
      (parsed.protocol === 'http:' && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'));
  } catch (_) {
    return false;
  }
}

/**
 * Resolve Supabase configuration from environment or local .env files.
 * Strictly reads ONLY CALION_SUPABASE_URL and CALION_SUPABASE_ANON_KEY.
 */
function resolveSupabaseConfig() {
  const localEnv = {
    ...parseEnvFile(path.join(ROOT_DIR, '.env')),
    ...parseEnvFile(path.join(ROOT_DIR, '.env.local'))
  };

  const rawUrl = process.env.CALION_SUPABASE_URL || localEnv.CALION_SUPABASE_URL || '';
  const rawAnonKey = process.env.CALION_SUPABASE_ANON_KEY || localEnv.CALION_SUPABASE_ANON_KEY || '';

  const cleanUrl = rawUrl.trim();
  const cleanAnonKey = rawAnonKey.trim();

  // Enforce security boundaries
  assertNotServiceRoleKey(cleanAnonKey);

  if (cleanUrl && !validateSupabaseUrl(cleanUrl)) {
    console.warn(`[CALION Build] Warning: CALION_SUPABASE_URL "${cleanUrl}" does not appear to be a valid HTTPS/localhost URL.`);
  }

  return {
    url: cleanUrl,
    anonKey: cleanAnonKey,
    isConfigured: Boolean(cleanUrl && cleanAnonKey && validateSupabaseUrl(cleanUrl) && cleanAnonKey.length > 20)
  };
}

/**
 * Generate client runtime configuration script content
 */
function generateRuntimeConfigContent(config) {
  return `/**
 * CALION Academy — Client Runtime Configuration
 * Automatically generated at build time by scripts/build-pages.js.
 * DO NOT EDIT DIRECTLY. DO NOT COMMIT TO VERSION CONTROL.
 */
(function (root) {
  'use strict';
  root.CALION_SUPABASE_URL = ${JSON.stringify(config.url || '')};
  root.CALION_SUPABASE_ANON_KEY = ${JSON.stringify(config.anonKey || '')};
})(typeof self !== 'undefined' ? self : this);
`;
}

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

function assertNoBrowserAnswerKeys(directory) {
  const keyProperty = /["']?(?:acceptedAnswers|correctIndex|expectedAnswer|answerKey|accepted_answers|correct_index|expected_answer|answer_key)["']?\s*:/i;
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isDirectory()) visit(target);
      else if (/\.(?:js|html|json)$/i.test(entry.name)) {
        const content = fs.readFileSync(target, 'utf8');
        if (keyProperty.test(content)) {
          throw new Error(`[CRITICAL SECURITY ERROR] Browser build contains answer-key properties: ${path.relative(directory, target)}`);
        }
      }
    }
  };
  visit(directory);
}

function runBuild() {
  console.log('============================================================');
  console.log('CALION ACADEMY - STATIC CLOUDFLARE PAGES BUILD');
  console.log('============================================================\n');

  // 1. Resolve and validate Supabase configuration
  const config = resolveSupabaseConfig();
  if (config.isConfigured) {
    console.log(`✓ CALION Supabase Configuration detected for: ${config.url}`);
    console.log(`✓ Anon key validated (length: ${config.anonKey.length}, service_role check passed)`);
  } else {
    console.log('! Notice: CALION_SUPABASE_URL or CALION_SUPABASE_ANON_KEY not set.');
    console.log('  Building distribution with safe fallback for guest/offline operation.');
  }

  // 2. Clean and initialize dist directory
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // 3. Write dist/calion-runtime-config.js
  const runtimeConfigPath = path.join(DIST_DIR, 'calion-runtime-config.js');
  fs.writeFileSync(runtimeConfigPath, generateRuntimeConfigContent(config), 'utf8');
  console.log('✓ Generated dist/calion-runtime-config.js (runtime configuration file)');

  // 4. Copy selected root files and ensure script load order
  const rootEntries = fs.readdirSync(ROOT_DIR);
  // Local scripts can be cached for a day at the CDN and in browsers. Version
  // each referenced bundle so a release cannot pair new markup with stale
  // progress APIs or curriculum globals from an older deployment.
  const scriptVersions = new Map();
  const versionForScript = (src) => {
    if (/^(?:[a-z]+:|\/\/|\/|data:)/i.test(src)) return null;
    const pathname = src.split(/[?#]/, 1)[0].replace(/^\.\//, '');
    const scriptPath = path.resolve(ROOT_DIR, pathname);
    if (!scriptPath.startsWith(`${ROOT_DIR}${path.sep}`) || !fs.existsSync(scriptPath) || !fs.statSync(scriptPath).isFile()) return null;
    if (!scriptVersions.has(scriptPath)) {
      scriptVersions.set(scriptPath, crypto.createHash('sha256').update(fs.readFileSync(scriptPath)).digest('hex').slice(0, 12));
    }
    return scriptVersions.get(scriptPath);
  };
  let fileCount = 0;
  let htmlPatchedCount = 0;

  for (const entry of rootEntries) {
    if (EXCLUDE_NAMES.has(entry) || EXCLUDE_ROOT_FILES.has(entry)) continue;

    const srcPath = path.join(ROOT_DIR, entry);
    const destPath = path.join(DIST_DIR, entry);
    const stat = fs.statSync(srcPath);

    if (stat.isFile()) {
      const ext = path.extname(entry).toLowerCase();
      if (INCLUDE_EXTS.has(ext) || INCLUDE_SPECIAL_FILES.has(entry)) {
        if (ext === '.html') {
          let htmlContent = fs.readFileSync(srcPath, 'utf8');
          htmlContent = htmlContent.replace(/(<script\b[^>]*?\bsrc=["'])([^"']+)(["'])/gi, (match, before, src, after) => {
            const version = versionForScript(src);
            if (!version) return match;
            const pathname = src.split(/[?#]/, 1)[0];
            return `${before}${pathname}?v=${version}${after}`;
          });
          // Ensure calion-runtime-config.js is loaded before academy-config.js
          if (htmlContent.includes('academy-config.js') && !htmlContent.includes('calion-runtime-config.js')) {
            htmlContent = htmlContent.replace(
              /<script src="academy-config\.js"><\/script>/g,
              '<script src="calion-runtime-config.js"></script>\n  <script src="academy-config.js"></script>'
            );
            htmlPatchedCount++;
          }
          fs.writeFileSync(destPath, htmlContent, 'utf8');
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
        fileCount++;
      }
    } else if (stat.isDirectory() && INCLUDE_DIRS.includes(entry)) {
      copyRecursive(srcPath, destPath);
      console.log(`  ✓ Directory copied: ${entry}/`);
    }
  }

  // 5. Publish each isolated URL as a directory index generated from the one
  // shared roadmap renderer. This preserves the original path for route selection
  // and avoids Pages clean-URL canonicalization of an internal .html rewrite.
  const roadmapSource = path.join(DIST_DIR, 'roadmap.html');
  const roadmapRoutes = ['pre-security', 'cyber-security', 'defensive-security', 'offensive-security'];
  for (const route of roadmapRoutes) {
    const routeDir = path.join(DIST_DIR, 'roadmap', route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(roadmapSource, path.join(routeDir, 'index.html'));
  }
  console.log(`✓ Generated ${roadmapRoutes.length} isolated roadmap routes from the shared renderer`);

  // 6. Ensure _headers and _redirects are present
  if (fs.existsSync(path.join(ROOT_DIR, '_headers'))) {
    fs.copyFileSync(path.join(ROOT_DIR, '_headers'), path.join(DIST_DIR, '_headers'));
  }
  if (fs.existsSync(path.join(ROOT_DIR, '_redirects'))) {
    fs.copyFileSync(path.join(ROOT_DIR, '_redirects'), path.join(DIST_DIR, '_redirects'));
  }

  // Fail closed if a future curriculum or asset change reintroduces answer keys.
  assertNoBrowserAnswerKeys(DIST_DIR);

  console.log(`\n✓ Distribution build complete! ${fileCount} root files copied to dist/`);
  if (htmlPatchedCount > 0) {
    console.log(`✓ Verified and ensured runtime configuration injection across ${htmlPatchedCount} HTML pages`);
  }
  console.log('✓ Security check: Non-public directories and retired duplicate curriculum bundles are excluded.');
  console.log('============================================================\n');
}

// Allow module require for testing while executing build when run directly
if (require.main === module) {
  runBuild();
}

module.exports = {
  parseEnvFile,
  assertNotServiceRoleKey,
  validateSupabaseUrl,
  resolveSupabaseConfig,
  generateRuntimeConfigContent,
  assertNoBrowserAnswerKeys,
  runBuild
};
