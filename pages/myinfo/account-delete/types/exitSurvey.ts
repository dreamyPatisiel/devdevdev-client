export interface ExitSurvey {
  surveyVersionId: number; //1
  surveyQuestions: [
    {
      id: number; //1
      title: string; //'꿈빛파티시엘님 회원 탈퇴하는 이유를 알려주세요.'
      content: string; //'회원 탈퇴하는 이유를 상세하게 알려주세요.'
      sortOrder: number; //0
      surveyQuestionOptions: [
        {
          id: number; //1
          title: string; //'기타'
          content: string; //'직접 입력해주세요.(10자 이상)'
          sortOrder: number; //0
        },
      ];
    },
  ];
}

export type SurveyOption = {
  id: string;
  message?: string;
};

export interface postSurveyDataProps {
  questionId: number | undefined;
  memberExitSurveyQuestionOptions: SurveyOption[];
}
