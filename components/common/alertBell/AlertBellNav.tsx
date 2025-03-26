import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import AlertBellIcon from '@components/svgs/AlertBellIcon';

import AlertList from './AlertList';

// import { useSSE } from '../../hooks/useSSE';

const notifications = [
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

  const [isAlertListOpen, setIsAlertListOpen] = useState(false);
  const [isBellDisabled, setIsBellDisabled] = useState(notifications?.length === 0); // TODO: SSE 이벤트 발생시에도 처리 해줘야함

  const handleAlertBellClick = () => {
    setIsAlertListOpen(!isAlertListOpen);
  };

  const handleMarkAllAsRead = () => {
    console.log('모두 읽음 처리');
    setIsBellDisabled(true);
  };

  const displayAlertCount = alertCount || 0;

  return (
    <div className={cn(`flex flex-row items-center gap-[0.2rem] cursor-pointer ${className}`)}>
      <div className='relative'>
        <AlertBellIcon
          color={isBellDisabled ? 'gray500' : 'gray200'}
          onClick={handleAlertBellClick}
        />
        {isAlertListOpen && (
          <div className='absolute top-[4.4rem] right-[-2.8rem] flex flex-col'>
            <AlertList
              notifications={notifications}
              isBellDisabled={isBellDisabled}
              handleMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        )}
      </div>
      <div
        className={`flex items-center justify-center px-[0.4rem] h-[1.6rem] rounded-RadiusRounded bg-primary500
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
