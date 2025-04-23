import { AnimatePresence, motion } from 'framer-motion';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Image from 'next/image';

import { cn } from '@utils/mergeStyle';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';
import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore, useModalStore } from '@stores/modalStore';

import useLogoutMutation from '@hooks/useLogoutMutation';

import LoginButton from '@components/common/LoginButton';
import { LargeBorderDropdown } from '@components/common/dropdowns/dropdown';

import 댑구리_login from '@public/image/뎁구리/댑구리_login.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { ModalButton, LogoutButton } from '../../common/buttons/subButtons';
import { modalVariants } from './modalVariants';

const centerStyle = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';

const ModalAnimateContainer = ({
  closeModal,
  children,
}: {
  closeModal?: () => void;
  children: ReactNode;
}) => {
  return (
    <div className='fixed z-50'>
      <AnimatePresence>
        <motion.div
          data-testid='modal-background'
          key='modal-background'
          className='fixed inset-0 bg-black opacity-50 z-50'
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
    </div>
  );
};

export function LoginModal() {
  const { closeLoginModal, description, setDescription } = useLoginModalStore();
  const { isMobile } = useMediaQueryContext();

  return (
    <>
      <ModalAnimateContainer
        closeModal={() => {
          closeLoginModal();
          setDescription('');
        }}
      >
        <div
          data-testid='login-modal'
          className={`bg-gray600 border border-gray200 rounded-[1.6rem] px-[4.1rem] pt-[3.2rem] pb-[4.2rem] z-50 ${isMobile ? 'w-[34.2rem]' : 'w-[38.5rem]'} ${centerStyle}`}
        >
          <Image
            className={`fixed -top-[10.6rem] ${isMobile ? 'left-[9rem] ' : 'left-[11.5rem] '}`}
            src={댑구리_login}
            alt='로그인 뎁뎁이'
          />
          <h1 className={`text-center mb-[2.6rem] font-bold ${isMobile ? 'st1' : 'h3'}`}>
            ✨ 3초만에 댑댑이 되기! ✨
            <p className='p1 text-gray100 whitespace-pre-wrap'>{description}</p>
          </h1>

          <LoginButton />
        </div>
      </ModalAnimateContainer>
    </>
  );
}

export function LogoutModal({ handleLogout }: { handleLogout: () => void }) {
  const { closeLoginModal } = useLoginModalStore();
  const { isMobile } = useMediaQueryContext();
  const baseWrapperClass = 'text-white bg-gray600 z-50';
  const mobileWrapperClass = 'w-[29.5rem] rounded-[1.2rem] p-[2.4rem]';
  const desktopWrapperClass = 'w-[38.5rem] rounded-[1.6rem] p-[3.1rem]';

  const baseFontClass = 'st1 text-center font-bold mb-[3.2rem]';

  return (
    <ModalAnimateContainer closeModal={closeLoginModal}>
      <div
        data-testid='login-modal'
        className={`${baseWrapperClass} ${isMobile ? mobileWrapperClass : desktopWrapperClass} ${centerStyle}`}
      >
        <p className={`${baseFontClass}`}>로그아웃 할까요? 😢</p>
        <div className={`flex gap-[1.6rem] ${isMobile ? '' : 'p-4'} `}>
          {/* TODO: 버튼 공통 컴포넌트로 교체하기 */}
          <LogoutButton text='취소' variant='gray' onClick={closeLoginModal} />
          <LogoutButton text='로그아웃' variant='primary' onClick={handleLogout} />
        </div>
      </div>
    </ModalAnimateContainer>
  );
}

/** 로그인&로그아웃 모달을 상태에 따라 보여주는 컴포넌트 */
export function AuthModal() {
  const { isLoginModalOpen } = useLoginModalStore();
  const { loginStatus } = useLoginStatusStore();
  const logoutMutation = useLogoutMutation();
  return (
    <>
      {isLoginModalOpen &&
        (loginStatus === 'login' ? (
          <LogoutModal handleLogout={logoutMutation.mutate} />
        ) : (
          <LoginModal />
        ))}
    </>
  );
}

export function ModalContainer() {
  const modalInfos = useModalStore((state) => state.modalInfos);
  const isPending = useModalStore((state) => state.isPending);
  const popModal = useModalStore((state) => state.popModal);
  const showDropdown = useModalStore((state) => state.showDropdown);
  const disabled = useModalStore((state) => state.disabled);

  const modalContainer = document.getElementById('modal-container');

  const { isMobile } = useMediaQueryContext();
  const { refreshSelectedBlameData } = useSelectedStore();
  const { refreshBlameReason } = useBlameReasonStore();

  useEffect(() => {
    if (document.getElementById('modal-container')) return;
    const elem = document.createElement('div');
    elem.setAttribute('id', 'modal-container');
    document.body.appendChild(elem);
  }, []);

  if (!modalContainer) return <></>;

  return createPortal(
    <>
      {modalInfos.map((modalInfo) => (
        <ModalAnimateContainer key={modalInfo.id} closeModal={popModal}>
          <div
            className={cn(
              'bg-gray600 rounded-[1.6rem] z-50 shadow-[0_2px_10px_0_rgba(0,0,0,0.4)]',
              centerStyle,
              isMobile ? 'p-[2.4rem]' : 'p-[3.2rem]',
              isMobile
                ? {
                    'w-[29.5rem]': modalInfo.size === 's',
                    'w-[30rem]': modalInfo.size === 'm', // 신고하기 모달이 모바일에서 깨지는 부분를 위해 임시로 설정
                  }
                : {
                    'w-[40rem]': modalInfo.size === 's',
                    'max-w-[65rem] min-w-[44rem]': modalInfo.size === 'm',
                    'w-[80rem]': modalInfo.size === 'l',
                  },
            )}
          >
            <div className={`flex flex-col text-center`}>
              <h3 className={`font-bold text-white st1`}>{modalInfo.title}</h3>

              {modalInfo.contents &&
                (typeof modalInfo.contents === 'string' ? (
                  <p
                    className={`text-gray200 whitespace-pre-wrap mt-[0.8rem] ${isMobile ? 'p2' : 'p1'}`}
                  >
                    {modalInfo.contents}
                  </p>
                ) : (
                  modalInfo.contents
                ))}

              {showDropdown && (
                <div className='mt-[3.2rem]'>
                  <LargeBorderDropdown />
                </div>
              )}
              <div className={`flex gap-[1.2rem] mt-[3.2rem] justify-end`}>
                {modalInfo.cancelText && (
                  <ModalButton
                    type='button'
                    text={modalInfo.cancelText ?? '취소'}
                    variant='secondary'
                    onClick={() => {
                      modalInfo.cancelFunction();
                      refreshSelectedBlameData();
                      refreshBlameReason();
                    }}
                  />
                )}
                {modalInfo.submitText && (
                  <ModalButton
                    text={modalInfo.submitText}
                    variant='primary'
                    onClick={modalInfo.submitFunction}
                    isPending={isPending}
                    disabled={disabled}
                  />
                )}
              </div>
            </div>
          </div>
        </ModalAnimateContainer>
      ))}
    </>,
    modalContainer as HTMLElement,
  );
}
