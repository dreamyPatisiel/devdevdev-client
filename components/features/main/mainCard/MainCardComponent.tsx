import React, { useEffect, useState } from 'react';

import useIsMobile from '@hooks/useIsMobile';

import Tooltip from '@components/common/tooltips/tooltip';

import { MAINCARD_CONSTANT, TOOLTIP_DATA } from '@/constants/MainCardConstants';

import { MainCardLink, MainCardText } from './cardSemiComponents';

export default function MainCardComponent({ path }: { path: '/pickpickpick' | '/techblog' }) {
  const { isMobile } = useIsMobile();

  const type = path === '/pickpickpick' ? 'pick' : 'tech';

  const paragraph = type === 'pick' ? MAINCARD_CONSTANT.PICK : MAINCARD_CONSTANT.TECH;
  const tooltipColor = type === 'pick' ? 'purpleTt' : 'greenTt';
  const tooltipData = type === 'pick' ? TOOLTIP_DATA.PICK : TOOLTIP_DATA.TECH;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const MainCardWrapperStyle = {
    base: 'w-full  px-[3.2rem] rounded-3xl text-white',
    desktop: 'h-[51.8rem] py-[8.8rem]',
    mobile: 'h-[39.8rem] py-[4rem]',
  };

  return (
    <div
      className={`${MainCardWrapperStyle.base} ${isMobile ? MainCardWrapperStyle.mobile : MainCardWrapperStyle.desktop}`}
      style={{ backgroundColor: 'rgba(41,42,46, 0.5)' }}
    >
      <div className='mx-3 mb-[5rem] c1'>
        {tooltipData.map((tooltip) => (
          <div key={tooltip.key} className='relative' style={{ top: `${tooltip.top}px` }}>
            <Tooltip
              variant={tooltipColor}
              direction='left'
              isVisible={isVisible}
              style={{ left: 0 }}
            >
              {tooltip.text}
            </Tooltip>
          </div>
        ))}
      </div>

      <div className={`st1 relative top-48`}>
        <MainCardText paragraph1={paragraph[0]} paragraph2={paragraph[1]} />
        <MainCardLink path={path} />
      </div>
    </div>
  );
}
