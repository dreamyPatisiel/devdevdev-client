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
      duration: 0.3,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const modalRef = useRef(null);
  const { isModalOpen, closeModal } = useModalStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // FIXME: contains에 타입에러가 나서 해결해야함!
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className={PretendardVariable.className}>
      <Header />
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key='modal'
            className='items-center'
            ref={modalRef}
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <Modal />
          </motion.div>
        )}
      </AnimatePresence>
      <main className='w-full h-[100vh]'>{children}</main>
      <footer className='text-white fixed bottom-0 w-full text-center px-5'>devdevdev.co.kr</footer>
    </div>
  );
}
