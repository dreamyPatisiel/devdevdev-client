import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import AlertBellIcon from '@components/svgs/AlertBellIcon';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import AlertList from './AlertList';

// import { useSSE } from '../../hooks/useSSE';

export const notifications = [
  { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
  { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
  { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
  { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
  { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
  { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
  { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
  { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
  { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
  { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
];

export default function AlertBellNav({
  alertCount,
  className,
}: {
  alertCount?: number;
  className?: string;
}) {
  // const notifications = useSSE('/api/notifications');

  const { isMobile } = useMediaQueryContext();
  const { openFullPopup } = useFullPopupVisibleStore();
  const { isBellDisabled, handleMarkAllAsRead } = useAlertStore();
  const [isAlertListOpen, setIsAlertListOpen] = useState(false);

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
          <div className='absolute top-[4.4rem] right-[-2.8rem] flex flex-col'>
            <AlertList
              notifications={notifications}
              isBellDisabled={isBellDisabled}
              handleMarkAllAsRead={handleMarkAllAsRead}
              handleAlertAllClick={handleAlertAllClick}
            />
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
