import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import AlertHeader from '@public/image/alertheader/arrowRight6x10.svg';

import { WEB_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { ROUTES } from '@/constants/routes';

import AlertTriangle from './svgs/AlertTriangle';

interface Notification {
  id: number;
  message: string;
  companyName: string;
  time: number;
}

interface NotificationListProps {
  notifications: Notification[];
  handleAlertAllClick: () => void;
}

export default function AlertList({ notifications, handleAlertAllClick }: NotificationListProps) {
  const { isBellDisabled, handleMarkAllAsRead } = useAlertStore();

  return (
    <>
      <AlertTriangle className='absolute top-[-1.5rem] right-[2.6rem]' />
      <section className='relative min-w-[31.2rem] text-white rounded-Radius16 border border-gray500 overflow-hidden shadow-alertlist'>
        <header className='bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]'>
          <p className='c1 text-gray200'>
            알림 <span className='text-secondary300'>{notifications.length}</span>
          </p>
          <button
            className={`c1 text-secondary300 ${isBellDisabled ? 'opacity-50' : ''}`}
            onClick={handleMarkAllAsRead}
          >
            모두 읽음
          </button>
        </header>

        {notifications.length > 0 ? (
          <ul className='m-0 p-0'>
            {notifications.slice(0, WEB_ALERT_LIST_COUNT).map((notification) => (
              // TODO: api나오면 LINK달기
              <li
                key={notification.id}
                className='p2 bg-gray800 px-[1.2rem] py-[0.8rem] border-b border-gray500 last:border-b-0 cursor-pointer'
              >
                <div className='flex justify-between items-center gap-[1rem]'>
                  <p
                    className={`max-w-[23.2rem] text-gray100 truncate font-medium ${isBellDisabled ? 'opacity-50' : ''}`}
                  >
                    <span className='text-secondary300 font-bold'>{notification.companyName}</span>
                    {notification.message}
                  </p>
                  <div className='flex flex-row items-center gap-[1rem]'>
                    <span
                      className={`min-w-[3rem] c2 text-gray300 ${isBellDisabled ? 'opacity-50' : ''}`}
                    >
                      {notification.time}분전
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
            ))}
          </ul>
        ) : (
          <p className='bg-gray800 py-[2.4rem] text-center text-gray300' role='status'>
            확인할 알림이 없어요
          </p>
        )}
        <Link href={ROUTES.MY_INFO.NOTIFICATIONS} onClick={handleAlertAllClick}>
          <footer className='w-full bg-gray600 px-[1.2rem] pt-[0.8rem] pb-[1.6rem]'>
            <button className='mx-auto flex flex-row justify-center items-center gap-[0.6rem]'>
              <span className='p2 text-gray200'>알림 전체보기</span>
              <Image src={AlertHeader} alt='arrowRight9x20' />
            </button>
          </footer>
        </Link>
      </section>
    </>
  );
}
