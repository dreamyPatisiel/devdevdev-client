import { useState } from 'react';

import Image from 'next/image';

import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';
import AngleUpPoint from '@public/image/pickpickpick/angle-up-point.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { PickOptionData } from '../types/pickDetailData';
import MarkdownViewer from './MarkdownViewer';
import VoteButtonV2 from './VoteButtonV2';

export default function VoteCardV2({
  dataIsVoted,
  pickDetailOptionData,
  pickOrder,
}: {
  dataIsVoted?: boolean;
  pickDetailOptionData?: PickOptionData;
  pickOrder: 'first' | 'second';
}) {
  const [isFullContents, setFullContents] = useState(false);
  const { isMobile } = useMediaQueryContext();

  const handleFullContents = () => {
    setFullContents(!isFullContents);
  };

  return (
    <div className={`flex-1 flex flex-col gap-[2.4rem]`}>
      <VoteButtonV2
        pickOptionData={pickDetailOptionData}
        dataIsVoted={dataIsVoted}
        pickOrder={pickOrder}
      />
      <div
        className={`py-[1.6rem] rounded-[1.6rem] border flex flex-col w-full overflow-hidden justify-center bg-black ${isMobile ? 'px-[2.4rem]' : 'px-[4rem]'} ${pickDetailOptionData?.isPicked ? 'border-primary400 border-[0.2rem]' : 'border-gray500'}`}
      >
        <p className='py-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold '>
          {pickDetailOptionData?.title}
        </p>

        {(pickDetailOptionData?.content ||
          pickDetailOptionData?.pickDetailOptionImages.length !== 0) && (
          <div className='border-t-[0.1rem] border-t-gray600 pt-[2.4rem] flex flex-col gap-[2.4rem]'>
            <div
              className={`relative ${
                isFullContents
                  ? ''
                  : `${isMobile ? 'max-h-[30.8rem]' : 'max-h-[32.4rem]'} overflow-hidden`
              }`}
            >
              <div>
                <MarkdownViewer pickDetailOptionContents={pickDetailOptionData?.content} />

                {pickDetailOptionData?.pickDetailOptionImages.length !== 0 && (
                  <p className='p2 font-light text-gray200 py-[2.4rem]'>첨부 이미지</p>
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
              </div>

              {/* gradient overlay */}
              {!isFullContents && (
                <div className='absolute bottom-0 left-0 right-0 h-[8rem] bg-gradient-to-t from-black to-transparent z-20 pointer-events-none'></div>
              )}
            </div>

            <button
              className={`p2 font-bold text-secondary400 flex items-center gap-[0.8rem] justify-center`}
              onClick={handleFullContents}
            >
              {isFullContents ? (
                <>
                  <span>내용 접기</span>
                  <Image src={AngleUpPoint} alt='위 방향 화살표' />
                </>
              ) : (
                <>
                  <span>내용 전체보기</span>
                  <Image src={AngleDownPoint} alt='아래 방향 화살표' />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
