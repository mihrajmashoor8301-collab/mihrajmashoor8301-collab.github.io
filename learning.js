/**
 * Endlessus Learning Hub - Client Engine
 * 
 * Features:
 * 1. Dual-Theme Manager: Normal View (light, educational) vs Hacker View (dark, terminal HUD)
 * 2. Onboarding Self-Assessment Level Picker & Dynamic Stage Recommender
 * 3. Search & Multi-Criteria Curriculum Filtering
 * 4. LocalStorage-Persisted Progress Tracking (Completion & Answers)
 * 5. Interactive 12-Section Room Player Modal with Live Terminal Simulators,
 *    Instant Validation Quizzes, and Sequential 5-Stage Hint Unlocking.
 * 6. Deep Linking to Practical Security Labs (labs.html)
 */

(function () {
  'use strict';

  // State Management
  const STATE = {
    theme: localStorage.getItem('endlessus_learning_theme') || 'normal',
    completedRooms: JSON.parse(localStorage.getItem('endlessus_completed_rooms') || '[]'),
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
    renderCurriculum();
    renderPracticalLabs();
    updateProgressUI();
    initUrlHashRouting();
  });

  function initElements() {
    elements = {
      body: document.body,
      themeToggleNormal: document.getElementById('toggle-normal'),
      themeToggleHacker: document.getElementById('toggle-hacker'),
      curriculumContainer: document.getElementById('curriculum-stages'),
      practicalLabsContainer: document.getElementById('practical-labs-grid'),
      searchInput: document.getElementById('search-input'),
      stageFilters: document.getElementById('stage-filters'),
      difficultyFilters: document.getElementById('difficulty-filters'),
      progressText: document.getElementById('progress-text'),
      progressBar: document.getElementById('progress-bar-fill'),
      modalBackdrop: document.getElementById('room-modal'),
      modalCloseBtn: document.getElementById('modal-close-btn'),
      modalTitle: document.getElementById('modal-room-title'),
      modalBadge: document.getElementById('modal-room-badge'),
      modalTime: document.getElementById('modal-room-time'),
      modalContent: document.getElementById('modal-content-area'),
      modalToc: document.getElementById('modal-toc-nav'),
      recTitle: document.getElementById('rec-stage-title'),
      recDesc: document.getElementById('rec-stage-desc'),
      recBtn: document.getElementById('rec-start-btn')
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
      if (e.key === 'Escape' && elements.modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // 1. THEME ENGINE: NORMAL VIEW VS HACKER VIEW
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
      badge: "🟢 Stage 0 — Start Here",
      title: "Cybersecurity Foundations",
      desc: "Designed specifically for absolute beginners. Zero previous knowledge required.",
      targetAnchor: "stage-0"
    },
    computers: {
      stageId: 2,
      badge: "🔵 Stage 2 — Networking Fundamentals",
      title: "How Computers Communicate",
      desc: "Skip hardware basics and jump straight into networks, IP addresses, ports, and packets.",
      targetAnchor: "stage-2"
    },
    networking: {
      stageId: 3,
      badge: "🔵 Stage 3 — How the Web Works",
      title: "Web Architecture & Security Principles",
      desc: "Master HTTP requests, session cookies, and the mental model of the CIA triad.",
      targetAnchor: "stage-3"
    },
    cybersec: {
      stageId: 6,
      badge: "🟣 Stage 6 — Web Security",
      title: "Hands-on Exploitation & Pentesting",
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
          elements.recBtn.textContent = `Start ${rec.badge.split('—')[0].trim()}`;
          elements.recBtn.onclick = () => {
            const targetEl = document.getElementById(rec.targetAnchor);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          };
        }
      });
    });

    // Default button trigger
    if (elements.recBtn) {
      elements.recBtn.onclick = () => {
        const targetEl = document.getElementById('stage-0');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // =========================================================================
  // 3. SEARCH & FILTERS
  // =========================================================================
  function initFilters() {
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value.toLowerCase().trim();
        renderCurriculum();
      });
    }

    if (elements.stageFilters) {
      elements.stageFilters.querySelectorAll('.lh-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          elements.stageFilters.querySelectorAll('.lh-filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          STATE.activeFilterStage = pill.getAttribute('data-stage');
          renderCurriculum();
        });
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
        if (confirm("Are you sure you want to reset your curriculum room progress? Your saved completions will be cleared.")) {
          STATE.completedRooms = [];
          localStorage.removeItem('endlessus_completed_rooms');
          renderCurriculum();
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
        stageRooms = stageRooms.filter(r => r.difficulty.toLowerCase() === STATE.activeFilterDiff.toLowerCase());
      }

      if (stageRooms.length === 0) return;
      visibleRoomsCount += stageRooms.length;

      // Count completed in stage
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
          <span class="material-symbols-outlined" style="font-size: 3rem; margin-bottom: 0.5rem;">search_off</span>
          <h3>No rooms match your search criteria</h3>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try clearing your search query or selecting "All Stages".</p>
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

  function renderRoomCard(room) {
    const isCompleted = STATE.completedRooms.includes(room.id);
    const diffClass = `lh-diff-${room.difficulty.toLowerCase()}`;

    return `
      <div class="lh-room-card ${isCompleted ? 'completed' : ''}" data-room-id="${room.id}">
        <div>
          <div class="lh-room-top">
            <span class="lh-room-id">${room.id.toUpperCase()}</span>
            <span class="lh-room-difficulty ${diffClass}">${room.difficultyBadge}</span>
          </div>

          ${room.prerequisites && room.prerequisites !== "None (Zero prior knowledge required)" ? `
            <div class="lh-prereq-badge">
              <span class="material-symbols-outlined" style="font-size: 13px;">info</span>
              <span>Prereq: ${escapeHtml(room.prerequisites)}</span>
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
            <span>${isCompleted ? 'Review Room' : 'Start Room'}</span>
            <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. PRACTICAL LABS SPOTLIGHT RENDERING
  // =========================================================================
  function renderPracticalLabs() {
    if (!elements.practicalLabsContainer || typeof ENDLESSUS_PRACTICAL_LABS === 'undefined') return;

    elements.practicalLabsContainer.innerHTML = ENDLESSUS_PRACTICAL_LABS.map(lab => {
      return `
        <div class="lh-lab-card">
          <div>
            <span class="lh-lab-badge">${lab.category} • ${lab.difficultyBadge}</span>
            <h4 class="lh-lab-name">${escapeHtml(lab.title)}</h4>
            <p class="lh-lab-desc">${escapeHtml(lab.description)}</p>
          </div>
          <a href="labs.html?lab=${lab.id}" class="lh-lab-btn" target="_blank">
            <span class="material-symbols-outlined" style="font-size: 15px;">terminal</span>
            <span>Launch Practical Lab</span>
          </a>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 6. PROGRESS BAR & STATS
  // =========================================================================
  function updateProgressUI() {
    const total = ENDLESSUS_ROOMS.length;
    const completed = STATE.completedRooms.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (elements.progressText) {
      elements.progressText.textContent = `${completed}/${total} Rooms Completed (${percentage}%)`;
    }
    if (elements.progressBar) {
      elements.progressBar.style.width = `${percentage}%`;
    }
  }

  // =========================================================================
  // 7. ROOM MODAL PLAYER (12-PART TEMPLATE)
  // =========================================================================
  function openRoom(roomId) {
    const room = ENDLESSUS_ROOM_MAP[roomId];
    if (!room) return;

    STATE.currentRoom = room;
    if (!STATE.unlockedHints[roomId]) {
      STATE.unlockedHints[roomId] = 0; // Show Hint 1 initially
    }

    if (elements.modalTitle) elements.modalTitle.textContent = room.title;
    if (elements.modalBadge) {
      elements.modalBadge.textContent = room.difficultyBadge;
      elements.modalBadge.className = `lh-room-difficulty lh-diff-${room.difficulty.toLowerCase()}`;
    }
    if (elements.modalTime) elements.modalTime.textContent = `⏱ ${room.estimatedTime}`;

    renderRoomTOC(room);
    renderRoomContent(room);

    elements.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Update URL hash
    window.location.hash = room.id;
  }

  function closeModal() {
    elements.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    STATE.currentRoom = null;
    history.replaceState(null, null, ' ');
  }

  function renderRoomTOC(room) {
    if (!elements.modalToc) return;

    const sections = [
      { id: "sec-why", label: "1. Why are you here?" },
      { id: "sec-learn", label: "2. What you'll learn" },
      { id: "sec-vocab", label: "3. New vocabulary" },
      { id: "sec-lessons", label: "4. Lessons" },
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

      <!-- 7. Questions (Flags do not dominate!) -->
      <section class="lh-section-block" id="sec-questions">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">07</span>
          <span>Knowledge Questions</span>
        </h3>
        <p style="font-size: 0.85rem; color: var(--lh-text-muted); margin-bottom: 1rem;">
          Test your understanding. Flags are not required; answer each conceptual and scenario question:
        </p>
        <div class="lh-quiz-container">
          ${room.questions.map((q, idx) => `
            <div class="lh-quiz-card" data-q-id="${q.id}">
              <div class="lh-quiz-question">Question ${idx + 1}: ${escapeHtml(q.question)}</div>
              <div class="lh-quiz-options">
                ${q.options.map((opt, oIdx) => `
                  <button class="lh-quiz-option" data-option-index="${oIdx}">
                    <span style="font-family: var(--lh-font-mono); font-size: 0.75rem; width: 20px; height: 20px; display:inline-flex; align-items:center; justify-content:center; border: 1px solid var(--lh-surface-border); border-radius: 4px;">${String.fromCharCode(65 + oIdx)}</span>
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
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem;">${escapeHtml(t.title)}</h4>
            <p style="font-size: 0.85rem; color: var(--lh-text);">${escapeHtml(t.instruction)}</p>
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
          Never get stuck. Unlock progressive hints one by one without spoiling the answer:
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
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--lh-text);">
            ${escapeHtml(room.explainResult)}
          </p>
        </div>
      </section>

      <!-- 11. Security Connection -->
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
          <p style="font-size: 0.88rem; line-height: 1.6; color: var(--lh-text);">
            ${escapeHtml(room.securityConnection)}
          </p>
        </div>

        ${room.practicalRoomLink ? `
          <div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--lh-surface-hover); border: 2px dashed var(--lh-secondary); border-radius: var(--lh-radius-md); text-align: center;">
            <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.4rem; color: var(--lh-text);">${escapeHtml(room.practicalRoomLink.label)}</div>
            <a href="${room.practicalRoomLink.url}" target="_blank" class="lh-lab-btn" style="display:inline-flex; font-size: 0.85rem; padding: 0.6rem 1.4rem;">
              <span class="material-symbols-outlined" style="font-size: 16px;">bolt</span>
              <span>${escapeHtml(room.practicalRoomLink.buttonText)}</span>
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
            Verify your progress to log completion and continue along the curriculum roadmap.
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

      // Check if command roughly matches expected
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
  // ROOM COMPLETION & PERSISTENCE
  // =========================================================================
  function markRoomComplete(roomId) {
    if (!STATE.completedRooms.includes(roomId)) {
      STATE.completedRooms.push(roomId);
      localStorage.setItem('endlessus_completed_rooms', JSON.stringify(STATE.completedRooms));
      renderCurriculum();
      updateProgressUI();
    }
  }

  // =========================================================================
  // UTILITIES & ROUTING
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
    // Bold
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Inline Code
    escaped = escaped.replace(/`([^`]+)`/g, '<code style="font-family:var(--lh-font-mono); background:var(--lh-surface-subtle); padding:2px 5px; border-radius:4px; font-size:0.85em; border:1px solid var(--lh-surface-border);">$1</code>');
    // Code blocks
    escaped = escaped.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<div class="lh-code-box"><pre>$2</pre></div>');
    return escaped;
  }

})();
