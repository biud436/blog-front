import { rootStore } from '@/store';

export type ThemeKey = 'login' | 'manage';

export function useThemeStore(themeName: ThemeKey) {
    const { themeStore } = rootStore;
    return themeStore[themeName];
}
