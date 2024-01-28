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

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${loginConfig.clientId}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  return (
    <>
      {/* FIXME: 추후에 디자인 나오면 css 수정하기 */}
      <Link href={kakaoAuthUrl}>
        <button
          className='bg-kakaoYellow text-black text-l p-2.5 rounded-md flex items-center justify-center gap-3 min-w-48 w-full'
          data-testid='kakaoButton'
        >
          <Image src={kakaoLogo} alt='카카오 로고' width={24} height={24} />
          카카오 로그인
        </button>
      </Link>
    </>
  );
}
