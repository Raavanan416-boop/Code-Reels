/**
 * @typedef {Object} QuestionOption
 * @property {string} id
 * @property {string} text
 *
 * @typedef {Object} Question
 * @property {string}           id
 * @property {string}           lessonId
 * @property {string}           prompt
 * @property {QuestionOption[]} options
 * @property {string}           answerId   - id of correct option
 * @property {string}           explanation
 * @property {number}           points
 */

/** @param {Partial<Question>} data @returns {Question} */
export function createQuestion(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    lessonId: data.lessonId ?? '',
    prompt: data.prompt ?? '',
    options: data.options ?? [],
    answerId: data.answerId ?? '',
    explanation: data.explanation ?? '',
    points: data.points ?? 10,
  };
}
