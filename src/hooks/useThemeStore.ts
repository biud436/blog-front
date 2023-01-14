import { rootStore } from '@/store';

export function useThemeStore(themeName: string) {
    const { themeStore } = rootStore;
    return themeStore[themeName];
}
