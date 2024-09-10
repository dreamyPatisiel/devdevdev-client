import { create } from 'zustand';

export interface bottomBtnVisibleStore {
  isVisibleBottomBtn: boolean;
  setIsVisibleBottomBtn: (isVisible: boolean) => void;
}

export const bottomBtnVisibleStore = create<bottomBtnVisibleStore>((set) => ({
  isVisibleBottomBtn: false,
  setIsVisibleBottomBtn: (isVisible: boolean) => set({ isVisibleBottomBtn: isVisible }),
}));
