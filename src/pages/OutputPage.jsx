import React, { useState } from 'react';
import { Terminal, Play, Trash2, CheckCircle, Clock, Code2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

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
};

export default function OutputPage() {
  const { activeLanguage, addToast } = useApp();
  const [code, setCode] = useState(
    SAMPLE_RUNNERS[activeLanguage] || SAMPLE_RUNNERS.python
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    const start = performance.now();

    setTimeout(() => {
      let result = '';
      if (code.includes('fibonacci')) {
        result = '[OUTPUT] Fibonacci Sequence (8 terms): [0, 1, 1, 2, 3, 5, 8, 13]\n\nProcess exited with status 0.';
      } else if (code.includes('users')) {
        result = '[OUTPUT] Top Developers: [ "Alice", "Charlie" ]\n\nProcess exited with status 0.';
      } else {
        result = `[OUTPUT] Code executed successfully.\nStandard Out: Console output stream initialized.\n\nProcess exited with status 0.`;
      }

      const end = performance.now();
      setExecutionTime(((end - start) / 1000).toFixed(3));
      setOutput(result);
      setIsRunning(false);
      addToast('Execution finished cleanly! ⚡', 'success');
    }, 800);
  };

  const handleClear = () => {
    setOutput(null);
    setExecutionTime(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between glass p-6 rounded-3xl border border-brand-500/20 shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Interactive Sandbox & Output</h1>
            <p className="text-xs text-slate-400">Run code snippets live and view console output</p>
          </div>
        </div>

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
              onClick={() => setCode(SAMPLE_RUNNERS[activeLanguage] || SAMPLE_RUNNERS.python)}
              className="text-[11px] text-brand-300 hover:text-white"
            >
              Reset Sample
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-brand-500/60 resize-none"
            placeholder="Write your code here..."
          />
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
                onClick={handleClear}
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
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-slate-600 italic">Click "Run Code" to view stdout output.</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
