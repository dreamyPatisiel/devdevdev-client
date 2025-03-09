import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useUserInfoStore } from '@stores/userInfoStore';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import MyInfo from '../index.page';
import ExitConfirmCheck from './components/ExitConfirmCheck';
import ExitSurveyDataList from './components/ExitSurveyDataList';
import ExitConfirmButton from './components/stepButtons/ExitConfirmButton';
import ExitSurveyButton from './components/stepButtons/ExitSurveyButton';
import StartExitButton from './components/stepButtons/StartExitButton';
import { STEP_TITLE } from './constants/accountDelete';

export default function AccountDelete() {
  const { userInfo } = useUserInfoStore();

  const { isMobile } = useMediaQueryContext();

  const [step, setStep] = useState(1);
  const [exitSurveyId, setExitSurveyId] = useState<number | null>(null);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const handlePrevStepButtonClick = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const handleNextStepButtonClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const StepButtons = (
    <>
      {step === 1 && <StartExitButton setNextStep={handleNextStepButtonClick} />}

      {step === 2 && (
        <ExitSurveyButton
          setPrevStep={handlePrevStepButtonClick}
          setNextStep={handleNextStepButtonClick}
          exitSurveyId={exitSurveyId}
        />
      )}

      {step === 3 && (
        <ExitConfirmButton setPrevStep={handlePrevStepButtonClick} agreeChecked={agreeChecked} />
      )}
    </>
  );

  const handleSetExitSurveyId = (id: number) => {
    setExitSurveyId(id);
  };

  const handleSetAgreeChecked = () => {
    setAgreeChecked((prev) => !prev);
  };

  const StepContents = (
    <>
      {step === 2 && <ExitSurveyDataList setExitSurveyId={handleSetExitSurveyId} />}

      {step === 3 && (
        <ExitConfirmCheck agreeChecked={agreeChecked} setAgreeChecked={handleSetAgreeChecked} />
      )}
    </>
  );

  const stepTitle = step === 1 ? 'flex-col mt-auto' : 'mr-auto';
  const accountDeleteTitle = isMobile ? stepTitle : 'justify-between';

  const AccountDeleteContainer = {
    base: 'border border-gray400 rounded-[1.6rem] flex flex-col p-[3.2rem] gap-[3.2rem]',
    mobile: 'items-center justify-center px-[2.4rem] min-h-[43.7rem] mb-[4rem]',
  };

  return (
    <MyInfo>
      <div
        className={cn(AccountDeleteContainer.base, isMobile ? AccountDeleteContainer.mobile : '')}
      >
        <div className={`flex items-center ${accountDeleteTitle}`}>
          <p className={`st2 font-bold ${step === 1 && 'text-center'}`}>
            <span className='text-secondary400'>{userInfo.nickname || NO_USER_NAME}</span>님,
            {isMobile ? <br /> : ' '}
            {STEP_TITLE[step]}
          </p>
          {isMobile ? <></> : StepButtons}
        </div>

        {StepContents}
        {isMobile ? StepButtons : <></>}
      </div>
    </MyInfo>
  );
}
