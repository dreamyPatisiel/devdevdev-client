import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  alertCount: number;
  setAlertCount: (alertCount: number) => void;
  handleNewAlert: () => void;
  handleMarkAllAsRead: () => void;
  setBellDisabled: (disabled: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: true,
  alertCount: 0,
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
}));
