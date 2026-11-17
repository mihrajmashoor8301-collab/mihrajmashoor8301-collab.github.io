/**
 * Endlessus Academy - Supabase Authentication & Profile Manager
 * 
 * Handles user registration, email/password login, OAuth providers (Google),
 * password recovery, session persistence, and learner profile management.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./academy-config'),
      typeof window !== 'undefined' ? window.supabase : null
    );
  } else {
    root.AcademyAuth = factory(root.AcademyConfig, root.supabase);
  }
})(typeof self !== 'undefined' ? self : this, function (AcademyConfig, supabaseLib) {
  'use strict';

  let client = null;
  let currentUser = null;
  let currentProfile = null;
  let isInitialized = false;
  let authListeners = [];

  function getClient() {
    if (client) return client;

    // Check for global supabase object
    const lib = (typeof window !== 'undefined' && window.supabase) ? window.supabase : supabaseLib;
    if (!lib || typeof lib.createClient !== 'function') {
      return null;
    }

    const cfg = AcademyConfig ? AcademyConfig.getStoredConfig() : { url: '', anonKey: '' };
    if (!cfg.url || !cfg.anonKey || !cfg.url.startsWith('http')) {
      return null;
    }

    try {
      client = lib.createClient(cfg.url, cfg.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return client;
    } catch (e) {
      console.warn('[AcademyAuth] Failed to initialize Supabase client:', e);
      return null;
    }
  }

  async function init() {
    if (isInitialized) return { user: currentUser, profile: currentProfile };

    const sb = getClient();
    if (!sb) {
      isInitialized = true;
      dispatchAuthChange();
      return { user: null, profile: null, unconfigured: true };
    }

    try {
      const { data: { session }, error } = await sb.auth.getSession();
      if (session && session.user) {
        currentUser = session.user;
        await refreshProfile();
      }
    } catch (e) {
      console.warn('[AcademyAuth] Error getting initial session:', e);
    }

    // Subscribe to auth state updates
    sb.auth.onAuthStateChange(async (event, session) => {
      const prevId = currentUser ? currentUser.id : null;
      if (session && session.user) {
        currentUser = session.user;
        if (!prevId || prevId !== currentUser.id) {
          await refreshProfile();
        }
      } else {
        currentUser = null;
        currentProfile = null;
      }
      dispatchAuthChange(event);
    });

    isInitialized = true;
    return { user: currentUser, profile: currentProfile };
  }

  async function refreshProfile() {
    if (!currentUser) {
      currentProfile = null;
      return null;
    }

    const sb = getClient();
    if (!sb) return null;

    try {
      const { data, error } = await sb
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (data) {
        currentProfile = data;
      } else if (!error) {
        // Fallback create profile if trigger did not execute
        const rawName = currentUser.email ? currentUser.email.split('@')[0] : 'learner';
        const cleanUsername = rawName.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30) || `learner_${currentUser.id.slice(0, 6)}`;
        
        const fallbackProfile = {
          id: currentUser.id,
          username: cleanUsername,
          display_name: currentUser.user_metadata?.display_name || cleanUsername,
          avatar_url: currentUser.user_metadata?.avatar_url || '',
          bio: '',
          is_public: true
        };

        const { data: created } = await sb.from('profiles').insert(fallbackProfile).select().maybeSingle();
        currentProfile = created || fallbackProfile;
      }
    } catch (e) {
      console.warn('[AcademyAuth] Failed to load profile:', e);
    }

    return currentProfile;
  }

  // Registration
  async function signUp({ email, password, username, displayName }) {
    const sb = getClient();
    if (!sb) {
      return { success: false, error: 'Supabase credentials not configured. Please configure your Academy Supabase URL and anon key.' };
    }

    const cleanUsername = (username || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters (letters, numbers, underscores, or hyphens).' };
    }

    try {
      const { data, error } = await sb.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: cleanUsername,
            display_name: (displayName || cleanUsername).trim()
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        currentUser = data.user;
        await refreshProfile();
        dispatchAuthChange('SIGNED_IN');
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        needsEmailConfirmation: Boolean(!data.session)
      };
    } catch (e) {
      return { success: false, error: e.message || 'An unexpected error occurred during registration.' };
    }
  }

  // Sign In
  async function signIn({ email, password }) {
    const sb = getClient();
    if (!sb) {
      return { success: false, error: 'Supabase credentials not configured.' };
    }

    try {
      const { data, error } = await sb.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      currentUser = data.user;
      await refreshProfile();
      dispatchAuthChange('SIGNED_IN');

      return { success: true, user: data.user, session: data.session };
    } catch (e) {
      return { success: false, error: e.message || 'Sign in failed.' };
    }
  }

  // Google OAuth
  async function signInWithGoogle() {
    const sb = getClient();
    if (!sb) {
      return { success: false, error: 'Supabase credentials not configured.' };
    }

    try {
      const redirectUrl = (typeof window !== 'undefined')
        ? `${window.location.origin}/profile.html`
        : 'https://endlessus.in/profile.html';

      const { data, error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message || 'OAuth initialization failed.' };
    }
  }

  // Sign Out
  async function signOut() {
    const sb = getClient();
    if (!sb) {
      currentUser = null;
      currentProfile = null;
      dispatchAuthChange('SIGNED_OUT');
      return { success: true };
    }

    try {
      const { error } = await sb.auth.signOut();
      currentUser = null;
      currentProfile = null;
      dispatchAuthChange('SIGNED_OUT');
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      currentUser = null;
      currentProfile = null;
      dispatchAuthChange('SIGNED_OUT');
      return { success: true };
    }
  }

  // Password Recovery
  async function resetPassword(email) {
    const sb = getClient();
    if (!sb) return { success: false, error: 'Supabase credentials not configured.' };

    try {
      const redirectUrl = (typeof window !== 'undefined')
        ? `${window.location.origin}/auth.html?mode=reset`
        : 'https://endlessus.in/auth.html?mode=reset';

      const { error } = await sb.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl
      });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || 'Failed to send password reset email.' };
    }
  }

  // Update Profile
  async function updateProfile({ displayName, bio, isPublic, avatarUrl }) {
    if (!currentUser) return { success: false, error: 'Not authenticated.' };
    const sb = getClient();
    if (!sb) return { success: false, error: 'Supabase not configured.' };

    try {
      const updates = {
        updated_at: new Date().toISOString()
      };
      if (displayName !== undefined) updates.display_name = String(displayName).trim().slice(0, 60);
      if (bio !== undefined) updates.bio = String(bio).trim().slice(0, 500);
      if (isPublic !== undefined) updates.is_public = Boolean(isPublic);
      if (avatarUrl !== undefined) updates.avatar_url = String(avatarUrl).trim();

      const { data, error } = await sb
        .from('profiles')
        .update(updates)
        .eq('id', currentUser.id)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      currentProfile = data;
      dispatchAuthChange('PROFILE_UPDATED');
      return { success: true, profile: data };
    } catch (e) {
      return { success: false, error: e.message || 'Profile update failed.' };
    }
  }

  // Fetch Public Profile (by username or UUID)
  async function getPublicProfile(identifier) {
    const sb = getClient();
    if (!sb || !identifier) return null;

    try {
      let query = sb.from('profiles').select('*');
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

      if (isUUID) {
        query = query.eq('id', identifier);
      } else {
        query = query.ilike('username', identifier);
      }

      const { data, error } = await query.maybeSingle();
      if (error || !data) return null;

      // Check privacy: if not public and viewer is not the profile owner
      if (!data.is_public && (!currentUser || currentUser.id !== data.id)) {
        return {
          id: data.id,
          username: data.username,
          display_name: data.display_name,
          is_public: false,
          created_at: data.created_at
        };
      }

      return data;
    } catch (e) {
      return null;
    }
  }

  function dispatchAuthChange(eventType) {
    const detail = {
      user: currentUser,
      profile: currentProfile,
      isAuthenticated: Boolean(currentUser),
      eventType: eventType || 'STATE_CHANGED'
    };

    authListeners.forEach(fn => {
      try { fn(detail); } catch (e) {}
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('calion-auth-changed', { detail }));
      window.dispatchEvent(new CustomEvent('endlessus-auth-changed', { detail }));
    }
  }

  function onAuthStateChange(listener) {
    if (typeof listener === 'function') {
      authListeners.push(listener);
      // Immediately invoke with current state
      listener({
        user: currentUser,
        profile: currentProfile,
        isAuthenticated: Boolean(currentUser),
        eventType: 'INITIAL'
      });
    }
    return () => {
      authListeners = authListeners.filter(fn => fn !== listener);
    };
  }

  return {
    init,
    getClient,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    getPublicProfile,
    refreshProfile,
    onAuthStateChange,
    getUser: () => currentUser,
    getProfile: () => currentProfile,
    isAuthenticated: () => Boolean(currentUser)
  };
});
