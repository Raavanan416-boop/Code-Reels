import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Award, LogOut, Code2, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';

export default function Header() {
  const { user, signOut } = useAuth();
  const { userXp, streakCount, activeLanguage, setActiveLanguage, selectedLanguages } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const activeLangObj = LANGUAGES.find((l) => l.id === activeLanguage) || LANGUAGES[0];
  const userInitials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'CS';

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand logo (mobile & desktop) */}
        <div
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-brand group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white hidden sm:inline">
            Code<span className="gradient-text">Swipe</span>
          </span>
        </div>

        {/* Selected language pill switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {LANGUAGES.filter((l) => selectedLanguages.includes(l.id)).map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-slate-900 text-white">
                  {lang.emoji} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User Stats & Avatar */}
        <div className="flex items-center gap-3">
          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>{streakCount}d</span>
          </div>

          {/* User XP */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-brand-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-brand-400" />
            <span>{userXp} XP</span>
          </div>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full border border-brand-500/50 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs font-bold text-white shadow-inner">
                {userInitials}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
