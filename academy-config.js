/**
 * Endlessus Academy - Supabase Configuration & Client Provider
 * 
 * Configures the dedicated Supabase project for Endlessus Academy.
 * Allows runtime configuration via window.ENDLESSUS_CONFIG or localStorage,
 * with safe offline fallback when Supabase is not configured.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AcademyConfig = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Storage keys for custom configuration
  const STORAGE_KEYS = {
    URL: 'endlessus_supabase_url',
    ANON_KEY: 'endlessus_supabase_anon_key'
  };

  // Default configuration (can be updated by user or injected via build/environment)
  // These placeholders allow the client to initialize safely or prompt for configuration.
  const DEFAULT_CONFIG = {
    url: (typeof window !== 'undefined' && window.ENDLESSUS_SUPABASE_URL) || '',
    anonKey: (typeof window !== 'undefined' && window.ENDLESSUS_SUPABASE_ANON_KEY) || ''
  };

  function getStoredConfig() {
    try {
      if (typeof localStorage === 'undefined') return DEFAULT_CONFIG;
      const url = localStorage.getItem(STORAGE_KEYS.URL) || DEFAULT_CONFIG.url;
      const anonKey = localStorage.getItem(STORAGE_KEYS.ANON_KEY) || DEFAULT_CONFIG.anonKey;
      return { url: url.trim(), anonKey: anonKey.trim() };
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  function setConfig(url, anonKey) {
    try {
      if (typeof localStorage !== 'undefined') {
        if (url) localStorage.setItem(STORAGE_KEYS.URL, url.trim());
        if (anonKey) localStorage.setItem(STORAGE_KEYS.ANON_KEY, anonKey.trim());
      }
    } catch (e) {
      console.warn('[AcademyConfig] Failed to persist credentials:', e);
    }
  }

  function isConfigured() {
    const cfg = getStoredConfig();
    return Boolean(cfg.url && cfg.anonKey && cfg.url.startsWith('http') && cfg.anonKey.length > 20);
  }

  return {
    getStoredConfig,
    setConfig,
    isConfigured,
    STORAGE_KEYS
  };
});
