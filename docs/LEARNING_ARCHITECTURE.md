# Endlessus Academy — Multi-Page Learning Information Architecture

**Author:** Senior Full-Stack & Learning Experience Architect (Antigravity)  
**Date:** October 18, 2026  
**Status:** Canonical Design & Implementation Specification  

---

## 1. Vision & Architectural Objectives

The redesign of Endlessus Academy transforms an overloaded single-page application into an intuitive, modular, multi-page educational platform. The platform serves absolute beginners with zero technical prerequisites while maintaining rigorous technical depth for aspiring junior penetration testers.

### Core Architectural Principles:
1. **Progressive Disclosure:** Each page answers a single core question without overwhelming the learner with unrelated features.
2. **Stable Data Contracts:** All pages bind to the authoritative 45-room, 8-level curriculum dataset (`learning-data.js` / `pre-security-data.js`).
3. **Zero Data Loss:** Existing `localStorage` keys and user progress are 100% backward-compatible.
4. **Resilient Static Hosting:** Pure vanilla HTML5, CSS3, and JavaScript requiring zero external build step, zero backend servers, and offline-first asset loading.
5. **Universal Deep Linking:** Every module, room, and lesson is bookmarkable, shareable, and crawlable with strict URL parameter validation.

---

## 2. Multi-Page User Journey & Route Structure

```
[ Homepage: index.html ]
         │
         ▼
[ 1. Learning Dashboard: learning.html ]
     • What should I learn next?
     • Prominent "Continue Learning" CTA (opens next incomplete room)
     • High-level progress meters (Completed Rooms / 45, XP, Streak)
     • Recommended Next Module card
     • Quick links to Practical Labs & Reference
         │
         ├───► [ 2. Module Catalogue: modules.html ]
         │         • Browse all 8 curriculum levels
         │         • Search and difficulty filters
         │         • Level prerequisites and completion counters
         │
         └───► [ 3. Module Overview: module.html?id=level-X ]
                   • Deep dive into syllabus for a specific level
                   • Learning outcomes & prerequisites
                   • Room cards with status (Not Started, In Progress, Completed)
                           │
                           ▼
                 [ 4. Room Overview: room.html?id=room-XX ]
                     • Room objectives & practical competencies
                     • Task outline with estimated times
                     • Bridges to associated Practical Labs & Security Tools
                     • "Start Room" / "Resume Task" action
                             │
                             ▼
                 [ 5. Focused Lesson Reader: lesson.html?room=room-XX&task=task-X ]
                     • Distraction-free, single-column reading column
                     • Collapsible task table of contents
                     • Clear explanation, real-world analogies, code examples
                     • TryHackMe-style Question Engine (visual slots, multiple-choice)
                     • Progressive hint disclosure & immediate feedback
                     • "Complete & Next" progression
```

### Route & Query Parameter Specifications

| Page Route | Purpose | Required Query Parameters | Validation & Error Handling |
| :--- | :--- | :--- | :--- |
| `learning.html` | Minimal Dashboard | None | None required. Dynamically resolves user state to recommend next room. |
| `modules.html` | Module Directory | Optional: `?search=...`, `?diff=...` | Falls back to displaying all 8 levels if filters match 0 results. |
| `module.html` | Module Syllabus | `?id=<level-id>` (e.g. `level-0` to `level-7` or numeric `0` to `7`) | Validates against `PRE_SECURITY_LEVELS`. Invalid IDs render a clean "Module Not Found" state with a link back to `modules.html`. |
| `room.html` | Room Launchpad | `?id=<room-id>` (e.g. `room-01` to `room-45`) | Validates against `PRE_SECURITY_ROOM_MAP`. Invalid IDs render "Room Not Found" state with directory return link. |
| `lesson.html` | Focused Reader | `?room=<room-id>&task=<task-index>` (e.g. `?room=room-01&task=0`) | Validates room and task bounds. Defaults to task 0 if task parameter is omitted or out of bounds. Renders error state if room is invalid. |
| `roadmap.html` | Complete Visual Journey | None | Visual TryHackMe-style orbs linking directly to `room.html` and `lesson.html`. |

---

## 3. Unified State & Storage Engine (`academy-state.js`)

