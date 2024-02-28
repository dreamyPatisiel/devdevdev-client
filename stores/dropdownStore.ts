import { create } from 'zustand';

export type DropdownMenu = 'LATEST' | 'POPULAR' | 'MOST_VIEWED' | 'MOST_COMMENTED';

interface DropDownStoreProps {
  sort: DropdownMenu;
  setSort: (sort: DropdownMenu) => void;
}

export const useDropdownStore = create<DropDownStoreProps>((set) => ({
  sort: 'LATEST',
  setSort: (sort: DropdownMenu) => set({ sort: sort }),
}));
