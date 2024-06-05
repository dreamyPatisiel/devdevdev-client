import { create } from 'zustand';

interface SurveyListStoreProps {
  checkedSurveyList: string[];
  setCheckedSurveyList: (id: string) => void;
  setUncheckedSurveyList: (id: string) => void;
  reasonContents: string;
  setReasonContents: (contents: string) => void;
}

const filteredSurveyList = (list: string[], id: string) => {
  return list.filter((item) => item !== id);
};

export const useSurveyListStore = create<SurveyListStoreProps>((set) => ({
  checkedSurveyList: [],
  setCheckedSurveyList: (id: string) =>
    set((state) => ({
      checkedSurveyList: state.checkedSurveyList.includes(id)
        ? state.checkedSurveyList
        : [...state.checkedSurveyList, id],
    })),
  setUncheckedSurveyList: (id: string) =>
    set((state) => ({ checkedSurveyList: filteredSurveyList(state.checkedSurveyList, id) })),
  reasonContents: '',
  setReasonContents: (contents) => set(() => ({ reasonContents: contents })),
}));
