import React from 'react';
import LoginButton from '@/pages/login/LoginButton';

export default function Modal() {
  return (
    <div
      className='border border-gray4 rounded-2xl'
      style={{
        height: '20.2vh',
        width: '27.9vw',
        padding: '3.6vh 4.6vh',
      }}
    >
      <h1 className=' text-2xl text-white text-center mb-9 '>소셜 로그인</h1>
      <LoginButton />
    </div>
  );
}
