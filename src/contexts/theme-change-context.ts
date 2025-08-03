import { createContext } from 'react';

export const ThemeChangeContext = createContext<(() => void) | null>(null);
