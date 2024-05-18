import { motion, useCycle } from 'framer-motion';

import React, { useEffect } from 'react';

import Image from 'next/image';

import BlackDev from '@/public/image/loading/blackDev.png';
import WhiteDev from '@/public/image/loading/whiteDev.png';

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
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-[1.8rem]'>
        <motion.div variants={variants1} animate={animationState}>
          <Image src={BlackDev} alt='검정Dev로고' />
        </motion.div>
        <Image src={WhiteDev} alt='흰색Dev로고' className='ml-[2.4rem] z-50' />
        <motion.div variants={variants2} animate={animationState}>
          <Image src={BlackDev} alt='검정Dev로고' className='ml-[4.8rem]' />
        </motion.div>
        <p className='mt-[5.6rem] ml-[3.8rem] st1 text-gray4  font-bold'>로딩중입니다</p>
      </div>
    </div>
  );
}
