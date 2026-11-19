/**
 * CALION Academy - Canonical Theme Controller
 * Authoritative global controller for Light & Dark HUD modes.
 * 
 * Features:
 * - Zero-FOUC immediate initialization before DOM rendering
 * - Single persistent source of truth (calion_theme, with fallback to system preference)
 * - Dual-write compatibility for legacy keys (endlessus_learning_theme, theme)
 * - Real-time cross-tab synchronization via StorageEvent
 * - Delegated click handling for instant UI updates without page reload
 * - Clean binary theme toggle: Light (Moon icon) <-> Dark (Sun icon)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalionTheme = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const PRIMARY_STORAGE_KEY = 'calion_theme';
  const LEGACY_STORAGE_KEY = 'endlessus_learning_theme';
  const GENERIC_STORAGE_KEY = 'theme';

  function getSystemPreference() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (_) {}
    }
    return 'light';
  }

  function normalizeTheme(theme) {
    if (!theme) return null;
    const t = String(theme).toLowerCase().trim();
    if (t === 'dark' || t === 'theme-dark' || t === 'hacker') return 'dark';
    if (t === 'light' || t === 'soft' || t === 'classic' || t === 'white' || t === 'normal') return 'light';
    return null;
  }

  function getStoredTheme() {
    try {
      if (typeof localStorage === 'undefined') return getSystemPreference();
      const primary = localStorage.getItem(PRIMARY_STORAGE_KEY);
      const normalizedPrimary = normalizeTheme(primary);
      if (normalizedPrimary) return normalizedPrimary;

      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem(GENERIC_STORAGE_KEY);
      const normalizedLegacy = normalizeTheme(legacy);
      if (normalizedLegacy) return normalizedLegacy;

      return getSystemPreference();
    } catch (_) {
      return 'light';
    }
  }

  function applyTheme(themeName, persist) {
    const theme = normalizeTheme(themeName) || 'light';
    const isDark = theme === 'dark';
    const html = typeof document !== 'undefined' ? document.documentElement : null;
    const body = typeof document !== 'undefined' ? document.body : null;

    if (html) {
      if (isDark) {
        html.classList.add('dark', 'theme-dark', 'theme-hacker');
        html.classList.remove('light', 'theme-light', 'theme-soft-light', 'theme-classic-white', 'theme-normal');
      } else {
        html.classList.add('light', 'theme-light', 'theme-soft-light', 'theme-normal');
        html.classList.remove('dark', 'theme-dark', 'theme-hacker');
      }
    }

    if (body) {
      if (isDark) {
        body.classList.add('dark', 'theme-dark', 'theme-hacker');
        body.classList.remove('light', 'theme-light', 'theme-soft-light', 'theme-classic-white', 'theme-normal');
      } else {
        body.classList.add('light', 'theme-light', 'theme-soft-light', 'theme-normal');
        body.classList.remove('dark', 'theme-dark', 'theme-hacker');
      }
    }

    if (persist !== false) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(PRIMARY_STORAGE_KEY, theme);
          localStorage.setItem(GENERIC_STORAGE_KEY, theme);
          localStorage.setItem(LEGACY_STORAGE_KEY, isDark ? 'hacker' : 'normal');
        }
      } catch (_) {}
    }

    updateToggleButtons(theme);

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('calion-theme-changed', { detail: { theme } }));
        window.dispatchEvent(new CustomEvent('endlessus-theme-changed', { detail: { theme: isDark ? 'hacker' : 'normal' } }));
      } catch (_) {}
    }

    return theme;
  }

  function toggleTheme() {
    const current = getStoredTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    return applyTheme(next, true);
  }

  function updateToggleButtons(theme) {
    if (typeof document === 'undefined') return;
    const isDark = theme === 'dark';

    // 1. Single icon button toggles (#theme-toggle, .calion-theme-toggle, etc.)
    const toggles = document.querySelectorAll('#theme-toggle, .calion-theme-toggle, .btn-theme-toggle, [data-theme-toggle]');
    toggles.forEach(btn => {
      btn.setAttribute('data-theme', theme);
      btn.setAttribute('aria-label', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');
      btn.setAttribute('title', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');

      const iconEl = btn.querySelector('.material-symbols-outlined, [data-theme-icon]');
      if (iconEl) {
        iconEl.textContent = isDark ? 'light_mode' : 'dark_mode';
      } else if (btn.childElementCount === 0 || btn.textContent.trim().length <= 2) {
        // Fallback for simple text/unicode buttons
        btn.textContent = isDark ? '☀️' : '🌙';
      }
    });

    // 2. Dual-button legacy compatibility (#theme-toggle-normal / #theme-toggle-hacker)
    const btnNormal = document.getElementById('theme-toggle-normal');
    const btnHacker = document.getElementById('theme-toggle-hacker');
    if (btnNormal && btnHacker) {
      btnNormal.setAttribute('aria-pressed', isDark ? 'false' : 'true');
      btnHacker.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      if (isDark) {
        btnHacker.classList.add('bg-primary', 'text-black', 'font-bold');
        btnHacker.classList.remove('text-outline');
        btnNormal.classList.remove('bg-primary', 'text-white', 'font-bold');
        btnNormal.classList.add('text-outline');
      } else {
        btnNormal.classList.add('bg-primary', 'text-white', 'font-bold');
        btnNormal.classList.remove('text-outline');
        btnHacker.classList.remove('bg-primary', 'text-black', 'font-bold');
        btnHacker.classList.add('text-outline');
      }
    }

    // 3. Segmented buttons [data-set-theme]
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      const target = normalizeTheme(btn.getAttribute('data-set-theme'));
      const active = target === theme;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('active', active);
    });
  }

  // EARLY INITIALIZATION: Apply immediately upon script execution to eliminate FOUC
  if (typeof document !== 'undefined' && document.documentElement) {
    const initialTheme = getStoredTheme();
    applyTheme(initialTheme, false);
  }

  function init() {
    if (typeof document === 'undefined') return;
    const current = getStoredTheme();
    applyTheme(current, false);

    // Global Delegated Click Listener for theme controls (reliable across dynamic renders)
    if (!document.__calion_theme_delegated) {
      document.__calion_theme_delegated = true;

      document.addEventListener('click', function (e) {
        const toggleBtn = e.target.closest('#theme-toggle, .calion-theme-toggle, .btn-theme-toggle, [data-theme-toggle]');
        if (toggleBtn) {
          e.preventDefault();
          e.stopPropagation();
          toggleTheme();
          return;
        }

        const normalBtn = e.target.closest('#theme-toggle-normal, .theme-toggle-normal, [data-set-theme="light"], [data-set-theme="normal"], [data-set-theme="soft"]');
        if (normalBtn) {
          e.preventDefault();
          e.stopPropagation();
          applyTheme('light', true);
          return;
        }

        const hackerBtn = e.target.closest('#theme-toggle-hacker, .theme-toggle-hacker, [data-set-theme="dark"], [data-set-theme="hacker"]');
        if (hackerBtn) {
          e.preventDefault();
          e.stopPropagation();
          applyTheme('dark', true);
          return;
        }
      }, true);
    }

    // Cross-tab Synchronization
    if (typeof window !== 'undefined' && !window.__calion_storage_bound) {
      window.__calion_storage_bound = true;
      window.addEventListener('storage', function (e) {
        if (e.key === PRIMARY_STORAGE_KEY || e.key === LEGACY_STORAGE_KEY || e.key === GENERIC_STORAGE_KEY) {
          applyTheme(getStoredTheme(), false);
        }
      });
    }

    // System Preference Dynamic Listener
    if (typeof window !== 'undefined' && window.matchMedia && !window.__calion_media_bound) {
      window.__calion_media_bound = true;
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', function () {
          // Only adapt if user hasn't set an explicit override in storage
          if (!localStorage.getItem(PRIMARY_STORAGE_KEY) && !localStorage.getItem(LEGACY_STORAGE_KEY)) {
            applyTheme(getSystemPreference(), false);
          }
        });
      } catch (_) {}
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    getTheme: getStoredTheme,
    setTheme: (t) => applyTheme(t, true),
    toggleTheme,
    cycleTheme: toggleTheme,
    init
  };
});
