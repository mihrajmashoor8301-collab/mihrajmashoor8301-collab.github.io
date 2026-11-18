/**
 * CALION Academy - Unified Three-Theme Manager
 * Supports:
 * 1. 'classic' (Classic White: clean, bright white canvas)
 * 2. 'soft' (Soft Light: comfortable off-white with blue-grey tint & high-contrast panels)
 * 3. 'dark' (Dark: deep navy canvas with elevated slate panels, 70/30 surface balance)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalionTheme = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'calion_theme';
  const VALID_THEMES = ['soft', 'classic', 'dark'];
  const DEFAULT_THEME = 'soft';

  function normalizeTheme(theme) {
    if (!theme) return DEFAULT_THEME;
    const t = String(theme).toLowerCase().trim();
    if (t === 'dark' || t === 'theme-dark' || t === 'hacker') return 'dark';
    if (t === 'classic' || t === 'white' || t === 'classic-white') return 'classic';
    if (t === 'soft' || t === 'soft-light' || t === 'light' || t === 'normal') return 'soft';
    return DEFAULT_THEME;
  }

  function getStoredTheme() {
    try {
      if (typeof localStorage === 'undefined') return DEFAULT_THEME;
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('endlessus_learning_theme');
      return normalizeTheme(saved);
    } catch (_) {
      return DEFAULT_THEME;
    }
  }

  function applyTheme(themeName) {
    const theme = normalizeTheme(themeName);
    const html = document.documentElement;
    if (!html) return theme;

    // Reset all theme classes
    html.classList.remove('light', 'dark', 'theme-soft-light', 'theme-classic-white', 'theme-dark', 'theme-normal', 'theme-hacker');

    if (theme === 'dark') {
      html.classList.add('dark', 'theme-dark');
    } else if (theme === 'classic') {
      html.classList.add('light', 'theme-classic-white');
    } else {
      // Soft light (default)
      html.classList.add('light', 'theme-soft-light');
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, theme);
        localStorage.setItem('endlessus_learning_theme', theme === 'dark' ? 'hacker' : 'normal');
      }
    } catch (_) {}

    updateToggleButtons(theme);

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('calion-theme-changed', { detail: { theme } }));
      } catch (_) {}
    }

    return theme;
  }

  function cycleTheme() {
    const current = getStoredTheme();
    let next = 'dark';
    if (current === 'soft') next = 'dark';
    else if (current === 'dark') next = 'classic';
    else if (current === 'classic') next = 'soft';
    return applyTheme(next);
  }

  function updateToggleButtons(theme) {
    if (typeof document === 'undefined') return;

    // Update single-toggle buttons icon & title
    const toggles = document.querySelectorAll('#theme-toggle, .calion-theme-toggle, .btn-theme-toggle');
    toggles.forEach(btn => {
      btn.setAttribute('data-theme', theme);
      const icon = btn.querySelector('.material-symbols-outlined') || btn.querySelector('[data-theme-icon]');
      if (icon) {
        if (theme === 'dark') {
          icon.textContent = 'light_mode';
          btn.setAttribute('title', 'Switch to Soft Light theme');
        } else if (theme === 'classic') {
          icon.textContent = 'dark_mode';
          btn.setAttribute('title', 'Switch to Dark theme');
        } else {
          icon.textContent = 'contrast';
          btn.setAttribute('title', 'Switch theme (Soft Light → Dark → Classic)');
        }
      }
    });

    // Update 3-way segmented buttons if present
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      const btnTheme = normalizeTheme(btn.getAttribute('data-set-theme'));
      const isActive = btnTheme === theme;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.classList.add('bg-white', 'dark:bg-slate-800', 'text-primary', 'font-bold', 'shadow-xs');
      } else {
        btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-primary', 'font-bold', 'shadow-xs');
      }
    });

    // Dual-button compatibility for legacy theme-toggle-normal / theme-toggle-hacker
    const btnNormal = document.getElementById('theme-toggle-normal');
    const btnHacker = document.getElementById('theme-toggle-hacker');
    if (btnNormal && btnHacker) {
      const isDark = theme === 'dark';
      btnNormal.setAttribute('aria-pressed', isDark ? 'false' : 'true');
      btnHacker.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      if (isDark) {
        btnHacker.classList.add('bg-primary/20', 'text-primary', 'font-bold');
        btnNormal.classList.remove('bg-primary/20', 'text-primary', 'font-bold');
      } else {
        btnNormal.classList.add('bg-primary/20', 'text-primary', 'font-bold');
        btnHacker.classList.remove('bg-primary/20', 'text-primary', 'font-bold');
      }
    }
  }

  function init() {
    if (typeof document === 'undefined') return;
    const current = getStoredTheme();
    applyTheme(current);

    // Bind click events
    document.querySelectorAll('#theme-toggle, .calion-theme-toggle, .btn-theme-toggle').forEach(btn => {
      if (btn.__calion_theme_bound) return;
      btn.__calion_theme_bound = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cycleTheme();
      });
    });

    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      if (btn.__calion_theme_bound) return;
      btn.__calion_theme_bound = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-set-theme');
        applyTheme(target);
      });
    });

    const btnNormal = document.getElementById('theme-toggle-normal');
    const btnHacker = document.getElementById('theme-toggle-hacker');
    if (btnNormal && !btnNormal.__calion_theme_bound) {
      btnNormal.__calion_theme_bound = true;
      btnNormal.addEventListener('click', (e) => {
        e.preventDefault();
        applyTheme('soft');
      });
    }
    if (btnHacker && !btnHacker.__calion_theme_bound) {
      btnHacker.__calion_theme_bound = true;
      btnHacker.addEventListener('click', (e) => {
        e.preventDefault();
        applyTheme('dark');
      });
    }
  }

  // Auto-init on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    getTheme: getStoredTheme,
    setTheme: applyTheme,
    cycleTheme,
    init
  };
});
