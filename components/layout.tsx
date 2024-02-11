import { useModalStore } from '@/store/modalStore';
import { PretendardVariable } from '@/styles/fonts';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './header';
import { LoginModal, LogoutModal } from './modal';
import { useLoginStatusStore } from '@/store/loginStore';

// 모달 효과
const modalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const { isModalOpen, closeModal } = useModalStore();
  const { loginStatus } = useLoginStatusStore();

  return (
    <div
      className={`${PretendardVariable.className} w-full h-screen flex flex-col items-center text-white`}
    >
      <Header />
      <AnimatePresence>
        {isModalOpen && (
          <>
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
          </>
        )}
      </AnimatePresence>
      <main className='w-[1440px] overflow-y-scroll scrollbar-hide '>{children}</main>
      <footer className='flex justify-center items-center px-5 h-[5vh]'>devdevdev.co.kr</footer>
    </div>
  );
}
