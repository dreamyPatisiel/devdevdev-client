import React, { CSSProperties } from 'react';
import axios from 'axios';
import SubButton from './buttons/subButton';
import LoginButton from '@/components/LoginButton';

import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';

const centerStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
};

export function LoginModal() {
  return (
    <div
      data-testid='login-modal'
      className='bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] px-[4.1rem] py-[3.2rem] z-50'
      style={centerStyle}
    >
      <h1 className=' text-h3 text-white text-center mb-[4.3rem] '>소셜 로그인</h1>
      <LoginButton />
    </div>
  );
}

export function LogoutModal() {
  const { closeModal } = useModalStore();

  const postLogin = async (): Promise<void> => {
    const url = '/devdevdev/api/v1/logout';
    return axios.post(url);
  };

  const { data, error, isError, isSuccess, mutate } = useMutation(postLogin);

  console.log(` isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`);

  const handleLogout = () => {
    mutate(); // mutate 함수를 클릭 이벤트 핸들러에 바인딩
  };

  return (
    <div
      data-testid='login-modal'
      className='text-white bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] p-[3.1rem] z-50'
      style={centerStyle}
    >
      <p className='text-center text-h3 mb-[3.2rem]'>로그아웃 할까요? 🥲</p>
      <div className='p-4 flex gap-[1.6rem]'>
        <SubButton text='취소' bgColor='gray3' onClick={closeModal} />
        <SubButton text='로그아웃' bgColor='primary1' onClick={handleLogout} />
      </div>
    </div>
  );
}
