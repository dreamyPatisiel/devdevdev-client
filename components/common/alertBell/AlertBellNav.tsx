import { cn } from '@utils/mergeStyle';

import AlertBellIcon from '@public/assets/AlertBellIcon';

import AlertList from './AlertList';
import AlertTriangle from './AlertTriangle';
import { useState } from 'react';

// import { useSSE } from '../../hooks/useSSE';

export default function AlertBellNav({
  alertCount,
  className,
}: {
  alertCount?: number;
  className?: string;
}) {
  // const notifications = useSSE('/api/notifications');

  const [isAlertListOpen, setIsAlertListOpen] = useState(false);
  const handleAlertBellClick = () => {
    setIsAlertListOpen(!isAlertListOpen);
  };

  const notifications = [
    { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
    { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
    { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
    { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
    { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
  ];

  const DISPLAY_ALERT_COUNT = alertCount || 0;

  return (
      <div className={cn(`relative flex flex-row items-center gap-[0.2rem] cursor-pointer ${className}`)} onClick={handleAlertBellClick}>
        <AlertBellIcon color='gray200' />

        <div className={`flex items-center justify-center px-[0.4rem] h-[1.6rem] rounded-RadiusRounded bg-primary500
          ${DISPLAY_ALERT_COUNT < 10 ? 'w-[1.6rem]' : ''}
        `}>
          <span className={'font-bold c2'}>
            {DISPLAY_ALERT_COUNT}
          </span> 
        </div>
        
        {isAlertListOpen && (
          <div className='absolute top-[4.4rem] right-[-1rem] flex flex-col'>
            <AlertList notifications={notifications} />
          </div>
        )}
      </div>
  );
}
