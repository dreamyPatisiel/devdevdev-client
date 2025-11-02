import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';

import { useLoginModalStore } from '@stores/modalStore';

import { useObserver } from '@hooks/useObserver';

import { LoginModal } from '@components/common/modals/modal';
import {
  MobilePickSkeletonListV2,
  PickSkeletonListV2,
} from '@components/common/skeleton/pickSkeleton';

import { META } from '@/constants/metaData';
import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { PickDropdownProps, usePickDropdownStore } from '@/stores/dropdownStore';

import { PickSearchInput } from './[id]/components/pickSearchInput';
import { PickActionSection } from './components/PickActionSection';
import { PickHeader } from './components/PickHeader';
import { MobilePickInfoV2, PickInfoV2 } from './components/PickInfo';
import { MobileWriteButton } from './components/PickWriteButton';
import { PickDataProps } from './types/pick';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainerV2'));

export default function Index() {
  const bottom = useRef(null);

  const { MAIN } = ROUTES.PICKPICKPICK;
  const { isLoginModalOpen } = useLoginModalStore();
  const { sortOption } = usePickDropdownStore();

  const { isMobile } = useMediaQueryContext();

  const { pickData, isFetchingNextPage, hasNextPage, status, onIntersect } = useInfinitePickData(
    sortOption as PickDropdownProps,
  );

  useObserver({
    target: bottom,
    onIntersect,
  });

  console.log(pickData, 'pickData');

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
            <PickSearchInput />
            <PickActionSection count={pickData?.pages[0].data.totalElements} />

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
      <PickHeader />
      {getStatusComponent()}
      <div ref={bottom} />
      <MobileWriteButton />
      {isLoginModalOpen && <LoginModal />}
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
