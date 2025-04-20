import { useState, useRef } from 'react';

import { cn } from '@utils/mergeStyle';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { useClickOutside } from '@hooks/useClickOutside';

import AlertBellIcon from '@components/svgs/AlertBellIcon';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import TooltipAlertListContent from './TooltipAlertListContent';

// import { useSSE } from '../../hooks/useSSE';

export default function AlertBellNav({
  alertCount,
  className,
}: {
  alertCount?: number;
  className?: string;
}) {
  // const notifications = useSSE('/api/notifications');
  const alertTooltipRef = useRef<HTMLInputElement>(null);

  const { isMobile } = useMediaQueryContext();
  const { openFullPopup } = useFullPopupVisibleStore();
  const { isBellDisabled } = useAlertStore();
  const [isAlertListOpen, setIsAlertListOpen] = useState(false);

  useClickOutside(alertTooltipRef, () => setIsAlertListOpen(false));

  const handleAlertBellClick = () => {
    if (isMobile) {
      openFullPopup({ popupType: 'AlertList' });
      return;
    }
    setIsAlertListOpen(!isAlertListOpen);
  };

  const handleAlertAllClick = () => {
    setIsAlertListOpen(false);
  };

  const displayAlertCount = alertCount || 0;

  return (
    <div className={cn(`flex flex-row items-center gap-[0.2rem]  ${className}`)}>
      <div className='relative'>
        <AlertBellIcon
          color={isBellDisabled ? 'gray500' : 'gray200'}
          onClick={handleAlertBellClick}
          className='cursor-pointer'
        />
        {isAlertListOpen && (
          <div
            ref={alertTooltipRef}
            className='absolute top-[4.4rem] right-[-2.8rem] flex flex-col'
          >
            <TooltipAlertListContent handleAlertAllClick={handleAlertAllClick} />
          </div>
        )}
      </div>
      <div
        className={`flex items-center justify-center px-[0.4rem] h-[1.6rem] rounded-RadiusRounded bg-primary500 cursor-pointer
          ${displayAlertCount < 10 ? 'w-[1.6rem]' : ''}
        `}
        onClick={handleAlertBellClick}
      >
        <span className={'font-bold c2'}>
          {displayAlertCount <= 10 ? displayAlertCount : '10+'}
        </span>
      </div>
    </div>
  );
}
