import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';
import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import SearchInput from '@/components/searchInput';
import Tooltip from '@/components/tooltips/tooltip';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import { TechCardProps } from '../types/techBlogType';

const TechDetailInfo = ({
  company,
  author,
  date,
}: {
  company: string;
  author: string;
  date: string;
}) => {
  return (
    <ul className='p1 flex border-white gap-[1.6rem] select-none'>
      <li>{company}</li>
      <span className='text-gray4'>|</span>
      <li>by.{author || company}</li>
      <span className='text-gray4 '>|</span>
      <li>{date}</li>
    </ul>
  );
};

const TechMainContent = ({ content }: { content: string }) => {
  return (
    <>
      <EllipsisGradientText startPercent='60%' endPercent='100%' className='p1 py-[1.7rem]'>
        {content}
      </EllipsisGradientText>
    </>
  );
};

const ArticleViewBtn = ({ techArticleUrl }: { techArticleUrl: string }) => {
  return (
    <button className='w-full flex justify-center items-center st1 text-point1 pt-[6.4rem] pb-[4.8rem] mb-[4.8rem] font-bold'>
      <Link href={techArticleUrl} target='_blank'>
        <p className='mr-[1.6rem]'>아티클 전체 보기</p>
      </Link>
      <Image src={RightArrow} alt='오른쪽화살표' className='text-point1' />
    </button>
  );
};

export default function TechDetailCard(techDetailProps: TechCardProps) {
  const {
    id,
    author,
    company,
    contents,
    regDate,
    thumbnailUrl,
    title,
    isBookmarked,
    techArticleUrl,
  } = techDetailProps;

  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    if (!isBookmarkActive) {
      setTooltipMessage('북마크함에 저장해보세요!');
    }
  }, []);
  const { mutate: bookmarkMutation } = usePostBookmarkStatus();

  const handleBookmarkClick = () => {
    bookmarkMutation(
      {
        techArticleId: id,
        status: !isBookmarkActive,
      },
      {
        onSuccess: () => {
          setBookmarkActive((prev) => !prev);
          setTooltipMessage(isBookmarkActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
        },
      },
    );
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setTooltipMessage('');
      }, 2 * 1000);
    };
    if (tooltipMessage !== '') {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isBookmarkActive, tooltipMessage]);

  const bookmarkIcon = isBookmarkActive ? (
    <Image
      src={bookmarkActive}
      className='cursor-pointer'
      onClick={handleBookmarkClick}
      alt='좋아요버튼'
    />
  ) : (
    <Image
      src={bookmarkNonActive}
      className='cursor-pointer'
      onClick={handleBookmarkClick}
      alt='좋아요취소버튼'
    />
  );

  return (
    <section className='mb-[9.6rem]'>
      <div className='flex items-center justify-between mb-[4.8rem]'>
        <Link href='/techblog' className='text-st1 font-bold'>
          기술블로그 🧪
        </Link>
        <SearchInput />
      </div>
      {/* ----------------------------------------------------- */}

      <div
        className='w-full px-[4rem] py-[3.2rem]'
        style={{
          background: `rgba(0, 0, 0, 0.5) url("${thumbnailUrl}")`,
          backgroundBlendMode: 'darken',
          borderRadius: '16px',
        }}
      >
        <div className='grid grid-flow-col justify-between items-start mb-[2.4rem] z-10'>
          <h2 className='h2 font-bold'>{title}</h2>
          <div className='flex flex-row items-center gap-6 relative'>
            <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
              {tooltipMessage}
            </Tooltip>
            <div className='p-[1rem]'>{bookmarkIcon}</div>
          </div>
        </div>

        <TechDetailInfo company={company.name} author={author} date={regDate} />
      </div>

      <div className='px-[4rem] mt-20'>
        <TechMainContent content={contents} />
      </div>
      <div className='px-[14.5rem]'>
        <ArticleViewBtn techArticleUrl={techArticleUrl} />
      </div>
      <div className='border-solid border-b border-b-gray1 mx-[4rem]' />
    </section>
  );
}
