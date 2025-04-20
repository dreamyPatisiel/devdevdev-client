import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  alertCount: number;
  handleNewAlert: (alert: string) => void;
  handleMarkAllAsRead: () => void;
  setBellDisabled: (disabled: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: false,
  alertCount: 0,
  setAlertCount: (alertCount: number) => {
    set({ alertCount: alertCount });
  },
  handleNewAlert: (alert: string) => {
    set({ isBellDisabled: false });
  },
  handleMarkAllAsRead: () => {
    set({ isBellDisabled: true });
  },
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
}));
