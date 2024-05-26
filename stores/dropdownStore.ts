import { create } from 'zustand';

import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';

export type DropdownOptionProps =
  | 'LATEST'
  | 'POPULAR'
  | 'MOST_VIEWED'
  | 'MOST_COMMENTED'
  | MyinfoBookmarkDropdownProps;

interface DropDownStoreProps {
  sortOption: DropdownOptionProps;
  setSort: (sortOption: DropdownOptionProps) => void;
}

export const useDropdownStore = create<DropDownStoreProps>((set) => ({
  sortOption: 'LATEST',
  setSort: (sortOption: DropdownOptionProps) => set({ sortOption: sortOption }),
}));

interface SelectedStoreProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export const useSelectedStore = create<SelectedStoreProps>((set) => ({
  selected: '',
  setSelected: (SelectedMenu: string) => set({ selected: SelectedMenu }),
}));
