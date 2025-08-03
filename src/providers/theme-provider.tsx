import React, { useState } from 'react';
import { THEMES } from '../constants';
import { ThemeChangeContext } from '../contexts/theme-change-context';
import { ThemeContext } from '../contexts/theme-context';
import type { T_THEMES } from '../types';

export const ThemeProvier: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<T_THEMES>(THEMES.LIGHT);

  const toggleTheme = () => {
    setTheme((theme) => (theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  return (
    <ThemeContext value={theme}>
      <ThemeChangeContext value={toggleTheme}>{children}</ThemeChangeContext>
    </ThemeContext>
  );
};
