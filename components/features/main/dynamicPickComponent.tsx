import React from 'react';

import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';
import PickContainer from '@pages/pickpickpick/components/PickContainer';
import {
  PICK_VIEW_SIZE,
  MOBILE_MAIN_PICK_VIEW_SIZE,
} from '@pages/pickpickpick/constants/pickConstants';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { MainPickSkeletonList } from '@components/common/skeleton/pickSkeleton';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import GradientDiv from './gradientDiv';

export default function DynamicPickComponent() {
  const { isMobile } = useMediaQueryContext();
  const VIEW_SIZE = isMobile ? MOBILE_MAIN_PICK_VIEW_SIZE : PICK_VIEW_SIZE;

  const { pickData, status } = useInfinitePickData('LATEST', VIEW_SIZE);

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MainPickSkeletonList itemsInRows={2} />;

      default:
        return (
          <>
            <div
              className={`${isMobile ? '' : 'relative overflow-y-scroll scrollbar-hide max-h-[47rem]'}`}
            >
              {pickData?.pages.map((group, index) => (
                <div key={index}>
                  {group?.data.content.map((data: PickDataProps) => (
                    <Link href={`${ROUTES.PICKPICKPICK.MAIN}/${data.id}`} key={data.id}>
                      <PickContainer pickData={data} type='main' />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {!isMobile && <GradientDiv />}
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
