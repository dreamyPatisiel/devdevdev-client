import { create } from 'zustand';

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
