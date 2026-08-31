import React from 'react';
import { Check } from 'lucide-react';
import Card from '../ui/Card';

export default function LanguageCard({ language, selected = false, onToggle }) {
  const difficultyBadges = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced',
    expert: 'badge-expert',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(language.id);
    }
  };

  return (
    <Card
      active={selected}
      onClick={() => onToggle(language.id)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-label={`Select ${language.name}`}
      className="group transition-all duration-300 transform hover:-translate-y-1.5 focus-ring"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            {language.emoji}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-brand-300 transition-colors">
              {language.name}
            </h3>
            <span
              className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md ${difficultyBadges[language.difficulty] || 'badge-beginner'}`}
            >
              {language.difficulty}
            </span>
          </div>
        </div>

        {/* Selection indicator pill */}
        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
            selected
              ? 'bg-brand-500 border-brand-400 text-white shadow-brand'
              : 'border-slate-600 bg-slate-800/50 group-hover:border-slate-400'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        {language.description}
      </p>
    </Card>
  );
}
