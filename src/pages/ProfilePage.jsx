import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, SlidersHorizontal, ShieldCheck, Mail, Calendar, Award, Key } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { isFirebaseConfigured } from '../config/firebase';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { selectedLanguages, userXp, streakCount } = useApp();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const selectedLangObjs = LANGUAGES.filter((l) => selectedLanguages.includes(l.id));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* User Header Profile Card */}
      <Card glass className="border border-brand-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6 p-6">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-20 h-20 rounded-full border-2 border-brand-500 shadow-brand object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center text-2xl font-bold text-white shadow-brand">
            {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : 'CS'}
          </div>
        )}

        <div className="flex-1 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isFirebaseConfigured() ? 'Firebase Google Authenticated' : 'Google Auth Active'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">{user?.displayName || 'Developer'}</h1>
          <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <Mail className="w-3.5 h-3.5" /> {user?.email || 'dev@codeswipe.io'}
          </p>
          {(user?.uid || user?.id) && (
            <p className="text-[11px] text-slate-500 flex items-center justify-center sm:justify-start gap-1 font-mono">
              <Key className="w-3 h-3 text-slate-400" /> UID: {user.uid || user.id}
            </p>
          )}
        </div>
      </Card>

      {/* Account Details & Stats */}
      <Card glass className="border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white mb-2">Account Overview</h2>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">Total Earned XP</span>
            <span className="text-lg font-bold text-brand-300">{userXp} XP</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block mb-1">Daily Streak</span>
            <span className="text-lg font-bold text-amber-400">{streakCount} Days</span>
          </div>
        </div>
      </Card>

      {/* Active Languages Card */}
      <Card glass className="border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Active Languages</h2>
          <Button
            variant="ghost"
            size="sm"
            icon={SlidersHorizontal}
            onClick={() => navigate('/select-language')}
          >
            Edit Selection
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedLangObjs.map((lang) => (
            <span
              key={lang.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white"
            >
              <span>{lang.emoji}</span> {lang.name}
            </span>
          ))}
        </div>
      </Card>

      {/* Logout Action */}
      <div className="pt-2">
        <Button
          variant="danger"
          size="md"
          fullWidth
          icon={LogOut}
          onClick={handleSignOut}
        >
          Sign Out of CodeSwipe
        </Button>
      </div>
    </div>
  );
}
