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
        data-testid='kakaoButton'
        onClick={handleOnClick}
        style={{
          width: '50%',
          backgroundColor: '#FEE500',
          color: 'rgba(0, 0, 0, 0.85);',
          fontSize: '1rem',
          padding: '6px',
          borderRadius: '6px',
        }}
      >
        <Image src={kakaoLogo} alt='카카오 로고' />
        카카오 로그인
      </button>
    </>
  );
}
