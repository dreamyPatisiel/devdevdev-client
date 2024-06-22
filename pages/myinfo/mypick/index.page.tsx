import { useRef } from 'react';
import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { useObserver } from '@hooks/useObserver';

import { MyPickSkeletonList } from '@components/common/skeleton/pickSkeleton';

import MyInfo from '../index.page';
import { useGetMyPicks } from './apiHooks/useGetMyPicks';

const DynamicComponent = dynamic(() => import('@/pages/pickpickpick/components/PickContainer'));

export default function MyPick() {
  const { myPicks, isFetchingNextPage, hasNextPage, status, error, onIntersect } = useGetMyPicks();

  const bottom = useRef(null);

  useObserver({
    target: bottom,
    onIntersect,
  });

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MyPickSkeletonList rows={3} itemsInRows={2} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

      default:
        return (
          <>
            <div className='grid grid-cols-2 gap-[2.4rem]'>
              {myPicks?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data?.data?.content?.map((data: PickDataProps) =>
                    data.contentStatus === 'APPROVAL' ? (
                      <Link href={`/pickpickpick/${data.id}`} key={data.id}>
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
                <MyPickSkeletonList rows={3} itemsInRows={2} />;
              </div>
            )}
          </>
        );
    }
  };

  return (
    <MyInfo>
      <div className='flex flex-col gap-[2.4rem]'>
        <h1 className='h3 font-bold'>내가 썼어요</h1>

        {getStatusComponent()}
        <div ref={bottom} />
      </div>
    </MyInfo>
  );
}
