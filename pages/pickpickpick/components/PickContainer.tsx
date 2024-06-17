import Image from 'next/image';

import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import Comment from '@public/image/comment-dots.svg';
import exclamationGray from '@public/image/exclamation-circle-gray.svg';
import exclamationRed from '@public/image/exclamation-circle-red.svg';
import PurpleFire from '@public/image/pickpickpick/fire-purple.svg';

import { PickDataProps } from '../types/pick';
import PickAnswer from './PickAnswer';

export default function PickContainer({
  pickData,
  status,
}: {
  pickData: PickDataProps;
  status?: 'APPROVAL' | 'REJECT' | 'READY';
}) {
  const disabledStyle = (status === 'READY' || status === 'REJECT') && 'opacity-50';

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
            icon={PurpleFire}
            alt='투표 이미지'
            text='투표'
            count={pickData.voteTotalCount}
            textColor='text-primary3'
          />
        );
    }
  };

  return (
    <div className='rounded-[1.6rem] border-gray2 border-solid border h-[43.5rem]'>
      <div
        className={`bg-gray1 px-[2.4rem] py-[3.2rem] mb-[3.2rem] rounded-t-[1.6rem] h-[11.6rem] ${disabledStyle}`}
      >
        <ArrowWithTitle
          title={pickData.title}
          className={`${disabledStyle} ellipsis`}
          ArrowClassName={`${disabledStyle}`}
        />
      </div>

      <div className='px-[2.4rem] pb-12'>
        <ul className={`grid gap-6 ${disabledStyle}`}>
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
    </div>
  );
}
