import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface ToastVisibleProps {
  isToastVisible: boolean;
  toastMessage: string;
  toastType: ToastType;
  setToastVisible: (message: string, type?: ToastType) => void;
  setToastInvisible: () => void;
}

export const useToastVisibleStore = create<ToastVisibleProps>((set) => ({
  isToastVisible: false,
  toastMessage: '',
  toastType: 'success',
  setToastVisible: (message: string, type?: ToastType) =>
    set({ toastMessage: message, isToastVisible: true, toastType: type }),
  setToastInvisible: () => set({ toastMessage: '', isToastVisible: false }),
}));
