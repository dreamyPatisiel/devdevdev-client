import { create } from 'zustand';

export interface bottomButtonVisibleStore {
  isVisibleBottomButton: boolean;
  setIsVisibleBottomButton: (isVisible: boolean) => void;
}

export const bottomButtonVisibleStore = create<bottomButtonVisibleStore>((set) => ({
  isVisibleBottomButton: false,
  setIsVisibleBottomButton: (isVisible: boolean) => set({ isVisibleBottomButton: isVisible }),
}));
