/**
 * @typedef {Object} UserProgress
 * @property {string}   userId
 * @property {string[]} selectedLanguages - array of language IDs
 * @property {string[]} completedLessons  - array of completed lesson IDs
 * @property {number}   xp                - total earned XP
 * @property {number}   streak            - current daily streak count
 * @property {number}   level             - calculated level
 */

/** @param {Partial<UserProgress>} data @returns {UserProgress} */
export function createUserProgress(data = {}) {
  const xp = data.xp ?? 0;
  return {
    userId: data.userId ?? '',
    selectedLanguages: data.selectedLanguages ?? ['python', 'javascript'],
    completedLessons: data.completedLessons ?? [],
    xp,
    streak: data.streak ?? 1,
    level: data.level ?? Math.floor(xp / 100) + 1,
  };
}
