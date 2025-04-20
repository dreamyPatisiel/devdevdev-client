import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';

import AlertHeader from '@public/image/alertheader/arrowRight6x10.svg';

import { WEB_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { ROUTES } from '@/constants/routes';

import AlertAllReadButton from './AlertAllReadButton';
import AlertList from './AlertList';
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

export default function AlertLists({ notifications, handleAlertAllClick }: NotificationListProps) {
  const { isBellDisabled, handleMarkAllAsRead } = useAlertStore();

  return (
    <>
      <AlertTriangle className='absolute top-[-1.5rem] right-[2.6rem]' />
      <section className='relative min-w-[31.2rem] text-white rounded-Radius16 border border-gray500 overflow-hidden shadow-alertlist'>
        <header className='bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]'>
          <p className='c1 text-gray200'>
            알림 <span className='text-secondary300'>{notifications.length}</span>
          </p>
          <AlertAllReadButton />
        </header>

        {notifications.length > 0 ? (
          <ul className='m-0 p-0'>
            {notifications.slice(0, WEB_ALERT_LIST_COUNT).map((notification) => (
              // TODO: api나오면 LINK달기
              <AlertList key={notification.id} notification={notification} />
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
