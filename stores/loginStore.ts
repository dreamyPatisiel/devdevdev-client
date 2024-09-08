import { create } from 'zustand';

export interface loginStatusStore {
  loginStatus: 'login' | 'logout' | 'loading' | 'account-delete';
  setLoginStatus: () => void;
  setLogoutStatus: () => void;
  setAccountDeleteStatus: () => void;
}

export const useLoginStatusStore = create<loginStatusStore>((set) => ({
  loginStatus: 'loading',
  setLoginStatus: () => set({ loginStatus: 'login' }),
  setLogoutStatus: () => set({ loginStatus: 'logout' }),
  setAccountDeleteStatus: () => set({ loginStatus: 'account-delete' }),
}));
