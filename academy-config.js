/**
 * CALION Academy — Supabase Configuration & Client Provider
 * 
 * Configures the dedicated Supabase project for CALION Academy.
 * Allows runtime configuration via window.CALION_CONFIG or localStorage,
 * with safe offline fallback when Supabase is not configured.
 * Preserves backward compatibility with legacy storage keys.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AcademyConfig = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Storage keys for configuration (CALION primary with legacy Endlessus fallback)
  const STORAGE_KEYS = {
    URL: 'calion_supabase_url',
    ANON_KEY: 'calion_supabase_anon_key',
    LEGACY_URL: 'endlessus_supabase_url',
    LEGACY_ANON_KEY: 'endlessus_supabase_anon_key'
  };

  function getDefaultConfig() {
    return {
      url: (typeof window !== 'undefined' && (window.CALION_SUPABASE_URL || window.ENDLESSUS_SUPABASE_URL)) || '',
      anonKey: (typeof window !== 'undefined' && (window.CALION_SUPABASE_ANON_KEY || window.ENDLESSUS_SUPABASE_ANON_KEY)) || ''
    };
  }

  function validateHttpUrl(str) {
    if (!str || typeof str !== 'string') return false;
    try {
      const parsed = new URL(str.trim());
      if (parsed.protocol === 'https:') return true;
      if (parsed.protocol === 'http:' && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) return true;
      return false;
    } catch (_) {
      return false;
    }
  }

  function getStoredConfig() {
    try {
      // 1. Authoritative runtime config from window globals (injected by calion-runtime-config.js)
      const runtimeConfig = getDefaultConfig();
      const runtimeUrl = runtimeConfig.url;
      const runtimeAnonKey = runtimeConfig.anonKey;

      if (runtimeUrl && runtimeAnonKey && validateHttpUrl(runtimeUrl) && runtimeAnonKey.length > 20) {
        return {
          url: runtimeUrl.trim(),
          anonKey: runtimeAnonKey.trim(),
          source: 'runtime'
        };
      }

      // 2. Local storage fallback (for local development or automated test suites)
      if (typeof localStorage !== 'undefined') {
        const storedUrl = localStorage.getItem(STORAGE_KEYS.URL) ||
                          localStorage.getItem(STORAGE_KEYS.LEGACY_URL) ||
                          '';
        const storedAnonKey = localStorage.getItem(STORAGE_KEYS.ANON_KEY) ||
                              localStorage.getItem(STORAGE_KEYS.LEGACY_ANON_KEY) ||
                              '';
        if (storedUrl && storedAnonKey) {
          return {
            url: storedUrl.trim(),
            anonKey: storedAnonKey.trim(),
            source: 'storage'
          };
        }
      }

      // 3. Fallback to default empty config
      return {
        url: (runtimeUrl || '').trim(),
        anonKey: (runtimeAnonKey || '').trim(),
        source: 'default'
      };
    } catch (e) {
      return { url: '', anonKey: '', source: 'error' };
    }
  }

  function setConfig(url, anonKey) {
    try {
      if (typeof localStorage === 'undefined') return false;
      const cleanUrl = (url || '').trim();
      const cleanKey = (anonKey || '').trim();

      if (cleanUrl) {
        if (!validateHttpUrl(cleanUrl)) {
          throw new Error('Invalid Supabase URL. Must use HTTPS (or HTTP localhost for development).');
        }
        localStorage.setItem(STORAGE_KEYS.URL, cleanUrl);
        localStorage.setItem(STORAGE_KEYS.LEGACY_URL, cleanUrl);
      }
      if (cleanKey) {
        if (cleanKey.length < 20) {
          throw new Error('Invalid Supabase Anon Key. Provided key is too short.');
        }
        localStorage.setItem(STORAGE_KEYS.ANON_KEY, cleanKey);
        localStorage.setItem(STORAGE_KEYS.LEGACY_ANON_KEY, cleanKey);
      }
      return true;
    } catch (e) {
      console.warn('[CALION AcademyConfig] Configuration error:', e.message);
      throw e;
    }
  }

  function isConfigured() {
    const cfg = getStoredConfig();
    return Boolean(cfg.url && cfg.anonKey && validateHttpUrl(cfg.url) && cfg.anonKey.length > 20);
  }

  return {
    getStoredConfig,
    setConfig,
    isConfigured,
    validateHttpUrl,
    STORAGE_KEYS
  };
});
