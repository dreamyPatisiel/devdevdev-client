import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Link from 'next/link';

import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { ROUTES } from '@/constants/routes';

import QueryErrorBoundary from '../QueryErrorBoundary';
import { MainButtonV2 } from '../buttons/mainButtonsV2';
import AlertListHeader from './AlertCountHeader';
import AlertListsSection from './AlertListsSection';

export default function PopupAlertListContent() {
  const { closeFullPopup } = useFullPopupVisibleStore();

  return (
    <>
      {/* 헤더 */}
      {/* TODO: fallback 컴포넌트 변경필요 */}
      <ErrorBoundary fallback={<div>Error</div>}>
        <AlertListHeader variant='popup' />
      </ErrorBoundary>

      {/* 알림리스트 */}
      <QueryErrorBoundary type='getAlertList'>
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
