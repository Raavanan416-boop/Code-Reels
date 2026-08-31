import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const STORAGE_LANG_KEY = 'codeswipe_selected_languages';
const STORAGE_ACTIVE_LANG = 'codeswipe_active_language';

export const AppProvider = ({ children }) => {
  const [selectedLanguages, setSelectedLanguagesState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_LANG_KEY);
      return stored ? JSON.parse(stored) : ['python', 'javascript'];
    } catch {
      return ['python', 'javascript'];
    }
  });

  const [activeLanguage, setActiveLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_ACTIVE_LANG) || 'python';
    } catch {
      return 'python';
    }
  });

  const [toasts, setToasts] = useState([]);
  const [userXp, setUserXp] = useState(140);
  const [streakCount, setStreakCount] = useState(3);
  const [completedLessonIds, setCompletedLessonIds] = useState(['py-1']);

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

  const completeLesson = (lessonId, xpReward) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      setUserXp((prev) => prev + xpReward);
      addToast(`+${xpReward} XP earned! Lesson Completed 🎉`, 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedLanguages,
        setSelectedLanguages,
        activeLanguage,
        setActiveLanguage,
        userXp,
        streakCount,
        completedLessonIds,
        completeLesson,
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
