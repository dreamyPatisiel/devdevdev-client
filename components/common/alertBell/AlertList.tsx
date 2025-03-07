import React from 'react';

import AngleRightIcon from '@public/assets/AngleRightIcon';
import ArrowRight9x20 from '@public/assets/arrowRight9x20';

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
  return (
    <>
    <div className='min-w-[31.2rem] text-white rounded-Radius16 border border-gray500'>
      <div className='bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]'>
        <p className='c1 text-gray200'>
          알림 <span className='text-secondary300'>{notifications.length}</span>
        </p>
        <button className='c1 text-secondary300'>모두 읽음</button>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          // ArrowLeftgreen 아이콘 컬러값 변경해서 사용해야함
          <div
            key={notification.id}
            className='bg-gray800 flex justify-between items-center gap-[1rem] px-[1.2rem] py-[0.8rem] border-b border-gray500 last:border-b-0'
          >
            <p className='max-w-[23.2rem] text-gray100 truncate'>
              <span className='text-secondary300'>{notification.companyName}</span>
              {notification.message}
            </p>
            <div className='flex flex-row items-center gap-[1rem]'>
              <span className='min-w-[3rem] c2 text-gray300'>{notification.time}분전</span>
              <ArrowRight9x20 />
            </div>
          </div>
        ))
      ) : (
        <p className='py-[2.4rem] text-center text-gray700'>확인할 알림이 없어요</p>
      )}
      <button className='w-full flex flex-row justify-center items-center gap-[1rem] bg-gray600 px-[1.2rem] pt-[0.8rem] pb-[1.6rem] rounded-b-Radius16'>
        <p className=' text-gray200 hover:text-gray-200'>알림 전체보기</p>
          <AngleRightIcon color={`var(--gray200)`} />
        </button>
      </div>
    </>
  );
}
