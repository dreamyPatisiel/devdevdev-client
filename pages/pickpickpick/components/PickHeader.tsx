import React from 'react';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export const PickHeader = ({ onClick }: { onClick: () => void }) => {
  const { isMobile } = useMediaQueryContext();
  return (
    <h1
      className={`font-bold text-white cursor-pointer ${isMobile ? 'st1 px-[2.4rem]' : 'h3 mb-16'}`}
      data-testid='pickheart'
      onClick={onClick}
    >
      픽픽픽 💘
    </h1>
  );
};
