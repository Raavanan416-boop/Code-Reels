import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { SAMPLE_LESSONS } from '../data/lessons';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';
import LessonCard from '../components/learn/LessonCard';
import TryItModal from '../components/learn/TryItModal';
import HintModal from '../components/learn/HintModal';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Spinner from '../components/ui/Spinner';

export default function LearnPage() {
  const { activeLanguage, completedLessonIds, userXp, streakCount } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tryItLesson, setTryItLesson] = useState(null);
  const [hintLesson, setHintLesson] = useState(null);

  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  // Filter lessons matching active language
  const filteredLessons = SAMPLE_LESSONS.filter(
    (lesson) => lesson.languageId === activeLanguage
  );
  const lessonsToRender = filteredLessons.length > 0 ? filteredLessons : SAMPLE_LESSONS;

  const currentLangObj =
    LANGUAGES.find((l) => l.id === activeLanguage) || LANGUAGES[0];

  // Initial loading state simulation
  useEffect(() => {
    setLoading(true);
    setError(false);
    setCurrentIndex(0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [activeLanguage]);

  // Handle vertical reel navigation
  const goToNext = () => {
    if (lessonsToRender.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % lessonsToRender.length);
  };

  const goToPrev = () => {
    if (lessonsToRender.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + lessonsToRender.length) % lessonsToRender.length);
  };

  // Keyboard Up/Down arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (tryItLesson || hintLesson) return; // Ignore if modal open

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tryItLesson, hintLesson, lessonsToRender.length]);

  // Desktop Mouse Wheel navigation
  const handleWheel = (e) => {
    if (tryItLesson || hintLesson || isScrolling.current) return;

    if (Math.abs(e.deltaY) > 30) {
      isScrolling.current = true;
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  // Mobile Touch Gestures (Swipe Up / Down)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (tryItLesson || hintLesson) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) {
        goToNext(); // Swiped Up -> Next Reel
      } else {
        goToPrev(); // Swiped Down -> Previous Reel
      }
    }
  };

  // Progress Bar percentage calculation
  const completedInCurrentFeed = lessonsToRender.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;
  const progressPercent = Math.min(
    100,
    Math.round(((currentIndex + 1) / lessonsToRender.length) * 100)
  );

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <ErrorState
          title="Failed to load learning feed"
          message="Please check your connection or reload the feed."
          onRetry={() => {
            setError(false);
            setLoading(true);
            setTimeout(() => setLoading(false), 400);
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] p-4 space-y-4">
        <div className="w-full max-w-lg glass rounded-3xl p-6 border border-slate-800 space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="w-24 h-6 bg-slate-800 rounded-xl" />
            <div className="w-16 h-4 bg-slate-800 rounded-full" />
          </div>
          <div className="w-3/4 h-7 bg-slate-800 rounded-xl" />
          <div className="w-full h-44 bg-slate-900 rounded-2xl" />
          <div className="space-y-2">
            <div className="w-full h-10 bg-slate-800 rounded-xl" />
            <div className="w-full h-10 bg-slate-800 rounded-xl" />
          </div>
        </div>
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-2">
          <Spinner size="sm" /> Preparing {currentLangObj.name} Reels...
        </span>
      </div>
    );
  }

  if (!lessonsToRender || lessonsToRender.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <EmptyState
          title={`No Reels Available for ${currentLangObj.name}`}
          description="Try switching to Python, JavaScript, C, C++, or Java."
        />
      </div>
    );
  }

  const currentLesson = lessonsToRender[currentIndex];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col items-center justify-between min-h-[calc(100vh-125px)] overflow-x-hidden touch-pan-y max-w-xl mx-auto py-2"
    >
      {/* Top Header Progress Bar & Feed Controller */}
      <div className="w-full max-w-lg px-2 space-y-1.5 mb-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentLangObj.emoji}</span>
            <span className="font-extrabold text-white text-sm">{currentLangObj.name} Feed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>{userXp} XP</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={goToPrev}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Previous Reel (Up Arrow)"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={goToNext}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Next Reel (Down Arrow)"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar across current feed */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-brand-gradient transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Reel Vertical Card */}
      <div className="w-full flex-1 flex items-center justify-center">
        <LessonCard
          key={currentLesson.id}
          lesson={currentLesson}
          index={currentIndex}
          totalLessons={lessonsToRender.length}
          onNext={goToNext}
          onOpenTryIt={(l) => setTryItLesson(l)}
          onOpenHint={(l) => setHintLesson(l)}
          isActive={true}
        />
      </div>

      {/* Modals for Try It & Hint */}
      <TryItModal
        isOpen={Boolean(tryItLesson)}
        onClose={() => setTryItLesson(null)}
        lesson={tryItLesson}
      />

      <HintModal
        isOpen={Boolean(hintLesson)}
        onClose={() => setHintLesson(null)}
        lesson={hintLesson}
      />
    </div>
  );
}
