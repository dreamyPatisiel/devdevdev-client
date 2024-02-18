import { create } from 'zustand';

// state 보관함을 만드는 기능

export interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLoginModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
