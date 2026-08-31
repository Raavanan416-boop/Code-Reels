import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';
import LanguageCard from '../components/language/LanguageCard';
import Button from '../components/ui/Button';

export default function LanguageSelectPage() {
  const { selectedLanguages, setSelectedLanguages, setActiveLanguage, addToast } = useApp();
  const [selected, setSelected] = useState(selectedLanguages);
  const navigate = useNavigate();

  const handleToggle = (langId) => {
    setSelected((prev) =>
      prev.includes(langId)
        ? prev.filter((id) => id !== langId)
        : [...prev, langId]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      addToast('Please select at least one language to continue', 'warning');
      return;
    }
    setSelectedLanguages(selected);
    setActiveLanguage(selected[0]);
    addToast(`Selected ${selected.length} language(s)! Welcome to CodeSwipe 🚀`, 'success');
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col justify-between p-4 sm:p-8 bg-grid">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-8 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-500/30 text-xs font-semibold text-brand-300 mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize Your Feed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Choose Your <span className="gradient-text">Languages</span>
          </h1>
          <p className="text-sm text-slate-400">
            Select one or multiple programming languages you want to master. You can update this anytime.
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {LANGUAGES.map((lang) => (
            <LanguageCard
              key={lang.id}
              language={lang}
              selected={selected.includes(lang.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Bottom CTA Footer */}
        <div className="sticky bottom-4 glass p-4 rounded-2xl border border-slate-800 shadow-card flex items-center justify-between gap-4 max-w-xl mx-auto backdrop-blur-xl">
          <div className="text-xs text-slate-400">
            <span className="font-bold text-white text-sm">{selected.length}</span> of {LANGUAGES.length} selected
          </div>

          <Button
            variant="gradient"
            size="md"
            disabled={selected.length === 0}
            onClick={handleContinue}
            className="px-6"
          >
            <span>Continue to Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
