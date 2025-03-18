import { useSurveyListStore } from '@stores/accountDeleteStore';

import { SubButton } from '@components/common/buttons/subButtons';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { usePostExitSurvey } from '../../apiHooks/usePostExitSurvey';
import { DELETE_MESSAGE_COUNT } from '../../constants/accountDelete';

interface ExitSurveyButtonProps {
  setPrevStep: () => void;
  setNextStep: () => void;
  exitSurveyId: number | null;
}

export default function ExitSurveyButton({
  setPrevStep,
  setNextStep,
  exitSurveyId,
}: ExitSurveyButtonProps) {
  const { isMobile } = useMediaQueryContext();

  const { mutate: postExitSurveyMutate } = usePostExitSurvey();
  const { checkedSurveyList } = useSurveyListStore();

  return (
    <div className={`flex gap-[0.8rem] ${isMobile ? 'w-full' : ''}`}>
      <SubButton
        text='취소'
        variant='gray'
        onClick={setPrevStep}
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
              onSuccess: setNextStep,
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
