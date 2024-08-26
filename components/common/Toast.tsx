import { AnimatePresence, motion } from 'framer-motion';

import { useEffect } from 'react';

import Image from 'next/image';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import ErrorExclamationCircle from '@public/image/pickpickpick/exclamation-circle-red.svg';
import ExclamationCircle from '@public/image/pickpickpick/exclamation-circle.svg';

export default function Toast() {
  const isMobile = useIsMobile();
  const { isToastVisible, toastMessage, setToastInvisible, toastType } = useToastVisibleStore();

  // useEffect(() => {
  //   if (isToastVisible) {
  //     const timer = setTimeout(() => {
  //       setToastInvisible();
  //     }, 5000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [isToastVisible]);

  const showToast = () => {
    return (
      <motion.div
        key={'toast-modal'}
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        {/* TODO: 보완필요.. 
        fixed inset-0 flex items-center  justify-center : width문제해결 , top조정을 못함

        fixed right-1/2 translate-x-1/2 : top조정가능 , width가 생각한대로 잡히지 않음
        */}
        <div
          className={`${isMobile ? 'fixed right-1/2 translate-x-1/2' : 'fixed right-1/2 translate-x-1/2'}  z-10`}
        >
          <div
            className={`bg-gray1 ${isMobile ? 'px-[2.4rem] c1' : 'px-[4rem] p2'}  py-[1.6rem] rounded-[1.2rem] shadow-[0_2px_10px_0_rgba(0,0,0,0.35)]`}
          >
            <p
              className={`${toastType === 'error' ? 'text-red' : 'text-point1'}
                text-point1 flex items-center gap-[1rem] font-bold`}
            >
              {toastType === 'error' ? (
                <Image src={ErrorExclamationCircle} alt='토스트 에러 알림 아이콘' />
              ) : (
                <Image src={ExclamationCircle} alt={'토스트 알림 아이콘'} />
              )}
              {toastMessage}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return <AnimatePresence>{isToastVisible && showToast()}</AnimatePresence>;
}
