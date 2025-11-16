'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { useMemo } from 'react';

import {
  PICK_INFO_ITEMS,
  PICK_INFO_DWELL_MS,
  PICK_INFO_SLIDE_MS,
} from '@pages/pickpickpick/[id]/constants/pickInfoConstants';

import { useVerticalStepLoop } from '@hooks/useVerticalStepLoop';

export const PickInfoV2 = () => {
  // 루프 애니메이션을 자연스럽게 만들기 위해 첫 항목을 배열 끝에 한 번 더 붙입니다.
  // [A, B, C] -> [A, B, C, A'] 로 만들어 C→A'도 '한 칸 위로' 슬라이드가 되게 합니다.
  // 슬라이드 직후 y=0 으로 스냅(리셋)하므로 A'와 A가 동일해 화면상 깜빡임/중복 대기는 생기지 않습니다.
  const loopItems = useMemo(() => [...PICK_INFO_ITEMS, PICK_INFO_ITEMS[0]], []);
  const reduceMotion = useReducedMotion();

  const dwell = PICK_INFO_DWELL_MS;
  const slide = PICK_INFO_SLIDE_MS;

  const { controls, firstItemRef } = useVerticalStepLoop({
    itemCount: PICK_INFO_ITEMS.length,
    dwellMs: dwell,
    slideMs: slide,
    reduceMotion,
  });

  return (
    <div className='w-full flex justify-center flex-col items-center px-[2.4rem] pt-[4rem] pb-[2.8rem]'>
      <p className='st1 font-bold mb-[3.6rem] text-center'>
        개발고민 혼자 끙끙 앓지말고, 픽픽픽 💘에서 함께 나눠요!
      </p>
      <div className='h-[2.6rem] w-full overflow-hidden relative'>
        {reduceMotion ? (
          <p className='p1 font-light text-center w-full'>
            <span className='mr-[1.2rem]'>{PICK_INFO_ITEMS[0].icon}</span>
            {PICK_INFO_ITEMS[0].text}
          </p>
        ) : (
          <motion.div
            animate={controls}
            className='flex flex-col items-center'
            style={{ willChange: 'transform' }}
          >
            {loopItems.map((item, i) => (
              <p
                key={i}
                ref={i === 0 ? firstItemRef : undefined}
                className='p1 font-light h-[2.6rem] flex items-center justify-center text-center w-full'
              >
                <span className='mr-[1.2rem]'>{item.icon}</span>
                {item.text}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const MobilePickInfoV2 = () => {
  // 데스크톱과 동일한 이유로 첫 항목을 끝에 복제하여 부드러운 루프를 구성합니다.
  const loopItems = useMemo(() => [...PICK_INFO_ITEMS, PICK_INFO_ITEMS[0]], []);
  const reduceMotion = useReducedMotion();

  const dwell = PICK_INFO_DWELL_MS;
  const slide = PICK_INFO_SLIDE_MS;

  const { controls, firstItemRef } = useVerticalStepLoop({
    itemCount: PICK_INFO_ITEMS.length,
    dwellMs: dwell,
    slideMs: slide,
    reduceMotion,
  });

  return (
    <div className='w-full flex justify-center flex-col items-center pt-[4rem] pb-[2.8rem]'>
      <p className='st2 font-bold mb-[4.4rem] text-center'>
        개발고민 혼자 끙끙 앓지말고,
        <br />
        픽픽픽 💘에서 함께 나눠요!
      </p>
      <div className='h-[2.6rem] w-full overflow-hidden relative'>
        {reduceMotion ? (
          <p className='p1 font-light text-center w-full'>
            <span className='mr-[1.2rem]'>{PICK_INFO_ITEMS[0].icon}</span>
            {PICK_INFO_ITEMS[0].text}
          </p>
        ) : (
          <motion.div
            animate={controls}
            className='flex flex-col items-center'
            style={{ willChange: 'transform' }}
          >
            {loopItems.map((item, i) => (
              <p
                key={i}
                ref={i === 0 ? firstItemRef : undefined}
                className='p1 font-light h-[2.6rem] flex items-center justify-center text-center w-full'
              >
                <span className='mr-[1.2rem]'>{item.icon}</span>
                {item.text}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
