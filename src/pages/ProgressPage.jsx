import React from 'react';
import { BarChart3, Award, Flame, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import ProgressBar from '../components/ui/ProgressBar';
import Card from '../components/ui/Card';

export default function ProgressPage() {
  const { userXp, streakCount, completedLessonIds, savedLessonIds, selectedLanguages, correctAnswersCount, wrongAnswersCount } = useApp();

  const userLevel = Math.floor(userXp / 100) + 1;
  const currentLevelXp = userXp % 100;

  const ACHIEVEMENTS = [
    { id: '1', title: 'First Swipe', desc: 'Completed your first CodeSwipe reel', icon: '⚡', unlocked: completedLessonIds.length > 0 },
    { id: '2', title: 'Language Explorer', desc: 'Selected 2 or more languages', icon: '🌐', unlocked: selectedLanguages.length >= 2 },
    { id: '3', title: 'Streak Master', desc: 'Maintained a 3-day coding streak', icon: '🔥', unlocked: streakCount >= 3 },
    { id: '4', title: 'Bug Hunter', desc: 'Patched a code bug in Debug Arena', icon: '🐛', unlocked: true },
    { id: '5', title: 'XP Titan', desc: 'Earned 100+ total XP', icon: '💎', unlocked: userXp >= 100 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex items-center justify-between glass p-6 rounded-3xl border border-brand-500/20 shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Progress & Analytics</h1>
            <p className="text-xs text-slate-400">Track your daily streak, XP gain, and unlocked developer badges</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 text-brand-300 font-extrabold border border-brand-500/40 text-sm">
          <Award className="w-4 h-4 text-brand-400" />
          <span>Level {userLevel}</span>
        </div>
      </div>

      {/* Level XP Progress Card */}
      <Card glass className="border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-sm font-bold">
          <span className="text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" /> Level {userLevel} Developer
          </span>
          <span className="text-slate-400 text-xs">
            {currentLevelXp} / 100 XP to Level {userLevel + 1}
          </span>
        </div>

        <ProgressBar value={currentLevelXp} max={100} size="lg" color="brand" />

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Total XP</div>
            <div className="text-xl font-extrabold text-white">{userXp}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Daily Streak</div>
            <div className="text-xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400" /> {streakCount}d
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Lessons Done</div>
            <div className="text-xl font-extrabold text-emerald-400">{completedLessonIds.length}</div>
          </div>
        </div>

        {/* Answer Accuracy Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Correct ✅</div>
            <div className="text-xl font-extrabold text-emerald-400">{correctAnswersCount}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Wrong ❌</div>
            <div className="text-xl font-extrabold text-rose-400">{wrongAnswersCount}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Saved 🔖</div>
            <div className="text-xl font-extrabold text-brand-300">{savedLessonIds.length}</div>
          </div>
        </div>
      </Card>

      {/* Language Mastery Progress Breakdown */}
      <Card glass className="border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white mb-2">Language Mastery</h2>
        <div className="space-y-3">
          {LANGUAGES.filter((l) => selectedLanguages.includes(l.id)).map((lang) => {
            const masteryVal = lang.id === 'python' ? 65 : lang.id === 'javascript' ? 40 : 20;
            return (
              <div key={lang.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <span>{lang.emoji}</span> {lang.name}
                  </span>
                  <span className="text-slate-400">{masteryVal}%</span>
                </div>
                <ProgressBar value={masteryVal} max={100} size="sm" color="brand" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements Grid */}
      <Card glass className="border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white mb-2">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                ach.unlocked
                  ? 'bg-slate-900/90 border-brand-500/30'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-50'
              }`}
            >
              <div className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700/50 shrink-0">
                {ach.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{ach.title}</h3>
                  {ach.unlocked && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
