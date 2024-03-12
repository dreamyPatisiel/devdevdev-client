import { AnimatePresence, motion } from 'framer-motion';

import React, { CSSProperties, ReactNode } from 'react';

import { cn } from '@utils/mergeStyle';

import { useLoginModalStore, useModalStore } from '@stores/modalStore';

import LoginButton from '@components/LoginButton';
import { LargeBorderDropdown } from '@components/dropdown';

import { SubButton, ModalButton } from '../buttons/subButtons';
import { modalVariants } from './modalVariants';

const centerStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

// FIXME: 타입 더 상세하게
export function LogoutModal({ handleLogout }: { handleLogout: () => void }) {
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
          <SubButton text='취소' variant='gray' onClick={closeModal} />
          <SubButton text='로그아웃' variant='primary' onClick={handleLogout} />
        </div>
      </div>
    </ModalAnimateContainer>
  );
}

interface ModalProps {
  title: string;
  contents?: string | null;
  submitText?: string;
  size?: 's' | 'm' | 'l';
  submitFn?: () => void;
  dropDown?: boolean;
}

export function Modal({ title, contents, submitText, size = 's', submitFn, dropDown }: ModalProps) {
  const { closeModal } = useModalStore();
  const text = submitText ? '취소' : '닫기';

  return (
    <ModalAnimateContainer closeModal={closeModal}>
      <div
        className={cn(
          'bg-gray1 border-[0.1rem] border-gray5 rounded-[1.6rem] p-[3.2rem] z-50 shadow-[0_2px_10px_0_rgba(0,0,0,0.4)]',
          {
            'w-[40rem]': size === 's',
            'w-[56rem]': size === 'm',
            'w-[80rem]': size === 'l',
          },
        )}
        style={centerStyle}
      >
        <div className='flex flex-col gap-[1.4rem]'>
          <h3 className='h3 font-bold text-white'>{title}</h3>
          <p className='p1 text-gray5'>{contents}</p>
        </div>

        {dropDown && (
          <LargeBorderDropdown
            dropdownMenu={[
              '광고가 포함된 게시물이에요',
              '욕설 및 비방을 하고 있어요',
              '같은 내용을 도배하고 있어요',
              '기타',
            ]}
          />
        )}

        <div className='flex gap-[1.2rem] justify-end mt-[3.2rem]'>
          <ModalButton text={text} variant='gray' onClick={closeModal} />
          {submitText && <ModalButton text={submitText} variant='primary' onClick={submitFn} />}
        </div>
      </div>
    </ModalAnimateContainer>
  );
}
