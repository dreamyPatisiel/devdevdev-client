import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import kakaoLogo from '@/public/image/kakao_icon.svg';
import axios from 'axios';
import { loginConfig, baseUrlConfig } from '@/config';

export default function LoginButton() {
  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;

  const handleOpenModal = () => {
    const newWindow = window.open(REDIRECT_URL, '_blank', 'width=400,height=550');
    if (newWindow) {
      // 새탭의 위치를 중앙으로 조정
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const left = (screenWidth - 400) / 2;
      const top = (screenHeight - 550) / 2;
      newWindow.moveTo(left, top);
    }
  };

  return (
    <>
      {/* FIXME: 추후에 디자인 나오면 css 수정하기 */}
      {/* <Link href={REDIRECT_URL}> */}
      <button
        onClick={handleOpenModal}
        className='bg-kakaoYellow text-black text-l p-2.5 rounded-md flex items-center justify-center gap-3 min-w-48 w-full'
        data-testid='kakaoButton'
      >
        <Image src={kakaoLogo} alt='카카오 로고' width={24} height={24} />
        카카오 로그인
      </button>
      {/* </Link> */}
    </>
  );
}
