import { create } from 'zustand';

import { ReactElement } from 'react';

import { useBlameReasonStore, useSelectedStore } from './dropdownStore';

interface ModalInfo {
  id: string;
  image?: ReactElement;
  title?: string;
  contents?: ReactElement | string;
  submitText: string;
  cancelText?: string;
  submitFunction: () => void;
  cancelFunction?: () => void;
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
  setHideDropdown?: () => void;
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

      refreshSelectedBlameData();
      refreshBlameReason();

      set({ disabled: false, showDropdown: false });

      return { modalInfos: state.modalInfos.slice(0, -1) };
    }), // FIXME: 추후에 id값 비교해서 같은 것만 빼기
  clearModals: () => set({ modalInfos: [] }),
  isPending: undefined,
  setIsPending: (isPending) => set({ isPending }),
  disabled: false,
  setDisabled: (disabled) => set({ disabled: disabled }),
  showDropdown: false,
  setShowDropdown: () => set({ showDropdown: true }),
  setHideDropdown: () => set({ showDropdown: false }),
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
