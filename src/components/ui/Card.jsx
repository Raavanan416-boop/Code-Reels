import React from 'react';

export default function Card({
  children,
  className = '',
  hoverable = true,
  active = false,
  onClick,
  glass = true,
  gradientBorder = false,
  ...props
}) {
  const baseClass = glass ? 'glass' : 'bg-surface-100 border border-slate-800';
  const hoverClass = hoverable
    ? 'hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-brand transition-all duration-300 cursor-pointer'
    : '';
  const activeClass = active
    ? 'ring-2 ring-brand-500 border-brand-500/80 bg-brand-500/10'
    : '';
  const gradientClass = gradientBorder
    ? 'p-[1px] bg-gradient-to-r from-brand-500 via-accent-500 to-cyan-400 rounded-2xl'
    : 'rounded-2xl';

  const cardContent = (
    <div
      onClick={onClick}
      className={`relative p-5 overflow-hidden rounded-2xl ${baseClass} ${hoverClass} ${activeClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  if (gradientBorder) {
    return <div className={gradientClass}>{cardContent}</div>;
  }

  return cardContent;
}
