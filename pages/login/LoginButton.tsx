import Image from 'next/image';
import React from 'react';

import kakaoLogo from '@/public/image/kakao_icon.svg';
import axios from 'axios';
import { loginConfig, baseUrlConfig } from '@/config';

export default function LoginButton() {
  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint || '';
  const REDIRECT_URL = URL + END_PONIT;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${loginConfig.clientId}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const handleOnClick = async () => {
    try {
      const response = await axios.get(kakaoAuthUrl);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      <button
        className='bg-kakaoYellow text-black text-l p-2.5 rounded-md flex items-center justify-center gap-3 min-w-48 w-1/2'
        data-testid='kakaoButton'
        onClick={handleOnClick}
      >
        <Image src={kakaoLogo} alt='카카오 로고' width={24} height={24} />
        카카오 로그인
      </button>
    </>
  );
}
