import ArrowWithTitle from '@components/common/title/ArrowWithTitle';
import StatisticsItem from '@components/features/pickpickpick/StatisticsItem';

import Comment from '@public/image/comment-dots.svg';
import Fire from '@public/image/fire-alt.svg';

import { PickDataProps } from '../types/pick';
import PickAnswer from './PickAnswer';

export default function PickContainer({ pickData }: { pickData: PickDataProps }) {
  return (
    <div className='rounded-[1.6rem] border-gray2 border-solid border px-[2.4rem] py-12'>
      <ArrowWithTitle title={pickData.title} version='pickPagePickTitle' />

      <ul className='grid gap-6'>
        {pickData.pickOptions.map((option) => (
          <PickAnswer key={option.id} {...option} isVoted={pickData.isVoted} />
        ))}
      </ul>

      {/* 댓글 - 2차 */}
      <div className='mt-12 flex items-center gap-8 flex-wrap'>
        <StatisticsItem icon={Fire} alt='투표 이미지' text='투표' count={pickData.voteTotalCount} />
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
