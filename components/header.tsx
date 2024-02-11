import React, { useEffect } from 'react';
import Image from 'next/image';
import devLogo from '@/public/image/devdevdevLogo.svg';
import { useModalStore } from '@/store/modalStore';
import { useLoginStatusStore } from '@/store/loginStore';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { loginStatus, fetchLogin, fetchLogout } = useLoginStatusStore();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken ? fetchLogin() : fetchLogout();
  }, [fetchLogin, fetchLogout]);

  const handleTab = (event: MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (loginStatus === 'login') {
      router.push('/');
    } else {
      openModal();
    }
  };

  return (
    <header
      className='w-full h-[8vh] flex flex-row justify-between items-center px-[9.8rem]  text-p1'
      style={{
        borderBottom: '1px solid #DEE5ED',
      }}
    >
      <Image priority src={devLogo} alt='devdevdev로고' />
      <ul className='text-white flex flex-row gap-[4.8rem]'>
        <button onClick={handleTab}>픽픽픽 💖</button>
        <button onClick={handleTab}>기술블로그 🧪</button>
        <button onClick={handleTab}>내정보 🧀</button>
        {loginStatus === 'login' && (
          <li className='leading-[4.8rem]'>
            <span className='text-center text-point1 '>{'게으른 뎁뎁이'}</span>님
          </li>
        )}
        <button
          className='bg-primary1 text-center px-[2rem] py-[1.2rem] rounded-full'
          onClick={openModal}
        >
          {loginStatus === 'login' ? '로그아웃' : '로그인'}
        </button>
      </ul>
    </header>
  );
}
