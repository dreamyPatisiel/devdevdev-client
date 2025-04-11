import React from 'react';

import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import ArrowRight9x20 from '@components/svgs/arrowRight9x20';

import { MOBILE_ALERT_LIST_COUNT } from '@/constants/alertListViewConstant';
import { ROUTES } from '@/constants/routes';

import { MainButtonV2 } from '../buttons/mainButtonsV2';
import { notifications } from './AlertBellNav';

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
            <li
              key={notification.id}
              className='p2 bg-gray800 px-[2.4rem] py-[1.6rem] border-b border-gray500 last:border-b-0 cursor-pointer'
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
