/**
 * CALION Academy - Answer Feedback Animations & Sound Synthesis
 * Zero-latency Web Audio API sound synthesizer with accessible visual animations.
 * Works completely offline without external audio assets.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalionSound = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'calion_sound_muted';
  let audioCtx = null;

  function getAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function isMuted() {
    try {
      if (typeof localStorage === 'undefined') return false;
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (_) {
      return false;
    }
  }

  function setMuted(muted) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, muted ? 'true' : 'false');
      }
    } catch (_) {}
    updateMuteButtons();
    return muted;
  }

  function toggleMute() {
    return setMuted(!isMuted());
  }

  function updateMuteButtons() {
    if (typeof document === 'undefined') return;
    const muted = isMuted();
    document.querySelectorAll('.calion-sound-toggle, #sound-toggle-btn').forEach(btn => {
      btn.setAttribute('data-muted', muted ? 'true' : 'false');
      btn.setAttribute('aria-pressed', muted ? 'false' : 'true');
      btn.setAttribute('title', muted ? 'Unmute Sound Effects' : 'Mute Sound Effects');
      const icon = btn.querySelector('.material-symbols-outlined') || btn;
      if (icon) {
        icon.textContent = muted ? 'volume_off' : 'volume_up';
      }
    });
  }

  // Pleasant ascending chime for correct answers
  function playCorrect() {
    if (isMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    } catch (_) {}
  }

  // Soft distinct low tone for incorrect answers
  function playIncorrect() {
    if (isMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(175, now + 0.22); // F3

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (_) {}
  }

  // Visual animation helper for element feedback
  function triggerVisualFeedback(element, isCorrect) {
    if (!element) return;
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animClass = isCorrect ? 'calion-feedback-correct' : 'calion-feedback-incorrect';
    element.classList.remove('calion-feedback-correct', 'calion-feedback-incorrect');

    if (!prefersReducedMotion) {
      // Force DOM reflow to re-trigger animation
      void element.offsetWidth;
      element.classList.add(animClass);
      setTimeout(() => {
        element.classList.remove(animClass);
      }, 700);
    }
  }

  function init() {
    updateMuteButtons();
    document.querySelectorAll('.calion-sound-toggle, #sound-toggle-btn').forEach(btn => {
      if (btn.__calion_sound_bound) return;
      btn.__calion_sound_bound = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMute();
      });
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    playCorrect,
    playIncorrect,
    triggerVisualFeedback,
    isMuted,
    setMuted,
    toggleMute,
    init
  };
});
