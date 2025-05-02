import { create } from 'zustand';

interface AlertStore {
  alertCount: number;
  isBellDisabled: boolean;
  isAlertListOpen: boolean;
  setAlertCount: (alertCount: number) => void;
  setBellDisabled: (disabled: boolean) => void;
  setAlertListOpen: (isOpen: boolean) => void;
  toggleAlertList: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alertCount: 0,
  isBellDisabled: true,
  isAlertListOpen: false,
  setAlertCount: (alertCount: number) => {
    set({ alertCount: alertCount });
  },
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
  setAlertListOpen: (isOpen) => set({ isAlertListOpen: isOpen }),
  toggleAlertList: () => set((state) => ({ isAlertListOpen: !state.isAlertListOpen })),
}));
