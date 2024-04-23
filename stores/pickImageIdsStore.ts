import { create } from 'zustand';

interface PickImageIdsStoreProps {
  firstPickImageIds: number[];
  secondPickImageIds: number[];
  setFirstPickImageIds: (newImageIds: number[]) => void;
  setSecondPickImageIds: (newImageIds: number[]) => void;
}

export const usePickImageIdsStore = create<PickImageIdsStoreProps>((set) => ({
  firstPickImageIds: [],
  secondPickImageIds: [],
  setFirstPickImageIds: (newImageIds: number[]) => set(() => ({ firstPickImageIds: newImageIds })),
  setSecondPickImageIds: (newImageIds: number[]) =>
    set(() => ({ secondPickImageIds: newImageIds })),
}));
