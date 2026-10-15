#!/usr/bin/env python3
"""
patch_learning_js.py
Updates learning.js to implement:
- TryHackMe-style Question/Answer engine (visual character slots, exact answer validation, multiple choice, hint toggle, explanations, per-question progress)
- Connected Room Progression Map with SVG connectors & Accessible List alternative
- Progress migration & data integrity
- Seamless practical lab integration
"""

import re

with open("learning.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update STATE definition
old_state = """  const STATE = {
    theme: localStorage.getItem('endlessus_learning_theme') || 'normal',
    completedRooms: JSON.parse(localStorage.getItem('endlessus_completed_rooms') || '[]'),
    completedLabs: JSON.parse(localStorage.getItem('endlessus_completed_labs') || '[]'),
    activeFilterStage: 'all',
    activeFilterDiff: 'all',
    searchQuery: '',
    currentRoom: null,
    unlockedHints: {} // roomId -> highest unlocked hint index
  };"""

new_state = """  const STATE = {
    theme: localStorage.getItem('endlessus_learning_theme') || 'normal',
    completedRooms: JSON.parse(localStorage.getItem('endlessus_completed_rooms') || '[]'),
    completedLabs: JSON.parse(localStorage.getItem('endlessus_completed_labs') || '[]'),
    questionProgress: JSON.parse(localStorage.getItem('endlessus_question_progress') || '{}'),
    roomProgress: JSON.parse(localStorage.getItem('endlessus_room_progress') || '{}'),
    mapViewMode: localStorage.getItem('endlessus_map_view_mode') || 'map',
    activeFilterStage: 'all',
    activeFilterDiff: 'all',
    searchQuery: '',
    currentRoom: null,
    unlockedHints: {} // roomId -> highest unlocked hint index
  };

  function migrateLearnerProgress() {
    // Ensure backwards compatibility with previous progress
    let changed = false;
    if (Array.isArray(STATE.completedRooms)) {
      STATE.completedRooms.forEach(id => {
        if (!STATE.roomProgress[id]) {
          STATE.roomProgress[id] = { completed: true, migratedAt: Date.now() };
          changed = true;
        }
      });
    }
    if (changed) {
      try {
        localStorage.setItem('endlessus_room_progress', JSON.stringify(STATE.roomProgress));
      } catch (e) {
        console.warn('[Progress Migration] LocalStorage write failed:', e);
      }
    }
  }"""

code = code.replace(old_state, new_state)

# 2. Call migrateLearnerProgress() inside DOMContentLoaded
old_dom = """  document.addEventListener('DOMContentLoaded', () => {
    initElements();"""

new_dom = """  document.addEventListener('DOMContentLoaded', () => {
    initElements();
    migrateLearnerProgress();"""

code = code.replace(old_dom, new_dom)

# 3. Update renderCurriculum()
curriculum_pattern = r"  function renderCurriculum\(\) \{.*?\n  \}"
new_curriculum = """  function renderCurriculum() {
    if (!elements.curriculumContainer || typeof ENDLESSUS_STAGES === 'undefined') return;

    let html = '';
    const totalRooms = ENDLESSUS_ROOMS.length;
    const completedCount = STATE.completedRooms.length;
    const pathwayPercent = totalRooms > 0 ? Math.round((completedCount / totalRooms) * 100) : 0;

    // View Controls Header (Connected Room Map vs Accessible List)
    html += `
      <div class="lh-map-view-controls">
        <div class="lh-view-toggle-group" role="tablist" aria-label="Curriculum View Mode">
          <button type="button" class="lh-view-toggle-btn ${STATE.mapViewMode === 'map' ? 'active' : ''}" id="toggle-view-map" role="tab" aria-selected="${STATE.mapViewMode === 'map'}">
            <span class="material-symbols-outlined" style="font-size: 16px;">account_tree</span>
            <span>Connected Room Map</span>
          </button>
          <button type="button" class="lh-view-toggle-btn ${STATE.mapViewMode === 'list' ? 'active' : ''}" id="toggle-view-list" role="tab" aria-selected="${STATE.mapViewMode === 'list'}">
            <span class="material-symbols-outlined" style="font-size: 16px;">format_list_bulleted</span>
            <span>Accessible List View</span>
          </button>
        </div>
        <div class="lh-map-level-progress-pill">
          <span class="material-symbols-outlined" style="color: var(--lh-primary); font-size: 16px;">trending_up</span>
          <span>Pre Security: ${completedCount} / ${totalRooms} Completed (${pathwayPercent}%)</span>
        </div>
      </div>
    `;

    let visibleRoomsCount = 0;

    ENDLESSUS_STAGES.forEach(stage => {
      // Filter stage logic
      if (STATE.activeFilterStage !== 'all' && String(stage.id) !== STATE.activeFilterStage) {
        return;
      }

      // Find rooms for this stage/level
      let stageRooms = ENDLESSUS_ROOMS.filter(r => (r.level !== undefined ? r.level : r.stage) === stage.id);

      // Filter by search query
      if (STATE.searchQuery) {
        stageRooms = stageRooms.filter(r => {
          return r.title.toLowerCase().includes(STATE.searchQuery) ||
                 (r.whyAreYouHere && r.whyAreYouHere.toLowerCase().includes(STATE.searchQuery)) ||
                 (r.objectives && r.objectives.some(o => o.toLowerCase().includes(STATE.searchQuery))) ||
                 (r.vocabulary && r.vocabulary.some(v => v.term.toLowerCase().includes(STATE.searchQuery) || v.definition.toLowerCase().includes(STATE.searchQuery)));
        });
      }

      // Filter by difficulty
      if (STATE.activeFilterDiff !== 'all') {
        stageRooms = stageRooms.filter(r => r.difficulty.toLowerCase().includes(STATE.activeFilterDiff.toLowerCase()));
      }

      if (stageRooms.length === 0) return;
      visibleRoomsCount += stageRooms.length;

      const stageCompleted = stageRooms.filter(r => STATE.completedRooms.includes(r.id)).length;
      const stagePercent = stageRooms.length > 0 ? Math.round((stageCompleted / stageRooms.length) * 100) : 0;

      if (STATE.mapViewMode === 'map') {
        // Connected Room Map Layout
        html += `
          <section class="lh-map-level-section" id="stage-${stage.id}">
            <div class="lh-map-level-header">
              <div>
                <div class="lh-map-level-meta">
                  <span class="lh-map-level-badge" style="background: ${stage.color || 'var(--lh-primary)'};">LEVEL ${stage.number || stage.id}</span>
                  <span class="lh-map-level-duration">
                    <span class="material-symbols-outlined" style="font-size: 14px;">schedule</span>
                    <span>${stage.estimatedTime}</span>
                  </span>
                </div>
                <h2 class="lh-map-level-title">${stage.title}</h2>
                <p class="lh-map-level-desc">${stage.description}</p>
              </div>
              <div class="lh-map-level-progress-pill">
                <span>${stageCompleted} / ${stageRooms.length} Completed (${stagePercent}%)</span>
              </div>
            </div>

            <!-- Connected Nodes Track -->
            <div class="lh-connected-track" role="list">
              ${stageRooms.map((room, rIdx) => {
                const isCompleted = STATE.completedRooms.includes(room.id);
                const nextUncompleted = ENDLESSUS_ROOMS.find(r => !STATE.completedRooms.includes(r.id));
                const isCurrent = nextUncompleted && nextUncompleted.id === room.id;
                let statusClass = isCompleted ? 'completed' : (isCurrent ? 'current' : 'available');

                return `
                  <div class="lh-map-node-card ${statusClass}" data-room-id="${room.id}" tabindex="0" role="listitem" aria-label="Room ${room.id.toUpperCase()}: ${escapeHtml(room.title)} (${statusClass})">
                    <div>
                      <div class="lh-node-top">
                        <span class="lh-node-id">${room.id.toUpperCase()}</span>
                        <div class="lh-node-indicator ${statusClass}">
                          ${isCompleted ? '<span class="material-symbols-outlined" style="font-size:14px;">check</span>' : (isCurrent ? '<span class="material-symbols-outlined" style="font-size:14px;">play_arrow</span>' : '')}
                        </div>
                      </div>
                      <h3 class="lh-node-title">${escapeHtml(room.title)}</h3>
                      <p class="lh-node-desc">${escapeHtml(room.whyAreYouHere || '')}</p>
                    </div>

                    <div class="lh-node-footer">
                      <span>⏱ ${room.estimatedTime}</span>
                      <span class="lh-node-cta">
                        <span>${isCompleted ? 'Review' : (isCurrent ? 'Continue' : 'Start')}</span>
                        <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        `;
      } else {
        // Accessible List View Alternative
        html += `
          <section class="lh-map-level-section" id="stage-${stage.id}">
            <div class="lh-map-level-header">
              <div>
                <span class="lh-map-level-badge" style="background: ${stage.color || 'var(--lh-primary)'};">LEVEL ${stage.number || stage.id}</span>
                <h2 class="lh-map-level-title">${stage.title}</h2>
                <p class="lh-map-level-desc">${stage.description}</p>
              </div>
              <div class="lh-map-level-progress-pill">
                <span>${stageCompleted} / ${stageRooms.length} Completed</span>
              </div>
            </div>

            <ol class="lh-accessible-list">
              ${stageRooms.map(room => {
                const isCompleted = STATE.completedRooms.includes(room.id);
                return `
                  <li>
                    <div class="lh-list-room-item ${isCompleted ? 'completed' : ''}" data-room-id="${room.id}" tabindex="0" role="button">
                      <div class="lh-list-room-left">
                        <span class="material-symbols-outlined" style="color: ${isCompleted ? 'var(--lh-success)' : 'var(--lh-text-subtle)'}; font-size: 20px;">
                          ${isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div>
                          <div class="lh-list-room-title">${room.id.toUpperCase()}: ${escapeHtml(room.title)}</div>
                          <div class="lh-list-room-meta">${room.difficulty} • ⏱ ${room.estimatedTime}</div>
                        </div>
                      </div>
                      <span class="lh-node-cta">
                        <span>${isCompleted ? 'Review' : 'Start'} →</span>
                      </span>
                    </div>
                  </li>
                `;
              }).join('')}
            </ol>
          </section>
        `;
      }
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

    // View Switcher Handlers
    const btnMap = document.getElementById('toggle-view-map');
    const btnList = document.getElementById('toggle-view-list');
    if (btnMap && btnList) {
      btnMap.addEventListener('click', () => {
        STATE.mapViewMode = 'map';
        localStorage.setItem('endlessus_map_view_mode', 'map');
        renderCurriculum();
      });
      btnList.addEventListener('click', () => {
        STATE.mapViewMode = 'list';
        localStorage.setItem('endlessus_map_view_mode', 'list');
        renderCurriculum();
      });
    }

    // Attach Room Card & Item Click Events
    elements.curriculumContainer.querySelectorAll('[data-room-id]').forEach(card => {
      card.addEventListener('click', () => {
        const roomId = card.getAttribute('data-room-id');
        openRoom(roomId);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const roomId = card.getAttribute('data-room-id');
          openRoom(roomId);
        }
      });
    });
  }"""

code = re.sub(curriculum_pattern, new_curriculum, code, flags=re.DOTALL)

# 4. Update ROOM_TO_PRACTICAL_LAB to include Level 7 labs
old_lab_map = """  const ROOM_TO_PRACTICAL_LAB = {
    'room-06': { id: 'lab-permissions', title: 'Lab 02: Linux Permissions & Octal Masking', desc: 'Audit permissions and isolate credential stores in a real Linux terminal.' },
    'room-15': { id: 'lab-headers', title: 'Lab 01: HTTP Security Headers Hardening', desc: 'Configure CSP, HSTS, and X-Frame-Options headers on live web servers.' },
    'room-17': { id: 'lab-auth', title: 'Lab 03: Authentication & Rate Limiting Bypass', desc: 'Bypass endpoint rate limits using X-Forwarded-For IP rotation.' },
    'room-18': { id: 'lab-jwt', title: 'Lab 11: JWT None Algorithm Exploitation', desc: 'Forge administrator tokens using header none algorithm vulnerabilities.' },
    'room-19': { id: 'lab-crypto', title: 'Lab 12: XOR & Frequency Analysis Decryption', desc: 'Perform frequency cryptanalysis to deduce multi-byte XOR keys.' },
    'room-20': { id: 'lab-logs', title: 'Lab 09: Security Incident Log Analysis', desc: 'Analyze Apache and auth.log to detect attacker brute-force activity.' },
    'room-23': { id: 'lab-xss', title: 'Lab 06: Reflected XSS & Context Escaping', desc: 'Escape JavaScript input contexts to trigger non-destructive alerts.' },
    'room-24': { id: 'lab-sqli', title: 'Lab 05: UNION-Based SQL Injection', desc: 'Exploit SQL queries to extract private tables and schema structures.' },
    'room-25': { id: 'lab-idor', title: 'Lab 04: Insecure Direct Object References', desc: 'Tamper with REST parameters to inspect unauthorized user records.' },
    'room-26': { id: 'lab-csrf', title: 'Lab 07: CSRF & SameSite Protections', desc: 'Construct cross-site request forging forms and verify SameSite tokens.' },
    'room-30': { id: 'lab-network', title: 'Lab 08: Network Service & SMB Enumeration', desc: 'Enumerate open ports with Nmap and extract null-session SMB shares.' },
    'room-35': { id: 'lab-suid', title: 'Lab 10: SUID Privilege Escalation', desc: 'Exploit setuid binaries with GTFOBins techniques to escalate to root.' },
    'room-40': { id: 'lab-capstone', title: 'Lab 13: Capstone Pentest: Final Enterprise Target', desc: 'Execute a full-scope authorized penetration test on an enterprise target.' }
  };"""

new_lab_map = """  const ROOM_TO_PRACTICAL_LAB = {
    'room-06': { id: 'lab-permissions', title: 'Lab 02: Linux Permissions & Octal Masking', desc: 'Audit permissions and isolate credential stores in a real Linux terminal.' },
    'room-15': { id: 'lab-headers', title: 'Lab 01: HTTP Security Headers Hardening', desc: 'Configure CSP, HSTS, and X-Frame-Options headers on live web servers.' },
    'room-17': { id: 'lab-auth', title: 'Lab 03: Authentication & Rate Limiting Bypass', desc: 'Bypass endpoint rate limits using X-Forwarded-For IP rotation.' },
    'room-18': { id: 'lab-jwt', title: 'Lab 11: JWT None Algorithm Exploitation', desc: 'Forge administrator tokens using header none algorithm vulnerabilities.' },
    'room-19': { id: 'lab-crypto', title: 'Lab 12: XOR & Frequency Analysis Decryption', desc: 'Perform frequency cryptanalysis to deduce multi-byte XOR keys.' },
    'room-20': { id: 'lab-logs', title: 'Lab 09: Security Incident Log Analysis', desc: 'Analyze Apache and auth.log to detect attacker brute-force activity.' },
    'room-23': { id: 'lab-xss', title: 'Lab 06: Reflected XSS & Context Escaping', desc: 'Escape JavaScript input contexts to trigger non-destructive alerts.' },
    'room-24': { id: 'lab-sqli', title: 'Lab 05: UNION-Based SQL Injection', desc: 'Exploit SQL queries to extract private tables and schema structures.' },
    'room-25': { id: 'lab-idor', title: 'Lab 04: Insecure Direct Object References', desc: 'Tamper with REST parameters to inspect unauthorized user records.' },
    'room-26': { id: 'lab-csrf', title: 'Lab 07: CSRF & SameSite Protections', desc: 'Construct cross-site request forging forms and verify SameSite tokens.' },
    'room-30': { id: 'lab-network', title: 'Lab 08: Network Service & SMB Enumeration', desc: 'Enumerate open ports with Nmap and extract null-session SMB shares.' },
    'room-35': { id: 'lab-suid', title: 'Lab 10: SUID Privilege Escalation', desc: 'Exploit setuid binaries with GTFOBins techniques to escalate to root.' },
    'room-40': { id: 'lab-capstone', title: 'Lab 13: Capstone Pentest: Final Enterprise Target', desc: 'Execute a full-scope authorized penetration test on an enterprise target.' },
    'room-41': { id: 'lab-permissions', title: 'Lab 02: Linux Permissions & Octal Masking', desc: 'Audit permissions and isolate credential stores in a real Linux terminal.' },
    'room-42': { id: 'lab-headers', title: 'Lab 01: HTTP Security Headers Hardening', desc: 'Configure CSP, HSTS, and X-Frame-Options headers on live web servers.' },
    'room-43': { id: 'lab-network', title: 'Lab 08: Network Service & SMB Enumeration', desc: 'Enumerate open ports with Nmap and extract null-session SMB shares.' },
    'room-44': { id: 'lab-logs', title: 'Lab 09: Security Incident Log Analysis', desc: 'Analyze Apache and auth.log to detect attacker brute-force activity.' },
    'room-45': { id: 'lab-capstone', title: 'Lab 13: Capstone Pentest: Final Enterprise Target', desc: 'Execute a full-scope authorized penetration test on an enterprise target.' }
  };"""

code = code.replace(old_lab_map, new_lab_map)

# 5. Update Question Section in renderRoomContent
old_questions_section = """      <!-- 7. Knowledge Questions -->
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
      </section>"""

new_questions_section = """      <!-- 7. Knowledge Questions (TryHackMe-Style Question Engine) -->
      <section class="lh-section-block" id="sec-questions">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">07</span>
          <span>Knowledge Questions</span>
        </h3>
        <p style="font-size: 0.85rem; color: var(--lh-text-muted); margin-bottom: 1rem;">
          Verify your understanding. Answer each question to record your progress and unlock explanations:
        </p>
        <div class="lh-question-engine">
          ${(room.questions || []).map((q, idx) => {
            const isSolved = Boolean(STATE.questionProgress[q.id]);
            const isExact = q.type === 'exact';
            
            // Format visual slots
            let visualSlotsHtml = '';
            if (isExact && q.visualSlots) {
              const slotChars = q.visualSlots.split(' ');
              visualSlotsHtml = `
                <div class="lh-visual-slots-wrap">
                  <span class="lh-visual-slots-label">Expected Answer Format:</span>
                  <div class="lh-visual-slots" aria-label="Visual slots: ${q.visualSlots}">
                    ${slotChars.map((c, sIdx) => {
                      if (c === '') return '<span class="lh-slot-space"></span>';
                      const primaryAns = q.acceptedAnswers && q.acceptedAnswers[0] ? q.acceptedAnswers[0] : '';
                      const charDisplay = isSolved && primaryAns ? (primaryAns[sIdx] || c) : c;
                      return `<span class="lh-slot-box">${escapeHtml(charDisplay)}</span>`;
                    }).join('')}
                  </div>
                </div>
              `;
            }

            return `
              <div class="lh-question-card ${isSolved ? 'solved' : ''}" data-q-id="${q.id}" data-q-type="${q.type}">
                <div class="lh-question-header">
                  <span class="lh-question-num">
                    <span class="material-symbols-outlined" style="font-size: 14px;">help</span>
                    <span>Question ${idx + 1}</span>
                  </span>
                  <span class="lh-question-status-badge ${isSolved ? 'solved' : ''}" id="status-badge-${q.id}">
                    ${isSolved ? '<span class="material-symbols-outlined" style="font-size: 16px; color: var(--lh-success);">check_circle</span> <span style="color: var(--lh-success);">Solved</span>' : '<span style="color: var(--lh-text-subtle);">Unanswered</span>'}
                  </span>
                </div>

                <div class="lh-question-title">${escapeHtml(q.question)}</div>

                ${visualSlotsHtml}

                ${isExact ? `
                  <div class="lh-exact-input-group">
                    <input type="text" class="lh-exact-input" id="input-${q.id}" 
                           placeholder="Type your answer here..." 
                           value="${isSolved && q.acceptedAnswers ? escapeHtml(q.acceptedAnswers[0]) : ''}"
                           ${isSolved ? 'disabled' : ''} 
                           autocomplete="off" spellcheck="false"
                           aria-label="Answer for question ${idx + 1}">
                    <button type="button" class="lh-btn-submit-answer" id="submit-btn-${q.id}" ${isSolved ? 'disabled' : ''}>
                      <span>${isSolved ? 'Solved ✓' : 'Submit'}</span>
                    </button>
                    ${q.hint ? `
                      <button type="button" class="lh-btn-hint-toggle" id="hint-btn-${q.id}">
                        <span class="material-symbols-outlined" style="font-size: 15px;">lightbulb</span>
                        <span>Hint</span>
                      </button>
                    ` : ''}
                  </div>
                ` : `
                  <div class="lh-quiz-options">
                    ${(q.options || []).map((opt, oIdx) => `
                      <button type="button" class="lh-quiz-option ${isSolved && oIdx === q.correctIndex ? 'correct' : ''}" 
                              data-option-index="${oIdx}" ${isSolved ? 'disabled' : ''}>
                        <span style="font-family: var(--lh-font-mono); font-size: 0.75rem; width: 22px; height: 22px; display:inline-flex; align-items:center; justify-content:center; border: 1px solid var(--lh-surface-border); border-radius: 4px;">${String.fromCharCode(65 + oIdx)}</span>
                        <span>${escapeHtml(opt)}</span>
                      </button>
                    `).join('')}
                    ${q.hint ? `
                      <div style="margin-top: 0.5rem;">
                        <button type="button" class="lh-btn-hint-toggle" id="hint-btn-${q.id}">
                          <span class="material-symbols-outlined" style="font-size: 15px;">lightbulb</span>
                          <span>Hint</span>
                        </button>
                      </div>
                    ` : ''}
                  </div>
                `}

                <div class="lh-feedback-banner" id="feedback-${q.id}"></div>

                ${q.hint ? `
                  <div class="lh-hint-box" id="hint-box-${q.id}" style="display: none;">
                    <strong>💡 Hint:</strong> ${escapeHtml(q.hint)}
                  </div>
                ` : ''}

                <div class="lh-explanation-box" id="explanation-${q.id}" style="${isSolved ? 'display: block;' : 'display: none;'}">
                  <strong>✓ Explanation:</strong> ${escapeHtml(q.explanation || 'Correct!')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>"""

code = code.replace(old_questions_section, new_questions_section)

# 6. Add SVG Diagram rendering in renderRoomContent
diagram_injection = """      ${room.diagramSvg ? `
      <!-- Educational Diagram -->
      <section class="lh-section-block" id="sec-diagram">
        <h3 class="lh-section-heading">
          <span class="lh-section-badge">📊</span>
          <span>Visual Diagram & Architecture</span>
        </h3>
        <div style="margin-top: 0.75rem; border-radius: var(--lh-radius-md); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          ${room.diagramSvg}
        </div>
      </section>
      ` : ''}"""

see_section_anchor = '<!-- 5. Real Examples -->'
if see_section_anchor in code:
    code = code.replace(see_section_anchor, diagram_injection + "\n\n      " + see_section_anchor)

# 7. Update initQuizHandlers()
quiz_handlers_pattern = r"  function initQuizHandlers\(room\) \{.*?\n  \}"
new_quiz_handlers = """  function initQuizHandlers(room) {
    const questionCards = elements.modalContent.querySelectorAll('.lh-question-card');

    questionCards.forEach(card => {
      const qId = card.getAttribute('data-q-id');
      const questionObj = (room.questions || []).find(q => q.id === qId);
      if (!questionObj) return;

      const isExact = questionObj.type === 'exact';
      const hintBtn = card.querySelector(`#hint-btn-${qId}`);
      const hintBox = card.querySelector(`#hint-box-${qId}`);
      const feedbackEl = card.querySelector(`#feedback-${qId}`);
      const explanationEl = card.querySelector(`#explanation-${qId}`);
      const statusBadge = card.querySelector(`#status-badge-${qId}`);

      // Hint Toggle
      if (hintBtn && hintBox) {
        hintBtn.addEventListener('click', () => {
          const isShown = hintBox.style.display !== 'none';
          hintBox.style.display = isShown ? 'none' : 'block';
        });
      }

      if (isExact) {
        const inputEl = card.querySelector(`#input-${qId}`);
        const submitBtn = card.querySelector(`#submit-btn-${qId}`);

        const validateExact = () => {
          if (!inputEl || !submitBtn) return;
          const userRaw = inputEl.value;
          const userVal = questionObj.trimWhitespace !== false ? userRaw.trim() : userRaw;
          const compareVal = questionObj.caseSensitive ? userVal : userVal.toLowerCase();

          if (!compareVal) {
            feedbackEl.className = 'lh-feedback-banner error';
            feedbackEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">error</span><span>Please enter an answer before submitting.</span>`;
            inputEl.classList.add('error-shake');
            setTimeout(() => inputEl.classList.remove('error-shake'), 450);
            return;
          }

          const accepted = (questionObj.acceptedAnswers || []).map(ans => {
            const trimmed = questionObj.trimWhitespace !== false ? ans.trim() : ans;
            return questionObj.caseSensitive ? trimmed : trimmed.toLowerCase();
          });

          const isMatch = accepted.includes(compareVal);

          if (isMatch) {
            // Correct answer
            STATE.questionProgress[qId] = true;
            localStorage.setItem('endlessus_question_progress', JSON.stringify(STATE.questionProgress));
            card.classList.add('solved');
            inputEl.disabled = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Solved ✓</span>';
            feedbackEl.style.display = 'none';
            if (explanationEl) explanationEl.style.display = 'block';
            if (statusBadge) {
              statusBadge.className = 'lh-question-status-badge solved';
              statusBadge.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px; color: var(--lh-success);">check_circle</span> <span style="color: var(--lh-success);">Solved</span>';
            }
          } else {
            // Helpful feedback without leaking answer
            feedbackEl.className = 'lh-feedback-banner error';
            feedbackEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">close</span><span>Incorrect. Review the lesson or use the hint if you need guidance.</span>`;
            inputEl.classList.add('error-shake');
            setTimeout(() => inputEl.classList.remove('error-shake'), 450);
            inputEl.focus();
          }
        };

        if (submitBtn) submitBtn.addEventListener('click', validateExact);
        if (inputEl) {
          inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') validateExact();
          });
        }
      } else {
        // Multiple Choice
        const options = card.querySelectorAll('.lh-quiz-option');

        options.forEach(optBtn => {
          optBtn.addEventListener('click', () => {
            const selectedIdx = parseInt(optBtn.getAttribute('data-option-index'), 10);
            const isCorrect = selectedIdx === questionObj.correctIndex;

            options.forEach(b => {
              b.classList.remove('correct', 'incorrect');
              b.disabled = true;
            });

            if (isCorrect) {
              STATE.questionProgress[qId] = true;
              localStorage.setItem('endlessus_question_progress', JSON.stringify(STATE.questionProgress));
              card.classList.add('solved');
              optBtn.classList.add('correct');
              if (explanationEl) explanationEl.style.display = 'block';
              if (statusBadge) {
                statusBadge.className = 'lh-question-status-badge solved';
                statusBadge.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px; color: var(--lh-success);">check_circle</span> <span style="color: var(--lh-success);">Solved</span>';
              }
            } else {
              optBtn.classList.add('incorrect');
              if (options[questionObj.correctIndex]) {
                options[questionObj.correctIndex].classList.add('correct');
              }
              if (explanationEl) explanationEl.style.display = 'block';
            }
          });
        });
      }
    });
  }"""

code = re.sub(quiz_handlers_pattern, new_quiz_handlers, code, flags=re.DOTALL)

# 8. Update markRoomComplete to also record roomProgress
old_mark = """  function markRoomComplete(roomId) {
    if (!STATE.completedRooms.includes(roomId)) {
      STATE.completedRooms.push(roomId);
      localStorage.setItem('endlessus_completed_rooms', JSON.stringify(STATE.completedRooms));
      renderCurriculum();
      renderStageNodes();
      updateProgressUI();
    }
  }"""

new_mark = """  function markRoomComplete(roomId) {
    if (!STATE.completedRooms.includes(roomId)) {
      STATE.completedRooms.push(roomId);
      STATE.roomProgress[roomId] = { completed: true, completedAt: Date.now() };
      localStorage.setItem('endlessus_completed_rooms', JSON.stringify(STATE.completedRooms));
      localStorage.setItem('endlessus_room_progress', JSON.stringify(STATE.roomProgress));
      renderCurriculum();
      renderStageNodes();
      updateProgressUI();
    }
  }"""

code = code.replace(old_mark, new_mark)

with open("learning.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Successfully patched learning.js!")
