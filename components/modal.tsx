import React from 'react';
import LoginButton from '@/pages/login/LoginButton';

export default function Modal() {
  return (
    <div
      className='w-[40.2rem] border border-gray4 rounded-[1.6rem] px-[4.1rem] py-[3.2rem]'
      style={
        {
          // height: '20.2vh',
          // width: '27.9vw',
          // padding: '3.6vh 4.6vh',
        }
      }
    >
      <h1 className=' text-h3 text-white text-center mb-[4.3rem] '>소셜 로그인</h1>
      <LoginButton />
    </div>
  );
}