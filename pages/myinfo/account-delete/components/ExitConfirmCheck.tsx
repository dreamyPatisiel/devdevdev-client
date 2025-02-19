import { useState } from 'react';

import Image from 'next/image';

import { SubButton } from '@components/common/buttons/subButtons';

import checkSquare from '@public/image/pickpickpick/check-square.svg';
import square from '@public/image/pickpickpick/square.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useDeleteProfile } from '../apiHooks/useDeleteProfile';
import { ACCOUNT_DELETE_LIST } from '../constants/accountDelete';
import AccountDeleteInfoList from './AccountDeleteInfoList';

export default function ExitConfirmCheck({
  isStepButtons = false,
  prevStepButtonClick,
}: {
  isStepButtons?: boolean;
  prevStepButtonClick?: () => void;
}) {
  const { isMobile } = useMediaQueryContext();

  const [agreeChecked, setAgreeChecked] = useState(false);

  const { mutate: accountDeleteMutate } = useDeleteProfile();

  if (isStepButtons) {
    return (
      <div className={`flex gap-[0.8rem] ${isMobile ? 'w-full' : ''}`}>
        <SubButton
          text='이전'
          variant='gray'
          onClick={prevStepButtonClick}
          className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
        />
        <SubButton
          text='탈퇴하기'
          variant='primary'
          onClick={() => {
            accountDeleteMutate();
          }}
          disabled={!agreeChecked}
          className={isMobile ? 'w-full px-[2rem] py-[1.2rem]' : ''}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={`px-[2.4rem] py-[3.2rem] flex flex-col gap-[2.4rem] rounded-[1.2rem] border border-gray400 ${isMobile ? 'w-full' : ''}`}
      >
        <p className='p1 font-bold'>
          탈퇴시 삭제/유지되는 정보를 확인하세요!{isMobile ? <br /> : ' '} 한번 삭제된 정보는 복구가
          불가능해요
        </p>
        <ul className='ml-10'>
          {ACCOUNT_DELETE_LIST.map((item) => (
            <AccountDeleteInfoList key={item.content} content={item.content} type={item.type} />
          ))}
        </ul>
      </div>

      <label
        htmlFor='exit-agreement'
        className={`flex items-center gap-[1rem] p1 text-gray200 cursor-pointer select-none ${isMobile ? 'w-full' : ''}`}
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
  );
}
