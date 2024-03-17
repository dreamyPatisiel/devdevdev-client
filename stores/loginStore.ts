import { create } from 'zustand';

export interface loginStatusStore {
  loginStatus: 'login' | 'logout' | 'loading';
  setLoginStatus: () => void;
  setLogoutStatus: () => void;
}

export const useLoginStatusStore = create<loginStatusStore>((set) => ({
  loginStatus: 'loading',
  setLoginStatus: () => set({ loginStatus: 'login' }),
  setLogoutStatus: () => set({ loginStatus: 'logout' }),
}));
