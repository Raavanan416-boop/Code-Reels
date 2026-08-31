import React from 'react';
import { Lightbulb, Sparkles, Check } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function HintModal({ isOpen, onClose, lesson }) {
  if (!lesson) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lesson Hint & Insight" maxWidth="max-w-md">
      <div className="space-y-4">
        {/* Hint Header */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Lightbulb className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-amber-200 mb-1 text-sm">Key Learning Hint</h4>
            <p className="leading-relaxed">{lesson.hint || 'Analyze how variables and execution flow interact in this code snippet.'}</p>
          </div>
        </div>

        {/* Visual / Conceptual Breakdown */}
        {lesson.visualExplanation && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
            <span className="font-bold text-brand-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Mental Model:
            </span>
            <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{lesson.visualExplanation}</p>
          </div>
        )}

        {/* Takeaway */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-xs space-y-1 text-slate-400">
          <span className="font-semibold text-slate-200">Takeaway:</span>
          <p>{lesson.explanation}</p>
        </div>

        <Button variant="primary" size="md" fullWidth onClick={onClose}>
          Got it!
        </Button>
      </div>
    </Modal>
  );
}