To guarantee data persistence across page transitions, reloads, and cross-tab actions without duplicate XP awards or corruption, state is centralized in `academy-state.js`.

### 3.1 LocalStorage Keys & Data Contracts

| Key | Type | Description |
| :--- | :--- | :--- |
| `endlessus_completed_rooms` | `string[]` | Array of completed room IDs (e.g. `["room-01", "room-02"]`). |
| `endlessus_room_progress` | `Record<string, number>` | Percentage completion per room (`{"room-01": 100, "room-02": 50}`). |
| `endlessus_question_progress` | `Record<string, boolean>` | Map of solved question keys (`{"room-01_q0": true}`). |
| `endlessus_completed_labs` | `string[]` | Array of solved lab IDs (e.g. `["lab-headers"]`). |
| `endlessus_user_xp` | `number` | Computed user XP (50 XP per room + 25 XP per question + 75 XP per lab). |
| `endlessus_streak_days` | `number` | Consecutive daily learning streak counter. |
| `endlessus_last_active` | `string` | ISO date of last recorded learning activity. |
| `endlessus_last_room` | `string` | Most recently visited room ID for instant resumption. |
| `endlessus_learning_theme` | `string` | `'normal'` (Light) or `'hacker'` (Dark HUD). |

### 3.2 Idempotency & Completion Rules
1. **Question Submission:** Submitting an answer for an already-solved question returns `{ alreadySolved: true, xp: 0 }`. XP is awarded exactly once per question.
2. **Room Completion:** A room is automatically marked complete when all its questions are solved, or when the user explicitly clicks "Mark Room Complete" on the terminal task. Re-completing does not award duplicate XP.
3. **Resilience:** If `localStorage` is disabled or corrupted, the state manager gracefully falls back to an in-memory session store without throwing unhandled exceptions.

---

## 4. Visual Design System & Component Library

All redesigned pages utilize the canonical Endlessus Academy design tokens defined in `academy.css`:

### 4.1 Themes
- **Normal View (Default):** Clean, calm, educational light mode. Soft neutral canvas (`#f8fafc`), clean white surfaces (`#ffffff`), restrained teal primary accents (`#0d9488`), dark readable slate typography (`#0f172a`), and subtle borders (`#e2e8f0`).
- **Hacker View:** High-contrast cybersecurity dark HUD. Deep charcoal canvas (`#090D12`), dark card surfaces (`#0E131B`), bright terminal green accents (`#4EDEA3`), cyan secondary accents (`#4CD7F6`), and monospace telemetry accents.

### 4.2 Shared Reusable Components
1. **Header (`#academy-header`):** Compact 56px sticky header featuring brand emblem, Learn/Practice/Reference hierarchy dropdowns, search trigger (`Cmd+K`), theme toggle, and mobile menu button.
2. **Breadcrumb Navigator:** Semantic navigation path (`Learning > Modules > Level 01 > Room 03`) with accessible microdata.
3. **Progress Meters:** Two-tone progress bars with percentage labels and ARIA value attributes (`role="progressbar"`).
4. **Question Cards:** Interactive question containers supporting:
   - Visual character slot boxes for exact commands (`_ _ _ _ _ _`).
   - Radio option groups for multiple-choice conceptual questions.
   - Expandable progressive hint accordions.
   - Correct/incorrect status banners with animated icons and explanations.
5. **Mobile Navigation Drawer:** Slide-in accessible menu for mobile viewports (<768px).

---

## 5. Security & Defensive Architecture

1. **Context-Sensitive Escaping:** All user-controlled strings and dynamic curriculum text rendered to the DOM are escaped via `escapeHtml()` or inserted via `textContent` to neutralize DOM-based XSS.
2. **Safe Navigation URLs:** URL query parameters (`id`, `room`, `task`) are strictly sanitized:
   - Evaluated against regex `/^[a-zA-Z0-9_-]+$/`.
   - Verified against authoritative keys in `PRE_SECURITY_ROOM_MAP` or `PRE_SECURITY_LEVELS`.
   - Never passed directly to `eval()`, `document.write()`, or unescaped HTML contexts.
3. **Client-Side Security Meta Tags:** Every new page includes `X-Content-Type-Options: nosniff` and `referrer: strict-origin-when-cross-origin`.
