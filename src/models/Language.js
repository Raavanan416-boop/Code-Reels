/**
 * @typedef {'beginner'|'intermediate'|'advanced'|'expert'} Difficulty
 *
 * @typedef {Object} Language
 * @property {string}     id
 * @property {string}     name
 * @property {string}     description
 * @property {string}     color       - primary brand hex
 * @property {string}     gradient    - CSS gradient string
 * @property {Difficulty} difficulty
 * @property {string}     emoji       - display icon fallback
 */

/**
 * @param {Partial<Language>} data
 * @returns {Language}
 */
export function createLanguage(data = {}) {
  return {
    id: data.id ?? '',
    name: data.name ?? '',
    description: data.description ?? '',
    color: data.color ?? '#6366f1',
    gradient: data.gradient ?? 'linear-gradient(135deg,#6366f1,#8b5cf6)',
    difficulty: data.difficulty ?? 'beginner',
    emoji: data.emoji ?? '💻',
  };
}
