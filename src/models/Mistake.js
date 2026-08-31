/**
 * @typedef {Object} Mistake
 * @property {string} id
 * @property {string} userId
 * @property {string} questionId
 * @property {number} attempts    - total wrong attempts
 * @property {string} lastSeen    - ISO date string
 */

/** @param {Partial<Mistake>} data @returns {Mistake} */
export function createMistake(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    userId: data.userId ?? '',
    questionId: data.questionId ?? '',
    attempts: data.attempts ?? 1,
    lastSeen: data.lastSeen ?? new Date().toISOString(),
  };
}
