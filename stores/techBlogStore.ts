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
