import { create } from 'zustand';

interface ToastVisibleProps {
  isToastVisible: boolean;
  toastMessage: string;
  setToastVisible: (message: string) => void;
  setToastInvisible: () => void;
}

export const useToastVisibleStore = create<ToastVisibleProps>((set) => ({
  isToastVisible: false,
  toastMessage: '',
  setToastVisible: (message: string) => set({ toastMessage: message, isToastVisible: true }),
  setToastInvisible: () => set({ toastMessage: '', isToastVisible: false }),
}));
