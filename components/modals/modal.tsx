import { AnimatePresence, motion } from 'framer-motion';

import React, { CSSProperties, ReactNode } from 'react';

import { useLoginModalStore, useModalStore } from '@stores/modalStore';

import LoginButton from '@components/LoginButton';

import { SubButton, SubModalButton } from '../buttons/subButton';
import { modalVariants } from './modalVariants';

const centerStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
};

const ModalAnimateContainer = ({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: ReactNode;
}) => {
  return (
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
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export function LoginModal() {
  const { closeModal } = useLoginModalStore();

  return (
    <ModalAnimateContainer closeModal={closeModal}>
      <div
        data-testid='login-modal'
        className='bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] px-[4.1rem] py-[3.2rem] z-50'
        style={centerStyle}
      >
        <h1 className=' text-h3 text-white text-center mb-[4.3rem] '>소셜 로그인</h1>
        <LoginButton />
      </div>
    </ModalAnimateContainer>
  );
}

export function LogoutModal() {
  const { closeModal } = useLoginModalStore();

  return (
    <ModalAnimateContainer closeModal={closeModal}>
      <div
        data-testid='login-modal'
        className='text-white bg-gray1 w-[38.5rem] border border-gray3 rounded-[1.6rem] p-[3.1rem] z-50'
        style={centerStyle}
      >
        <p className='text-center text-h3 mb-[3.2rem]'>로그아웃 할까요? 🥲</p>
        <div className='p-4 flex gap-[1.6rem]'>
          <SubButton text='취소' bgColor='gray3' onClick={closeModal} />
          <SubButton text='로그아웃' bgColor='primary1' onClick={() => console.log('로그아웃')} />
        </div>
      </div>
    </ModalAnimateContainer>
  );
}

interface ModalProps {
  title: string;
  contents?: string;
  submitText?: string;
  size?: 's' | 'm' | 'l';
  submitFn?: () => void;
}

export function Modal({ title, contents, submitText, size = 's', submitFn }: ModalProps) {
  const { closeModal } = useModalStore();
  const text = submitText ? '취소' : '닫기';

  return (
    <ModalAnimateContainer closeModal={closeModal}>
      <div
        className={`bg-gray1 border border-gray5 rounded-[1.6rem] p-[3.2rem] z-50 shadow-[0_2px_10px_0_rgba(0,0,0,0.4)] 
          ${size === 'l' ? `w-[80rem]` : size === 'm' ? `w-[56rem]` : `w-[40rem]`}`}
        style={centerStyle}
      >
        <div className='flex flex-col gap-[1.4rem]'>
          <h3 className='h3 font-bold text-white'>{title}</h3>
          <p className='p1 text-gray5'>{contents}</p>
        </div>

        <div className='flex gap-[1.2rem] justify-end mt-[3.2rem]'>
          <SubModalButton text={text} bgColor='gray2' onClick={closeModal} />
          {submitText && <SubModalButton text={submitText} bgColor='primary1' onClick={submitFn} />}
        </div>
      </div>
    </ModalAnimateContainer>
  );
}
