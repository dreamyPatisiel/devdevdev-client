import React from 'react';

import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';
import PickContainer from '@pages/pickpickpick/components/PickContainer';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { MainPickSkeletonList } from '@components/common/skeleton/pickSkeleton';

import GradientDiv from './gradientDiv';

export default function DynamicPickComponent() {
  const PICK_PATH = '/pickpickpick';
  const { pickData, status } = useInfinitePickData('LATEST');

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MainPickSkeletonList itemsInRows={2} />;

      default:
        return (
          <>
            <div className='relative overflow-y-scroll scrollbar-hide max-h-[47rem]'>
              {pickData?.pages.map((group, index) => (
                <div key={index}>
                  {group?.data.content.map((data: PickDataProps) => (
                    <Link href={`${PICK_PATH}/${data.id}`} key={data.id}>
                      <PickContainer pickData={data} type='main' />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <GradientDiv />
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
