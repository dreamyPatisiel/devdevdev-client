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

interface SelectedStoreProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export const useSelectedStore = create<SelectedStoreProps>((set) => ({
  selected: '신고 사유 선택',
  setSelected: (SelectedMenu: string) => set({ selected: SelectedMenu }),
}));
