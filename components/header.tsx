import React, { useEffect } from 'react';
import DevLogo from '@/public/image/devdevdevLogo.svg';
import { useLoginModalStore } from '@/store/modalStore';
import { useLoginStatusStore } from '@/store/loginStore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginModal, LogoutModal } from './modals/modal';
import { modalVariants } from './modals/modalVariants';

export default function Header() {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useLoginModalStore();
  const { loginStatus, fetchLogin, fetchLogout } = useLoginStatusStore();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken ? fetchLogin() : fetchLogout();
  }, [fetchLogin, fetchLogout]);

  const handleClickMyinfo = (tabName: string): void => {
    if (loginStatus === 'login') {
      router.push(`/${tabName}`);
    } else {
      openModal();
    }
  };

  return (
    <>
      <header
        className='bg-gray1 w-full h-[8.5rem] flex flex-row justify-between items-center px-[9.8rem]  text-p1'
        style={{
          borderBottom: '1px solid #DEE5ED',
        }}
      >
        <DevLogo
          priority
          alt='devdevdev로고'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <ul className='text-white flex flex-row items-center gap-[4.8rem]'>
          <li>
            <Link href='/pickpickpick'>픽픽픽 💖</Link>
          </li>
          <li>
            <Link href='/techblog'>기술블로그 🧪</Link>
          </li>
          <li>
            <button onClick={() => handleClickMyinfo('myinfo')}>내정보 🧀</button>
          </li>
          {loginStatus === 'login' && (
            <li className='leading-[4.8rem]'>
              <span className='text-center text-point1 '>{'게으른 뎁뎁이'}</span>님
            </li>
          )}
          <li>
            <button
              className='bg-primary1 text-center px-[2rem] py-[1.2rem] rounded-full'
              onClick={openModal}
            >
              {loginStatus === 'login' ? '로그아웃' : '로그인'}
            </button>
          </li>
        </ul>
      </header>

      {isModalOpen && (
        <AnimatePresence>
          <motion.div
            data-testid='modal-background'
            key='modal-background'
            className='fixed inset-0 bg-black opacity-50'
            onClick={closeModal}
          />
          <motion.div
            key='modal'
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {loginStatus === 'login' ? <LogoutModal /> : <LoginModal />}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
