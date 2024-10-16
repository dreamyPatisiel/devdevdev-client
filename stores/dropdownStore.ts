import { create } from 'zustand';

import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';
import { TechBlogCommentsDropdownProps } from '@pages/techblog/types/techCommentsType';

import { TypeBlames } from '@/api/useGetBlames';

export type PickDropdownProps = 'LATEST' | 'POPULAR' | 'MOST_VIEWED' | 'MOST_COMMENTED';

export type TechBlogDropdownProps =
  | 'LATEST'
  | 'POPULAR'
  | 'MOST_VIEWED'
  | 'MOST_COMMENTED'
  | 'HIGHEST_SCORE';

export type DropdownOptionProps =
  | TechBlogDropdownProps
  | PickDropdownProps
  | MyinfoBookmarkDropdownProps
  | TechBlogCommentsDropdownProps;

interface DropDownStoreProps {
  sortOption: DropdownOptionProps;
  setSort: (sortOption: DropdownOptionProps) => void;
}

export const useDropdownStore = create<DropDownStoreProps>((set) => ({
  sortOption: 'LATEST',
  setSort: (sortOption: DropdownOptionProps) => set({ sortOption: sortOption }),
}));

interface SelectedStoreProps {
  selectedBlameData: TypeBlames | null;
  setSelectedBlameData: (selectedBlameData: TypeBlames) => void;
}

export const useSelectedStore = create<SelectedStoreProps>((set) => ({
  selectedBlameData: null,
  setSelectedBlameData: (selectedBlameData: TypeBlames) =>
    set({ selectedBlameData: selectedBlameData }),
}));
