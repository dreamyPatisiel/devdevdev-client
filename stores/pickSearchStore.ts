import { create } from 'zustand';

interface PickSearchStoreProps {
  editingKeyword: string;
  submittedKeyword: string;
  setEditingKeyword: (keyword: string) => void;
  setSubmittedKeyword: (keyword: string) => void;
  resetKeyword: () => void;
}

export const usePickSearchStore = create<PickSearchStoreProps>((set) => ({
  editingKeyword: '',
  submittedKeyword: '',
  setEditingKeyword: (keyword: string) => set({ editingKeyword: keyword }),
  setSubmittedKeyword: (keyword: string) => set({ submittedKeyword: keyword }),
  resetKeyword: () => set({ editingKeyword: '', submittedKeyword: '' }),
}));
