import { create } from 'zustand';

import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';
import { TechBlogCommentsDropdownProps } from '@pages/techblog/types/techCommentsType';

import { TypeBlames } from '@/api/useGetBlames';
import { INITIAL_PICK_SORT_OPTION, INITIAL_TECH_SORT_OPTION } from '@/constants/DropdownOptionArr';

export type PickDropdownProps = 'POPULAR' | 'LATEST' | 'MOST_VIEWED' | 'MOST_COMMENTED';

export type PickCommentDropdownProps = 'LATEST' | 'MOST_LIKED' | 'MOST_COMMENTED';

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
  | TechBlogCommentsDropdownProps
  | PickCommentDropdownProps;

interface DropDownStoreProps {
  sortOption: DropdownOptionProps | '';
  setSort: (sortOption: DropdownOptionProps) => void;
  setInitialSort: () => void;
}

export const useDropdownStore = create<DropDownStoreProps>((set) => ({
  sortOption: '',
  setSort: (sortOption: DropdownOptionProps) => set({ sortOption: sortOption }),
  setInitialSort: () => set({ sortOption: '' }),
}));

const createDropdownStore = (newSortOption: DropdownOptionProps) =>
  create<DropDownStoreProps>((set) => ({
    sortOption: newSortOption,
    setSort: (sortOption: DropdownOptionProps) => set({ sortOption }),
    setInitialSort: () => set({ sortOption: newSortOption }),
  }));

export const usePickDropdownStore = createDropdownStore(INITIAL_PICK_SORT_OPTION);
export const useTechblogDropdownStore = createDropdownStore(INITIAL_TECH_SORT_OPTION);

// 신고하기 드롭다운 데이터 저장 store
interface SelectedStoreProps {
  selectedBlameData: TypeBlames | null;
  setSelectedBlameData: (selectedBlameData: TypeBlames) => void;
  refreshSelectedBlameData: () => void;
}

export const useSelectedStore = create<SelectedStoreProps>((set) => ({
  selectedBlameData: null,
  setSelectedBlameData: (selectedBlameData: TypeBlames) =>
    set({ selectedBlameData: selectedBlameData }),
  refreshSelectedBlameData: () => set({ selectedBlameData: null }),
}));

// 신고하기 - 기타내용 저장 store
interface BlameReasonStoreProps {
  blameReason: string;
  setBlameReason: (blameReason: string) => void;
  refreshBlameReason: () => void;
}
export const useBlameReasonStore = create<BlameReasonStoreProps>((set) => ({
  blameReason: '',
  setBlameReason: (blameReason: string) => set({ blameReason: blameReason }),
  refreshBlameReason: () => set({ blameReason: '' }),
}));
