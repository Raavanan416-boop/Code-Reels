import React from 'react';
import { Layers } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Layers,
  title = 'No content found',
  description = 'There are no items to display at this moment.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass rounded-2xl border border-slate-800 my-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 text-brand-400">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-400 mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button variant="gradient" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
