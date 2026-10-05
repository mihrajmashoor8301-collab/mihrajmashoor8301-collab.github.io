/**
 * Endlessus Learning Hub - Client Engine
 * 
 * Features:
 * 1. Dual-Theme Manager: Normal View (light, educational) vs Hacker View (dark, terminal HUD)
 * 2. Onboarding Self-Assessment Level Picker & Dynamic Stage Recommender
 * 3. Stage Pathway Tracker & Interactive Stepper (Desktop & Mobile)
 * 4. Universal Search across Rooms, Stages, Vocabulary, Tools, and Practical Labs
 * 5. LocalStorage-Persisted Progress Tracking (Completed Rooms & Practiced Labs)
 * 6. Interactive 12-Section Room Player Modal with Live Terminal Simulator,
 *    Instant Validation Quizzes, Sequential 5-Stage Hints, and Mobile Section Stepper.
 * 7. Contextual Deep Linking to Practical Security Labs (labs.html)
 */

(function () {
  'use strict';

  // State Management
  const STATE = {
    theme: localStorage.getItem('endlessus_learning_theme') || 'normal',
    completedRooms: JSON.parse(localStorage.getItem('endlessus_completed_rooms') || '[]'),
    completedLabs: JSON.parse(localStorage.getItem('endlessus_completed_labs') || '[]'),
    activeFilterStage: 'all',
    activeFilterDiff: 'all',
    searchQuery: '',
    currentRoom: null,
    unlockedHints: {} // roomId -> highest unlocked hint index
  };

  // DOM Elements cache
  let elements = {};

  document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initTheme();
    initAssessment();
    initFilters();
    initStagePathway();
    initUniversalSearch();
    initMobileNav();
    renderCurriculum();
    updateProgressUI();
    initUrlHashRouting();
  });

  function initElements() {
    elements = {
      body: document.body,
      themeToggleNormal: document.getElementById('toggle-normal'),
      themeToggleHacker: document.getElementById('toggle-hacker'),
      curriculumContainer: document.getElementById('curriculum-stages'),
      searchInput: document.getElementById('search-input'),
      difficultyFilters: document.getElementById('difficulty-filters'),
      progressText: document.getElementById('progress-text'),
      progressBar: document.getElementById('progress-bar-fill'),
      miniProgressText: document.getElementById('mini-progress-text'),
      activeBreadcrumb: document.getElementById('lh-active-breadcrumb'),
      modalBackdrop: document.getElementById('room-modal'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      modalTitle: document.getElementById('modal-room-title'),
      modalBadge: document.getElementById('modal-room-badge'),
      modalTime: document.getElementById('modal-room-time'),
      modalContent: document.getElementById('modal-content-area'),
      modalToc: document.getElementById('modal-toc-nav'),
      modalMobileSelect: document.getElementById('modal-mobile-section-select'),
      recTitle: document.getElementById('rec-stage-title'),
      recDesc: document.getElementById('rec-stage-desc'),
      recBtn: document.getElementById('rec-start-btn'),
      heroStartRoomBtn: document.getElementById('hero-start-room-btn'),
      stageTrackNodes: document.getElementById('stage-track-nodes'),
      prevStageBtn: document.getElementById('prev-stage-btn'),
      nextStageBtn: document.getElementById('next-stage-btn'),
      mobileStageLabel: document.getElementById('mobile-stage-label'),
      mobileDrawerToggle: document.getElementById('mobile-drawer-toggle'),
      mobileDrawer: document.getElementById('mobile-drawer'),
      openSearchBtn: document.getElementById('open-search-btn'),
      searchModal: document.getElementById('universal-search-modal'),
      searchModalClose: document.getElementById('search-modal-close'),
      universalSearchInput: document.getElementById('universal-search-input'),
      universalSearchResults: document.getElementById('universal-search-results')
    };

    // Global Modal Close Events
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeModal);
    }
    if (elements.modalBackdrop) {
      elements.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.modalBackdrop) closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (elements.modalBackdrop && elements.modalBackdrop.classList.contains('open')) {
          closeModal();
        }
        if (elements.searchModal && elements.searchModal.classList.contains('open')) {
          closeSearchModal();
        }
      }
    });

    // Hero Start Room Direct CTA
    if (elements.heroStartRoomBtn) {
      elements.heroStartRoomBtn.addEventListener('click', () => {
        openRoom('room-01');
      });
    }
  }

  // =========================================================================
  // 1. THEME ENGINE: NORMAL VIEW (LIGHT) VS HACKER VIEW (DARK TERMINAL HUD)
  // =========================================================================
  function initTheme() {
    setTheme(STATE.theme, false);

    if (elements.themeToggleNormal) {
      elements.themeToggleNormal.addEventListener('click', () => setTheme('normal', true));
    }
    if (elements.themeToggleHacker) {
      elements.themeToggleHacker.addEventListener('click', () => setTheme('hacker', true));
    }
  }

  function setTheme(newTheme, persist = true) {
    STATE.theme = newTheme;
    if (persist) {
      localStorage.setItem('endlessus_learning_theme', newTheme);
    }

    elements.body.classList.remove('theme-normal', 'theme-hacker');
    elements.body.classList.add(`theme-${newTheme}`);

    if (newTheme === 'hacker') {
      document.documentElement.classList.add('dark', 'theme-hacker');
      document.documentElement.classList.remove('theme-normal');
    } else {
      document.documentElement.classList.remove('dark', 'theme-hacker');
      document.documentElement.classList.add('theme-normal');
    }

    if (elements.themeToggleNormal && elements.themeToggleHacker) {
      elements.themeToggleNormal.classList.toggle('active', newTheme === 'normal');
      elements.themeToggleHacker.classList.toggle('active', newTheme === 'hacker');
    }
  }

  // =========================================================================
  // 2. ONBOARDING ASSESSMENT LEVEL PICKER
  // =========================================================================
  const ASSESSMENT_MAP = {
    newbie: {
      stageId: 0,
      badge: "Stage 0: Start Here",
      title: "Stage 0: Start Here (Foundations)",
      desc: "Designed specifically for absolute beginners. Zero previous networking or Linux knowledge required.",
      targetAnchor: "stage-0"
    },
    computers: {
      stageId: 2,
      badge: "Stage 2: Networking",
      title: "Stage 2: Networking Fundamentals",
      desc: "Skip hardware basics and jump straight into networks, IP addresses, ports, and TCP packets.",
      targetAnchor: "stage-2"
    },
    networking: {
      stageId: 3,
      badge: "Stage 3: Web Fundamentals",
      title: "Stage 3: Web Architecture & HTTP",
      desc: "Master HTTP requests, session cookies, browser security headers, and the CIA triad.",
      targetAnchor: "stage-3"
    },
    cybersec: {
      stageId: 6,
      badge: "Stage 6: Web Security",
      title: "Stage 6: Web Security & Pentesting",
      desc: "Dive directly into SQL injection, XSS, IDOR, privilege escalation, and capstone labs.",
      targetAnchor: "stage-6"
    }
  };

  function initAssessment() {
    const levelBtns = document.querySelectorAll('.lh-level-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        levelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const levelKey = btn.getAttribute('data-level');
        const rec = ASSESSMENT_MAP[levelKey] || ASSESSMENT_MAP.newbie;

        if (elements.recTitle) elements.recTitle.textContent = rec.title;
        if (elements.recDesc) elements.recDesc.textContent = rec.desc;
        if (elements.recBtn) {
          elements.recBtn.innerHTML = `<span>Start ${rec.badge}</span><span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>`;
          elements.recBtn.onclick = () => {
            setStageFilter(String(rec.stageId));
            const targetEl = document.getElementById(rec.targetAnchor);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          };
        }
      });
    });

    if (elements.recBtn) {
      elements.recBtn.onclick = () => {
        setStageFilter('0');
        const targetEl = document.getElementById('stage-0');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // =========================================================================
  // 3. STAGE PATHWAY TRACKER & FILTERS
  // =========================================================================
  function initStagePathway() {
    if (!elements.stageTrackNodes || typeof ENDLESSUS_STAGES === 'undefined') return;

    renderStageNodes();

    // Mobile Stepper Buttons
    if (elements.prevStageBtn && elements.nextStageBtn) {
      elements.prevStageBtn.addEventListener('click', () => {
        cycleStageFilter(-1);
      });
      elements.nextStageBtn.addEventListener('click', () => {
        cycleStageFilter(1);
      });
    }
  }

  function renderStageNodes() {
    if (!elements.stageTrackNodes || typeof ENDLESSUS_STAGES === 'undefined') return;

    let html = `
      <button type="button" class="lh-stage-node ${STATE.activeFilterStage === 'all' ? 'active' : ''}" data-stage-id="all">
        <span class="material-symbols-outlined" style="font-size: 14px;">apps</span>
        <span>All Stages</span>
      </button>
    `;

    ENDLESSUS_STAGES.forEach(stage => {
      const stageRooms = ENDLESSUS_ROOMS.filter(r => r.stage === stage.id);
      const completedInStage = stageRooms.filter(r => STATE.completedRooms.includes(r.id)).length;
      const isComplete = stageRooms.length > 0 && completedInStage === stageRooms.length;
      const isActive = STATE.activeFilterStage === String(stage.id);

      html += `
        <button type="button" class="lh-stage-node ${isActive ? 'active' : ''} ${isComplete ? 'completed' : ''}" data-stage-id="${stage.id}" title="${escapeHtml(stage.title)}">
          <span class="lh-stage-node-num">S${stage.number}</span>
          <span>${stage.title.split(':')[1] ? stage.title.split(':')[1].trim() : stage.title}</span>
          ${isComplete ? '<span class="material-symbols-outlined" style="font-size: 13px;">check_circle</span>' : `<span style="font-size: 10px; opacity: 0.7;">(${completedInStage}/${stageRooms.length})</span>`}
        </button>
      `;
    });

    elements.stageTrackNodes.innerHTML = html;

    elements.stageTrackNodes.querySelectorAll('.lh-stage-node').forEach(node => {
      node.addEventListener('click', () => {
        const stageId = node.getAttribute('data-stage-id');
        setStageFilter(stageId);
      });
    });
  }

  function setStageFilter(stageId) {
    STATE.activeFilterStage = stageId;
    renderStageNodes();
    renderCurriculum();

    // Update Mobile Label
    if (elements.mobileStageLabel) {
      if (stageId === 'all') {
        elements.mobileStageLabel.textContent = 'All Stages (0–10)';
      } else {
        const stageObj = ENDLESSUS_STAGES.find(s => String(s.id) === stageId);
        elements.mobileStageLabel.textContent = stageObj ? `Stage ${stageObj.number}: ${stageObj.title.split(':')[1]?.trim() || stageObj.title}` : `Stage ${stageId}`;
      }
    }

    // Update Breadcrumb
    updateBreadcrumb();
  }

  function cycleStageFilter(delta) {
    const stageIds = ['all', ...ENDLESSUS_STAGES.map(s => String(s.id))];
    let currentIndex = stageIds.indexOf(STATE.activeFilterStage);
    if (currentIndex === -1) currentIndex = 0;

    let newIndex = currentIndex + delta;
    if (newIndex < 0) newIndex = stageIds.length - 1;
    if (newIndex >= stageIds.length) newIndex = 0;

    setStageFilter(stageIds[newIndex]);
  }

  function initFilters() {
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value.toLowerCase().trim();
        renderCurriculum();
      });
    }

    if (elements.difficultyFilters) {
      elements.difficultyFilters.querySelectorAll('.lh-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          elements.difficultyFilters.querySelectorAll('.lh-filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.activeFilterDiff = pill.getAttribute('data-diff');
          renderCurriculum();
        });
      });
    }

    // Reset Progress Button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Reset curriculum room completion history? Your stored progress will be reset to zero.")) {
          STATE.completedRooms = [];
          localStorage.removeItem('endlessus_completed_rooms');
          renderCurriculum();
          renderStageNodes();
          updateProgressUI();
        }
      });
    }
  }

  // =========================================================================
  // 4. CURRICULUM RENDERING
  // =========================================================================
  function renderCurriculum() {
    if (!elements.curriculumContainer || typeof ENDLESSUS_STAGES === 'undefined') return;

    let html = '';
    let visibleRoomsCount = 0;

    ENDLESSUS_STAGES.forEach(stage => {
      // Filter stage logic
      if (STATE.activeFilterStage !== 'all' && String(stage.id) !== STATE.activeFilterStage) {
        return;
      }

      // Find rooms for this stage
      let stageRooms = ENDLESSUS_ROOMS.filter(r => r.stage === stage.id);

      // Filter by search query
      if (STATE.searchQuery) {
        stageRooms = stageRooms.filter(r => {
          return r.title.toLowerCase().includes(STATE.searchQuery) ||
                 r.whyAreYouHere.toLowerCase().includes(STATE.searchQuery) ||
                 r.objectives.some(o => o.toLowerCase().includes(STATE.searchQuery)) ||
                 r.vocabulary.some(v => v.term.toLowerCase().includes(STATE.searchQuery) || v.definition.toLowerCase().includes(STATE.searchQuery));
        });
      }

      // Filter by difficulty
      if (STATE.activeFilterDiff !== 'all') {
        stageRooms = stageRooms.filter(r => r.difficulty.toLowerCase().includes(STATE.activeFilterDiff.toLowerCase()));
      }

      if (stageRooms.length === 0) return;
      visibleRoomsCount += stageRooms.length;

      const stageCompleted = stageRooms.filter(r => STATE.completedRooms.includes(r.id)).length;

      html += `
        <section class="lh-stage-section" id="stage-${stage.id}">
          <div class="lh-stage-header">
            <div class="lh-stage-header-left">
              <span class="lh-stage-number">STAGE ${stage.number}</span>
              <div class="lh-stage-title-wrap">
                <h2 class="lh-stage-title">${stage.title}</h2>
                <p class="lh-stage-desc">${stage.description}</p>
              </div>
            </div>
            <div class="lh-stage-meta">
              <span>${stageCompleted}/${stageRooms.length} Completed</span>
              <span>•</span>
              <span>⏱ ${stage.estimatedTime}</span>
            </div>
          </div>

          <div class="lh-room-grid">
            ${stageRooms.map(room => renderRoomCard(room)).join('')}
          </div>
        </section>
      `;
    });

    if (visibleRoomsCount === 0) {
      html = `
        <div style="text-align:center; padding: 4rem 1rem; color: var(--lh-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 3rem; margin-bottom: 0.5rem; color: var(--lh-text-subtle);">search_off</span>
          <h3 style="color: var(--lh-text);">No rooms match your filter criteria</h3>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try clearing your search query or selecting "All Stages".</p>
          <button type="button" class="lh-toggle-btn normal-btn" style="margin-top: 1rem; display:inline-flex;" onclick="window.resetCurriculumFilters()">
            <span>Reset Filters</span>
          </button>
        </div>
      `;
    }

    elements.curriculumContainer.innerHTML = html;

    // Attach Room Card Click Events
    elements.curriculumContainer.querySelectorAll('.lh-room-card').forEach(card => {
      card.addEventListener('click', () => {
        const roomId = card.getAttribute('data-room-id');
        openRoom(roomId);
      });
    });
  }

  window.resetCurriculumFilters = function () {
    STATE.searchQuery = '';
    STATE.activeFilterDiff = 'all';
    STATE.activeFilterStage = 'all';
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.difficultyFilters) {
      elements.difficultyFilters.querySelectorAll('.lh-filter-pill').forEach(p => p.classList.remove('active'));
      elements.difficultyFilters.querySelector('[data-diff="all"]')?.classList.add('active');
    }
    renderStageNodes();
    renderCurriculum();
  };

  function renderRoomCard(room) {
    const isCompleted = STATE.completedRooms.includes(room.id);
    const diffClass = `lh-diff-${room.difficulty.toLowerCase().replace(/\s+/g, '-')}`;

    return `
      <div class="lh-room-card ${isCompleted ? 'completed' : ''}" data-room-id="${room.id}" tabindex="0" role="button" aria-label="Open Room ${room.id.toUpperCase()}: ${escapeHtml(room.title)}">
        <div>
          <div class="lh-room-top">
            <span class="lh-room-id">${room.id.toUpperCase()}</span>
            <span class="lh-room-difficulty ${diffClass}">${room.difficultyBadge}</span>
          </div>

          ${isCompleted ? `
            <div style="display:inline-flex; align-items:center; gap:0.3rem; font-size:0.72rem; color:var(--lh-success); font-weight:700; margin-bottom:0.4rem;">
              <span class="material-symbols-outlined" style="font-size:14px;">check_circle</span>
              <span>COMPLETED</span>
            </div>
          ` : ''}

          <h3 class="lh-room-title">${escapeHtml(room.title)}</h3>
          <p class="lh-room-desc">${escapeHtml(room.whyAreYouHere)}</p>
        </div>

        <div class="lh-room-footer">
          <div class="lh-room-time">
            <span class="material-symbols-outlined" style="font-size: 14px;">schedule</span>
            <span>${room.estimatedTime}</span>
          </div>
          <button class="lh-room-btn">
            <span>${isCompleted ? 'Review' : 'Start'}</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. PROGRESS BAR & UNIFIED STATS
  // =========================================================================
  function updateProgressUI() {
    const totalRooms = ENDLESSUS_ROOMS.length;
    const completedRoomsCount = STATE.completedRooms.length;
    const percentage = totalRooms > 0 ? Math.round((completedRoomsCount / totalRooms) * 100) : 0;

    // Check labs progress
    const totalLabs = typeof ENDLESSUS_PRACTICAL_LABS !== 'undefined' ? ENDLESSUS_PRACTICAL_LABS.length : 12;
    const completedLabsCount = STATE.completedLabs.length;

    if (elements.progressText) {
      elements.progressText.textContent = `Learning: ${completedRoomsCount}/${totalRooms} Rooms (${percentage}%) · Practice: ${completedLabsCount}/${totalLabs} Labs`;
    }
    if (elements.progressBar) {
      elements.progressBar.style.width = `${percentage}%`;
    }
    if (elements.miniProgressText) {
      elements.miniProgressText.textContent = `Learn: ${completedRoomsCount}/${totalRooms} · Labs: ${completedLabsCount}/${totalLabs}`;
    }
  }

  // =========================================================================
  // 6. ROOM MODAL PLAYER (12-PART STRICT TEMPLATE)
  // =========================================================================
  function openRoom(roomId) {
    const room = ENDLESSUS_ROOM_MAP[roomId];
    if (!room) return;

    STATE.currentRoom = room;
    if (!STATE.unlockedHints[roomId]) {
      STATE.unlockedHints[roomId] = 0; // Hint 1 visible
    }

    if (elements.modalTitle) elements.modalTitle.textContent = `${room.id.toUpperCase()}: ${room.title}`;
    if (elements.modalBadge) {
      elements.modalBadge.textContent = room.difficultyBadge;
      elements.modalBadge.className = `lh-room-difficulty lh-diff-${room.difficulty.toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (elements.modalTime) elements.modalTime.textContent = `⏱ ${room.estimatedTime}`;

    renderRoomTOC(room);
    renderRoomContent(room);

    elements.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Update Contextual Breadcrumb
    updateBreadcrumb(room);

    // Update URL hash
    window.location.hash = room.id;
  }

  function closeModal() {
    elements.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    STATE.currentRoom = null;
    history.replaceState(null, null, ' ');
    updateBreadcrumb();
  }

  function updateBreadcrumb(activeRoom = null) {
    if (!elements.activeBreadcrumb) return;

    if (activeRoom) {
      elements.activeBreadcrumb.innerHTML = `Learn / <a href="#stage-${activeRoom.stage}" style="color:inherit; text-decoration:underline;">Stage ${activeRoom.stage}</a> / <span style="color:var(--lh-primary); font-weight:700;">${activeRoom.id.toUpperCase()}: ${escapeHtml(activeRoom.title)}</span>`;
    } else if (STATE.activeFilterStage !== 'all') {
      const stageObj = ENDLESSUS_STAGES.find(s => String(s.id) === STATE.activeFilterStage);
      const stageName = stageObj ? `Stage ${stageObj.number}: ${stageObj.title.split(':')[1]?.trim() || stageObj.title}` : `Stage ${STATE.activeFilterStage}`;
      elements.activeBreadcrumb.textContent = `Learn / ${stageName}`;
    } else {
      elements.activeBreadcrumb.textContent = `Learn / Full Curriculum`;
    }
  }

  function renderRoomTOC(room) {
    if (!elements.modalToc) return;

    const sections = [
      { id: "sec-why", label: "1. Why are you here?" },
      { id: "sec-learn", label: "2. What you'll learn" },
      { id: "sec-vocab", label: "3. New vocabulary" },
      { id: "sec-lessons", label: "4. Core Concepts" },
      { id: "sec-see", label: "5. Real Examples" },
      { id: "sec-try", label: "6. Interactive Exercise" },
      { id: "sec-questions", label: "7. Knowledge Questions" },
      { id: "sec-task", label: "8. Practical Task" },
      { id: "sec-hints", label: "9. Progressive Hints" },
      { id: "sec-explain", label: "10. Result Explanation" },
      { id: "sec-security", label: "11. Security Connection" },
      { id: "sec-complete", label: "12. Room Completion" }
    ];

    elements.modalToc.innerHTML = sections.map(s => `
      <a href="#${s.id}" class="lh-toc-item" data-target="${s.id}">
        <span>${s.label}</span>
      </a>
    `).join('');

    // Smooth scroll within modal
    elements.modalToc.querySelectorAll('.lh-toc-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl && elements.modalContent) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          elements.modalToc.querySelectorAll('.lh-toc-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });
    });

    // Mobile Section Select
    if (elements.modalMobileSelect) {
      elements.modalMobileSelect.onchange = (e) => {
        const targetId = e.target.value;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
    }
  }

  function renderRoomContent(room) {
    if (!elements.modalContent) return;

    const isCompleted = STATE.completedRooms.includes(room.id);

    let html = `
      <!-- 1. Why are you here? -->
      <section class="lh-section-block" id="sec-why">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">01</span>
          <span>Why are you here?</span>
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.7; color: var(--lh-text);">
          ${escapeHtml(room.whyAreYouHere)}
        </p>
      </section>

      <!-- 2. What you'll learn -->
      <section class="lh-section-block" id="sec-learn">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">02</span>
          <span>What you'll learn</span>
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${room.objectives.map(obj => `
            <li style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem;">
              <span class="material-symbols-outlined" style="color: var(--lh-primary); font-size: 1.1rem; margin-top: 2px;">check_circle</span>
              <span>${escapeHtml(obj)}</span>
            </li>
          `).join('')}
        </ul>
      </section>

      <!-- 3. New vocabulary -->
      <section class="lh-section-block" id="sec-vocab">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">03</span>
          <span>New vocabulary</span>
        </h3>
        <div class="lh-vocab-grid">
          ${room.vocabulary.map(v => `
            <div class="lh-vocab-card">
              <div class="lh-vocab-term">${escapeHtml(v.term)}</div>
              <div class="lh-vocab-def">${escapeHtml(v.definition)}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 4. Lessons -->
      <section class="lh-section-block" id="sec-lessons">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">04</span>
          <span>Core Concepts</span>
        </h3>
        ${room.lessons.map(lesson => `
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--lh-text);">${escapeHtml(lesson.title)}</h4>
            <div style="font-size: 0.9rem; line-height: 1.7; color: var(--lh-text); white-space: pre-line;">${formatMarkdown(lesson.content)}</div>
          </div>
        `).join('')}
      </section>

      <!-- 5. Real Examples -->
      <section class="lh-section-block" id="sec-see">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">05</span>
          <span>See it in Action</span>
        </h3>
        ${room.seeExamples.map(example => `
          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem;">${escapeHtml(example.title)}</h4>
            <div class="lh-code-box"><pre>${escapeHtml(example.codeOrDiagram)}</pre></div>
            <p style="font-size: 0.82rem; color: var(--lh-text-muted);">${escapeHtml(example.explanation)}</p>
          </div>
        `).join('')}
      </section>

      <!-- 6. Interactive Try Widget -->
      <section class="lh-section-block" id="sec-try">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">06</span>
          <span>Try: Interactive Exercise</span>
        </h3>
        <div class="lh-sandbox-widget">
          <div class="lh-sandbox-header">
            <div class="lh-sandbox-dots">
              <span class="lh-sandbox-dot red"></span>
              <span class="lh-sandbox-dot yellow"></span>
              <span class="lh-sandbox-dot green"></span>
            </div>
            <span>cadet@endlessus-sandbox:~</span>
          </div>
          <div class="lh-sandbox-body">
            <p class="lh-sandbox-prompt">${escapeHtml(room.tryInteractive.prompt)}</p>
            <div class="lh-terminal-line">
              <span class="lh-terminal-prompt-sym">cadet@endlessus:~$</span>
              <input type="text" class="lh-terminal-input" id="terminal-input" placeholder="Type command here..." autocomplete="off" spellcheck="false">
              <button class="lh-terminal-btn" id="terminal-run-btn">Run Command</button>
            </div>
            <div class="lh-terminal-output" id="terminal-output" style="display:none;"></div>
          </div>
        </div>
      </section>

      <!-- 7. Knowledge Questions (Flags do not dominate!) -->
      <section class="lh-section-block" id="sec-questions">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">07</span>
          <span>Knowledge Questions</span>
        </h3>
        <p style="font-size: 0.85rem; color: var(--lh-text-muted); margin-bottom: 1rem;">
          Verify your conceptual understanding. Select the best answer for each question:
        </p>
        <div class="lh-quiz-container">
          ${room.questions.map((q, idx) => `
            <div class="lh-quiz-card" data-q-id="${q.id}">
              <div class="lh-quiz-question">Question ${idx + 1}: ${escapeHtml(q.question)}</div>
              <div class="lh-quiz-options">
                ${q.options.map((opt, oIdx) => `
                  <button class="lh-quiz-option" data-option-index="${oIdx}">
                    <span style="font-family: var(--lh-font-mono); font-size: 0.75rem; width: 22px; height: 22px; display:inline-flex; align-items:center; justify-content:center; border: 1px solid var(--lh-surface-border); border-radius: 4px;">${String.fromCharCode(65 + oIdx)}</span>
                    <span>${escapeHtml(opt)}</span>
                  </button>
                `).join('')}
              </div>
              <div class="lh-quiz-explanation" style="display: none;"></div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 8. Practical Task -->
      <section class="lh-section-block" id="sec-task">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">08</span>
          <span>Practical Task</span>
        </h3>
        ${room.tasks.map(t => `
          <div style="padding: 1.25rem; background: var(--lh-bg); border: 1px solid var(--lh-surface-border); border-radius: var(--lh-radius-md); margin-bottom: 1rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--lh-text);">${escapeHtml(t.title)}</h4>
            <p style="font-size: 0.88rem; color: var(--lh-text); line-height: 1.6;">${escapeHtml(t.instruction)}</p>
          </div>
        `).join('')}
      </section>

      <!-- 9. 5-Stage Progressive Hints System -->
      <section class="lh-section-block" id="sec-hints">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">09</span>
          <span>Progressive Hint System</span>
        </h3>
        <p style="font-size: 0.82rem; color: var(--lh-text-muted); margin-bottom: 1rem;">
          Never get stuck. Reveal sequential hints without spoiling the full answer:
        </p>
        <div class="lh-hints-accordion" id="hints-container">
          ${renderHints(room)}
        </div>
      </section>

      <!-- 10. Result Explanation -->
      <section class="lh-section-block" id="sec-explain">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">10</span>
          <span>Explain the Result</span>
        </h3>
        <div class="lh-callout-explain">
          <div class="lh-callout-title">
            <span class="material-symbols-outlined">psychology</span>
            <span>Why This Happened</span>
          </div>
          <p style="font-size: 0.88rem; line-height: 1.65; color: var(--lh-text);">
            ${escapeHtml(room.explainResult)}
          </p>
        </div>
      </section>

      <!-- 11. Security Connection & Bridge to Practical Labs -->
      <section class="lh-section-block" id="sec-security">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">11</span>
          <span>Security Connection</span>
        </h3>
        <div class="lh-callout-security">
          <div class="lh-callout-title">
            <span class="material-symbols-outlined">security</span>
            <span>Why This Matters in Cybersecurity</span>
          </div>
          <p style="font-size: 0.88rem; line-height: 1.65; color: var(--lh-text);">
            ${escapeHtml(room.securityConnection)}
          </p>
        </div>

        ${room.practicalRoomLink ? `
          <div style="margin-top: 1.75rem; padding: 1.5rem; background: var(--lh-surface-hover); border: 2px dashed var(--lh-secondary); border-radius: var(--lh-radius-md); text-align: center;">
            <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; color: var(--lh-text);">${escapeHtml(room.practicalRoomLink.label)}</div>
            <p style="font-size: 0.82rem; color: var(--lh-text-muted); margin-bottom: 1rem;">Put this skill to the test inside a dedicated practical target workstation with real tools.</p>
            <a href="${room.practicalRoomLink.url}" target="_blank" class="lh-btn-primary-practice" style="display:inline-flex; font-size: 0.88rem; padding: 0.75rem 1.6rem;">
              <span class="material-symbols-outlined" style="font-size: 18px;">terminal</span>
              <span>${escapeHtml(room.practicalRoomLink.buttonText)} &rarr;</span>
            </a>
          </div>
        ` : ''}
      </section>

      <!-- 12. Room Completion -->
      <section class="lh-section-block" id="sec-complete">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">12</span>
          <span>Continue</span>
        </h3>
        <div class="lh-completion-summary">
          <div class="lh-completion-icon">
            <span class="material-symbols-outlined">${isCompleted ? 'verified' : 'military_tech'}</span>
          </div>
          <h3 class="lh-completion-title">${isCompleted ? '✓ Room Completed' : 'Complete Room'}</h3>
          <p style="font-size: 0.88rem; color: var(--lh-text-muted);">
            Log your completion to unlock the next room along your learning pathway.
          </p>

          <div class="lh-completion-lists">
            <div>
              <div class="lh-completion-list-title">
                <span class="material-symbols-outlined" style="font-size: 16px; color: var(--lh-primary);">menu_book</span>
                <span>You now understand:</span>
              </div>
              <ul class="lh-completion-list">
                ${room.completion.learned.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
            <div>
              <div class="lh-completion-list-title">
                <span class="material-symbols-outlined" style="font-size: 16px; color: var(--lh-secondary);">build</span>
                <span>You practiced:</span>
              </div>
              <ul class="lh-completion-list">
                ${room.completion.practiced.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <button class="lh-next-room-btn" id="complete-room-btn">
            <span>${isCompleted ? 'Next Recommended Room →' : 'Mark Complete & Continue →'}</span>
          </button>
        </div>
      </section>
    `;

    elements.modalContent.innerHTML = html;

    // Attach Interactive Terminal Sandbox
    initTerminalWidget(room);

    // Attach Quiz Handlers
    initQuizHandlers(room);

    // Attach Hint Unlocking
    initHintHandlers(room);

    // Attach Completion Button
    const completeBtn = document.getElementById('complete-room-btn');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        markRoomComplete(room.id);
        if (room.nextRoomId && ENDLESSUS_ROOM_MAP[room.nextRoomId]) {
          openRoom(room.nextRoomId);
        } else {
          closeModal();
        }
      });
    }
  }

  // =========================================================================
  // INTERACTIVE LIVE TERMINAL SANDBOX
  // =========================================================================
  function initTerminalWidget(room) {
    const input = document.getElementById('terminal-input');
    const runBtn = document.getElementById('terminal-run-btn');
    const output = document.getElementById('terminal-output');

    if (!input || !runBtn || !output) return;

    const execute = () => {
      const val = input.value.trim();
      if (!val) return;

      output.style.display = 'block';

      const expected = room.tryInteractive.expectedCommand.trim().toLowerCase();
      const entered = val.toLowerCase();

      if (entered === expected || entered.startsWith(expected.split(' ')[0])) {
        output.innerHTML = `<span style="color: #4EDEA3;">cadet@endlessus:~$ ${escapeHtml(val)}</span>\n${escapeHtml(room.tryInteractive.simulatedOutput)}`;
      } else {
        output.innerHTML = `<span style="color: #F87171;">cadet@endlessus:~$ ${escapeHtml(val)}</span>\nCommand executed. Expected: \`${escapeHtml(room.tryInteractive.expectedCommand)}\`.\n${escapeHtml(room.tryInteractive.simulatedOutput)}`;
      }
    };

    runBtn.addEventListener('click', execute);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') execute();
    });
  }

  // =========================================================================
  // INTERACTIVE QUIZ & INSTANT VALIDATION
  // =========================================================================
  function initQuizHandlers(room) {
    const quizCards = elements.modalContent.querySelectorAll('.lh-quiz-card');

    quizCards.forEach(card => {
      const qId = card.getAttribute('data-q-id');
      const questionObj = room.questions.find(q => q.id === qId);
      if (!questionObj) return;

      const options = card.querySelectorAll('.lh-quiz-option');
      const explanationEl = card.querySelector('.lh-quiz-explanation');

      options.forEach(optBtn => {
        optBtn.addEventListener('click', () => {
          const selectedIdx = parseInt(optBtn.getAttribute('data-option-index'), 10);
          const isCorrect = selectedIdx === questionObj.correctIndex;

          options.forEach(b => {
            b.classList.remove('correct', 'incorrect');
            b.disabled = true;
          });

          if (isCorrect) {
            optBtn.classList.add('correct');
            explanationEl.style.display = 'block';
            explanationEl.innerHTML = `<strong>✓ Correct!</strong> ${escapeHtml(questionObj.explanation)}`;
            explanationEl.style.borderLeftColor = 'var(--lh-success)';
          } else {
            optBtn.classList.add('incorrect');
            options[questionObj.correctIndex].classList.add('correct');
            explanationEl.style.display = 'block';
            explanationEl.innerHTML = `<strong>✗ Incorrect.</strong> ${escapeHtml(questionObj.explanation)}`;
            explanationEl.style.borderLeftColor = 'var(--lh-danger)';
          }
        });
      });
    });
  }

  // =========================================================================
  // PROGRESSIVE 5-STAGE HINT ENGINE
  // =========================================================================
  function renderHints(room) {
    const hints = room.tasks[0]?.hints || [
      "Concept: Review the theoretical lesson above.",
      "Direction: Check the command line syntax.",
      "Tool: Use the standard Linux utility.",
      "Syntax: Consult manual options.",
      "Explanation: Verify expected input structure."
    ];

    const hintLabels = [
      "Hint 1 — Concept",
      "Hint 2 — Direction",
      "Hint 3 — Tool",
      "Hint 4 — Syntax",
      "Hint 5 — Explanation"
    ];

    return hints.map((h, idx) => {
      const isUnlocked = idx <= (STATE.unlockedHints[room.id] || 0);

      return `
        <div class="lh-hint-step" data-hint-idx="${idx}">
          <button class="lh-hint-trigger">
            <span style="display:flex; align-items:center; gap: 0.5rem;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: ${isUnlocked ? 'var(--lh-primary)' : 'var(--lh-text-subtle)'};">
                ${isUnlocked ? 'lightbulb' : 'lock'}
              </span>
              <span>${hintLabels[idx] || `Hint ${idx + 1}`}</span>
            </span>
            <span class="lh-hint-badge">${isUnlocked ? 'Revealed' : 'Click to Unlock'}</span>
          </button>
          <div class="lh-hint-content ${isUnlocked ? 'revealed' : ''}">
            ${escapeHtml(h)}
          </div>
        </div>
      `;
    }).join('');
  }

  function initHintHandlers(room) {
    const hintSteps = elements.modalContent.querySelectorAll('.lh-hint-step');

    hintSteps.forEach(step => {
      const trigger = step.querySelector('.lh-hint-trigger');
      const content = step.querySelector('.lh-hint-content');
      const idx = parseInt(step.getAttribute('data-hint-idx'), 10);

      trigger.addEventListener('click', () => {
        if (!content.classList.contains('revealed')) {
          content.classList.add('revealed');
          trigger.querySelector('.lh-hint-badge').textContent = 'Revealed';
          trigger.querySelector('.material-symbols-outlined').textContent = 'lightbulb';
          trigger.querySelector('.material-symbols-outlined').style.color = 'var(--lh-primary)';
          if (idx > (STATE.unlockedHints[room.id] || 0)) {
            STATE.unlockedHints[room.id] = idx;
          }
        } else {
          content.classList.toggle('revealed');
        }
      });
    });
  }

  // =========================================================================
  // 7. ROOM COMPLETION & PERSISTENCE
  // =========================================================================
  function markRoomComplete(roomId) {
    if (!STATE.completedRooms.includes(roomId)) {
      STATE.completedRooms.push(roomId);
      localStorage.setItem('endlessus_completed_rooms', JSON.stringify(STATE.completedRooms));
      renderCurriculum();
      renderStageNodes();
      updateProgressUI();
    }
  }

  // =========================================================================
  // 8. UNIVERSAL SEARCH (CMD+K / SEARCH MODAL)
  // =========================================================================
  function initUniversalSearch() {
    if (elements.openSearchBtn) {
      elements.openSearchBtn.addEventListener('click', openSearchModal);
    }
    if (elements.searchModalClose) {
      elements.searchModalClose.addEventListener('click', closeSearchModal);
    }
    if (elements.searchModal) {
      elements.searchModal.addEventListener('click', (e) => {
        if (e.target === elements.searchModal) closeSearchModal();
      });
    }

    // Keyboard shortcut Cmd+K or Ctrl+K or /
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
    });

    if (elements.universalSearchInput) {
      elements.universalSearchInput.addEventListener('input', (e) => {
        performUniversalSearch(e.target.value.trim().toLowerCase());
      });
    }
  }

  function openSearchModal() {
    if (!elements.searchModal) return;
    elements.searchModal.classList.add('open');
    if (elements.universalSearchInput) {
      elements.universalSearchInput.value = '';
      elements.universalSearchInput.focus();
    }
    performUniversalSearch('');
  }

  function closeSearchModal() {
    if (!elements.searchModal) return;
    elements.searchModal.classList.remove('open');
  }

  function performUniversalSearch(query) {
    if (!elements.universalSearchResults) return;

    if (!query) {
      // Show default recommendations / popular rooms
      const suggestions = ENDLESSUS_ROOMS.slice(0, 5);
      elements.universalSearchResults.innerHTML = `
        <div style="padding: 0.5rem 0.85rem; font-size: 0.72rem; color: var(--lh-text-subtle); text-transform: uppercase; font-family: var(--lh-font-mono);">Recommended Starting Rooms</div>
        ${suggestions.map(r => `
          <div class="lh-search-result-item" onclick="window.launchFromSearch('${r.id}')">
            <div>
              <div class="lh-search-result-title">
                <span class="material-symbols-outlined" style="font-size: 15px; color: var(--lh-primary);">school</span>
                <span>${r.id.toUpperCase()}: ${escapeHtml(r.title)}</span>
              </div>
              <div class="lh-search-result-subtitle">${escapeHtml(r.whyAreYouHere.substring(0, 75))}...</div>
            </div>
            <span class="lh-search-type-badge">Stage ${r.stage}</span>
          </div>
        `).join('')}
      `;
      return;
    }

    let results = [];

    // Search Rooms
    ENDLESSUS_ROOMS.forEach(r => {
      if (r.title.toLowerCase().includes(query) || r.whyAreYouHere.toLowerCase().includes(query)) {
        results.push({
          type: `Room · Stage ${r.stage}`,
          badgeClass: '',
          title: `${r.id.toUpperCase()}: ${r.title}`,
          sub: r.whyAreYouHere.substring(0, 80) + '...',
          action: () => { closeSearchModal(); openRoom(r.id); }
        });
      }
    });

    // Search Vocabulary
    ENDLESSUS_ROOMS.forEach(r => {
      r.vocabulary.forEach(v => {
        if (v.term.toLowerCase().includes(query) || v.definition.toLowerCase().includes(query)) {
          if (!results.some(res => res.title === v.term)) {
            results.push({
              type: `Concept · ${r.id.toUpperCase()}`,
              badgeClass: 'badge-vocab',
              title: v.term,
              sub: v.definition,
              action: () => { closeSearchModal(); openRoom(r.id); }
            });
          }
        }
      });
    });

    // Search Practical Labs
    if (typeof ENDLESSUS_PRACTICAL_LABS !== 'undefined') {
      ENDLESSUS_PRACTICAL_LABS.forEach(l => {
        if (l.title.toLowerCase().includes(query) || l.description.toLowerCase().includes(query) || l.category.toLowerCase().includes(query)) {
          results.push({
            type: 'Practical Lab',
            badgeClass: 'badge-lab',
            title: l.title,
            sub: l.description.substring(0, 80) + '...',
            action: () => { window.location.href = `labs.html?lab=${l.id}`; }
          });
        }
      });
    }

    if (results.length === 0) {
      elements.universalSearchResults.innerHTML = `
        <div style="text-align:center; padding: 2.5rem 1rem; color: var(--lh-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 2rem; color: var(--lh-text-subtle);">search_off</span>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">No matching rooms, tools, or concepts found for "<strong>${escapeHtml(query)}</strong>"</p>
        </div>
      `;
      return;
    }

    elements.universalSearchResults.innerHTML = results.slice(0, 8).map((res, i) => `
      <div class="lh-search-result-item" data-res-idx="${i}">
        <div>
          <div class="lh-search-result-title">
            <span>${escapeHtml(res.title)}</span>
          </div>
          <div class="lh-search-result-subtitle">${escapeHtml(res.sub)}</div>
        </div>
        <span class="lh-search-type-badge ${res.badgeClass}">${res.type}</span>
      </div>
    `).join('');

    elements.universalSearchResults.querySelectorAll('.lh-search-result-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        if (results[idx]) results[idx].action();
      });
    });
  }

  window.launchFromSearch = function(roomId) {
    closeSearchModal();
    openRoom(roomId);
  };

  // =========================================================================
  // 9. MOBILE NAVIGATION DRAWER
  // =========================================================================
  function initMobileNav() {
    if (!elements.mobileDrawerToggle || !elements.mobileDrawer) return;

    elements.mobileDrawerToggle.addEventListener('click', () => {
      elements.mobileDrawer.classList.toggle('open');
    });

    elements.mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        elements.mobileDrawer.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 10. URL HASH ROUTING & UTILITIES
  // =========================================================================
  function initUrlHashRouting() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && ENDLESSUS_ROOM_MAP[hash]) {
      openRoom(hash);
    }

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '').trim();
      if (newHash && ENDLESSUS_ROOM_MAP[newHash]) {
        openRoom(newHash);
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMarkdown(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/`([^`]+)`/g, '<code style="font-family:var(--lh-font-mono); background:var(--lh-surface-subtle); padding:2px 5px; border-radius:4px; font-size:0.85em; border:1px solid var(--lh-surface-border);">$1</code>');
    escaped = escaped.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<div class="lh-code-box"><pre>$2</pre></div>');
    return escaped;
  }

})();
