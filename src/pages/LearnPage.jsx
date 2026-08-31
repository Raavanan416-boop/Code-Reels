import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Bookmark,
  Heart,
  Share2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SAMPLE_LESSONS } from '../data/lessons';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';

export default function LearnPage() {
  const { activeLanguage, completeLesson, completedLessonIds, addToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState({});
  const [bookmarkedMap, setBookmarkedMap] = useState({});

  // Filter feed by selected active language or show all sample lessons matching selection
  const filteredLessons = SAMPLE_LESSONS.filter(
    (lesson) => lesson.languageId === activeLanguage
  );
  const currentLessons = filteredLessons.length > 0 ? filteredLessons : SAMPLE_LESSONS;

  const currentLesson = currentLessons[currentIndex % currentLessons.length];
  const currentLangObj =
    LANGUAGES.find((l) => l.id === currentLesson?.languageId) || LANGUAGES[0];
  const isCompleted = completedLessonIds.includes(currentLesson?.id);

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % currentLessons.length);
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentIndex((prev) => (prev - 1 + currentLessons.length) % currentLessons.length);
  };

  const handleOptionSelect = (optionId) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      addToast('Select an answer option first!', 'warning');
      return;
    }
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentLesson.question.answerId;

    if (isCorrect) {
      completeLesson(currentLesson.id, currentLesson.xp);
    } else {
      addToast('Not quite right. Read the explanation below to learn why!', 'error');
    }
  };

  const toggleLike = (lessonId) => {
    setLikedMap((prev) => {
      const next = !prev[lessonId];
      addToast(next ? 'Saved to Liked Reels ❤️' : 'Removed from Liked', 'info');
      return { ...prev, [lessonId]: next };
    });
  };

  const toggleBookmark = (lessonId) => {
    setBookmarkedMap((prev) => {
      const next = !prev[lessonId];
      addToast(next ? 'Bookmarked for later review 🔖' : 'Bookmark removed', 'info');
      return { ...prev, [lessonId]: next };
    });
  };

  if (!currentLesson) {
    return <EmptyState title="No Lessons Found" description="Try selecting a different language." />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      {/* Feed Controller Badge */}
      <div className="flex items-center justify-between w-full max-w-lg mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400 font-medium">Reel {currentIndex + 1} of {currentLessons.length}</span>
        </div>
        <div className="flex items-center gap-1 text-brand-300 font-semibold bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
          <Zap className="w-3.5 h-3.5" />
          <span>+{currentLesson.xp} XP Available</span>
        </div>
      </div>

      {/* Main Vertical Swipe Reel Container */}
      <div className="relative w-full max-w-lg glass rounded-3xl border border-brand-500/30 shadow-card p-5 sm:p-6 overflow-hidden animate-fade-in flex flex-col justify-between min-h-[580px]">
        {/* Reel Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{currentLangObj.emoji}</span>
            <div>
              <h2 className="font-extrabold text-base text-white leading-tight">
                {currentLesson.title}
              </h2>
              <span className="text-[11px] text-slate-400">by {currentLesson.author}</span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
            {currentLesson.type}
          </span>
        </div>

        {/* Code Snippet Box */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
          <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
            <pre>{currentLesson.codeSnippet}</pre>
          </div>
        </div>

        {/* Quiz Prompt & Options */}
        <div className="mb-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
            <HelpCircle className="w-4 h-4 text-brand-400" />
            <span>{currentLesson.question.prompt}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {currentLesson.question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrectAnswer = option.id === currentLesson.question.answerId;
              let optionStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-brand-500/20 border-brand-500 text-white font-semibold shadow-brand';
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between focus-ring ${optionStyle}`}
                >
                  <span>{option.text}</span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Check Answer Button / Explanation */}
        {!isAnswerSubmitted ? (
          <Button
            variant="gradient"
            size="md"
            fullWidth
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            className="mb-3"
          >
            Check Answer
          </Button>
        ) : (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs mb-3 animate-fade-in">
            <span className="font-bold text-brand-300 block mb-1">💡 Explanation:</span>
            <p className="text-slate-300 leading-relaxed">{currentLesson.question.explanation}</p>
          </div>
        )}

        {/* Reel Social Controls & Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLike(currentLesson.id)}
              className={`p-2 rounded-xl border transition ${
                likedMap[currentLesson.id]
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedMap[currentLesson.id] ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={() => toggleBookmark(currentLesson.id)}
              className={`p-2 rounded-xl border transition ${
                bookmarkedMap[currentLesson.id]
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarkedMap[currentLesson.id] ? 'fill-brand-400' : ''}`} />
            </button>

            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>

          {/* Up / Down Reel Swipe Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition"
              title="Previous Reel"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 shadow-brand transition"
              title="Next Reel"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
