/**
 * Endlessus Academy - Unified Navigation, Search & Theme Controller
 * Authoritative global script for the Endlessus Cybersecurity Academy ecosystem.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. THEME CONTROLLER (ZERO-FLICKER + SYNC)
  // =========================================================================
  const THEME_KEY = 'endlessus_learning_theme';

  function getStoredTheme() {
    const val = localStorage.getItem(THEME_KEY) || localStorage.getItem('endlessus_view_mode') || localStorage.getItem('theme') || 'normal';
    if (val === 'hacker' || val === 'dark') return 'hacker';
    return 'normal';
  }

  function applyTheme(theme, persist) {
    const normalized = (theme === 'hacker' || theme === 'dark') ? 'hacker' : 'normal';
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, normalized);
      } catch (e) {
        console.warn('[Endlessus Theme] localStorage write failed:', e);
      }
    }

    const isHacker = normalized === 'hacker';
    const root = document.documentElement;
    const body = document.body;

    if (isHacker) {
      root.classList.add('dark', 'theme-hacker');
      root.classList.remove('theme-normal');
      if (body) {
        body.classList.add('dark', 'theme-hacker');
        body.classList.remove('theme-normal');
      }
    } else {
      root.classList.remove('dark', 'theme-hacker');
      root.classList.add('theme-normal');
      if (body) {
        body.classList.remove('dark', 'theme-hacker');
        body.classList.add('theme-normal');
      }
    }

    // Sync all theme button states across DOM
    syncThemeButtons(normalized);

    // Notify listeners (CALION primary + legacy Endlessus)
    window.dispatchEvent(new CustomEvent('calion-theme-changed', { detail: { theme: normalized } }));
    window.dispatchEvent(new CustomEvent('endlessus-theme-changed', { detail: { theme: normalized } }));
  }

  function syncThemeButtons(theme) {
    const isNormal = theme === 'normal';

    // All Tailwind-style toggle buttons
    document.querySelectorAll('#theme-toggle-normal, .theme-toggle-normal').forEach(btn => {
      btn.className = isNormal
        ? 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold bg-primary text-white cursor-pointer transition-all'
        : 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold text-outline hover:text-on-surface cursor-pointer transition-all';
      btn.setAttribute('aria-pressed', isNormal ? 'true' : 'false');
    });

    document.querySelectorAll('#theme-toggle-hacker, .theme-toggle-hacker').forEach(btn => {
      btn.className = isNormal
        ? 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold text-outline hover:text-on-surface cursor-pointer transition-all'
        : 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold bg-primary text-black cursor-pointer transition-all';
      btn.setAttribute('aria-pressed', isNormal ? 'false' : 'true');
    });

    // Learning Hub CSS buttons
    document.querySelectorAll('#toggle-normal, .toggle-normal').forEach(btn => {
      btn.classList.toggle('active', isNormal);
    });
    document.querySelectorAll('#toggle-hacker, .toggle-hacker').forEach(btn => {
      btn.classList.toggle('active', !isNormal);
    });

    // Generic class-based buttons
    document.querySelectorAll('.academy-theme-btn').forEach(btn => {
      const mode = btn.dataset.theme;
      if (mode) {
        btn.classList.toggle('active', mode === theme);
      }
    });
  }

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY || e.key === 'endlessus_view_mode') {
      applyTheme(getStoredTheme(), false);
    }
  });

  // Initial immediate application
  applyTheme(getStoredTheme(), false);

  // =========================================================================
  // 2. MASTER ACADEMY SEARCH INDEX
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

  // Dynamically populate rooms into the search index if ENDLESSUS_ROOMS is available
  function enrichSearchIndex() {
    const allRooms = (typeof CALION_ROOMS !== 'undefined' && Array.isArray(CALION_ROOMS))
      ? CALION_ROOMS
      : ((typeof ENDLESSUS_ROOMS !== 'undefined' && Array.isArray(ENDLESSUS_ROOMS)) ? ENDLESSUS_ROOMS : []);

    if (allRooms.length > 0) {
      allRooms.forEach(r => {
        const isAlreadyIndexed = ACADEMY_SEARCH_INDEX.some(item => item.url === `room.html?id=${r.id}`);
        if (!isAlreadyIndexed) {
          const stageName = r.stageTitle || (r.stageId ? r.stageId.replace('-', ' ') : `Stage ${r.stageOrder || r.level || 1}`);
          const skillKws = Array.isArray(r.skillsGained) ? r.skillsGained : [];
          const toolKws = Array.isArray(r.toolsAndCommands) ? r.toolsAndCommands : [];
          ACADEMY_SEARCH_INDEX.push({
            title: `${r.id.toUpperCase()}: ${r.title}`,
            desc: r.description || (r.whyAreYouHere ? (r.whyAreYouHere.substring(0, 95) + '...') : r.tagline || ''),
            url: `room.html?id=${r.id}`,
            roomId: r.id,
            type: `Room · ${stageName}`,
            badgeClass: 'badge-room',
            keywords: [r.id, r.title.toLowerCase(), ...skillKws, ...toolKws]
          });
        }
      });
    }
  }

  // =========================================================================
  // 3. SEARCH INTERFACE: REMOVED (Improvement 9)
  // Kept as clean no-ops for test & script compatibility
  // =========================================================================
  function ensureSearchModalExists() {}
  function openSearch() {}
  function closeSearch() {}
  function handleSearchKeydown() {}
  function updateActiveSearchItem() {}
  function navigateToItem() {}
  function renderSearchResults() {}

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 4. GLOBAL EVENT LISTENERS & DROPDOWNS
  // =========================================================================
  function initAcademyGlobalListeners() {
    // Global delegated theme toggle buttons wiring
    document.addEventListener('click', (e) => {
      const normalTarget = e.target.closest('#theme-toggle-normal, .theme-toggle-normal, #toggle-normal, [data-theme="normal"]');
      if (normalTarget) {
        e.preventDefault();
        applyTheme('normal', true);
        return;
      }
      const hackerTarget = e.target.closest('#theme-toggle-hacker, .theme-toggle-hacker, #toggle-hacker, [data-theme="hacker"]');
      if (hackerTarget) {
        e.preventDefault();
        applyTheme('hacker', true);
        return;
      }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn') || document.getElementById('mobile-drawer-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer') || document.getElementById('mobile-menu-drawer') || document.getElementById('academy-mobile-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileDrawer.classList.toggle('open');
        if (mobileDrawer.classList.contains('hidden')) {
          mobileDrawer.classList.remove('hidden');
        }
      });

      // Close mobile drawer on link click
      mobileDrawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Accessible Dropdown Click Toggles (for desktop navigation)
    document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('button');
      if (toggle) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = dropdown.classList.contains('open');
          // Close others
          document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => d.classList.remove('open'));
          if (!isOpen) {
            dropdown.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Close open dropdowns on outside click or Esc
    document.addEventListener('click', function () {
      document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => {
        d.classList.remove('open');
        const b = d.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => {
          d.classList.remove('open');
          const b = d.querySelector('button');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (mobileDrawer) mobileDrawer.classList.remove('open');
      }
    });
  }

  // =========================================================================
  function initAll() {
    initAcademyGlobalListeners();
    syncThemeButtons(getStoredTheme());
    syncHeaderStats();
    syncHeaderAuth();
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

  function syncHeaderStats() {
    if (typeof window === 'undefined' || typeof window.AcademyState === 'undefined') return;
    const streakEls = document.querySelectorAll('#header-streak-pill, .header-streak-pill');
    const xpEls = document.querySelectorAll('#header-xp-pill, .header-xp-pill');
    const streak = window.AcademyState.getStreak ? window.AcademyState.getStreak() : 1;
    const xp = window.AcademyState.calculateTotalXP ? window.AcademyState.calculateTotalXP() : 0;
    streakEls.forEach(el => { el.textContent = `${streak}d`; });
    xpEls.forEach(el => { el.textContent = `${xp.toLocaleString()} XP`; });
  }

  function syncHeaderAuth() {
    let authSlots = document.querySelectorAll('#academy-auth-slot, .academy-auth-slot');
    
    if (authSlots.length === 0) {
      const themeToggle = document.querySelector('#theme-toggle-normal, .theme-toggle-normal');
      if (themeToggle && themeToggle.parentElement) {
        const parent = themeToggle.parentElement.parentElement;
        if (parent) {
          const slot = document.createElement('div');
          slot.id = 'academy-auth-slot';
          slot.className = 'academy-auth-slot';
          parent.insertBefore(slot, themeToggle.parentElement);
          authSlots = [slot];
        }
      }
    }

    const auth = window.AcademyAuth;
    const isAuthed = auth && typeof auth.isAuthenticated === 'function' && auth.isAuthenticated();
    const user = isAuthed ? auth.getUser() : null;
    const profile = isAuthed ? auth.getProfile() : null;

    authSlots.forEach(slot => {
      if (isAuthed && (profile || user)) {
        const displayName = (profile && (profile.display_name || profile.username)) || (user && user.email ? user.email.split('@')[0] : 'Learner');
        const initial = displayName.charAt(0).toUpperCase();

        slot.innerHTML = `
          <div class="relative group">
            <button type="button" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-on-surface font-mono text-xs transition-all">
              <span class="w-5 h-5 rounded-full bg-primary text-white font-bold flex items-center justify-center text-[10px]">${escapeHtml(initial)}</span>
              <span class="font-bold text-primary max-w-[100px] truncate hidden sm:inline">${escapeHtml(displayName)}</span>
              <span class="material-symbols-outlined text-xs text-outline">expand_more</span>
            </button>
            <div class="absolute right-0 top-full pt-1 hidden group-hover:block z-50">
              <div class="w-48 p-2 rounded-xl border border-border-hairline bg-surface-subtle shadow-xl space-y-1 font-mono text-xs">
                <a href="profile.html" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-raised text-on-surface transition-colors font-bold">
                  <span class="material-symbols-outlined text-sm text-primary">person</span>
                  <span>My Profile</span>
                </a>
                <a href="learning.html" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-raised text-on-surface transition-colors">
                  <span class="material-symbols-outlined text-sm text-secondary">route</span>
                  <span>Academy Home</span>
                </a>
                <button type="button" class="header-logout-btn w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger transition-colors">
                  <span class="material-symbols-outlined text-sm">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        `;

        slot.querySelectorAll('.header-logout-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (auth && typeof auth.signOut === 'function') {
              await auth.signOut();
              window.location.reload();
            }
          });
        });
      } else {
        slot.innerHTML = `
          <a href="auth.html" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-bold font-mono text-xs transition-all" title="Sign In or Enlist">
            <span class="material-symbols-outlined text-xs">login</span>
            <span class="hidden sm:inline">Sign In</span>
          </a>
        `;
      }
    });
  }

  // Expose global API
  window.CalionAcademy = window.EndlessusAcademy = {
    setTheme: applyTheme,
    getTheme: getStoredTheme,
    openSearch: openSearch,
    closeSearch: closeSearch,
    searchIndex: ACADEMY_SEARCH_INDEX
  };

})();
