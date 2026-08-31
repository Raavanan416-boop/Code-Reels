import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function LandingPage() {
  const { signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, offer quick jump to learn or language select
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/select-language');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface-950 flex flex-col justify-between overflow-hidden bg-grid">
      {/* Glow Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Top Bar */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-brand animate-glow">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Code<span className="gradient-text">Swipe</span>
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-slate-800 text-xs font-semibold text-brand-300">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>v1.0 Developer Preview</span>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-12 max-w-4xl mx-auto w-full">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-8 text-sm text-slate-300 animate-float">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Short-Video Vertical Programming Reels</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Swipe. Code.{' '}
          <span className="gradient-text">Debug. Master.</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Level up your programming skills in bite-sized interactive reels.
          Designed for modern developers who learn by doing.
        </p>

        {/* Interactive Google Sign In CTA */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-brand-500/20 shadow-card max-w-sm w-full mx-auto mb-10">
          <h2 className="text-lg font-bold text-white mb-2">Start Learning Free</h2>
          <p className="text-xs text-slate-400 mb-6">
            Sign in with Google to sync your XP, streak, and language progress.
          </p>

          <Button
            variant="gradient"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handleGoogleLogin}
            className="shadow-brand text-base py-4"
          >
            {/* Google Icon SVG */}
            {!loading && (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            Continue with Google
          </Button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left">
          <div className="glass p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">5 Languages</h3>
              <p className="text-xs text-slate-400">C, C++, Python, Java, JavaScript</p>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">Vertical Swipe</h3>
              <p className="text-xs text-slate-400">Swipe through code snippets & quizzes</p>
            </div>
          </div>

          <div className="glass p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">Track Streaks</h3>
              <p className="text-xs text-slate-400">Build daily coding habits with XP rewards</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2026 CodeSwipe Inc. Designed for modern developers.</p>
      </footer>
    </div>
  );
}
