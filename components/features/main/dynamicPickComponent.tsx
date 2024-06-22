import React from 'react';

import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';
import PickAnswer from '@pages/pickpickpick/components/PickAnswer';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { MainPickSkeletonList } from '@components/common/skeleton/pickSkeleton';
import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import PurpleFire from '@public/image/pickpickpick/fire-purple.svg';

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
                      <div className='border border-gray1 rounded-[1.2rem] mb-[1.6rem]'>
                        <div className='bg-gray1 p-[2.4rem] pb-[2rem] mb-[2.4rem] rounded-t-[1.2rem] border border-gray1'>
                          <ArrowWithTitle title={data.title} className='ellipsis' />
                        </div>

                        <div className='px-[2.4rem] pb-7'>
                          <ul className='grid gap-[0.9rem]'>
                            {data?.pickOptions.map((option) => (
                              <PickAnswer
                                key={option.id}
                                {...option}
                                isVoted={data.isVoted}
                                className='px-8 py-[1.2rem] rounded-xl'
                              />
                            ))}
                          </ul>
                          <StatisticsItem
                            icon={PurpleFire}
                            alt='투표 이미지'
                            text='투표'
                            count={data.voteTotalCount}
                            className='mt-[1.6rem]'
                            textColor='text-primary3'
                          />
                        </div>
                      </div>
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
