import React from 'react';

import { useAlertStore } from '@stores/AlertStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface NotificationProps {
  id: number;
  message: string;
  companyName: string;
  time: number;
}

export default function AlertList({ notification }: { notification: NotificationProps }) {
  const { id, message, companyName, time } = notification;
  const { isBellDisabled } = useAlertStore();
  const { isMobile } = useMediaQueryContext();

  return (
    <li
      key={id}
      className={`p2 ${isMobile ? 'px-[2.4rem] py-[1.6rem]' : 'px-[1.2rem] py-[0.8rem]'} bg-gray800 border-b border-gray500 last:border-b-0 cursor-pointer`}
    >
      <div className='flex justify-between items-center gap-[1rem]'>
        <p
          className={`max-w-[23.2rem] text-gray100 truncate font-medium ${isBellDisabled ? 'opacity-50' : ''}`}
        >
          <span className='text-secondary300 font-bold'>{companyName}</span>
          {message}
        </p>
        <div className='flex flex-row items-center gap-[1rem]'>
          <span className={`min-w-[3rem] c2 text-gray300 ${isBellDisabled ? 'opacity-50' : ''}`}>
            {time}분전
          </span>
          <ArrowRight9x20 />
        </div>
      </div>
      <p
        className={`text-gray300 whitespace-nowrap overflow-hidden text-ellipsis ${isBellDisabled ? 'opacity-50' : ''}`}
      >
        Kotlin으로 DSL 만들기: 반복적이고 지루한 REST Docs 벗어나기
      </p>
    </li>
  );
}
