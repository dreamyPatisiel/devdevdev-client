import React from 'react';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export const PickHeader = () => {
  const { isMobile } = useMediaQueryContext();
  return (
    <h1
      className={`font-bold text-white ${isMobile ? 'st1 px-[2.4rem]' : 'h3 mb-16'}`}
      data-testid='pickheart'
    >
      픽픽픽 💘
    </h1>
  );
};
