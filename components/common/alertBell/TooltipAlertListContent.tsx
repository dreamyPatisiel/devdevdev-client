import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Image from 'next/image';
import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';

import AlertHeader from '@public/image/alertheader/arrowRight6x10.svg';

import { ROUTES } from '@/constants/routes';

import QueryErrorBoundary from '../QueryErrorBoundary';
import GetAlertListError from '../error/GetAlertListError';
import AlertListHeader from './AlertCountHeader';
import AlertCountPureHeader from './AlertCountPureHeader';
import AlertListsSection from './AlertListsSection';
import AlertTriangle from './svgs/AlertTriangle';

export default function TooltipAlertListContent() {
  const { setAlertListOpen } = useAlertStore();

  const handleAlertAllClick = () => {
    setAlertListOpen(false);
  };

  return (
    <>
      <AlertTriangle className='absolute top-[-1.5rem] right-[2.6rem]' />
      <section className='relative min-w-[40rem] text-white rounded-Radius16 border border-gray500 overflow-hidden shadow-alertlist'>
        <QueryErrorBoundary fallbackRender={() => <AlertCountPureHeader variant='tooltip' />}>
          <AlertListHeader variant='tooltip' />
        </QueryErrorBoundary>

        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <GetAlertListError handleRetryClick={handleRetryClick} />
          )}
        >
          <AlertListsSection type='tooltip' />
        </QueryErrorBoundary>

        <Link href={ROUTES.MY_INFO.NOTIFICATIONS} onClick={handleAlertAllClick}>
          <footer className='w-full bg-gray600 px-[1.2rem] pt-[0.8rem] pb-[1.6rem]'>
            <button className='mx-auto flex flex-row justify-center items-center gap-[0.6rem]'>
              <span className='p2 text-gray200 font-light'>알림 전체보기</span>
              <Image src={AlertHeader} alt='arrowRight9x20' />
            </button>
          </footer>
        </Link>
      </section>
    </>
  );
}
