import React from 'react';

import ArrowRight9x20 from '@public/assets/arrowRight9x20';
import AlertHeader from '@public/image/alertheader/arrowRight6x10.svg';
import Image from 'next/image';
interface Notification {
  id: number;
  message: string;
  companyName: string;
  time: number;
}

interface NotificationListProps {
  notifications: Notification[];
}

export default function AlertList({ notifications }: NotificationListProps) {

  const handleViewAllClick = () => {
    console.log('알림 전체보기');
  };

  const handleMarkAllAsRead = () => {
    console.log('모두 읽음 처리');
  };

  return (
    <section  className='min-w-[31.2rem] text-white rounded-Radius16 border border-gray500'>
      <header className='rounded-t-Radius16 bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]'>
        <p className='c1 text-gray200'>
          알림 <span className='text-secondary300'>{notifications.length}</span>
        </p>
        <button className='c1 text-secondary300' 
         onClick={handleMarkAllAsRead}
        >모두 읽음</button>
      </header>

      {notifications.length > 0 ? (
        <ul className='list-none m-0 p-0'>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className='bg-gray800 flex justify-between items-center gap-[1rem] px-[1.2rem] py-[0.8rem] border-b border-gray500 last:border-b-0 cursor-pointer'
            >
              <p className='max-w-[23.2rem] text-gray100 truncate p2 font-medium'>
                <span className='text-secondary300 font-bold'>{notification.companyName}</span>
                {notification.message}
              </p>
              <div className='flex flex-row items-center gap-[1rem]'>
                <span className='min-w-[3rem] c2 text-gray300'>{notification.time}분전</span>
                <ArrowRight9x20 />
              </div>
            </li>
          ))}
        </ul>

      ) : (
        <p className='py-[2.4rem] text-center text-gray700' role="status">
          확인할 알림이 없어요
        </p>
      )}
      <footer
        className='w-full bg-gray600 px-[1.2rem] pt-[0.8rem] pb-[1.6rem] rounded-b-Radius16'
      >
        <button className='mx-auto flex flex-row justify-center items-center gap-[0.6rem]' 
           onClick={handleViewAllClick}>
        <span className='p2 font-bold text-gray200'>알림 전체보기</span>
        <Image src={AlertHeader} alt='arrowRight9x20'  />
        </button>
      </footer>
    </section >
  );
}
