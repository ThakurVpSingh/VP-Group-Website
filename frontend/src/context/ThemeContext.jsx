import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  themeMode: 'default',
  effectiveTheme: 'default',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Ensure clean default view: clear any past stored preference
    try {
      localStorage.removeItem('vp_theme_mode');
    } catch (e) {
      // ignore in restricted envs
    }

    const root = document.documentElement;
    const body = document.body;

    // Reset theme overrides on root & body to preserve simple default view
    root.removeAttribute('data-theme');
    body.removeAttribute('data-theme');
    root.classList.remove('dark', 'light');
    body.classList.remove('dark-theme', 'light-theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode: 'default', effectiveTheme: 'default', setTheme: () => {}, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
