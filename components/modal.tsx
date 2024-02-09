import React from 'react';
import LoginButton from '@/components/LoginButton';
import { useModalStore } from '@/store/modalStore';

export function LoginModal() {
  return (
    <div
      data-testid='login-modal'
      className='bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] px-[4.1rem] py-[3.2rem] z-50'
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
      }}
    >
      <h1 className=' text-h3 text-white text-center mb-[4.3rem] '>소셜 로그인</h1>
      <LoginButton />
    </div>
  );
}

export function LogoutModal() {
  const { closeModal } = useModalStore();

  return (
    <div
      data-testid='login-modal'
      className='text-white bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] p-[3.1rem] z-50'
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
      }}
    >
      <p className='text-center text-h3 mb-[3.2rem]'>로그아웃 할까요? 🥲</p>
      <ul className='p-4 flex gap-[1.6rem]'>
        <button
          className='bg-gray3 text-st2 py-[0.9rem] rounded-[0.8rem] w-[14.2rem]'
          onClick={closeModal}
        >
          취소
        </button>
        <button className='bg-primary1 text-st2 py-[0.9rem] rounded-[0.8rem] w-[14.2rem]'>
          로그아웃
        </button>
      </ul>
    </div>
  );
}
