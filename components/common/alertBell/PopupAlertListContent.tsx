import React from 'react';

import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';
import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { ROUTES } from '@/constants/routes';

import { MainButtonV2 } from '../buttons/mainButtonsV2';
import AlertAllReadButton from './AlertAllReadButton';
import AlertListsSection from './AlertListsSection';

export default function PopupAlertListContent() {
  const { closeFullPopup } = useFullPopupVisibleStore();
  const { alertCount } = useAlertStore();

  return (
    <>
      {/* 헤더 */}
      <div className='flex flex-row justify-between px-[1.6rem] pt-[3.2rem] pb-[1.6rem] h-auto'>
        <p className='st2 font-bold text-white'>
          알림 <span className='text-secondary300'>6</span>
        </p>
        <AlertAllReadButton />
      </div>
      {/* 알림리스트 */}
      {alertCount > 0 ? (
        <AlertListsSection />
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
