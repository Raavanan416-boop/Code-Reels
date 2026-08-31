import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_LANG_KEY = 'codeswipe_selected_languages';
const STORAGE_ACTIVE_LANG = 'codeswipe_active_language';
const STORAGE_COMPLETED_KEY = 'codeswipe_completed_lessons';
const STORAGE_SAVED_KEY = 'codeswipe_saved_lessons';
const STORAGE_STATS_KEY = 'codeswipe_user_stats';

export const AppProvider = ({ children }) => {
  const [selectedLanguages, setSelectedLanguagesState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_LANG_KEY);
      return stored ? JSON.parse(stored) : ['python', 'javascript', 'c', 'cpp', 'java'];
    } catch {
      return ['python', 'javascript', 'c', 'cpp', 'java'];
    }
  });

  const [activeLanguage, setActiveLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_ACTIVE_LANG) || 'javascript';
    } catch {
      return 'javascript';
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_COMPLETED_KEY);
      return stored ? JSON.parse(stored) : ['js-1', 'py-1'];
    } catch {
      return ['js-1', 'py-1'];
    }
  });

  const [savedLessonIds, setSavedLessonIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_STATS_KEY);
      return stored
        ? JSON.parse(stored)
        : { xp: 140, streak: 3, correctAnswers: 12, wrongAnswers: 3 };
    } catch {
      return { xp: 140, streak: 3, correctAnswers: 12, wrongAnswers: 3 };
    }
  });

  const [toasts, setToasts] = useState([]);

  const setSelectedLanguages = (langs) => {
    setSelectedLanguagesState(langs);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, JSON.stringify(langs));
    } catch (e) {
      console.error('Failed to save selected languages', e);
    }
  };

  const setActiveLanguage = (langId) => {
    setActiveLanguageState(langId);
    try {
      localStorage.setItem(STORAGE_ACTIVE_LANG, langId);
    } catch (e) {
      console.error('Failed to save active language', e);
    }
  };

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const completeLesson = (lessonId, xpReward = 15) => {
    if (!completedLessonIds.includes(lessonId)) {
      const nextCompleted = [...completedLessonIds, lessonId];
      setCompletedLessonIds(nextCompleted);
      try {
        localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(nextCompleted));
      } catch (e) {
        console.error('Failed to save completed lessons', e);
      }

      setStats((prev) => {
        const nextStats = { ...prev, xp: prev.xp + xpReward };
        try {
          localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(nextStats));
        } catch (e) {
          console.error('Failed to save stats', e);
        }
        return nextStats;
      });

      addToast(`+${xpReward} XP earned! Lesson Completed 🎉`, 'success');
    }
  };

  const toggleSaveLesson = (lessonId) => {
    setSavedLessonIds((prev) => {
      const isSaved = prev.includes(lessonId);
      const nextSaved = isSaved
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];

      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(nextSaved));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }

      addToast(isSaved ? 'Removed from saved lessons 🔖' : 'Lesson saved to bookmarks! 🔖', 'info');
      return nextSaved;
    });
  };

  const recordAnswer = (isCorrect) => {
    setStats((prev) => {
      const nextStats = {
        ...prev,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
      };
      try {
        localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(nextStats));
      } catch (e) {
        console.error('Failed to save answer stats', e);
      }
      return nextStats;
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedLanguages,
        setSelectedLanguages,
        activeLanguage,
        setActiveLanguage,
        userXp: stats.xp,
        streakCount: stats.streak,
        correctAnswersCount: stats.correctAnswers,
        wrongAnswersCount: stats.wrongAnswers,
        completedLessonIds,
        savedLessonIds,
        completeLesson,
        toggleSaveLesson,
        recordAnswer,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
