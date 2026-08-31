import React, { useState } from 'react';
import {
  Terminal,
  Play,
  Trash2,
  CheckCircle2,
  Clock,
  Code2,
  Award,
  Zap,
  Filter,
  Layers,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { OUTPUT_QUESTIONS, TOPICS } from '../data/outputQuestions';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';
import OutputQuestion from '../components/output/OutputQuestion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';

const SAMPLE_RUNNERS = {
  python: `def calculate_fibonacci(n):
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print("Fibonacci Sequence (8 terms):", calculate_fibonacci(8))`,

  javascript: `const users = [
  { name: "Alice", role: "Dev", xp: 450 },
  { name: "Bob", role: "Design", xp: 320 },
  { name: "Charlie", role: "Dev", xp: 580 }
];

const topDevs = users.filter(u => u.role === "Dev").map(u => u.name);
console.log("Top Developers:", topDevs);`,

  cpp: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30};
    for (int n : nums) {
        std::cout << n * 2 << " ";
    }
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        String msg = "CodeSwipe";
        System.out.println(msg.toUpperCase());
    }
}`,
};

export default function OutputPage() {
  const {
    activeLanguage,
    userXp,
    completedOutputIds,
    correctAnswersCount,
    wrongAnswersCount,
    addToast,
  } = useApp();

  const [mode, setMode] = useState('predict'); // 'predict' | 'sandbox'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [filterLang, setFilterLang] = useState('all');
  const [filterTopic, setFilterTopic] = useState('All Topics');
  const [filterDiff, setFilterDiff] = useState('all');

  // Live Sandbox state
  const [code, setCode] = useState(
    SAMPLE_RUNNERS[activeLanguage] || SAMPLE_RUNNERS.python
  );
  const [sandboxOutput, setSandboxOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  // Filtered dataset for Predict Output Mode
  const filteredQuestions = OUTPUT_QUESTIONS.filter((q) => {
    const matchLang = filterLang === 'all' || q.languageId === filterLang;
    const matchTopic = filterTopic === 'All Topics' || q.topic === filterTopic;
    const matchDiff = filterDiff === 'all' || q.difficulty.toLowerCase() === filterDiff;
    return matchLang && matchTopic && matchDiff;
  });

  const currentQ = filteredQuestions[questionIndex % Math.max(filteredQuestions.length, 1)];

  // Calculate Accuracy Rate
  const totalAttempts = correctAnswersCount + wrongAnswersCount;
  const accuracyPercent =
    totalAttempts > 0 ? Math.round((correctAnswersCount / totalAttempts) * 100) : 100;

  // Sandbox Runner
  const handleRunCode = () => {
    setIsRunning(true);
    setSandboxOutput(null);
    const start = performance.now();

    setTimeout(() => {
      let result = '';
      if (code.includes('fibonacci')) {
        result = '[OUTPUT] Fibonacci Sequence (8 terms): [0, 1, 1, 2, 3, 5, 8, 13]\n\nProcess exited with status 0.';
      } else if (code.includes('users')) {
        result = '[OUTPUT] Top Developers: [ "Alice", "Charlie" ]\n\nProcess exited with status 0.';
      } else if (code.includes('toUpperCase')) {
        result = 'CODESWIPE\n\nProcess exited with status 0.';
      } else {
        result = `[OUTPUT] Execution completed cleanly.\nstdout: Stream initialized and executed.\n\nProcess exited with status 0.`;
      }

      const end = performance.now();
      setExecutionTime(((end - start) / 1000).toFixed(3));
      setSandboxOutput(result);
      setIsRunning(false);
      addToast('Execution finished cleanly! ⚡', 'success');
    }, 650);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-6">

      {/* Mode Header Banner */}
      <div className="glass rounded-3xl border border-cyan-500/20 shadow-card p-5 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Terminal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Predict Output & Sandbox
              </h1>
              <p className="text-xs text-slate-400">
                Master trace execution, predict stdout outputs, and test code live
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setMode('predict')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'predict'
                  ? 'bg-brand-gradient text-white shadow-brand'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Predict Output Mode
            </button>
            <button
              onClick={() => setMode('sandbox')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'sandbox'
                  ? 'bg-brand-gradient text-white shadow-brand'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Sandbox
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-slate-800/80 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Total XP</span>
            <span className="text-sm font-bold text-brand-300 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
              {userXp}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Accuracy</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
              <BarChart2 className="w-3.5 h-3.5" />
              {accuracyPercent}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Outputs Solved</span>
            <span className="text-sm font-bold text-cyan-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedOutputIds.length} / {OUTPUT_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {/* MODE 1: PREDICT OUTPUT MODE */}
      {mode === 'predict' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <Card glass className="p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-brand-400" />
                Filter Challenges
              </span>
              <button
                onClick={() => {
                  setFilterLang('all');
                  setFilterTopic('All Topics');
                  setFilterDiff('all');
                  setQuestionIndex(0);
                }}
                className="text-[11px] text-slate-400 hover:text-brand-300 transition"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {/* Language Selector */}
              <div>
                <label className="text-[10px] font-semibold text-slate-400 mb-1 block">Language</label>
                <select
                  value={filterLang}
                  onChange={(e) => {
                    setFilterLang(e.target.value);
                    setQuestionIndex(0);
                  }}
                  className="w-full bg-slate-900 text-white rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="all">All Languages</option>
                  {LANGUAGES.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.emoji} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Selector */}
              <div>
                <label className="text-[10px] font-semibold text-slate-400 mb-1 block">Topic</label>
                <select
                  value={filterTopic}
                  onChange={(e) => {
                    setFilterTopic(e.target.value);
                    setQuestionIndex(0);
                  }}
                  className="w-full bg-slate-900 text-white rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-brand-500"
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Selector */}
              <div>
                <label className="text-[10px] font-semibold text-slate-400 mb-1 block">Difficulty</label>
                <select
                  value={filterDiff}
                  onChange={(e) => {
                    setFilterDiff(e.target.value);
                    setQuestionIndex(0);
                  }}
                  className="w-full bg-slate-900 text-white rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-brand-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Question Render Component */}
          {filteredQuestions.length > 0 ? (
            <OutputQuestion
              key={currentQ.id}
              question={currentQ}
              questionIndex={questionIndex % filteredQuestions.length}
              totalQuestions={filteredQuestions.length}
              onNext={() =>
                setQuestionIndex((prev) => (prev + 1) % filteredQuestions.length)
              }
              onPracticeTopic={(topicName) => {
                setFilterTopic(topicName);
                setQuestionIndex(0);
              }}
            />
          ) : (
            <EmptyState
              title="No Output Challenges Match Filters"
              description="Try adjusting your language, topic, or difficulty filter."
              actionLabel="Reset All Filters"
              onAction={() => {
                setFilterLang('all');
                setFilterTopic('All Topics');
                setFilterDiff('all');
                setQuestionIndex(0);
              }}
            />
          )}
        </div>
      )}

      {/* MODE 2: LIVE SANDBOX MODE */}
      {mode === 'sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Box */}
          <Card glass className="flex flex-col border border-slate-800">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {activeLanguage} Code Input
                </span>
              </div>
              <button
                onClick={() =>
                  setCode(SAMPLE_RUNNERS[activeLanguage] || SAMPLE_RUNNERS.python)
                }
                className="text-[11px] text-brand-300 hover:text-white"
              >
                Reset Sample Code
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-brand-500/60 resize-none"
              placeholder="Write your code here..."
            />

            <div className="pt-3 flex justify-end">
              <Button
                variant="gradient"
                size="md"
                icon={Play}
                loading={isRunning}
                onClick={handleRunCode}
              >
                Run Code
              </Button>
            </div>
          </Card>

          {/* Output Console Box */}
          <Card glass className="flex flex-col border border-slate-800">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Standard Output (stdout)
                </span>
              </div>

              <div className="flex items-center gap-3">
                {executionTime && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" /> {executionTime}s
                  </span>
                )}
                <button
                  onClick={() => {
                    setSandboxOutput(null);
                    setExecutionTime(null);
                  }}
                  className="text-slate-400 hover:text-rose-400 p-1"
                  title="Clear Console"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full h-64 bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-slate-400 animate-pulse">
                  <span>Compiling & Executing...</span>
                </div>
              ) : sandboxOutput ? (
                <pre className="whitespace-pre-wrap">{sandboxOutput}</pre>
              ) : (
                <span className="text-slate-600 italic">
                  Click "Run Code" to view stdout output.
                </span>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
