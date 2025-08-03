import { useContext } from 'react';
import { ThemeChangeContext } from '../contexts/theme-change-context';

export const useThemeChange = () => useContext(ThemeChangeContext);
