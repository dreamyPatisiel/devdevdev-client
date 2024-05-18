import { useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';
import AngleUpPoint from '@public/image/pickpickpick/angle-up-point.svg';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

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

  const Viewer = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Viewer), {
    ssr: false,
  });

  return (
    <div className={`flex gap-[4rem] p-[4rem] pb-[1.6rem]`}>
      <div className='px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col gap-[2.4rem] w-full overflow-hidden'>
        <p className='pt-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold border-b-[0.1rem] border-b-gray1'>
          {pickDetailOptionData?.title}
        </p>

        <EllipsisGradientText
          isFullContents={isFullContents}
          startPercent={isFullContents ? '100%' : '0%'}
          endPercent='100%'
          className={`p1 ${!isFullContents && 'ellipsis h-[8.9rem]'}`}
        >
          <Viewer initialValue={pickDetailOptionData?.content} theme='dark' />

          {pickDetailOptionData?.pickDetailOptionImages.length !== 0 && (
            <p className='p2 font-light text-gray5 pt-[7.2rem] pb-[2.4rem]'>첨부 이미지</p>
          )}
          <div className='flex flex-col gap-[2.4rem]'>
            {pickDetailOptionData?.pickDetailOptionImages?.map((optionImage) => (
              <img
                src={optionImage.imageUrl}
                alt={`픽픽픽 옵션 이미지-${optionImage.id}`}
                key={optionImage.id}
                className='rounded-[1.2rem]'
              />
            ))}
          </div>
        </EllipsisGradientText>

        <button
          className={`p2 font-bold text-point1 flex items-center gap-[0.8rem] justify-center`}
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
