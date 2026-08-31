import React, { useState, useEffect } from 'react';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Code2,
  HelpCircle,
  ChevronRight,
  RefreshCw,
  Trophy,
  AlertCircle,
  HelpCircle as QuestionIcon,
  ChevronDown,
} from 'lucide-react';
import { LANGUAGES } from '../../data/languages';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

const DIFF_COLORS = {
  Beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export default function OutputQuestion({
  question,
  questionIndex,
  totalQuestions,
  onNext,
  onPracticeTopic,
}) {
  const {
    completeOutputChallenge,
    recordAnswer,
    recordMistake,
    completedOutputIds,
    addToast,
  } = useApp();

  const [selectedOption, setSelectedOption] = useState(null);
  const [phase, setPhase] = useState('attempt'); // 'attempt' | 'correct' | 'wrong'
  const [showDistractors, setShowDistractors] = useState(false);

  const langObj = LANGUAGES.find((l) => l.id === question?.languageId) || LANGUAGES[0];
  const isAlreadyCompleted = completedOutputIds.includes(question?.id);

  // Reset local selection when question changes
  useEffect(() => {
    setSelectedOption(null);
    setPhase('attempt');
    setShowDistractors(false);
  }, [question?.id]);

  if (!question) return null;

  const handleSubmit = () => {
    if (!selectedOption) {
      addToast('Select an answer option first!', 'warning');
      return;
    }

    const isCorrect = selectedOption === question.answerId;
    recordAnswer(isCorrect);

    if (isCorrect) {
      setPhase('correct');
      completeOutputChallenge(question.id, question.xp || 20);
    } else {
      setPhase('wrong');
      recordMistake(question.id, question.title, question.languageId);
      addToast('Incorrect output predicted! Read the execution trace below.', 'error');
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setPhase('attempt');
  };

  return (
    <div className="glass rounded-3xl border border-slate-800 shadow-card p-5 sm:p-6 space-y-5 select-none">
      {/* Question Header Bar */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Badge */}
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white">
              <span className="text-base">{langObj.emoji}</span>
              {question.language}
            </span>

            {/* Topic Badge */}
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-300 border border-brand-500/20 uppercase tracking-wider">
              {question.topic}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                DIFF_COLORS[question.difficulty] || 'text-slate-400'
              }`}
            >
              {question.difficulty}
            </span>

            {isAlreadyCompleted && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                Solved
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white">{question.title}</h2>
        </div>

        <span className="flex items-center gap-1 text-brand-300 font-bold text-sm bg-brand-500/10 px-3 py-1.5 rounded-xl border border-brand-500/20 shrink-0">
          <Zap className="w-3.5 h-3.5 fill-brand-400" />
          +{question.xp || 20} XP
        </span>
      </div>

      {/* Counter & Progress bar */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gradient rounded-full transition-all"
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Program Code Box */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 px-1">
          <span className="flex items-center gap-1.5 font-semibold text-slate-400">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            Program Code
          </span>
          <span className="text-slate-500 font-mono text-[10px]">
            main.{langObj.id === 'cpp' ? 'cpp' : langObj.id === 'python' ? 'py' : langObj.id}
          </span>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-brand-500/20 rounded-2xl blur opacity-30" />
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
            <pre className="leading-relaxed whitespace-pre-wrap">{question.codeSnippet}</pre>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="flex items-center gap-2 text-sm font-bold text-white pt-1">
        <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>{question.prompt || 'What will be the output?'}</span>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {question.options?.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.id === question.answerId;
          let style =
            'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900 cursor-pointer';

          if (phase !== 'attempt') {
            if (isCorrect) {
              style =
                'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold shadow-sm cursor-default';
            } else if (isSelected && !isCorrect) {
              style = 'bg-rose-950/80 border-rose-500 text-rose-200 cursor-default';
            } else {
              style =
                'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-default opacity-60';
            }
          } else if (isSelected) {
            style =
              'bg-brand-500/20 border-brand-500 text-white font-semibold shadow-brand cursor-pointer';
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

      {/* Submit Button */}
      {phase === 'attempt' && (
        <Button
          variant="gradient"
          size="md"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedOption}
          icon={Terminal}
        >
          Submit Output Prediction
        </Button>
      )}

      {/* RESULT & EXPLANATION PANEL */}
      {phase !== 'attempt' && (
        <div className="space-y-4 pt-2 animate-fadeIn">
          {/* Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              phase === 'correct'
                ? 'bg-emerald-950/60 border-emerald-500/40'
                : 'bg-rose-950/60 border-rose-500/40'
            }`}
          >
            {phase === 'correct' ? (
              <>
                <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-300 text-sm">
                    Correct Output Predicted! +{question.xp || 20} XP
                  </p>
                  <p className="text-emerald-400/80 text-xs mt-0.5">
                    Great code tracing! ⚡
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-300 text-sm">Incorrect Output</p>
                  <p className="text-rose-400/80 text-xs mt-0.5">
                    Review the execution trace below to see how stdout was produced.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Expected Output Console Window */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Standard Output (stdout):
            </span>
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 font-mono text-xs text-emerald-400 shadow-inner">
              <pre className="whitespace-pre-wrap">{question.expectedOutput}</pre>
            </div>
          </div>

          {/* Step-by-Step Execution Explanation */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-brand-500/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-brand-300">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Step-by-Step Execution Trace:
            </div>
            <pre className="text-slate-300 font-sans text-xs leading-relaxed whitespace-pre-wrap">
              {question.stepByStepExplanation}
            </pre>
          </div>

          {/* Why Incorrect Options are Wrong */}
          {question.whyIncorrect && (
            <div className="space-y-2">
              <button
                onClick={() => setShowDistractors(!showDistractors)}
                className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:text-white transition font-semibold"
              >
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Why other options are wrong
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showDistractors ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showDistractors && (
                <div className="space-y-2 pl-2 animate-fadeIn">
                  {Object.entries(question.whyIncorrect).map(([optId, exp]) => {
                    const optionObj = question.options?.find((o) => o.id === optId);
                    return (
                      <div
                        key={optId}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-900 text-xs space-y-1"
                      >
                        <span className="font-mono text-amber-400 font-semibold block">
                          Option ({optId.toUpperCase()}) "{optionObj?.text}":
                        </span>
                        <p className="text-slate-400 leading-relaxed">{exp}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Action CTAs */}
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
              onClick={onNext}
            >
              {phase === 'correct' ? 'Next Output Challenge →' : 'Skip Challenge →'}
            </Button>
          </div>

          {phase === 'correct' && (
            <button
              onClick={() => onPracticeTopic(question.topic)}
              className="w-full text-center text-xs text-slate-400 hover:text-brand-300 transition font-semibold"
            >
              Practice more "{question.topic}" questions →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
