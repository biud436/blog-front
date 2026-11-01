import { create } from 'zustand';

interface PaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/** ⌘K 커맨드 팔레트의 열림 상태 */
export const usePaletteStore = create<PaletteState>()(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
}));
