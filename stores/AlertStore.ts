import { create } from 'zustand';

interface AlertStore {
  isBellDisabled: boolean;
  handleMarkAllAsRead: () => void;
  setBellDisabled: (disabled: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isBellDisabled: false,
  handleNewAlert: (alert: string) => {
    set({ isBellDisabled: false });
  },
  handleMarkAllAsRead: () => {
    set({ isBellDisabled: true });
  },
  setBellDisabled: (disabled) => set({ isBellDisabled: disabled }),
}));
