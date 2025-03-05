import { cn } from '@utils/mergeStyle';

import AlertBellIcon from '@public/assets/AlertBellIcon';

import AlertList from './AlertList';

// import { useSSE } from '../../hooks/useSSE';

export default function AlertBellNav({
  alertCount,
  onClick,
  className,
}: {
  alertCount?: number;
  onClick?: () => void;
  className?: string;
}) {
  // const notifications = useSSE('/api/notifications');

  const notifications = [
    { id: 1, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 5 },
    { id: 2, companyName: '쿠팡', message: '에서 새로운 글이 올라왔어요!', time: 10 },
    { id: 3, companyName: 'AWS', message: '에서 새로운 글이 올라왔어요!', time: 15 },
    { id: 4, companyName: '우아한형제들', message: '에서 새로운 글이 올라왔어요!', time: 20 },
    { id: 5, companyName: '토스', message: '에서 새로운 글이 올라왔어요!', time: 25 },
  ];

  return (
    <div className='relative'>
      <div className={cn(`flex flex-row items-center gap-[0.3rem] ${className}`)} onClick={onClick}>
        <AlertBellIcon color='gray200' />
        <span className='h-[1.6rem] ml-[0.3rem] py-[0.1rem] px-[0.49rem] rounded-RadiusRounded bg-primary500 c2'>
          {alertCount || 0}
        </span>
      </div>
      <div className='absolute top-full mt-[2rem] right-0'>
        <AlertList notifications={notifications} />
      </div>
    </div>
  );
}
