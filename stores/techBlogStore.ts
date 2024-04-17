import { create } from 'zustand';

/**서버에 보낼 최종 키워드를 관리하는 store*/

interface searchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
export const useSearchKeywordStore = create<searchKeywordProps>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

/** 기술블로그 게시글의 id값을 저장하는 store */

interface techArticleIdProps {
  techArticleId: number;
  setTechArticleId: (id: number) => void;
}
export const useTechBlogIdStore = create<techArticleIdProps>((set) => ({
  techArticleId: 1,
  setTechArticleId: (id: number) => set({ techArticleId: id }),
}));
