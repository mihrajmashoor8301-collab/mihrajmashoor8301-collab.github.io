/**
 * CALION Academy - Unified Navigation, Header & Search Controller
 * Authoritative global script for the CALION Cybersecurity Academy ecosystem.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. THEME DELEGATION (Powered by CalionTheme)
  // =========================================================================
  function getStoredTheme() {
    if (typeof window !== 'undefined' && window.CalionTheme && typeof window.CalionTheme.getTheme === 'function') {
      return window.CalionTheme.getTheme();
    }
    const val = localStorage.getItem('calion_theme') || localStorage.getItem('theme') || localStorage.getItem('endlessus_learning_theme') || 'light';
    return (val === 'dark' || val === 'hacker') ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    if (typeof window !== 'undefined' && window.CalionTheme && typeof window.CalionTheme.setTheme === 'function') {
      return window.CalionTheme.setTheme(theme);
    }
    const isDark = (theme === 'dark' || theme === 'hacker');
    const normalized = isDark ? 'dark' : 'light';
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      if (root) {
        root.classList.add('dark', 'theme-dark', 'theme-hacker');
        root.classList.remove('light', 'theme-light', 'theme-soft-light', 'theme-classic-white', 'theme-normal');
      }
      if (body) {
        body.classList.add('dark', 'theme-dark', 'theme-hacker');
        body.classList.remove('light', 'theme-light', 'theme-soft-light', 'theme-classic-white', 'theme-normal');
      }
    } else {
      if (root) {
        root.classList.add('light', 'theme-light', 'theme-soft-light', 'theme-normal');
        root.classList.remove('dark', 'theme-dark', 'theme-hacker');
      }
      if (body) {
        body.classList.add('light', 'theme-light', 'theme-soft-light', 'theme-normal');
        body.classList.remove('dark', 'theme-dark', 'theme-hacker');
      }
    }

    if (persist !== false) {
      try {
        localStorage.setItem('calion_theme', normalized);
        localStorage.setItem('theme', normalized);
        localStorage.setItem('endlessus_learning_theme', isDark ? 'hacker' : 'normal');
      } catch (_) {}
    }

    syncThemeButtons(normalized);
    window.dispatchEvent(new CustomEvent('calion-theme-changed', { detail: { theme: normalized } }));
    window.dispatchEvent(new CustomEvent('endlessus-theme-changed', { detail: { theme: isDark ? 'hacker' : 'normal' } }));
    return normalized;
  }

  function syncThemeButtons(theme) {
    if (typeof window !== 'undefined' && window.CalionTheme && typeof window.CalionTheme.init === 'function') {
      window.CalionTheme.init();
      return;
    }
    const isDark = (theme === 'dark' || theme === 'hacker');
    document.querySelectorAll('#theme-toggle, .calion-theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');
      btn.setAttribute('title', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    });
  }

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (['calion_theme', 'theme', 'endlessus_learning_theme'].includes(e.key)) {
      applyTheme(getStoredTheme(), false);
    }
  });

  // =========================================================================
  // 2. MASTER ACADEMY SEARCH INDEX (Strictly Preserved for Learning Architecture)
  // =========================================================================
  const ACADEMY_SEARCH_INDEX = [
    // Learning path selection intentionally lives only on Academy home.
    {
      title: "Academy Home · Choose a Learning Path",
      desc: "Select Pre-Security, Cyber Security Foundations, Defensive Security or Offensive Security.",
      url: "/",
      type: "Academy",
      badgeClass: "badge-stage",
      keywords: ["academy", "learning path", "pre-security", "cyber security", "defensive security", "offensive security"]
    },
    {
      title: "Terminal Practice Sandbox",
      desc: "Isolated full-screen Linux command-line practice terminal with simulated networking and security tools.",
      url: "terminal-lab.html",
      type: "Sandbox",
      badgeClass: "badge-lab",
      keywords: ["terminal", "bash", "cli", "linux", "sandbox", "commands"]
    },
    {
      title: "Learner Profile & Learning Progress",
      desc: "View your earned XP, daily streak, completed rooms across all 4 stages, and learning statistics.",
      url: "profile.html",
      type: "Profile",
      badgeClass: "badge-profile",
      keywords: ["profile", "streak", "xp", "progress", "account", "settings"]
    }
  ];

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Search stubs kept for backwards compatibility
  function openSearch() {}
  function closeSearch() {}

  // =========================================================================
  // 3. CANONICAL CALION LOGO MARK (Standardized Vector Asset)
  // =========================================================================
  const CALION_LOGO_SVG = `
    <svg class="calion-logo-svg h-7 w-auto shrink-0 select-none" height="28" style="height:28px; width:auto;" fill="none" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" aria-label="CALION Logo">
      <defs>
        <linearGradient id="calion_grad_shared" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#00F0FF"></stop>
          <stop offset="50%" stop-color="#0284C7"></stop>
          <stop offset="100%" stop-color="#6366F1"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(10, 10)">
        <path d="M 55 10 L 25 10 L 10 25 L 10 55 L 25 70 L 55 70" stroke="url(#calion_grad_shared)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"></path>
        <path class="stroke-slate-900 dark:stroke-white transition-colors" d="M 42 70 L 42 22 L 58 22 L 68 70" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"></path>
        <path d="M 33 46 L 56 46" stroke="url(#calion_grad_shared)" stroke-linecap="round" stroke-width="4.5"></path>
        <circle cx="55" cy="10" fill="#00F0FF" r="3.5"></circle>
        <circle cx="25" cy="70" fill="#6366F1" r="3"></circle>
        <circle class="fill-slate-900 dark:fill-white transition-colors" cx="42" cy="22" r="2.5"></circle>
      </g>
      <text class="fill-slate-900 dark:fill-white font-headline font-bold transition-colors" font-size="34" letter-spacing="0.22em" x="100" y="58">CALION</text>
      <rect fill="#00F0FF" height="6" rx="1.5" width="6" x="362" y="38"></rect>
      <rect fill="#6366F1" height="6" rx="1.5" width="6" x="362" y="48"></rect>
    </svg>
  `;

  // =========================================================================
  // 4. GLOBAL USER IDENTITY & DROPDOWN RENDERER
  // =========================================================================
  function syncHeaderAuth() {
    let authSlots = document.querySelectorAll('#academy-user-nav, #academy-auth-slot, .academy-auth-slot, .academy-user-nav');
    
    // Auto-discover placement before theme toggle if no slot is present
    if (authSlots.length === 0) {
      const themeToggle = document.querySelector('#theme-toggle, .calion-theme-toggle');
      if (themeToggle && themeToggle.parentElement) {
        const slot = document.createElement('div');
        slot.id = 'academy-user-nav';
        slot.className = 'academy-user-nav relative';
        themeToggle.parentElement.insertBefore(slot, themeToggle);
        authSlots = [slot];
      }
    }

    const auth = window.AcademyAuth;
    const isAuthed = Boolean(auth && typeof auth.isAuthenticated === 'function' && auth.isAuthenticated());
    const user = isAuthed ? auth.getUser() : null;
    const profile = isAuthed ? auth.getProfile() : null;

    authSlots.forEach(slot => {
      // Determine if on roadmap page where cross-path links must be restricted
      const isRoadmapPage = Boolean(slot.closest('.rm-nav') || document.body.classList.contains('roadmap-page'));

      if (isAuthed && (profile || user)) {
        const displayName = (profile && (profile.display_name || profile.username)) || (user && user.email ? user.email.split('@')[0] : 'Learner');
        const email = (user && user.email) ? user.email : '';
        const initial = displayName.charAt(0).toUpperCase();
        const avatarUrl = profile && profile.avatar_url ? profile.avatar_url : '';

        const avatarMarkup = avatarUrl 
          ? `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" class="w-6 h-6 rounded-full object-cover border border-primary/30 shrink-0"/>`
          : `<span class="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 shadow-xs">${escapeHtml(initial)}</span>`;

        slot.innerHTML = `
          <div class="relative academy-profile-menu">
            <button type="button" class="academy-profile-btn flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl border border-border-hairline bg-surface-raised hover:bg-surface-subtle transition-all cursor-pointer text-xs font-mono select-none" aria-expanded="false" aria-haspopup="true" aria-label="User account menu for ${escapeHtml(displayName)}">
              ${avatarMarkup}
              <span class="academy-profile-username font-bold text-on-surface max-w-[100px] truncate hidden sm:inline">${escapeHtml(displayName)}</span>
              <span class="material-symbols-outlined text-[15px] text-outline">expand_more</span>
            </button>
            <div class="academy-profile-dropdown absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl border border-border-hairline bg-surface-raised/98 backdrop-blur-xl shadow-xl space-y-1 font-mono text-xs hidden z-50">
              <div class="px-3 py-2 border-b border-border-hairline/60">
                <div class="font-bold text-on-surface truncate">${escapeHtml(displayName)}</div>
                ${email ? `<div class="text-[10px] text-outline truncate mt-0.5">${escapeHtml(email)}</div>` : ''}
              </div>
              <a href="profile.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors font-medium">
                <span class="material-symbols-outlined text-[16px] text-primary">person</span>
                <span>View Profile</span>
              </a>
              ${!isRoadmapPage ? `
                <a href="/" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[16px] text-secondary">school</span>
                  <span>Academy Home</span>
                </a>
                <a href="terminal-lab.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[16px] text-emerald-500">terminal</span>
                  <span>Terminal</span>
                </a>
              ` : `
                <a href="/" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[16px] text-secondary">school</span>
                  <span>Academy Home</span>
                </a>
              `}
              <div class="border-t border-border-hairline/60 pt-1">
                <button type="button" class="header-logout-btn w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        // Guest user presentation
        slot.innerHTML = `
          <div class="relative academy-profile-menu">
            <button type="button" class="academy-profile-btn flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl border border-border-hairline bg-surface-raised hover:bg-surface-subtle transition-all cursor-pointer text-xs font-mono select-none" aria-expanded="false" aria-haspopup="true" aria-label="Guest account menu">
              <span class="w-6 h-6 rounded-full bg-surface-subtle border border-border-hairline flex items-center justify-center text-outline shrink-0">
                <span class="material-symbols-outlined text-[15px]">person</span>
              </span>
              <span class="font-bold text-outline hidden sm:inline">Guest</span>
              <span class="material-symbols-outlined text-[15px] text-outline">expand_more</span>
            </button>
            <div class="academy-profile-dropdown absolute right-0 top-full mt-2 w-52 p-2 rounded-2xl border border-border-hairline bg-surface-raised/98 backdrop-blur-xl shadow-xl space-y-1 font-mono text-xs hidden z-50">
              <div class="px-3 py-2 border-b border-border-hairline/60">
                <div class="font-bold text-on-surface">Guest Learner</div>
                <div class="text-[10px] text-outline mt-0.5">Progress saved locally</div>
              </div>
              <a href="profile.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors font-medium">
                <span class="material-symbols-outlined text-[16px] text-primary">badge</span>
                <span>View Profile</span>
              </a>
              ${!isRoadmapPage ? `
                <a href="auth.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 font-bold transition-colors">
                  <span class="material-symbols-outlined text-[16px]">login</span>
                  <span>Sign In / Enlist</span>
                </a>
              ` : `
                <a href="/" class="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-subtle text-on-surface hover:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[16px] text-secondary">school</span>
                  <span>Academy Home</span>
                </a>
              `}
            </div>
          </div>
        `;
      }
    });

    // Wire dropdown toggles & keyboard accessibility
    document.querySelectorAll('.academy-profile-menu').forEach(menu => {
      const toggleBtn = menu.querySelector('.academy-profile-btn');
      const dropdown = menu.querySelector('.academy-profile-dropdown');
      if (!toggleBtn || !dropdown || menu.__wired) return;
      menu.__wired = true;

      function closeMenu() {
        dropdown.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }

      function openMenu() {
        // Close other open menus first
        document.querySelectorAll('.academy-profile-dropdown').forEach(d => d.classList.add('hidden'));
        document.querySelectorAll('.academy-profile-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        dropdown.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.classList.contains('hidden');
        if (isOpen) closeMenu();
        else openMenu();
      });

      // Keyboard support
      toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMenu();
          const firstLink = dropdown.querySelector('a, button');
          if (firstLink) firstLink.focus();
        }
      });
    });

    // Wire sign out action
    document.querySelectorAll('.header-logout-btn').forEach(btn => {
      if (btn.__wired) return;
      btn.__wired = true;
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (auth && typeof auth.signOut === 'function') {
          await auth.signOut();
          window.location.reload();
        }
      });
    });
  }

  // Close dropdowns globally on outside click or Esc
  document.addEventListener('click', () => {
    document.querySelectorAll('.academy-profile-dropdown').forEach(d => d.classList.add('hidden'));
    document.querySelectorAll('.academy-profile-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.academy-profile-dropdown').forEach(d => d.classList.add('hidden'));
      document.querySelectorAll('.academy-profile-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  function syncHeaderStats() {
    if (typeof window === 'undefined' || typeof window.AcademyState === 'undefined') return;
    const streakEls = document.querySelectorAll('#header-streak-pill, .header-streak-pill');
    const xpEls = document.querySelectorAll('#header-xp-pill, .header-xp-pill');
    const streak = window.AcademyState.getStreak ? window.AcademyState.getStreak() : 1;
    const xp = window.AcademyState.calculateTotalXP ? window.AcademyState.calculateTotalXP() : 0;
    streakEls.forEach(el => { el.textContent = `${streak}d`; });
    xpEls.forEach(el => { el.textContent = `${xp.toLocaleString()} XP`; });
  }

  // =========================================================================
  // 5. UNIFIED HEADER INITIALIZATION
  // =========================================================================
  function initAll() {
    applyTheme(getStoredTheme(), false);
    syncHeaderStats();
    syncHeaderAuth();

    // Event hooks for reactive state updates
    window.addEventListener('calion-progress-updated', syncHeaderStats);
    window.addEventListener('endlessus-progress-updated', syncHeaderStats);
    window.addEventListener('calion-auth-changed', () => {
      syncHeaderAuth();
      syncHeaderStats();
    });
    window.addEventListener('endlessus-auth-changed', () => {
      syncHeaderAuth();
      syncHeaderStats();
    });

    if (window.AcademyAuth && typeof window.AcademyAuth.init === 'function') {
      window.AcademyAuth.init().then(() => syncHeaderAuth());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose authoritative API
  window.CalionAcademy = window.EndlessusAcademy = {
    setTheme: applyTheme,
    getTheme: getStoredTheme,
    openSearch: openSearch,
    closeSearch: closeSearch,
    searchIndex: ACADEMY_SEARCH_INDEX,
    syncHeaderAuth,
    syncHeaderStats,
    logoSvg: CALION_LOGO_SVG
  };

})();
