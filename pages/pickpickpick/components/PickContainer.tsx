import PickAnswer from './PickAnswer';

import Fire from '@public/image/fire-alt.svg';
import Comment from '@public/image/comment-dots.svg';
import AngleRight from '@public/image/angle-right.svg';
import { PickDataProps } from '../types/pick';

export default function PickContainer({ pickData }: { pickData: PickDataProps }) {
  return (
    <div className='rounded-[1.6rem] border-gray2 border-solid border px-10 py-12'>
      <div className='flex items-baseline gap-6'>
        <p className='pb-11 text-gray5 p1 font-bold'>{pickData?.question}</p>
        <AngleRight alt={'오른쪽 화살표'} className='w-4' />
      </div>

      <ul className='grid gap-6'>
        {pickData?.answers.map((answer, index) => (
          <PickAnswer key={index} {...answer} />
        ))}
      </ul>

      <div className='mt-12 flex items-center gap-8 flex-wrap'>
        <span className='flex items-center'>
          <Fire alt='투표 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>투표</span>
          <span className='c1 font-bold text-gray5' data-testid='투표'>
            {pickData?.voteCount}
          </span>
        </span>
        <span className='flex items-center'>
          <Comment alt='댓글 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>댓글</span>
          <span className='c1 font-bold text-gray5'>{pickData?.commentCount}</span>
        </span>
      </div>
    </div>
  );
}