import { AnimatePresence, motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ExclamationCircle from '@public/image/pickpickpick/exclamation-circle.svg';

const portalElement = document.getElementById('potal') as HTMLElement;

function showToast() {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key={'toast-modal'}
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={
          {
            //   ease: 'easeOut',
            // type: 'spring', bounce: 0.25
          }
        }
      >
        <div className='fixed right-1/2 translate-x-1/2'>
          <div className='bg-gray1 px-[4rem] py-[1.6rem] rounded-[1.2rem]'>
            <p className='p2 text-point1 flex items-center gap-[1rem]'>
              <ExclamationCircle alt={'토스트 알림 아이콘'} />
              이미지 용량은 10MB 까지만 가능해요
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    portalElement,
  );
}

export default function Toast() {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, setVisible]);

  return <>{isVisible && showToast()}</>;
}
