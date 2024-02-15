import { create } from 'zustand';

export interface loginStatusStore {
  loginStatus: 'login' | 'logout' | 'loading';
  fetchLogin: () => void;
  fetchLogout: () => void;
}

export const useLoginStatusStore = create<loginStatusStore>((set) => ({
  loginStatus: 'loading',
  fetchLogin: () => set({ loginStatus: 'login' }),
  fetchLogout: () => set({ loginStatus: 'logout' }),
}));
