import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import AlertBellIcon from '@public/assets/AlertBellIcon';

import AlertList from './AlertList';
import AlertTriangle from './AlertTriangle';

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

  return (
    <div className='relative'>
      <div
        className={cn(`flex flex-row items-center gap-[0.3rem] cursor-pointer ${className}`)}
        onClick={handleAlertBellClick}
      >
        <AlertBellIcon color='gray200' />
        <div className='flex items-center justify-center w-[1.6rem] h-[1.6rem] rounded-RadiusRounded bg-primary500'>
          <span className='font-bold c2'>{alertCount || 0}</span>
        </div>
      </div>
      {isAlertListOpen && (
        <div className='absolute  mt-[2rem] right-[-12px] flex flex-col'>
          <AlertList notifications={notifications} />
          <AlertTriangle className='absolute top-[-16px] right-[32px]' />
        </div>
      )}
    </div>
  );
}
