import { create } from 'zustand';

export interface bottomButtonVisibleStore {
  isVisibleBottomBtn: boolean;
  setIsVisibleBottomBtn: (isVisible: boolean) => void;
}

export const bottomButtonVisibleStore = create<bottomButtonVisibleStore>((set) => ({
  isVisibleBottomBtn: false,
  setIsVisibleBottomBtn: (isVisible: boolean) => set({ isVisibleBottomBtn: isVisible }),
}));
