import { create } from 'zustand';

// login모달 store
export interface LoginModalStore {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  description: string;
  setDescription: (description: string) => void;
}
export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  description: '',
  setDescription: (description) => set({ description: description }),
}));

// 모달 store
export interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalType: string;
  setModalType: (type: string) => void;
  contents: string;
  setContents: (text: string) => void;
  modalSubmitFn: () => void;
  setModalSubmitFn: (submitFn: () => void) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, modalType: '' }),
  modalType: '',
  setModalType: (type) => set({ modalType: type }),
  contents: '',
  setContents: (text) => set({ contents: text }),
  modalSubmitFn: () => {},
  setModalSubmitFn: (submitFn) => set({ modalSubmitFn: submitFn }),
}));
