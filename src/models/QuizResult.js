/**
 * @typedef {Object} QuizResult
 * @property {string}   id
 * @property {string}   userId
 * @property {string}   lessonId
 * @property {number}   score       - raw points
 * @property {number}   maxScore
 * @property {number}   percentage  - 0–100
 * @property {boolean}  passed
 * @property {string}   completedAt - ISO date string
 */

/** @param {Partial<QuizResult>} data @returns {QuizResult} */
export function createQuizResult(data = {}) {
  const score    = data.score    ?? 0;
  const maxScore = data.maxScore ?? 100;
  return {
    id: data.id ?? crypto.randomUUID(),
    userId: data.userId ?? '',
    lessonId: data.lessonId ?? '',
    score,
    maxScore,
    percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    passed: data.passed ?? (score / maxScore >= 0.7),
    completedAt: data.completedAt ?? new Date().toISOString(),
  };
}
