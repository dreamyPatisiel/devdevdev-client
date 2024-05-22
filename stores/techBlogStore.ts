import { create } from 'zustand';

interface searchKeywordProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
/**서버에 보낼 최종 키워드를 관리하는 store*/
export const useSearchKeywordStore = create<searchKeywordProps>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}));

interface companyIdProps {
  companyId: number | undefined;
  setCompanyId: (id: number | undefined) => void;
}
/** company id를 저장하고 있는 store */
export const useCompanyIdStore = create<companyIdProps>((set) => ({
  companyId: undefined,
  setCompanyId: (id: number | undefined) => set({ companyId: id }),
}));
