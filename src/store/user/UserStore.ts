import { UserPayload } from '@/models/UserPayload';
import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

interface UserState {
  user: Partial<UserPayload>;
  isAuthorized: boolean;
  isDone: boolean;
  loginTheme: PaletteMode;
  setUser: (user: Partial<UserPayload>) => void;
  clearUser: () => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
  setIsDone: (isDone: boolean) => void;
  setLoginTheme: (mode: PaletteMode) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {},
  isAuthorized: false,
  isDone: false,
  loginTheme: 'light',
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} }),
  setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
  setIsDone: (isDone) => set({ isDone }),
  setLoginTheme: (mode) => set({ loginTheme: mode }),
}));
