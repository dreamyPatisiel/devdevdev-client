import { create } from 'zustand';

import {
  INITIAL_TECH_COMPANY_ID,
  INITIAL_TECH_SEARCH_KEYWORD,
} from '@pages/techblog/constants/techBlogConstants';

/** 1. 기술블로그 검색 keyword를 저장하고 있는 store */
interface SearchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
export const useSearchKeywordStore = create<SearchKeywordProps>((set) => ({
  searchKeyword: INITIAL_TECH_SEARCH_KEYWORD,
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

/** 2. 기술블로그 기업 정보(id,name)를 저장하고 있는 store */
interface CompanyInfoProps {
  companyId: number | null;
  companyName: string | null;
  setCompanyInfo: ({ id, name }: { id: number | null; name?: string | null }) => void;
  resetCompanyInfo: () => void;
}
export const useCompanyInfoStore = create<CompanyInfoProps>((set) => ({
  companyId: INITIAL_TECH_COMPANY_ID,
  companyName: null,
  setCompanyInfo: ({ id, name }: { id: number | null; name?: string | null }) =>
    set({
      companyId: id,
      companyName: name !== undefined ? name : null,
    }),
  resetCompanyInfo: () => set({ companyId: null, companyName: null }),
}));

// 3. 기술블로그 댓글 id를 저장하는 store (삭제,신고)
interface SelectedCommentIdProps {
  selectedCommentId: number | null;
  setSelectedCommentId: (id: number | null) => void;
  setRefreshCommentTechblogId: () => void;
}
export const useSelectedCommentIdStore = create<SelectedCommentIdProps>((set) => ({
  selectedCommentId: null,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setRefreshCommentTechblogId: () => set({ selectedCommentId: null }),
}));
