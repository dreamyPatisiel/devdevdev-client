import { create } from 'zustand';

interface ExitSurveyIdStoreProps {
  exitSurveyId: number | null;
  setExitSurveyId: (exitSurveyId: number) => void;
}

export const useExitSurveyIdStore = create<ExitSurveyIdStoreProps>((set) => ({
  exitSurveyId: null,
  setExitSurveyId: (exitSurveyId: number) => set({ exitSurveyId: exitSurveyId }),
}));
