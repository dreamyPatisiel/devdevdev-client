import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { useObserver } from '@hooks/useObserver';

import {
  MobilePickSkeletonList,
  MyPickSkeletonList,
} from '@components/common/skeleton/pickSkeleton';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useInfiniteMyPicks } from '../apiHooks/useInfiniteMyPicks';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function MyPickStatusComponent() {
  const { isMobile } = useMediaQueryContext();
  const { myPicks, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfiniteMyPicks();

  const bottom = useRef(null);

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
              <MobilePickSkeletonList rows={3} />
            ) : (
              <MyPickSkeletonList rows={3} itemsInRows={2} />
            )}
          </>
        );

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        if (myPicks?.pages[0].data.data.content.length === 0)
          return <NoMyInfoData type='noMyPick' />;

        return (
          <>
            <div className={`${isMobile ? 'gap-[2.2rem] ' : 'grid grid-cols-2 gap-[2.4rem] '}`}>
              {myPicks?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data?.data?.content?.map((data: PickDataProps) =>
                    data.contentStatus === 'APPROVAL' ? (
                      <Link href={`${ROUTES.PICKPICKPICK.MAIN}/${data.id}`} key={data.id}>
                        <DynamicComponent
                          key={data.id}
                          pickData={data}
                          status={data.contentStatus}
                        />
                      </Link>
                    ) : (
                      <DynamicComponent key={data.id} pickData={data} status={data.contentStatus} />
                    ),
                  )}
                </React.Fragment>
              ))}
            </div>

            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                {isMobile ? (
                  <MobilePickSkeletonList rows={3} />
                ) : (
                  <MyPickSkeletonList rows={3} itemsInRows={2} />
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      {getStatusComponent()}
      <div ref={bottom} />
    </>
  );
}
