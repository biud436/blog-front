import {create} from 'zustand';

interface RootState {
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
}

export const useRootStore = create<RootState>((set) => ({
  isPrivate: false,
  setIsPrivate: (isPrivate) => set({ isPrivate }),
}));
