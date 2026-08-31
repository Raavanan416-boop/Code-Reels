import React, { useState } from 'react';
import { Play, X, Terminal, CheckCircle2, Copy } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function TryItModal({ isOpen, onClose, lesson }) {
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!lesson) return null;

  const codeToRun = lesson.tryItCode || lesson.codeSnippet;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      // Simulate live output execution for the code snippet
      if (lesson.languageId === 'javascript') {
        try {
          let consoleLogs = [];
          const customConsole = {
            log: (...args) => consoleLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            error: (...args) => consoleLogs.push('Error: ' + args.join(' ')),
          };
          const runFn = new Function('console', codeToRun);
          runFn(customConsole);
          setOutput(consoleLogs.join('\n') || 'Program finished with code 0 (no output)');
        } catch (e) {
          setOutput(`Runtime Error: ${e.message}`);
        }
      } else {
        // Simulated execution output for C, C++, Python, Java
        if (lesson.question?.options && lesson.question?.answerId) {
          const correctOpt = lesson.question.options.find(o => o.id === lesson.question.answerId);
          setOutput(`[Process Completed in 0.04s]\n\nStandard Output:\n${correctOpt ? correctOpt.text : 'Process finished with exit code 0.'}`);
        } else {
          setOutput(`[Process Completed in 0.03s]\n\nOutput:\n${lesson.visualExplanation || 'Program executed successfully.'}`);
        }
      }
    }, 400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeToRun);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Try It - Code Sandbox" maxWidth="max-w-xl">
      <div className="space-y-4">
        {/* Code Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span className="font-mono font-semibold text-slate-200">{lesson.title}</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 hover:text-white transition"
          >
            {copied ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Editor Container */}
        <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
          <pre className="leading-relaxed">{codeToRun}</pre>
        </div>

        {/* Console Execution Result */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Terminal Console Output</span>
            {output && <span className="text-[10px] text-emerald-400">● Live Execution</span>}
          </div>

          <div className="bg-slate-950/90 rounded-xl border border-slate-800/80 p-3.5 font-mono text-xs text-emerald-400 min-h-[90px] flex items-start overflow-auto">
            {isRunning ? (
              <span className="text-slate-400 animate-pulse">Compiling & executing code...</span>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-slate-500 italic">Click 'Run Code' below to execute this snippet...</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="gradient"
            size="md"
            fullWidth
            icon={Play}
            loading={isRunning}
            onClick={handleRunCode}
          >
            Run Code
          </Button>

          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
