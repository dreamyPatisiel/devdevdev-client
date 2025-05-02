import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  alertCount: number;
  isAlertListOpen: boolean;
  setAlertCount: (alertCount: number) => void;
  handleNewAlert: () => void;
  handleMarkAllAsRead: () => void;
  setBellDisabled: (disabled: boolean) => void;
  setAlertListOpen: (isOpen: boolean) => void;
  toggleAlertList: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: true,
  alertCount: 0,
  isAlertListOpen: false,
  setAlertCount: (alertCount: number) => {
    set({ alertCount: alertCount });
  },
  handleNewAlert: () => {
    set({ isBellDisabled: false });
  },
  handleMarkAllAsRead: () => {
    set({ isBellDisabled: true });
  },
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
  setAlertListOpen: (isOpen) => set({ isAlertListOpen: isOpen }),
  toggleAlertList: () => set((state) => ({ isAlertListOpen: !state.isAlertListOpen })),
}));
