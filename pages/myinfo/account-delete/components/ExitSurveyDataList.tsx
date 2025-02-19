import { useEffect, useState } from 'react';

import { useSurveyListStore } from '@stores/accountDeleteStore';

import { SubButton } from '@components/common/buttons/subButtons';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useGetExitSurvey } from '../apiHooks/useGetExitSurvey';
import { usePostExitSurvey } from '../apiHooks/usePostExitSurvey';
import { DELETE_MESSAGE_COUNT } from '../constants/accountDelete';
import CheckReasonBox from './CheckReasonBox';

export default function ExitSurveyDataList({
  isStepButtons = false,
  prevStepButtonClick,
  nextStepButtonClick,
}: {
  isStepButtons?: boolean;
  prevStepButtonClick?: () => void;
  nextStepButtonClick?: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const { data: exitSurveyData, isSuccess } = useGetExitSurvey();
  const { mutate: postExitSurveyMutate } = usePostExitSurvey();

  const { checkedSurveyList } = useSurveyListStore();

  const [exitSurveyId, setExitSurveyId] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setExitSurveyId(exitSurveyData.surveyQuestions[0].id);
    }
  }, [isSuccess, exitSurveyData]);

  if (isStepButtons) {
    return (
      <div className={`flex gap-[0.8rem] ${isMobile ? 'w-full' : ''}`}>
        <SubButton
          text='취소'
          variant='gray'
          onClick={prevStepButtonClick}
          className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
        />
        <SubButton
          text='다음'
          variant='primary'
          onClick={() => {
            postExitSurveyMutate(
              {
                questionId: exitSurveyId as number,
                memberExitSurveyQuestionOptions: checkedSurveyList,
              },
              {
                onSuccess: nextStepButtonClick,
              },
            );
          }}
          disabled={
            checkedSurveyList.length === 0 ||
            checkedSurveyList.some((list) => {
              return (
                list.isContent &&
                (list.message === undefined || list.message.length < DELETE_MESSAGE_COUNT)
              );
            })
          }
          className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
        />
      </div>
    );
  }

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
