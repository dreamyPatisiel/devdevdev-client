import { create } from 'zustand';

import {
  INITIAL_TECH_COMPANY_ID,
  INITIAL_TECH_SEARCH_KEYWORD,
} from '@pages/techblog/constants/techBlogConstants';

interface SearchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
/**서버에 보낼 최종 키워드를 관리하는 store*/
export const useSearchKeywordStore = create<SearchKeywordProps>((set) => ({
  searchKeyword: INITIAL_TECH_SEARCH_KEYWORD,
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

interface CompanyIdProps {
  companyId: number | null;
  setCompanyId: (id: number | null) => void;
}
/** company id를 저장하고 있는 store */
export const useCompanyIdStore = create<CompanyIdProps>((set) => ({
  companyId: INITIAL_TECH_COMPANY_ID,
  setCompanyId: (id: number | null) => set({ companyId: id }),
}));

interface SelectedCommentIdProps {
  selectedCommentId: number | null;
  setSelectedCommentId: (id: number | null) => void;
  setRefreshCommentTechblogId: () => void;
}

// 기술블로그 댓글 id를 저장하는 store (삭제,신고)
export const useSelectedCommentIdStore = create<SelectedCommentIdProps>((set) => ({
  selectedCommentId: null,
  setSelectedCommentId: (id) => set({ selectedCommentId: id }),
  setRefreshCommentTechblogId: () => set({ selectedCommentId: null }),
}));

interface SelectedComanyIndexProps {
  selectedCompanyIndex: number | null;
  setSelectedCompanyIndex: (index: number | null) => void;
  setRefreshCompanyIndex: () => void;
}
// 기술블로그 회사 선택 인덱스를 저장하는 store
export const useSelectedCompanyIndexStore = create<SelectedComanyIndexProps>((set) => ({
  selectedCompanyIndex: null,
  setSelectedCompanyIndex: (index) => set({ selectedCompanyIndex: index }),
  setRefreshCompanyIndex: () => set({ selectedCompanyIndex: null }),
}));
