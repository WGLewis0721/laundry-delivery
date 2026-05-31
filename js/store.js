/**
 * FOLD — store.js
 * Safe sessionStorage wrapper. Never throws, degrades gracefully
 * in sandboxed environments or when storage is blocked.
 */

const store = (() => {
  let _available = false;

  try {
    const test = '__fold_test__';
    sessionStorage.setItem(test, '1');
    sessionStorage.removeItem(test);
    _available = true;
  } catch (_) {
    _available = false;
  }

  /**
   * Persist a key/value pair (value is JSON-serialised).
   * @param {string} key
   * @param {*} value
   * @returns {boolean} success
   */
  function set(key, value) {
    if (!_available) return false;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Retrieve a stored value (JSON-parsed).
   * @param {string} key
   * @param {*} [fallback=null]
   * @returns {*}
   */
  function get(key, fallback = null) {
    if (!_available) return fallback;
    try {
      const raw = sessionStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (_) {
      return fallback;
    }
  }

  /**
   * Remove a stored key.
   * @param {string} key
   */
  function remove(key) {
    if (!_available) return;
    try {
      sessionStorage.removeItem(key);
    } catch (_) { /* no-op */ }
  }

  /**
   * Clear all FOLD keys (prefixed with 'fold_').
   */
  function clear() {
    if (!_available) return;
    try {
      Object.keys(sessionStorage)
        .filter(k => k.startsWith('fold_'))
        .forEach(k => sessionStorage.removeItem(k));
    } catch (_) { /* no-op */ }
  }

  return { set, get, remove, clear, available: () => _available };
})();

export default store;
