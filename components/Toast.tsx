import { AnimatePresence, motion } from 'framer-motion';

import { useEffect } from 'react';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import ExclamationCircle from '@public/image/pickpickpick/exclamation-circle.svg';

export default function Toast() {
  const { isToastVisible, toastMessage, setToastInvisible } = useToastVisibleStore();

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        setToastInvisible();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isToastVisible]);

  const showToast = () => {
    return (
      <motion.div
        key={'toast-modal'}
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <div className='fixed right-1/2 translate-x-1/2 z-10'>
          <div className='bg-gray1 px-[4rem] py-[1.6rem] rounded-[1.2rem] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)]'>
            <p className='p2 text-point1 flex items-center gap-[1rem] font-bold'>
              <ExclamationCircle alt={'토스트 알림 아이콘'} />
              {toastMessage}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return <AnimatePresence>{isToastVisible && showToast()}</AnimatePresence>;
}
