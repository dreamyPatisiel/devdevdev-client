import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import { useObserver } from '@hooks/useObserver';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';
import MobileMainButton from '@components/common/buttons/mobileMainButton';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import { LoginModal } from '@components/common/modals/modal';
import {
  MobilePickSkeletonListV2,
  PickSkeletonListV2,
} from '@components/common/skeleton/pickSkeleton';

import IconPencil from '@public/image/pencil-alt.svg';

import { META } from '@/constants/metaData';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { PickDropdownProps, usePickDropdownStore } from '@/stores/dropdownStore';

import { MobilePickInfoV2, PickInfoV2 } from './components/PickInfo';
import { PickDataProps } from './types/pick';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function Index() {
  const bottom = useRef(null);

  const { MAIN, POSTING } = ROUTES.PICKPICKPICK;

  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal, isLoginModalOpen, setDescription } = useLoginModalStore();
  const { sortOption } = usePickDropdownStore();

  const { isMobile } = useMediaQueryContext();

  const { pickData, isFetchingNextPage, hasNextPage, status, onIntersect } = useInfinitePickData(
    sortOption as PickDropdownProps,
  );

  useObserver({
    target: bottom,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            {isMobile ? (
              <MobilePickSkeletonListV2 rows={3} />
            ) : (
              <PickSkeletonListV2 rows={3} itemsInRows={2} />
            )}
          </>
        );

      default:
        return (
          <>
            {isMobile ? <MobilePickInfoV2 /> : <PickInfoV2 />}

            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {pickData?.pages.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data.content.map((data: PickDataProps) => (
                    <Link href={`${MAIN}/${data.id}`} key={data.id}>
                      <DynamicComponent key={data.id} pickData={data} />
                    </Link>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                {isMobile ? (
                  <MobilePickSkeletonListV2 rows={3} />
                ) : (
                  <PickSkeletonListV2 rows={3} itemsInRows={2} />
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className={`${isMobile ? 'px-[1.6rem]' : 'pt-24 px-[20.3rem]'} pb-[11.2rem] w-full`}>
      <div className='flex justify-between items-baseline'>
        <h1
          className={`font-bold text-white ${isMobile ? 'st1 px-[2.4rem]' : 'h3 mb-16'}`}
          data-testid='pickheart'
        >
          픽픽픽 💘
        </h1>

        {isMobile && <MobileDropdown />}

        {!isMobile && (
          <div className='flex items-baseline gap-[2rem]'>
            <Dropdown type='pickpickpick' />

            {loginStatus === 'login' ? (
              <Link href={POSTING}>
                <MainButtonV2
                  text='작성하기'
                  color='primary'
                  line={false}
                  size='medium'
                  radius='square'
                  status='on'
                />
              </Link>
            ) : (
              <MainButtonV2
                text='작성하기'
                color='primary'
                line={false}
                size='medium'
                radius='square'
                status='on'
                onClick={() => {
                  openLoginModal();
                  setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
                }}
              />
            )}
          </div>
        )}
      </div>
      {getStatusComponent()}
      <div ref={bottom} />
      {isMobile &&
        (loginStatus === 'login' ? (
          <Link href={POSTING}>
            <MobileMainButton text='작성하기' />
          </Link>
        ) : (
          <MobileMainButton
            text='작성하기'
            onClick={() => {
              openLoginModal();
              setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
            }}
          />
        ))}
      {isLoginModalOpen && loginStatus !== 'login' && <LoginModal />}
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      meta: META.PICK,
    },
  };
}
