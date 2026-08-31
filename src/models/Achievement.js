/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} icon       - Lucide icon name or emoji
 * @property {string} unlockedAt - ISO date string or null if locked
 */

/** @param {Partial<Achievement>} data @returns {Achievement} */
export function createAchievement(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    title: data.title ?? '',
    description: data.description ?? '',
    icon: data.icon ?? '🏆',
    unlockedAt: data.unlockedAt ?? null,
  };
}
