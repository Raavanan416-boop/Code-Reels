/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} displayName
 * @property {string} email
 * @property {string|null} photoURL
 * @property {string} createdAt  - ISO date string
 */

/**
 * Factory: create a User object with safe defaults.
 * @param {Partial<User>} data
 * @returns {User}
 */
export function createUser(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    displayName: data.displayName ?? 'Anonymous',
    email: data.email ?? '',
    photoURL: data.photoURL ?? null,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}
