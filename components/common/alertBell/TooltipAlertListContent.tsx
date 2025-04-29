import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAlertStore } from '@stores/AlertStore';

import AlertHeader from '@public/image/alertheader/arrowRight6x10.svg';

import { ROUTES } from '@/constants/routes';

import AlertAllReadButton from './AlertAllReadButton';
import AlertListsSection from './AlertListsSection';
import AlertTriangle from './svgs/AlertTriangle';

export default function TooltipAlertListContent() {
  const { alertCount, setAlertListOpen } = useAlertStore();

  const handleAlertAllClick = () => {
    setAlertListOpen(false);
  };

  return (
    <>
      <AlertTriangle className='absolute top-[-1.5rem] right-[2.6rem]' />
      <section className='relative min-w-[31.2rem] max-w-[40rem]text-white rounded-Radius16 border border-gray500 overflow-hidden shadow-alertlist'>
        <header className='bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]'>
          <p className='c1 text-gray200'>
            {/* TODO: 알림 갯수  - store에서 관리 */}
            알림 <span className='text-secondary300'>{alertCount}</span>
          </p>
          <AlertAllReadButton />
        </header>

        <AlertListsSection type='tooltip' />

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
