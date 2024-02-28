import { create } from 'zustand';

export type DropdownOptionProps = 'LATEST' | 'POPULAR' | 'MOST_VIEWED' | 'MOST_COMMENTED';

interface DropDownStoreProps {
  sortOption: DropdownOptionProps;
  setSort: (sortOption: DropdownOptionProps) => void;
}

export const useDropdownStore = create<DropDownStoreProps>((set) => ({
  sortOption: 'LATEST',
  setSort: (sortOption: DropdownOptionProps) => set({ sortOption: sortOption }),
}));
