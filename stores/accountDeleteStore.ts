import { create } from 'zustand';

import { SurveyOption } from '@pages/myinfo/account-delete/types/exitSurvey';

interface SurveyListStoreProps {
  checkedSurveyList: SurveyOption[];
  setCheckedSurveyList: (id: string, message?: string) => void;
  setUncheckedSurveyList: (id: string) => void;
}

const filteredSurveyList = (list: SurveyOption[], id: string): SurveyOption[] => {
  return list.filter((item) => item.id !== id);
};

export const useSurveyListStore = create<SurveyListStoreProps>((set) => ({
  checkedSurveyList: [],
  setCheckedSurveyList: (id: string, message?: string) =>
    set((state) => {
      const existingIndex = state.checkedSurveyList?.findIndex((item) => item.id === id);

      if (existingIndex === -1) {
        return { checkedSurveyList: [...state.checkedSurveyList, { id }] };
      }

      if (message !== undefined) {
        // if(message) 랑 차이점
        const updateList = [...state.checkedSurveyList];
        updateList[existingIndex] = { ...updateList[existingIndex], message };

        return { checkedSurveyList: updateList };
      }

      return { checkedSurveyList: state.checkedSurveyList };
    }),
  setUncheckedSurveyList: (id: string) =>
    set((state) => ({ checkedSurveyList: filteredSurveyList(state.checkedSurveyList, id) })),
}));
