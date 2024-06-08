import { create } from 'zustand';

export interface LoginModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  description: string;
  setDescription: (description: string) => void;
}

export interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalType: string;
  setModalType: (type: string) => void;
  contents: string;
  setContents: (text: string) => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  description: '',
  setDescription: (description) => set({ description: description }),
}));

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, modalType: '' }),
  modalType: '',
  setModalType: (type) => set({ modalType: type }),
  contents: '',
  setContents: (text) => set({ contents: text }),
}));
