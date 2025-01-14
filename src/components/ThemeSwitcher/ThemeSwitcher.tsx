'use client';
import React, { useEffect, useState } from 'react';

const themes = ['default', 'classic', 'retro'] as const;
type Theme = (typeof themes)[number];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.includes(savedTheme as Theme)) {
      setTheme(savedTheme as Theme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <button className="button" onClick={toggleTheme}>
      Switch to {theme === 'default' ? 'Classic Hollywood' : theme === 'classic' ? 'Retro' : 'Default'} Theme
    </button>
  );
};

export default ThemeSwitcher;
