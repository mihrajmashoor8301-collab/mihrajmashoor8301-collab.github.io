/**
 * Thin client for the authoritative CALION XP RPCs.
 * This module never sends XP amounts or writes profiles/xp_events directly.
 * Unauthenticated guests use a no-award server verifier; they never receive trusted XP.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AcademyXP = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const CURRICULUM_ID = 'calion-academy-47-v1';
  const ROOM_RE = /^room-(0[1-9]|[1-3][0-9]|4[0-7])$/;
  const QUESTION_RE = /^q-[0-9]{2}-[0-9]+$/;
  const LAB_RE = /^lab-[a-z0-9_-]+$/;

  function dependencies() {
    const auth = typeof window !== 'undefined' ? window.AcademyAuth : null;
    if (!auth || !auth.getClient) return null;
    const client = auth.getClient();
    const authenticated = Boolean(auth.isAuthenticated && auth.isAuthenticated());
    const user = authenticated && auth.getUser ? auth.getUser() : null;
    return client ? { auth, client, user, authenticated } : null;
  }

  function sessionStillMatches(deps) {
    const now = dependencies();
    if (!deps || !now || now.authenticated !== deps.authenticated) return false;
    if (!deps.authenticated) return true;
    return Boolean(deps.user && now.user && deps.user.id === now.user.id);
  }

  function isAuthenticationError(error) {
    if (!error) return false;
    const code = String(error.code || '').toLowerCase();
    const message = String(error.message || '').toLowerCase();
    return Number(error.status) === 401 || code === 'pgrst301' ||
      code === 'authsessionmissingerror' || /jwt expired|session (?:is )?missing|invalid jwt/.test(message);
  }

  async function submitAnswer({ roomId, questionId, answer }) {
    if (!ROOM_RE.test(roomId || '') || !QUESTION_RE.test(questionId || '') || typeof answer !== 'string' || answer.length > 512) {
      return { success: false, code: 'invalid_input', xpAwarded: 0 };
    }
    const deps = dependencies();
    if (!deps) return { success: false, code: 'server_error', xpAwarded: 0 };
    if (deps.authenticated && !deps.user) return { success: false, code: 'auth_required', xpAwarded: 0 };
    try {
      const rpcName = deps.authenticated ? 'submit_calion_answer' : 'verify_calion_answer_guest';
      const { data, error } = await deps.client.rpc(rpcName, {
        p_curriculum_id: CURRICULUM_ID,
        p_room_id: roomId,
        p_question_id: questionId,
        p_answer: answer
      });
      if (error) return { success: false, code: isAuthenticationError(error) ? 'auth_required' : 'server_error', xpAwarded: 0 };
      if (!sessionStillMatches(deps)) return { success: false, code: 'auth_changed', xpAwarded: 0 };
      if (data?.code === 'auth_required') return { success: false, code: 'auth_required', xpAwarded: 0 };
      return {
        ...data,
        xpAwarded: deps.authenticated ? Number(data?.xp_awarded) || 0 : 0,
        roomXpAwarded: Number(data?.room_xp_awarded) || 0,
        totalXP: Number.isFinite(Number(data?.total_xp)) ? Number(data.total_xp) : null
      };
    } catch (_) {
      return { success: false, code: 'server_error', xpAwarded: 0 };
    }
  }

  async function submitLabFlag({ labId, flag }) {
    if (!LAB_RE.test(labId || '') || typeof flag !== 'string' || flag.length > 512) {
      return { success: false, code: 'invalid_input', xpAwarded: 0 };
    }
    const deps = dependencies();
    if (!deps || !deps.authenticated) return { success: false, code: 'practice_only_guest', xpAwarded: 0 };
    if (!deps.user) return { success: false, code: 'auth_required', xpAwarded: 0 };
    try {
      const { data, error } = await deps.client.rpc('verify_lab_flag', {
        p_lab_id: labId,
        p_submitted_flag: flag
      });
      if (error) return { success: false, code: isAuthenticationError(error) ? 'auth_required' : 'server_error', xpAwarded: 0 };
      if (!sessionStillMatches(deps)) return { success: false, code: 'auth_changed', xpAwarded: 0 };
      if (data?.success === false && /auth|session/i.test(String(data.code || data.message || ''))) {
        return { success: false, code: 'auth_required', xpAwarded: 0 };
      }
      return {
        ...data,
        xpAwarded: Number(data?.xp_awarded) || 0,
        totalXP: Number.isFinite(Number(data?.total_xp)) ? Number(data.total_xp) : null
      };
    } catch (_) {
      return { success: false, code: 'server_error', xpAwarded: 0 };
    }
  }

  async function getAuthoritativeTotal() {
    const deps = dependencies();
    if (!deps || !deps.authenticated || !deps.user) return null;
    try {
      const { data, error } = await deps.client.from('profiles')
        .select('total_xp').eq('id', deps.user.id).maybeSingle();
      if (error || !sessionStillMatches(deps) || !data || !Number.isFinite(Number(data.total_xp))) return null;
      return Number(data.total_xp);
    } catch (_) {
      return null;
    }
  }

  return Object.freeze({ CURRICULUM_ID, submitAnswer, submitLabFlag, getAuthoritativeTotal });
});
