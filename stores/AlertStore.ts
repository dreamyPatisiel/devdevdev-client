import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  isAlertListOpen: boolean;
  setBellDisabled: (disabled: boolean) => void;
  setAlertListOpen: (isOpen: boolean) => void;
  toggleAlertList: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: true,
  isAlertListOpen: false,
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
  setAlertListOpen: (isOpen) => set({ isAlertListOpen: isOpen }),
  toggleAlertList: () => set((state) => ({ isAlertListOpen: !state.isAlertListOpen })),
}));
