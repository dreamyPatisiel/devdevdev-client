import { create } from 'zustand';

import {
  INITIAL_TECH_COMPANY_ID,
  INITIAL_TECH_SEARCH_KEYWORD,
} from '@pages/techblog/constants/techBlogConstants';

interface SearchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
/** 1. 기술블로그 검색 keyword를 저장하고 있는 store */
export const useSearchKeywordStore = create<SearchKeywordProps>((set) => ({
  searchKeyword: INITIAL_TECH_SEARCH_KEYWORD,
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

interface CompanyInfoProps {
  companyId: number | null;
  companyName: string | null;
  setCompanyId: (id: number | null) => void;
  setCompanyName: (name: string) => void;
}
/** 2. 기술블로그 기업 정보(id,name)를 저장하고 있는 store */
export const useCompanyInfoStore = create<CompanyInfoProps>((set) => ({
  companyId: INITIAL_TECH_COMPANY_ID,
  companyName: null,
  setCompanyId: (id: number | null) => set({ companyId: id }),
  setCompanyName: (name: string) => set({ companyName: name }),
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
