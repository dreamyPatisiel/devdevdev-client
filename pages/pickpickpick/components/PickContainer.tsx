import Image from 'next/image';

import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import Comment from '@public/image/comment-dots.svg';
import exclamationGray from '@public/image/exclamation-circle-gray.svg';
import exclamationRed from '@public/image/exclamation-circle-red.svg';
import Fire from '@public/image/fire-alt.svg';

import { PickDataProps } from '../types/pick';
import PickAnswer from './PickAnswer';

export default function PickContainer({
  pickData,
  status,
}: {
  pickData: PickDataProps;
  status?: 'APPROVAL' | 'REJECT' | 'READY';
}) {
  const StatusContent = () => {
    switch (status) {
      case 'READY':
        return (
          <p className='c1 font-bold flex text-gray5 gap-[0.4rem]'>
            <Image src={exclamationGray} alt='회색 주의 아이콘' />
            픽픽픽 등록 대기중
          </p>
        );
      case 'REJECT':
        return (
          <p className='c1 font-bold flex text-red gap-[0.4rem]'>
            <Image src={exclamationRed} alt='빨간색 주의 아이콘' />
            등록이 거부된 게시물이에요
          </p>
        );
      default:
        return (
          <StatisticsItem
            icon={Fire}
            alt='투표 이미지'
            text='투표'
            count={pickData.voteTotalCount}
          />
        );
    }
  };
  return (
    <div className='rounded-[1.6rem] border-gray2 border-solid border px-[2.4rem] py-12'>
      <ArrowWithTitle title={pickData.title} className='pb-11' />

      <ul className='grid gap-6'>
        {pickData.pickOptions.map((option) => (
          <PickAnswer key={option.id} {...option} isVoted={pickData.isVoted} />
        ))}
      </ul>

      {/* 댓글 - 2차 */}
      <div className='mt-[3.2rem] flex items-center gap-8 flex-wrap'>
        {StatusContent()}
        {/* <StatisticsItem icon={Fire} alt='투표 이미지' text='투표' count={pickData.voteTotalCount} /> */}
        {/* <StatisticsItem
          icon={Comment}
          alt='댓글 이미지'
          text='댓글'
          count={pickData.commentTotalCount}
        /> */}
      </div>
    </div>
  );
}
