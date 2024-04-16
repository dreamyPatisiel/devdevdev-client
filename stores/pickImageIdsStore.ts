import { create } from 'zustand';

interface PickImageIdsStoreProps {
  firstPickImageIds: number[];
  secondPickImageIds: number[];
}

export const usePickImageIdsStore = create<PickImageIdsStoreProps>(() => ({
  firstPickImageIds: [],
  secondPickImageIds: [],
}));
