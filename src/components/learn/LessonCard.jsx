import React, { useState } from 'react';
import {
  Code2,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  Lightbulb,
  Sparkles,
  Zap,
  ChevronDown,
  Terminal,
  Bug,
  BookOpen,
} from 'lucide-react';
import { LANGUAGES } from '../../data/languages';
import { LESSON_TYPES } from '../../data/lessons';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

export default function LessonCard({
  lesson,
  index,
  totalLessons,
  onNext,
  onOpenTryIt,
  onOpenHint,
  isActive,
}) {
  const {
    completedLessonIds,
    savedLessonIds,
    completeLesson,
    toggleSaveLesson,
    recordAnswer,
    addToast,
  } = useApp();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const langObj = LANGUAGES.find((l) => l.id === lesson?.languageId) || LANGUAGES[0];
  const isCompleted = completedLessonIds.includes(lesson?.id);
  const isSaved = savedLessonIds.includes(lesson?.id);

  if (!lesson) return null;

  const handleOptionSelect = (optionId) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!lesson.question) {
      // For concept / code_example without strict quiz, directly mark complete
      completeLesson(lesson.id, lesson.xp || 15);
      recordAnswer(true);
      setIsAnswerSubmitted(true);
      return;
    }

    if (!selectedOption) {
      addToast('Please select an option before checking!', 'warning');
      return;
    }

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === lesson.question.answerId;
    recordAnswer(isCorrect);

    if (isCorrect) {
      completeLesson(lesson.id, lesson.xp || 20);
    } else {
      addToast('Not quite! Check the explanation below to learn why.', 'error');
    }
  };

  const getDifficultyBadgeColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case LESSON_TYPES.FIND_BUG:
        return <Bug className="w-3.5 h-3.5 text-rose-400" />;
      case LESSON_TYPES.CODE_EXAMPLE:
        return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
      case LESSON_TYPES.MINI_CHALLENGE:
        return <Zap className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-brand-400" />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto h-full flex flex-col justify-between p-4 sm:p-6 snap-center select-none">
      <div className="glass rounded-3xl border border-brand-500/20 shadow-card p-5 sm:p-6 flex flex-col justify-between flex-1 overflow-y-auto space-y-4">
        
        {/* ================= TOP SECTION ================= */}
        <div className="space-y-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            {/* Language Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white">
              <span className="text-base">{langObj.emoji}</span>
              <span>{langObj.name}</span>
            </div>

            {/* Step Counter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-300">
                Reel {index + 1} of {totalLessons}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                {lesson.title}
              </h2>
              <p className="text-xs text-slate-400">{lesson.topic || 'Core Fundamentals'}</p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${getDifficultyBadgeColor(lesson.difficulty)}`}>
                {lesson.difficulty || 'Beginner'}
              </span>

              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {getTypeIcon(lesson.type)}
                <span>{lesson.type?.replace('_', ' ')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ================= CENTER SECTION ================= */}
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {/* Syntax Highlighted Code Snippet */}
          {lesson.codeSnippet && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-slate-950 rounded-2xl p-4 border border-slate-800/90 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 border-b border-slate-900 pb-1">
                  <span>code_snippet.{langObj.id === 'cpp' ? 'cpp' : langObj.id === 'python' ? 'py' : langObj.id}</span>
                  <span className="text-brand-400 font-semibold">+{lesson.xp || 20} XP</span>
                </div>
                <pre className="leading-relaxed">{lesson.codeSnippet}</pre>
              </div>
            </div>
          )}

          {/* Question / Prompt */}
          {lesson.question && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <HelpCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{lesson.question.prompt}</span>
              </div>

              {/* Interactive Quiz / Options */}
              <div className="grid grid-cols-1 gap-2">
                {lesson.question.options?.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrectAnswer = option.id === lesson.question.answerId;
                  let optionStyle =
                    'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (isAnswerSubmitted) {
                    if (isCorrectAnswer) {
                      optionStyle =
                        'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-brand';
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'bg-brand-500/20 border-brand-500 text-white font-semibold shadow-brand';
                  }

                  return (
                    <button
                      key={option.id}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between focus-ring ${optionStyle}`}
                    >
                      <span className="flex-1 pr-2">{option.text}</span>
                      {isAnswerSubmitted && isCorrectAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Visual Explanation Preview */}
          {lesson.visualExplanation && !isAnswerSubmitted && (
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[11px] leading-relaxed">{lesson.visualExplanation}</span>
            </div>
          )}
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          {/* Explanation reveal on submission */}
          {isAnswerSubmitted && (
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-brand-500/30 text-xs animate-fadeIn space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-brand-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Explanation & Takeaway:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lesson.question?.explanation || lesson.explanation}
              </p>
            </div>
          )}

          {/* Submission / Next CTA */}
          {!isAnswerSubmitted ? (
            <Button
              variant="gradient"
              size="md"
              fullWidth
              onClick={handleSubmitAnswer}
              disabled={lesson.question && !selectedOption}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={ChevronDown}
              onClick={onNext}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Next Reel
            </Button>
          )}

          {/* Toolbar: Try It, Hint, Save */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenTryIt(lesson)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition text-[11px] font-semibold"
              >
                <Play className="w-3.5 h-3.5 text-brand-400" />
                <span>Try It</span>
              </button>

              <button
                onClick={() => onOpenHint(lesson)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition text-[11px] font-semibold"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Hint</span>
              </button>
            </div>

            <button
              onClick={() => toggleSaveLesson(lesson.id)}
              className={`p-2 rounded-xl border transition flex items-center gap-1 ${
                isSaved
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-300 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save Lesson'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-400 text-brand-400' : ''}`} />
              <span className="text-[11px]">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
