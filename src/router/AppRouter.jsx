import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LandingPage from '../pages/LandingPage';
import LanguageSelectPage from '../pages/LanguageSelectPage';
import LearnPage from '../pages/LearnPage';
import DebugPage from '../pages/DebugPage';
import OutputPage from '../pages/OutputPage';
import ChallengesPage from '../pages/ChallengesPage';
import ProgressPage from '../pages/ProgressPage';
import ProfilePage from '../pages/ProfilePage';
import AppShell from '../components/layout/AppShell';
import Spinner from '../components/ui/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/select-language" replace />;
  }

  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing / Auth (Redirect logged-in users away) */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <LandingPage />
            </PublicOnlyRoute>
          }
        />

        {/* Protected Language Selection */}
        <Route
          path="/select-language"
          element={
            <ProtectedRoute>
              <LanguageSelectPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated Application Pages with Shell Navigation */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
