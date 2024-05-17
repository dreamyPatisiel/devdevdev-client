import { useState } from 'react';

import Image from 'next/image';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';
import AngleUpPoint from '@public/image/pickpickpick/angle-up-point.svg';

import { pickOptionData } from '../types/pickDetailData';
import VoteButton from './VoteButton';

export default function VoteCard({
  onClick,
  voted,
  pickDetailOptionData,
}: {
  onClick: () => void;
  voted: 'first' | 'second';
  pickDetailOptionData?: pickOptionData;
}) {
  const [isFullContents, setFullContents] = useState(false);

  const handleFullContents = () => {
    setFullContents(!isFullContents);
  };

  return (
    <div
      className={`flex gap-[4rem] px-[4rem] py-[1.6rem] ${!isFullContents && 'max-h-[28.7rem]'}`}
    >
      <div className='px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col gap-[2.4rem] w-full'>
        <p className='pt-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold border-b-[0.1rem] border-b-gray1'>
          {pickDetailOptionData?.title}
        </p>

        <EllipsisGradientText
          isFullContents={isFullContents}
          startPercent={isFullContents ? '100%' : '0%'}
          endPercent='100%'
          className={`p1 ${!isFullContents && 'ellipsis'}`}
        >
          {pickDetailOptionData?.content}
        </EllipsisGradientText>

        <button
          className={`p2 font-bold text-point1 flex items-center gap-[0.8rem] justify-center `}
          onClick={handleFullContents}
        >
          내용 전체보기
          {isFullContents ? (
            <Image src={AngleUpPoint} alt='위 방향 화살표' />
          ) : (
            <Image src={AngleDownPoint} alt='아래 방향 화살표' />
          )}
        </button>
      </div>

      <VoteButton voted={voted} onClick={onClick} />
    </div>
  );
}
