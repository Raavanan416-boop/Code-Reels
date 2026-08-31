import React from 'react';
import Spinner from './Spinner';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-ring overflow-hidden select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none';

  const variants = {
    primary:
      'bg-brand-500 hover:bg-brand-600 text-white shadow-brand hover:shadow-indigo-500/40',
    gradient:
      'bg-brand-gradient text-white shadow-brand hover:shadow-purple-500/40 hover:brightness-110',
    secondary:
      'bg-surface-100 hover:bg-slate-800 text-slate-200 border border-slate-700/60',
    outline:
      'bg-transparent border border-brand-500/50 text-brand-400 hover:bg-brand-500/10 hover:border-brand-500',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <Spinner size={size === 'sm' ? 'sm' : 'md'} className="mr-1" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
