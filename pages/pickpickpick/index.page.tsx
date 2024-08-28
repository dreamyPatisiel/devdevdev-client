import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import { MainButton } from '@components/common/buttons/mainButtons';
import MobileMainButton from '@components/common/buttons/mobileMainButton';
import { Dropdown } from '@components/common/dropdowns/dropdown';
import { LoginModal } from '@components/common/modals/modal';
import { MobilePickSkeletonList, PickSkeletonList } from '@components/common/skeleton/pickSkeleton';
import MetaHead from '@components/meta/MetaHead';

import IconPencil from '@public/image/pencil-alt.svg';

import { META } from '@/constants/metaData';
import { ROUTES } from '@/constants/routes';
import { PickDropdownProps, useDropdownStore } from '@/stores/dropdownStore';

import { MobilePickInfo, PickInfo } from './components/PickInfo';
import { PickDataProps } from './types/pick';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function Index() {
  const { loginStatus } = useLoginStatusStore();
  const { openModal, isModalOpen, setDescription } = useLoginModalStore();
  const bottom = useRef(null);

  const { MAIN, POSTING } = ROUTES.PICKPICKPICK;

  const { sortOption } = useDropdownStore();
  const isMobile = useIsMobile();

  const { title, description, keyword, url } = META.PICK;

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
              <MobilePickSkeletonList rows={3} hasInfo={true} />
            ) : (
              <PickSkeletonList rows={3} itemsInRows={3} hasInfo={true} />
            )}
          </>
        );

      default:
        return (
          <>
            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {isMobile ? <MobilePickInfo /> : <PickInfo />}

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
                  <MobilePickSkeletonList rows={1} />
                ) : (
                  <PickSkeletonList rows={3} itemsInRows={3} />
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <MetaHead title={title} description={description} keyword={keyword} url={url} />
      <div className={`${isMobile ? 'px-[1.6rem]' : 'pt-24 px-[20.3rem] pb-14'} w-full`}>
        <div className='flex justify-between items-baseline'>
          <h1
            className={`font-bold text-white ${isMobile ? 'st1 px-[2.4rem]' : 'h3 mb-16'}`}
            data-testid='pickheart'
          >
            픽픽픽 💘
          </h1>

          {!isMobile && (
            <div className='flex items-baseline gap-[2rem]'>
              <Dropdown type='pickpickpick' />

              {loginStatus === 'login' ? (
                <Link href={POSTING}>
                  <MainButton
                    text='작성하기'
                    variant='primary'
                    icon={<Image src={IconPencil} alt='연필 아이콘' />}
                    type='button'
                  />
                </Link>
              ) : (
                <MainButton
                  text='작성하기'
                  variant='primary'
                  icon={<Image src={IconPencil} alt='연필 아이콘' />}
                  onClick={() => {
                    openModal();
                    setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
                  }}
                  type='button'
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
                openModal();
                setDescription('댑댑이가 되면 픽픽픽을 작성할 수 있어요 🥳');
              }}
            />
          ))}
        {isModalOpen && loginStatus !== 'login' && <LoginModal />}
      </div>
    </>
  );
}
