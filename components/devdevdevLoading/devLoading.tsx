import React, { useEffect } from 'react';
import BlackDev from '@/public/image/loading/blackDev.svg';
import WhiteDev from '@/public/image/loading/whiteDev.svg';
import { motion, useCycle } from 'framer-motion';
import { variants1, variants2 } from './devVariants';

export function DevDevDevLoading() {
  const INTERVAL_TIME = 1.8;
  const [animationState, cycleAnimationState] = useCycle('animate1', 'animate2');

  useEffect(() => {
    const intervalId = setInterval(() => {
      cycleAnimationState();
    }, INTERVAL_TIME * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-[1.8rem]'>
      <motion.div variants={variants1} animate={animationState}>
        <BlackDev />
      </motion.div>
      <WhiteDev className='ml-[2.4rem]' />
      <motion.div variants={variants2} animate={animationState}>
        <BlackDev className='ml-[4.8rem]' />
      </motion.div>
      <p className='mt-[5.6rem] ml-[3.8rem] st1 text-gray4  font-bold'>로딩중입니다</p>
    </div>
  );
}
