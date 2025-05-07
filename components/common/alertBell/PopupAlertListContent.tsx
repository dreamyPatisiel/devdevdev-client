import React from 'react';

import Link from 'next/link';

import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { ROUTES } from '@/constants/routes';

import QueryErrorBoundary from '../QueryErrorBoundary';
import { MainButtonV2 } from '../buttons/mainButtonsV2';
import GetAlertListError from '../error/GetAlertListError';
import AlertListHeader from './AlertCountHeader';
import AlertCountPureHeader from './AlertCountPureHeader';
import AlertListsSection from './AlertListsSection';

export default function PopupAlertListContent() {
  const { closeFullPopup } = useFullPopupVisibleStore();

  return (
    <>
      {/* 헤더 */}
      <QueryErrorBoundary fallbackRender={() => <AlertCountPureHeader variant='popup' />}>
        <AlertListHeader variant='popup' />
      </QueryErrorBoundary>

      {/* 알림리스트 */}
      <QueryErrorBoundary
        fallbackRender={({ handleRetryClick }) => (
          <GetAlertListError handleRetryClick={handleRetryClick} />
        )}
      >
        <AlertListsSection type='popup' />
      </QueryErrorBoundary>

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
