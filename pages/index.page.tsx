import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useDropdownStore } from '@stores/dropdownStore';

import PickTitle from '@components/common/title/ArrowTitle';
import MainCardComponent from '@components/features/main/MainCardComponent';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import Comment from '@public/image/comment-dots.svg';
import DevLogo from '@public/image/devdevdevLogo.svg';
import Fire from '@public/image/fire-alt.svg';

import { useInfinitePickData } from './pickpickpick/api/useInfinitePickData';
import PickAnswer from './pickpickpick/components/PickAnswer';
import { PickDataProps } from './pickpickpick/types/pick';

export const MainPageLogo = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-[8rem]'>
      <Image src={DevLogo} width={200} priority alt='devdevdev로고' />
      <h1 className='p1 font-bold mt-[3.2rem]'>힘들고 막힐 때는 댑댑댑</h1>
    </div>
  );
};

export default function Index() {
  const PICK_PATH = '/pickpickpick';
  const TECH_PATH = '/techblog';
  const { sortOption } = useDropdownStore();
  const { pickData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfinitePickData(sortOption);

  return (
    <>
      <div className='px-[20.3rem] py-[6.4rem]'>
        {/* 영역1 */}
        <MainPageLogo />
        <section
          className='mb-[12rem] grid grid-flow-col gap-[5.6rem]'
          style={{
            gridTemplateColumns: '1fr 1.53fr',
          }}
        >
          <MainCardComponent path={PICK_PATH} />

          <div className=''>
            <PickTitle
              title='따끈따끈! 최신 픽픽픽'
              version='mainTitle'
              iconText='바로가기'
              routeURL={PICK_PATH}
            />

            {pickData?.pages.map((group, index) => (
              <div key={index}>
                {group?.data.content.slice(0, 2).map((data: PickDataProps) => (
                  <Link href={`${PICK_PATH}/${data.id}`} key={data.id}>
                    <div className='border border-gray1 rounded-3xl px-[2.4rem] py-7 mb-[1.6rem]'>
                      <PickTitle title={data.title} version='mainPagePickTitle' />
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
        </section>

        <section
          className='mb-[12rem] grid grid-flow-col gap-[5.6rem]'
          style={{
            gridTemplateColumns: '1fr 1.53fr',
          }}
        >
          <MainCardComponent path='/techblog' />
          <div>
            <PickTitle
              title='따끈따끈! 최신 아티클'
              version='mainTitle'
              iconText='바로가기'
              routeURL={TECH_PATH}
            />
          </div>
        </section>
      </div>
    </>
  );
}
