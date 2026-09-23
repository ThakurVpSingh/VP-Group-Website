import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // themeMode can be: 'system' | 'light' | 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('vp_theme_mode') || 'system';
  });

  // effectiveTheme is the actual applied theme: 'light' | 'dark'
  const [effectiveTheme, setEffectiveTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vp_theme_mode');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let resolved = 'dark';
      if (themeMode === 'system') {
        resolved = mediaQuery.matches ? 'dark' : 'light';
      } else {
        resolved = themeMode;
      }

      setEffectiveTheme(resolved);

      const root = document.documentElement;
      const body = document.body;

      root.setAttribute('data-theme', resolved);
      body.setAttribute('data-theme', resolved);

      if (resolved === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
      }
    };

    applyTheme();

    const handleSystemChange = () => {
      if (themeMode === 'system') {
        applyTheme();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, [themeMode]);

  const setTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('vp_theme_mode', mode);
  };

  const toggleTheme = () => {
    if (themeMode === 'system') {
      setTheme('light');
    } else if (themeMode === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      themeMode: 'system',
      effectiveTheme: 'dark',
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};
