import { createContext } from 'react';
import type { T_THEMES } from '../types';

export const ThemeContext = createContext<T_THEMES | null>(null);
