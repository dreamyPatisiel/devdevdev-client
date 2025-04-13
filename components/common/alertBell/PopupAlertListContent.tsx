import React from 'react';

import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import { MOBILE_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { ROUTES } from '@/constants/routes';

import { MainButtonV2 } from '../buttons/mainButtonsV2';
import { notifications } from './AlertBellNav';
import AlertList from './AlertList';

export default function PopupAlertListContent() {
  const { closeFullPopup } = useFullPopupVisibleStore();
  const { isBellDisabled, handleMarkAllAsRead } = useAlertStore();

  return (
    <>
      {/* 헤더 */}
      <div className='flex flex-row justify-between px-[1.6rem] pt-[3.2rem] pb-[1.6rem] h-auto'>
        <p className='st2 font-bold text-white'>
          알림 <span className='text-secondary300'>6</span>
        </p>
        <button
          className={`c1 text-secondary300 ${isBellDisabled ? 'opacity-50' : ''}`}
          onClick={handleMarkAllAsRead}
          disabled={isBellDisabled || notifications.length === 0}
        >
          모두 읽음
        </button>
      </div>
      {/* 알림리스트 */}
      {notifications.length > 0 ? (
        <ul className='h-[calc(100dvh-8.9rem-7.4rem-6rem)] overflow-y-auto scrollbar-hide'>
          {notifications.slice(0, MOBILE_ALERT_LIST_COUNT).map((notification) => (
            // TODO: api나오면 LINK달기
            <AlertList notification={notification} />
          ))}
        </ul>
      ) : (
        <p className='relative top-1/3 st2 text-center text-gray300' role='status'>
          확인할 알림이 없어요
        </p>
      )}

      <Link href={ROUTES.MY_INFO.NOTIFICATIONS} onClick={closeFullPopup}>
        <MainButtonV2
          className='fixed bottom-[1.2rem] left-1/2 transform -translate-x-1/2 w-[90%]'
          color='primary'
          line={false}
          radius='square'
          size='medium'
          text='알림 전체 보기'
        />
      </Link>
    </>
  );
}
