import React from 'react';

import Link from 'next/link';

import { useInfinitePickData } from '@pages/pickpickpick/api/useInfinitePickData';
import PickAnswer from '@pages/pickpickpick/components/PickAnswer';
import { PickDataProps } from '@pages/pickpickpick/types/pick';

import { useDropdownStore } from '@stores/dropdownStore';

import { MainPickSkeletonList } from '@components/common/skeleton/pickSkeleton';
import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import Fire from '@public/image/fire-alt.svg';

import GradientDiv from './gradientDiv';

export default function DynamicPickComponent() {
  const PICK_PATH = '/pickpickpick';
  const { sortOption } = useDropdownStore();
  const { pickData, status } = useInfinitePickData(sortOption);

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
                      <div className='border border-gray1 rounded-3xl px-[2.4rem] py-7 mb-[1.6rem]'>
                        <ArrowWithTitle title={data.title} className='pb-[1.6rem]' />
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
                          icon={Fire}
                          alt='투표 이미지'
                          text='투표'
                          count={data.voteTotalCount}
                          className='mt-[1.6rem]'
                        />
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
