import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  showLabel = false,
  color = 'brand',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const gradients = {
    brand: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 ${heights[size] || heights.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${gradients[color] || gradients.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
