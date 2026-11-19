const assert = require('assert');
const fs = require('fs');
const path = require('path');

const storage = new Map();
global.localStorage = {
  getItem: key => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: key => storage.delete(key)
};
global.CustomEvent = function CustomEvent(name, options) { this.type = name; this.detail = options?.detail; };

global.window = {
  localStorage: global.localStorage,
  dispatchEvent() {},
  supabase: { createClient: () => client }
};

const user = { id: 'profile-owner-1', email: 'learner@example.test' };
let profile = {
  id: user.id,
  username: 'old_handle',
  display_name: 'Learner',
  bio: '',
  is_public: true,
  total_xp: 75
};
let lastUpdate = null;
let nextUpdateError = null;

const client = {
  auth: {
    async getSession() { return { data: { session: { user } }, error: null }; },
    onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; }
  },
  from(table) {
    assert.strictEqual(table, 'profiles');
    let updatePayload = null;
    const query = {
      select() { return this; },
      eq(column, value) {
        assert.strictEqual(column, 'id');
        assert.strictEqual(value, user.id);
        return this;
      },
      async maybeSingle() { return { data: profile, error: null }; },
      update(payload) {
        updatePayload = payload;
        lastUpdate = payload;
        return this;
      },
      async single() {
        if (nextUpdateError) {
          const error = nextUpdateError;
          nextUpdateError = null;
          return { data: null, error };
        }
        profile = { ...profile, ...updatePayload };
        return { data: profile, error: null };
      }
    };
    return query;
  }
};

(async () => {
  const AcademyConfig = require('../academy-config.js');
  AcademyConfig.setConfig('https://profile-test.supabase.co', 'sb_publishable_profile_test_key');
  const AcademyAuth = require('../academy-auth.js');
  await AcademyAuth.init();

  const updated = await AcademyAuth.updateProfile({ username: 'new_handle' });
  assert.strictEqual(updated.success, true, 'Valid username update should succeed');
  assert.strictEqual(updated.profile.username, 'new_handle');
  assert.strictEqual(lastUpdate.username, 'new_handle', 'Username must be sent to the profile update');
  assert(!Object.prototype.hasOwnProperty.call(lastUpdate, 'updated_at'), 'Client must not write the trigger-managed updated_at column');

  const beforeInvalid = lastUpdate;
  const invalid = await AcademyAuth.updateProfile({ username: 'x bad' });
  assert.strictEqual(invalid.success, false, 'Invalid usernames should be rejected before database update');
  assert.strictEqual(lastUpdate, beforeInvalid, 'Invalid usernames must not call the database');

  nextUpdateError = { code: '23505', message: 'duplicate key value violates unique constraint' };
  const duplicate = await AcademyAuth.updateProfile({ username: 'taken_handle' });
  assert.strictEqual(duplicate.success, false);
  assert.match(duplicate.error, /already taken/i, 'Duplicate username error should be understandable');
  assert.strictEqual(AcademyAuth.getProfile().username, 'new_handle', 'Failed username change must not replace local profile state');

  const html = fs.readFileSync(path.join(__dirname, '..', 'profile.html'), 'utf8');
  assert(html.includes('id="edit-username"'), 'Profile edit modal must include a username input');
  assert(html.includes('username: editUsername.value'), 'Profile save must submit the edited username');
  const grants = fs.readFileSync(path.join(__dirname, '..', 'supabase/migrations/202611170003_calion_security_hardening.sql'), 'utf8');
  assert(grants.includes('grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;'), 'Existing authenticated grant must permit username updates');
  const schema = fs.readFileSync(path.join(__dirname, '..', 'supabase/migrations/202611170001_endlessus_academy_schema.sql'), 'utf8');
  assert(schema.includes('using (id = auth.uid())') && schema.includes('with check (id = auth.uid())'), 'Profile row policy must restrict updates to the owner');

  console.log('PASS profile username edit, validation, duplicate handling, trigger-managed timestamp, and owner authorization');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
