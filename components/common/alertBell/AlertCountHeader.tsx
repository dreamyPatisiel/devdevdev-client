import React from 'react';

import useGetNotificationsCount from '@/api/notifications/useGetNotificationsCount';
import { cn } from '@/utils/mergeStyle';

interface AlertListHeaderProps {
  variant: 'tooltip' | 'popup';
}

const headerClassByVariant = {
  tooltip: 'bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]',
  popup: 'flex flex-row justify-between px-[1.6rem] pt-[3.2rem] pb-[1.6rem] h-auto',
};

const textClassByVariant = {
  tooltip: 'c1 text-gray200',
  popup: 'st2 font-bold text-white',
};

const AlertListHeader = ({ variant = 'tooltip' }: AlertListHeaderProps) => {
  const { data: alertCount } = useGetNotificationsCount();

  return (
    <header className={cn(headerClassByVariant[variant])}>
      <p className={cn(textClassByVariant[variant])}>
        알림 <span className='text-secondary300'>{alertCount || 0}</span>
      </p>
    </header>
  );
};

export default AlertListHeader;
