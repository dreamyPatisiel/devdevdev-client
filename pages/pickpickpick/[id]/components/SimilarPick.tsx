import Image from 'next/image';

import ArrowWithTitle from '@components/common/title/ArrowWithTitle';

import Comment from '@public/image/comment-dots.svg';
import Fire from '@public/image/fire-alt.svg';

import { SimilarPickData } from '../types/similarPickData';

interface SimilarPickProps {
  data: SimilarPickData;
}

export default function SimilarPick({ data }: SimilarPickProps) {
  return (
    <div className='rounded-[1.6rem] border-gray3 border px-[2.4rem] py-[3.2rem] bg-gray1 h-[17.1rem] flex flex-col justify-between'>
      <ArrowWithTitle variant={'similarPick'} title={data.title} className='ellipsis' />

      <div className='mt-[3.2rem] flex items-center gap-8 flex-wrap'>
        <span className='flex items-center'>
          <Image src={Fire} alt='투표 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>투표</span>
          <span className='c1 font-bold text-gray5' data-testid='투표'>
            {data.voteTotalCount}
          </span>
        </span>
        {/* <span className='flex items-center'>
          <Image src={Comment} alt='댓글 이미지' />
          <span className='c1 font-medium text-gray5 ml-2 mr-4'>댓글</span>
          <span className='c1 font-bold text-gray5'>{'324'}</span>
        </span> */}
      </div>
    </div>
  );
}
