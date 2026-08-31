import React from 'react';

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-solid border-brand-500 border-t-transparent ${sizes[size] || sizes.md} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
