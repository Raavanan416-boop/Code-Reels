import React, { useState } from 'react';
import { Bug, CheckCircle2, Play, RefreshCw, Lightbulb, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const DEBUG_CHALLENGES = [
  {
    id: 'dbg-1',
    language: 'Python',
    title: 'Off-by-One Loop Bug',
    description: 'The code is supposed to sum numbers from 1 to 5 inclusive, but it outputs 10 instead of 15.',
    buggyCode: `def sum_to_five():
    total = 0
    # BUG IS ON THIS LINE:
    for i in range(1, 5):
        total += i
    return total

print(sum_to_five())`,
    options: [
      { id: '1', text: 'Change `range(1, 5)` to `range(1, 6)`' },
      { id: '2', text: 'Change `total = 0` to `total = 1`' },
      { id: '3', text: 'Change `range(1, 5)` to `range(0, 5)`' },
    ],
    correctOptionId: '1',
    fixedCode: `def sum_to_five():
    total = 0
    for i in range(1, 6):
        total += i
    return total

print(sum_to_five()) # Output: 15 🎉`,
    hint: 'Python range(start, stop) excludes the stop value!',
    xp: 25,
  },
  {
    id: 'dbg-2',
    language: 'JavaScript',
    title: 'Uncaught ReferenceError in Callback',
    description: 'Attempting to access `counter` inside setTimeout fails or prints undefined.',
    buggyCode: `function startTimer() {
    // BUG IS ON THIS LINE:
    let counter;
    setTimeout(() => {
        counter += 1;
        console.log(counter); // NaN
    }, 1000);
}
startTimer();`,
    options: [
      { id: '1', text: 'Initialize `let counter = 0;` instead of undefined' },
      { id: '2', text: 'Change `let` to `const`' },
      { id: '3', text: 'Remove `setTimeout` callback' },
    ],
    correctOptionId: '1',
    fixedCode: `function startTimer() {
    let counter = 0; // Correctly initialized number
    setTimeout(() => {
        counter += 1;
        console.log(counter); // 1 🎉
    }, 1000);
}`,
    hint: 'Adding 1 to `undefined` results in NaN in JavaScript.',
    xp: 25,
  },
];

export default function DebugPage() {
  const { addToast, completeLesson } = useApp();
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedFix, setSelectedFix] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentChallenge = DEBUG_CHALLENGES[challengeIndex];

  const handleTestFix = () => {
    if (!selectedFix) {
      addToast('Select a patch option first!', 'warning');
      return;
    }

    if (selectedFix === currentChallenge.correctOptionId) {
      setIsFixed(true);
      completeLesson(currentChallenge.id, currentChallenge.xp);
      addToast(`Bug Fixed! +${currentChallenge.xp} XP 🐛✨`, 'success');
    } else {
      addToast('That patch did not fix the bug. Try another fix!', 'error');
    }
  };

  const handleNextChallenge = () => {
    setSelectedFix(null);
    setIsFixed(false);
    setShowHint(false);
    setChallengeIndex((prev) => (prev + 1) % DEBUG_CHALLENGES.length);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="flex items-center justify-between glass p-6 rounded-3xl border border-brand-500/20 shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Bug className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Debug Arena</h1>
            <p className="text-xs text-slate-400">Hunt down syntax & logic errors in real code snippets</p>
          </div>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition"
        >
          <Lightbulb className="w-4 h-4" />
          <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
        </button>
      </div>

      {showHint && (
        <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p><strong>Hint:</strong> {currentChallenge.hint}</p>
        </div>
      )}

      {/* Code Editor & Problem Box */}
      <Card glass className="border border-slate-800">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
              {currentChallenge.language}
            </span>
            <h2 className="font-bold text-lg text-white">{currentChallenge.title}</h2>
          </div>
          <span className="text-xs text-brand-300 font-semibold">+{currentChallenge.xp} XP</span>
        </div>

        <p className="text-sm text-slate-300 mb-4">{currentChallenge.description}</p>

        {/* Code Snippet Display */}
        <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-rose-300 border border-slate-800 mb-6 overflow-x-auto">
          <pre>{isFixed ? currentChallenge.fixedCode : currentChallenge.buggyCode}</pre>
        </div>

        {/* Select Patch Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select the Correct Patch:
          </h3>

          {currentChallenge.options.map((opt) => (
            <button
              key={opt.id}
              disabled={isFixed}
              onClick={() => setSelectedFix(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                selectedFix === opt.id
                  ? 'bg-brand-500/20 border-brand-500 text-white font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{opt.text}</span>
              {selectedFix === opt.id && <CheckCircle2 className="w-4 h-4 text-brand-400" />}
            </button>
          ))}
        </div>

        {/* Action controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {!isFixed ? (
            <Button
              variant="gradient"
              size="md"
              icon={Play}
              onClick={handleTestFix}
              disabled={!selectedFix}
            >
              Apply Patch & Test
            </Button>
          ) : (
            <div className="flex items-center gap-3 w-full justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Bug Successfully Patched!
              </span>
              <Button variant="secondary" size="md" icon={RefreshCw} onClick={handleNextChallenge}>
                Next Bug Challenge
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
