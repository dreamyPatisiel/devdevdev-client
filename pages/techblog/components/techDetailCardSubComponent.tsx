import { SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@utils/formatDate';

import { EllipsisGradientText } from '@components/common/EllipsisGradientText';
import Tooltip from '@components/common/tooltips/tooltip';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';

import BookmarkIcon from './bookmarkIcon';

export const TechDetailInfo = ({
  company,
  author,
  date,
  isMobile,
}: {
  company: string;
  author: string;
  date: string;
  isMobile: boolean;
}) => {
  return (
    <div className='p1 flex border-white gap-[1.6rem] select-none'>
      <div>{company}</div>
      <span className='text-gray4'>|</span>
      <div>by. {author || company}</div>
      {!isMobile && (
        <>
          <span className='text-gray4'>|</span>
          <time dateTime={date}>{formatDate(date)}</time>
        </>
      )}
    </div>
  );
};

export const TechMainContent = ({ content, isMobile }: { content: string; isMobile: boolean }) => {
  return (
    <EllipsisGradientText
      startPercent='60%'
      endPercent='100%'
      className={`${isMobile ? 'p2 my-[2.4rem]' : 'p1 py-[1.7rem]'} `}
    >
      {content}
    </EllipsisGradientText>
  );
};

/** 1차 아티클전체보기 버튼스타일 */
export const ArticleViewBtn = ({
  techArticleUrl,
  fontSize = 'st1',
  textIconGap = 'mr-[1.6rem]',
  paddingY = 'pt-[6.4rem]',
  iconSize,
}: {
  techArticleUrl: string;
  fontSize?: string;
  textIconGap?: string;
  paddingY?: string;
  iconSize?: string;
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center ${fontSize} text-point1 ${paddingY} mb-[4.8rem] font-bold`}
    >
      <Link href={techArticleUrl} target='_blank'>
        <p className={`${textIconGap}`}>아티클 전체 보기</p>
      </Link>
      <Image src={RightArrow} alt='오른쪽화살표' className={`text-point1 ${iconSize}`} />
    </button>
  );
};

/** 2차 아티클전체보기 버튼 */

export const ArticleViewRoundButton = ({
  techArticleUrl,
  fontSize = 'p1',
  margin = 'mt-[8.1rem] mb-[4.8rem]', // 웹기준 기본 스타일링
}: {
  techArticleUrl: string;
  fontSize?: string;
  margin?: string;
}) => {
  return (
    <button
      className={`block mx-auto text-center px-8 py-4 border border-secondary400 text-secondary400 rounded-full ${fontSize} font-bold ${margin}`}
    >
      <Link href={techArticleUrl}>아티클 전체보기</Link>
    </button>
  );
};

export const TechBookMarkAndToolTip = ({
  techArticleId,
  isBookmarkActive,
  setBookmarkActive,
}: {
  techArticleId: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    if (!isBookmarkActive) {
      setTooltipMessage('북마크함에 저장해보세요!');
    }
  }, []);

  return (
    <div className='grid grid-flow-row items-center gap-6 relative'>
      <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
        {tooltipMessage}
      </Tooltip>
      <div className='p-[1rem]'>
        <BookmarkIcon
          type='techblog'
          id={Number(techArticleId)}
          tooltipMessage={tooltipMessage}
          isBookmarkActive={isBookmarkActive}
          setBookmarkActive={setBookmarkActive}
          setTooltipMessage={setTooltipMessage}
        />
      </div>
    </div>
  );
};
