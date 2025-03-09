import { useEffect } from 'react';

import { useGetExitSurvey } from '../apiHooks/useGetExitSurvey';
import CheckReasonBox from './CheckReasonBox';

export default function ExitSurveyDataList({
  setExitSurveyId,
}: {
  setExitSurveyId: (id: number) => void;
}) {
  const { data: exitSurveyData, isSuccess } = useGetExitSurvey();

  useEffect(() => {
    if (isSuccess) {
      setExitSurveyId(exitSurveyData.surveyQuestions[0].id);
    }
  }, [isSuccess, exitSurveyData]);

  return (
    <div className='flex flex-col gap-[1.6rem] w-full'>
      {exitSurveyData?.surveyQuestions[0].surveyQuestionOptions.map((surveyQuestion) => (
        <CheckReasonBox
          id={String(surveyQuestion.id)}
          reason={surveyQuestion.title}
          content={surveyQuestion.content}
          key={surveyQuestion.id}
        />
      ))}
    </div>
  );
}
