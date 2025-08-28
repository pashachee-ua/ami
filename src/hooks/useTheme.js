import { useState, useEffect } from 'react';

// Глобальное состояние темы
let globalTheme = localStorage.getItem('theme') || 'toxic';
const listeners = [];

const notifyListeners = (newTheme) => {
  listeners.forEach(listener => listener(newTheme));
};

const useTheme = () => {
  const [theme, setThemeState] = useState(globalTheme);

  useEffect(() => {
    const listener = (newTheme) => {
      setThemeState(newTheme);
    };
    
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const setTheme = (newTheme) => {
    globalTheme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    notifyListeners(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
