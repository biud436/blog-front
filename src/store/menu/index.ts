import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;

  toogle: () => void;
  close: () => void;
  open: () => void;
  setOpen: (isOpen: boolean) => void;
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  isOpen: false,

  toogle: () => {
    set({ isOpen: !get().isOpen });
  },
  close: () => {
    set({ isOpen: false });
  },
  open: () => {
    set({ isOpen: true });
  },
  setOpen: (isOpen: boolean) => {
    set({ isOpen });
  },
}));
