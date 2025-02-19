import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useUserInfoStore } from '@stores/userInfoStore';

import { SubButton } from '@components/common/buttons/subButtons';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import MyInfo from '../index.page';
import ExitConfirmCheck from './components/ExitConfirmCheck';
import ExitSurveyDataList from './components/ExitSurveyDataList';
import { STEP_TITLE } from './constants/accountDelete';

export default function AccountDelete() {
  const { userInfo } = useUserInfoStore();

  const [step, setStep] = useState(1);

  const { isMobile } = useMediaQueryContext();

  const handlePrevStepButtonClick = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const handleNextStepButtonClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const StepButtons = (
    <>
      {step === 1 && (
        <SubButton
          text='네 탈퇴할게요'
          variant='primary'
          onClick={handleNextStepButtonClick}
          className={isMobile ? 'w-full mt-auto px-[2rem] py-[1.2rem]' : ''}
        />
      )}

      {step === 2 && (
        <ExitSurveyDataList
          isStepButtons={true}
          prevStepButtonClick={handlePrevStepButtonClick}
          nextStepButtonClick={handleNextStepButtonClick}
        />
      )}

      {step === 3 && (
        <ExitConfirmCheck isStepButtons={true} prevStepButtonClick={handlePrevStepButtonClick} />
      )}
    </>
  );

  const StepContents = (
    <>
      {step === 2 && <ExitSurveyDataList />}

      {step === 3 && <ExitConfirmCheck />}
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
