import { create } from 'zustand';

interface LoginDataState {
  username: string;
  password: string;
  showPassword: boolean;
  loggedIn: boolean;
}

export const useLoginDataStore = create<LoginDataState>(() => ({
  username: '',
  password: '',
  showPassword: false,
  loggedIn: false,
}));
