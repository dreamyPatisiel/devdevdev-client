import { useState } from 'react';

import Image from 'next/image';

import { useSurveyListStore } from '@stores/accountDeleteStore';
import { useUserInfoStore } from '@stores/userInfoStore';

import { SubButton } from '@components/common/buttons/subButtons';

import checkSquare from '@public/image/pickpickpick/check-square.svg';
import square from '@public/image/pickpickpick/square.svg';

import { NO_USER_NAME } from '@/constants/UserInfoConstants';

import MyInfo from '../index.page';
import { useDeleteProfile } from './apiHooks/useDeleteProfile';
import { useGetExitSurvey } from './apiHooks/useGetExitSurvey';
import { usePostExitSurvey } from './apiHooks/usePostExitSurvey';
import AccountDeleteInfoList from './components/AccountDeleteInfoList';
import CheckReasonBox from './components/CheckReasonBox';
import { ACCOUNT_DELETE_LIST, DELETE_MESSAGE_COUNT, STEP_TITLE } from './constants/accountDelete';

type AccountDeleteStep = 'step1' | 'step2' | 'step3';

export default function AccountDelete() {
  const { userInfo } = useUserInfoStore();

  const [step, setStep] = useState<AccountDeleteStep>('step1');
  const [agreeChecked, setAgreeChecked] = useState(false);

  const { data: exitSurveyData } = useGetExitSurvey();
  const { mutate: accountDeleteMutate } = useDeleteProfile();
  const { checkedSurveyList } = useSurveyListStore();
  const { mutate: postExitSurveyMutate } = usePostExitSurvey();

  const StepButtons = (
    <>
      {step === 'step1' && (
        <SubButton text='네 탈퇴할게요' variant='primary' onClick={() => setStep('step2')} />
      )}

      {step === 'step2' && (
        <div className='flex gap-[0.8rem]'>
          <SubButton text='취소' variant='gray' onClick={() => setStep('step1')} />
          <SubButton
            text='다음'
            variant='primary'
            onClick={() => {
              const questionId = exitSurveyData?.surveyQuestions[0].id;

              postExitSurveyMutate(
                {
                  questionId,
                  memberExitSurveyQuestionOptions: checkedSurveyList,
                },
                {
                  onSuccess: () => setStep('step3'),
                },
              );
            }}
            disabled={
              checkedSurveyList.length === 0 ||
              checkedSurveyList.some((list) => {
                return (
                  list.isContent &&
                  (list.message === undefined || list.message.length <= DELETE_MESSAGE_COUNT)
                );
              })
            }
          />
        </div>
      )}

      {step === 'step3' && (
        <div className='flex gap-[0.8rem]'>
          <SubButton text='취소' variant='gray' onClick={() => setStep('step2')} />
          <SubButton
            text='탈퇴하기'
            variant='primary'
            onClick={() => {
              accountDeleteMutate();
            }}
            disabled={!agreeChecked}
          />
        </div>
      )}
    </>
  );

  const StepContents = (
    <>
      {step === 'step2' && (
        <div className='flex flex-col gap-[1.6rem]'>
          {exitSurveyData?.surveyQuestions[0].surveyQuestionOptions.map((surveyQuestion) => (
            <CheckReasonBox
              id={String(surveyQuestion.id)}
              reason={surveyQuestion.title}
              content={surveyQuestion.content}
              key={surveyQuestion.id}
            />
          ))}
        </div>
      )}

      {step === 'step3' && (
        <>
          <div className='px-[2.4rem] py-[3.2rem] flex flex-col gap-[2.4rem] rounded-[1.2rem] border border-gray2'>
            <p className='p1 font-bold'>
              탈퇴시 삭제/유지되는 정보를 확인하세요! 한번 삭제된 정보는 복구가 불가능해요
            </p>
            <ul className='ml-10'>
              {ACCOUNT_DELETE_LIST.map((item) => (
                <AccountDeleteInfoList key={item.content} content={item.content} type={item.type} />
              ))}
            </ul>
          </div>

          <label
            htmlFor='exit-agreement'
            className='flex items-center gap-[1rem] p1 text-gray5 cursor-pointer select-none'
          >
            <input
              type='checkbox'
              id='exit-agreement'
              onChange={() => setAgreeChecked(!agreeChecked)}
              className='hidden'
            />
            {agreeChecked ? (
              <Image src={checkSquare} alt='체크된 체크박스' width={14} height={13} />
            ) : (
              <Image src={square} alt='체크되지 않은 체크박스' width={14} height={13} />
            )}
            안내사항을 모두 확인했으며, 이에 동의합니다
          </label>
        </>
      )}
    </>
  );

  return (
    <MyInfo>
      <div className='border border-gray3 rounded-[1.6rem] p-[3.2rem] flex flex-col gap-[3.2rem]'>
        <div className='flex items-center justify-between'>
          <p className='st2 font-bold'>
            <span className='text-point1'>{userInfo.nickname || NO_USER_NAME}</span>님,
            {STEP_TITLE[step]}
          </p>
          {StepButtons}
        </div>

        {StepContents}
      </div>
    </MyInfo>
  );
}
