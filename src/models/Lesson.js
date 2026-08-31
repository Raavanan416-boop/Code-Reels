/**
 * @typedef {'concept'|'quiz'|'code'|'debug'} LessonType
 *
 * @typedef {Object} Lesson
 * @property {string}     id
 * @property {string}     languageId
 * @property {string}     title
 * @property {string}     summary
 * @property {string}     content      - markdown or plain text
 * @property {LessonType} type
 * @property {number}     xp           - XP reward on completion
 * @property {number}     order        - sort order within language
 * @property {string[]}   tags
 */

/** @param {Partial<Lesson>} data @returns {Lesson} */
export function createLesson(data = {}) {
  return {
    id: data.id ?? crypto.randomUUID(),
    languageId: data.languageId ?? '',
    title: data.title ?? '',
    summary: data.summary ?? '',
    content: data.content ?? '',
    type: data.type ?? 'concept',
    xp: data.xp ?? 10,
    order: data.order ?? 0,
    tags: data.tags ?? [],
  };
}
