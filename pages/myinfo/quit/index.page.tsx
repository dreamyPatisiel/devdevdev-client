import { useState } from 'react';

import Image from 'next/image';

import { SubButton } from '@components/common/buttons/subButtons';

import checkCircle from '@public/image/myInfo/check-circle.svg';
import nonCheckCircle from '@public/image/myInfo/circle.svg';

import CheckReasonBox from './components/checkReasonBox';

type QuitStep = 'step1' | 'step2' | 'step3';

export default function Quit() {
  const [step, setStep] = useState<QuitStep>('step1');
  const [checked, setChecked] = useState(false);
  console.log('chcked', checked);

  const STEP_TITLE = {
    step1: '저희 정말 여기까지인가요? 😢',
    step2: '탈퇴하시는 이유를 알려주세요',
    step3: '탈퇴하시기 전 확인해주세요!',
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='border border-gray3 rounded-[1.6rem] p-[3.2rem] flex flex-col gap-[3.2rem]'>
      <div className='flex items-center justify-between'>
        <p className='st2 font-bold'>
          <span className='text-point1'>게으른 댑댑이</span>님, 저희 정말 여기까지인가요? 😢
        </p>
        {step === 'step1' && (
          <SubButton text='네 탈퇴할게요' variant='primary' onClick={() => setStep('step2')} />
        )}

        {step === 'step2' && (
          <div className='flex gap-[0.8rem]'>
            <SubButton text='취소' variant='gray' onClick={() => setStep('step1')} />
            <SubButton text='다음' variant='primary' onClick={() => setStep('step3')} />
          </div>
        )}
      </div>

      {step === 'step2' && (
        <div className='flex flex-col gap-[1.6rem]'>
          <CheckReasonBox id={1} reason={'채용정보가 부족해요'} />

          <CheckReasonBox id={2} reason={'채용정보가 부족해요'} />
          <CheckReasonBox id={3} reason={'채용정보가 부족해요'} />
        </div>
      )}
    </div>
  );
}
