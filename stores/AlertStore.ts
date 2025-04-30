import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  alertCount: number;
  isAlertListOpen: boolean;
  isJustLoggedIn: boolean;
  setAlertCount: (alertCount: number) => void;
  setBellDisabled: (disabled: boolean) => void;
  setAlertListOpen: (isOpen: boolean) => void;
  toggleAlertList: () => void;
  setIsJustLoggedIn: (isJustLoggedIn: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: false,
  alertCount: 0,
  isAlertListOpen: false,
  isJustLoggedIn: false,
  setAlertCount: (alertCount: number) => {
    set({ alertCount: alertCount });
  },
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
  setAlertListOpen: (isOpen) => set({ isAlertListOpen: isOpen }),
  toggleAlertList: () => set((state) => ({ isAlertListOpen: !state.isAlertListOpen })),
  setIsJustLoggedIn: (isJustLoggedIn: boolean) => set({ isJustLoggedIn }),
}));
