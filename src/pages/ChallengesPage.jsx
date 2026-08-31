import React, { useState } from 'react';
import { Trophy, Zap, CheckCircle2, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Palindrome Validator',
    category: 'Strings & Algorithms',
    difficulty: 'beginner',
    xp: 50,
    description: 'Determine if a given string reads the same backwards as forwards ignoring case.',
    questionPrompt: 'Which expression correctly reverses a string `s` in Python?',
    options: [
      { id: 'a', text: 's[::-1]' },
      { id: 'b', text: 's.reverse()' },
      { id: 'c', text: 'reverse(s)' },
      { id: 'd', text: 's[1:0:-1]' },
    ],
    correctAnswerId: 'a',
  },
  {
    id: 'ch-2',
    title: 'Two Sum Pointer Strategy',
    category: 'Data Structures',
    difficulty: 'intermediate',
    xp: 80,
    description: 'Find two numbers in an array that sum up to a specific target value in O(n) time.',
    questionPrompt: 'What data structure enables O(1) average lookup time for complement values in Two Sum?',
    options: [
      { id: 'a', text: 'Hash Map / Dictionary' },
      { id: 'b', text: 'Binary Search Tree' },
      { id: 'c', text: 'Linked List' },
      { id: 'd', text: 'Stack' },
    ],
    correctAnswerId: 'a',
  },
  {
    id: 'ch-3',
    title: 'Fibonacci Dynamic Programming',
    category: 'Optimization',
    difficulty: 'advanced',
    xp: 120,
    description: 'Optimize recursive Fibonacci computation from O(2^n) exponential down to O(n) linear.',
    questionPrompt: 'What technique stores previously computed subproblem results to avoid redundant work?',
    options: [
      { id: 'a', text: 'Memoization' },
      { id: 'b', text: 'Tail Call Recursion' },
      { id: 'c', text: 'Heap Sort' },
      { id: 'd', text: 'Bit Manipulation' },
    ],
    correctAnswerId: 'a',
  },
];

export default function ChallengesPage() {
  const { addToast, completeLesson, completedLessonIds } = useApp();
  const [activeModalChallenge, setActiveModalChallenge] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleOpenChallenge = (challenge) => {
    setActiveModalChallenge(challenge);
    setSelectedOpt(null);
  };

  const handleSolveChallenge = () => {
    if (!selectedOpt) {
      addToast('Select an answer option!', 'warning');
      return;
    }

    if (selectedOpt === activeModalChallenge.correctAnswerId) {
      completeLesson(activeModalChallenge.id, activeModalChallenge.xp);
      addToast(`Challenge Completed! +${activeModalChallenge.xp} XP 🏆`, 'success');
      setActiveModalChallenge(null);
    } else {
      addToast('Incorrect solution attempt. Review and try again!', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="flex items-center justify-between glass p-6 rounded-3xl border border-brand-500/20 shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Daily Coding Challenges</h1>
            <p className="text-xs text-slate-400">Complete challenges to earn XP, level up, and build your streak</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>Daily Quests</span>
        </div>
      </div>

      {/* Challenge Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {CHALLENGES.map((ch) => {
          const isDone = completedLessonIds.includes(ch.id);
          return (
            <Card
              key={ch.id}
              glass
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-300">{ch.category}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {ch.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{ch.title}</h3>
                <p className="text-xs text-slate-400 max-w-xl">{ch.description}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +{ch.xp} XP
                </span>

                {isDone ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Solved
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenChallenge(ch)}
                  >
                    Solve
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Interactive Modal dialog for active challenge */}
      <Modal
        isOpen={!!activeModalChallenge}
        onClose={() => setActiveModalChallenge(null)}
        title={activeModalChallenge?.title || 'Challenge'}
      >
        {activeModalChallenge && (
          <div className="space-y-4">
            <p className="text-sm text-slate-300">{activeModalChallenge.description}</p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-semibold">
              ❓ {activeModalChallenge.questionPrompt}
            </div>

            <div className="space-y-2">
              {activeModalChallenge.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOpt(opt.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition ${
                    selectedOpt === opt.id
                      ? 'bg-brand-500/20 border-brand-500 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveModalChallenge(null)}
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={handleSolveChallenge}
                disabled={!selectedOpt}
              >
                Submit Solution
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
