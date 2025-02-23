import { create } from 'zustand';
import { useColorScheme } from 'nativewind';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      return { theme: state.theme === 'light' ? 'dark' : 'light' };
    }),
}));
