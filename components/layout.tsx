import { useModalStore } from '@/store/modalStore';
import { PretendardVariable } from '@/styles/fonts';
import { ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './header';
import Modal from './modal';

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
  return (
    <div className={PretendardVariable.className}>
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
              className='items-center'
              variants={modalVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <Modal />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <main className='w-full h-[100vh]'>{children}</main>
      <footer className='text-white fixed bottom-0 w-full text-center px-5'>devdevdev.co.kr</footer>
    </div>
  );
}
