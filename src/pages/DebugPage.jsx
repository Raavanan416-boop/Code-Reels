import React, { useState, useEffect } from 'react';
import {
  Bug,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Zap,
  Code2,
  BookOpen,
  ChevronRight,
  Trophy,
  Clock,
  History,
} from 'lucide-react';
import { BUG_QUESTIONS, ERROR_TYPES } from '../data/bugQuestions';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';

const ERROR_TYPE_COLORS = {
  [ERROR_TYPES.SYNTAX]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  [ERROR_TYPES.RUNTIME]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  [ERROR_TYPES.LOGICAL]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  [ERROR_TYPES.COMPILATION]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [ERROR_TYPES.TYPE]: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  [ERROR_TYPES.NULL_REF]: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const DIFF_COLORS = {
  Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

function MistakeHistoryPanel({ history, onClose, onPractice }) {
  if (!history.length) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-400 text-center py-6">
          No mistakes yet! Keep hunting bugs. 🐛
        </p>
        <Button variant="secondary" size="sm" fullWidth onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {history.map((m) => {
        const lang = LANGUAGES.find((l) => l.id === m.languageId);
        return (
          <div
            key={m.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{lang?.emoji || '🐛'}</span>
              <div>
                <p className="font-semibold text-white leading-tight">{m.questionTitle}</p>
                <p className="text-slate-400">{m.attempts} wrong attempt{m.attempts > 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={() => onPractice(m.bugId)}
              className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 hover:bg-brand-500/30 transition text-[11px] font-semibold"
            >
              Practice
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function DebugPage() {
  const {
    addToast,
    completeBugChallenge,
    recordMistake,
    completedBugIds,
    mistakeHistory,
    activeLanguage,
    userXp,
  } = useApp();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [phase, setPhase] = useState('attempt'); // 'attempt' | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [filterLang, setFilterLang] = useState('all');
  const [hasAttempted, setHasAttempted] = useState(false);

  // Filter questions by language
  const filteredQuestions =
    filterLang === 'all'
      ? BUG_QUESTIONS
      : BUG_QUESTIONS.filter((q) => q.languageId === filterLang);

  const currentQ = filteredQuestions[questionIndex % Math.max(filteredQuestions.length, 1)];
  const langObj = LANGUAGES.find((l) => l.id === currentQ?.languageId) || LANGUAGES[0];
  const isAlreadyCompleted = completedBugIds.includes(currentQ?.id);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setPhase('attempt');
    setShowHint(false);
    setHasAttempted(false);
  }, [questionIndex, filterLang]);

  const handleSubmit = () => {
    if (!selectedOption) {
      addToast('Select an answer option first!', 'warning');
      return;
    }
    setHasAttempted(true);

    if (selectedOption === currentQ.answerId) {
      setPhase('correct');
      completeBugChallenge(currentQ.id, currentQ.xp);
    } else {
      setPhase('wrong');
      recordMistake(currentQ.id, currentQ.title, currentQ.languageId);
      addToast('Not quite right — read the explanation and try again!', 'error');
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setPhase('attempt');
    setHasAttempted(false);
  };

  const goToNext = () => {
    setQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const goToPracticeQuestion = (bugId) => {
    const idx = filteredQuestions.findIndex((q) => q.id === bugId);
    if (idx !== -1) {
      setQuestionIndex(idx);
      setShowHistory(false);
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <EmptyState
          title="No Bug Challenges Found"
          description="No challenges match the selected language filter."
          actionLabel="Show All Languages"
          onAction={() => setFilterLang('all')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-6">

      {/* ===== HEADER BANNER ===== */}
      <div className="glass rounded-3xl border border-rose-500/20 shadow-card p-5 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Bug className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Bug Hunter Mode</h1>
              <p className="text-xs text-slate-400">Hunt, diagnose, and squash real-world programming bugs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* XP display */}
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300 font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-brand-400" />
              {userXp} XP
            </span>

            {/* Mistake History toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition text-xs font-semibold"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Mistakes</span>
              {mistakeHistory.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {mistakeHistory.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => { setFilterLang('all'); setQuestionIndex(0); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold border transition ${
              filterLang === 'all'
                ? 'bg-brand-500 text-white border-brand-500'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            All Languages
          </button>
          {LANGUAGES.filter((l) => BUG_QUESTIONS.some((q) => q.languageId === l.id)).map((lang) => (
            <button
              key={lang.id}
              onClick={() => { setFilterLang(lang.id); setQuestionIndex(0); }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 ${
                filterLang === lang.id
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{lang.emoji}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== MISTAKE HISTORY PANEL ===== */}
      {showHistory && (
        <Card glass className="border border-rose-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-rose-400" />
              Your Mistake History
            </h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
          <MistakeHistoryPanel
            history={mistakeHistory}
            onClose={() => setShowHistory(false)}
            onPractice={goToPracticeQuestion}
          />
        </Card>
      )}

      {/* ===== MAIN CHALLENGE CARD ===== */}
      <Card glass className="border border-slate-800 space-y-5">

        {/* Question Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white">
                <span className="text-base">{langObj.emoji}</span>
                {currentQ.language}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${DIFF_COLORS[currentQ.difficulty] || 'text-slate-400'}`}>
                {currentQ.difficulty}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${ERROR_TYPE_COLORS[currentQ.errorType] || ''}`}>
                {currentQ.errorType}
              </span>
              {isAlreadyCompleted && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Solved
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">{currentQ.title}</h2>
            <p className="text-xs text-slate-400">{currentQ.topic}</p>
          </div>

          <span className="flex items-center gap-1 text-brand-300 font-bold text-sm bg-brand-500/10 px-3 py-1.5 rounded-xl border border-brand-500/20 shrink-0">
            <Zap className="w-3.5 h-3.5" />
            +{currentQ.xp} XP
          </span>
        </div>

        {/* Navigation counter */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Challenge {(questionIndex % filteredQuestions.length) + 1} of {filteredQuestions.length}</span>
          <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-gradient rounded-full transition-all"
              style={{ width: `${(((questionIndex % filteredQuestions.length) + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Bug Description */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>{currentQ.description}</p>
          </div>
        </div>

        {/* Broken Code Snippet */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 px-1">
            <span className="flex items-center gap-1.5 font-semibold text-slate-400">
              <Code2 className="w-3.5 h-3.5" />
              Broken Code (spot the bug!)
            </span>
            <span className="text-rose-400 font-bold text-[10px] animate-pulse">● BUG INSIDE</span>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/30 to-orange-500/30 rounded-2xl blur opacity-40" />
            <div className="relative bg-slate-950 rounded-2xl border border-rose-500/30 p-4 font-mono text-xs text-rose-200 overflow-x-auto shadow-inner">
              <pre className="leading-relaxed whitespace-pre-wrap">{currentQ.buggyCode}</pre>
            </div>
          </div>
        </div>

        {/* "Can you find the bug?" prompt */}
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Bug className="w-4 h-4 text-rose-400" />
          <span>{currentQ.prompt}</span>
        </div>

        {/* Answer Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQ.answerId;
            let style = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900 cursor-pointer';

            if (phase !== 'attempt') {
              if (isCorrect) {
                style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-sm cursor-default';
              } else if (isSelected && !isCorrect) {
                style = 'bg-rose-950/80 border-rose-500 text-rose-200 cursor-default';
              } else {
                style = 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-default opacity-60';
              }
            } else if (isSelected) {
              style = 'bg-brand-500/20 border-brand-500 text-white font-semibold shadow-brand cursor-pointer';
            }

            return (
              <button
                key={opt.id}
                disabled={phase !== 'attempt'}
                onClick={() => setSelectedOption(opt.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${style}`}
              >
                <span className="font-mono leading-relaxed">{opt.text}</span>
                {phase !== 'attempt' && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {phase !== 'attempt' && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Toggle (only before submit) */}
        {phase === 'attempt' && (
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition font-semibold"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint (-5 XP)'}</span>
            </button>
            {showHint && (
              <div className="mt-3 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-fadeIn">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{currentQ.options.find(o => o.id === currentQ.answerId)?.text ? 
                  `Think about: ${currentQ.beginnerExplanation?.split('.')[0] || 'Analyze the commented line carefully.'}` :
                  'Analyze the commented line carefully.'
                }</p>
              </div>
            )}
          </div>
        )}

        {/* Submit / Check Answer */}
        {phase === 'attempt' && (
          <Button
            variant="gradient"
            size="md"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedOption}
            icon={Bug}
          >
            Apply Patch & Test Fix
          </Button>
        )}

        {/* ===== RESULT PANEL ===== */}
        {phase !== 'attempt' && (
          <div className="space-y-4 animate-fadeIn">

            {/* Correct / Wrong Banner */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              phase === 'correct'
                ? 'bg-emerald-950/60 border-emerald-500/40'
                : 'bg-rose-950/60 border-rose-500/40'
            }`}>
              {phase === 'correct' ? (
                <>
                  <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-300 text-sm">Bug Squashed! +{currentQ.xp} XP</p>
                    <p className="text-emerald-400/80 text-xs mt-0.5">Excellent debugging skills! 🐛✨</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-rose-300 text-sm">Not Quite — Bug Still Active!</p>
                    <p className="text-rose-400/80 text-xs mt-0.5">This mistake has been saved to your history for review.</p>
                  </div>
                </>
              )}
            </div>

            {/* Root Cause */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Root Cause ({currentQ.errorType}):
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.cause}</p>
            </div>

            {/* Explanation */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-brand-500/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-brand-300">
                <Sparkles className="w-4 h-4 text-brand-400" />
                Technical Explanation:
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>

            {/* Beginner-Friendly Analogy */}
            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Beginner-Friendly Explanation:
              </div>
              <p className="text-amber-200/90 leading-relaxed">{currentQ.beginnerExplanation}</p>
            </div>

            {/* Fixed Code */}
            <div>
              <p className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Corrected Code:
              </p>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-brand-500/20 rounded-xl blur opacity-40" />
                <div className="relative bg-slate-950 rounded-xl border border-emerald-500/30 p-4 font-mono text-xs text-emerald-200 overflow-x-auto shadow-inner">
                  <pre className="leading-relaxed">{currentQ.fixedCode}</pre>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {phase === 'wrong' && (
                <Button
                  variant="outline"
                  size="md"
                  icon={RefreshCw}
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
              )}

              <Button
                variant="gradient"
                size="md"
                fullWidth
                icon={ChevronRight}
                onClick={goToNext}
              >
                {phase === 'correct' ? 'Hunt Next Bug →' : 'Skip to Next Bug →'}
              </Button>
            </div>

            {phase === 'correct' && (
              <button
                onClick={() => {
                  setFilterLang(currentQ.languageId);
                  setQuestionIndex(0);
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-brand-300 transition font-semibold"
              >
                Practice more {currentQ.language} bugs →
              </button>
            )}
          </div>
        )}
      </Card>

      {/* ===== COMPLETED BUGS SUMMARY ===== */}
      {completedBugIds.length > 0 && (
        <Card glass className="border border-emerald-500/20 p-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Trophy className="w-4 h-4" />
              <span>Bugs Squashed: {completedBugIds.length} / {BUG_QUESTIONS.length}</span>
            </div>
            <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-brand-500 rounded-full"
                style={{ width: `${(completedBugIds.length / BUG_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
