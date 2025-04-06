import { create } from 'zustand';

export type PopupDisplayType = 'AlertList' | null;

export interface useFullPopupVisibleStore {
  popupType: PopupDisplayType;
  isVisibleFullPopup: boolean;
  openFullPopup: ({ popupType }: { popupType: PopupDisplayType }) => void;
  closeFullPopup: () => void;
}

export const useFullPopupVisibleStore = create<useFullPopupVisibleStore>((set) => ({
  popupType: null,
  isVisibleFullPopup: false,
  openFullPopup: ({ popupType }: { popupType: PopupDisplayType }) =>
    set({ isVisibleFullPopup: true, popupType: popupType }),
  closeFullPopup: () => set({ popupType: null, isVisibleFullPopup: false }),
}));
