import { useRef } from 'react';

import { cn } from '@utils/mergeStyle';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { useClickOutside } from '@hooks/useClickOutside';

import AlertBellIcon from '@components/svgs/AlertBellIcon';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import AlertCountBadge from './AlertCountBadge';
import TooltipAlertListContent from './TooltipAlertListContent';

export default function AlertBellNav({ className }: { className?: string }) {
  const alertBellRef = useRef<HTMLDivElement>(null);
  const alertTooltipRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useMediaQueryContext();
  const { openFullPopup } = useFullPopupVisibleStore();
  const { alertCount, isBellDisabled, isAlertListOpen, setAlertListOpen, toggleAlertList } =
    useAlertStore();

  useClickOutside(alertTooltipRef, () => setAlertListOpen(false), [alertBellRef]);

  const handleAlertBellClick = () => {
    if (isMobile) {
      openFullPopup({ popupType: 'AlertList' });
      return;
    }
    toggleAlertList();
  };

  return (
    <div ref={alertBellRef} className={cn('flex flex-row items-center gap-[0.2rem]', className)}>
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
            <TooltipAlertListContent />
          </div>
        )}
      </div>
      <AlertCountBadge count={alertCount || 0} onClick={handleAlertBellClick} />
    </div>
  );
}
