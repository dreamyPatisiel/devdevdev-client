import { create } from 'zustand';

import { ReactElement } from 'react';

import { useBlameReasonStore, useSelectedStore } from './dropdownStore';

interface ModalInfo {
  id: string;
  title: string;
  contents?: ReactElement | string;
  submitText: string;
  cancelText: string;
  submitFunction: () => void;
  cancelFunction: () => void;
  size?: 's' | 'm' | 'l';
}
interface ModalInfos {
  modalInfos: ModalInfo[];
  isPending?: boolean;
  setIsPending?: (isPending: boolean) => void;
  disabled?: boolean;
  setDisabled?: (disabled?: boolean) => void;
  showDropdown?: boolean;
  setShowDropdown?: () => void;
}

interface ModalActions {
  pushModal: (modalInfo: ModalInfo) => void;
  popModal: () => void;
  clearModals: () => void;
}

export const useModalStore = create<ModalInfos & ModalActions>((set) => ({
  modalInfos: [],
  pushModal: (modalInfo) => set((state) => ({ modalInfos: [...state.modalInfos, modalInfo] })),
  popModal: () =>
    set((state) => {
      const { refreshSelectedBlameData } = useSelectedStore.getState();
      const { refreshBlameReason } = useBlameReasonStore.getState();

      if (refreshSelectedBlameData) {
        refreshSelectedBlameData();
      }

      if (refreshBlameReason) {
        refreshBlameReason();
      }

      return { modalInfos: state.modalInfos.slice(0, -1) };
    }), // FIXME: 추후에 id값 비교해서 같은 것만 빼기
  clearModals: () => set({ modalInfos: [] }),
  isPending: undefined,
  setIsPending: (isPending) => set({ isPending }),
  disabled: false,
  setDisabled: (disabled) => set({ disabled: disabled }),
  showDropdown: false,
  setShowDropdown: () => set({ showDropdown: true }),
}));

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
// export interface ModalStore {
//   isModalOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
//   modalType: string;
//   setModalType: (type: string) => void;
//   title: string;
//   contents: string;
//   setTitle: (title: string) => void;
//   setContents: (text: string) => void;
//   modalSubmitFn: () => void;
//   setModalSubmitFn: (submitFn: () => void) => void;
//   isPending: boolean;
//   setIsPending: () => void;
//   setIsNotPending: () => void;
// }

// export const useModalStore = create<ModalStore>((set) => ({
//   isModalOpen: false,
//   openModal: () => set({ isModalOpen: true }),
//   closeModal: () => set({ isModalOpen: false, modalType: '' }),
//   modalType: '',
//   setModalType: (type) => set({ modalType: type }),
//   title: '',
//   contents: '',
//   setTitle: (text) => set({ title: text }),
//   setContents: (text) => set({ contents: text }),
//   modalSubmitFn: () => {},
//   setModalSubmitFn: (submitFn) => set({ modalSubmitFn: submitFn }),
//   isPending: false,
//   setIsPending: () => set({ isPending: true }),
//   setIsNotPending: () => set({ isPending: false }),
// }));
