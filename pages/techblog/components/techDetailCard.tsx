import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import TechHeaderImg from '@public/image/techblog/TechHeaderImg.png';
import RightArrow from '@public/image/techblog/angle-right-point1.svg';

import SearchInput from '@/components/searchInput';
import Tooltip from '@/components/tooltips/tooltip';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';

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
    <div className='p1 flex border-white gap-[1.6rem] select-none'>
      <div>{company}</div>
      <span className='text-gray4'>|</span>
      <div>by. {author || company}</div>
      <span className='text-gray4'>|</span>
      <time dateTime={date}>{date}</time>
    </div>
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
  const [techImgUrl, setTechImgUrl] = useState<string>(TechHeaderImg.src);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  useEffect(() => {
    if (!isBookmarkActive) {
      setTooltipMessage('북마크함에 저장해보세요!');
    }
  }, []);

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundImage: `url("${techImgUrl}")`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'darken',
          borderRadius: '16px',
        }}
      >
        <div className='grid grid-flow-col justify-between items-start mb-[2.4rem] z-10'>
          <h2 className='h2 font-bold'>{title}</h2>
          <div className='grid grid-flow-row items-center gap-6 relative'>
            <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
              {tooltipMessage}
            </Tooltip>
            <div className='p-[1rem]'>
              <BookmarkIcon
                id={id}
                tooltipMessage={tooltipMessage}
                isBookmarkActive={isBookmarkActive}
                setBookmarkActive={setBookmarkActive}
                setTooltipMessage={setTooltipMessage}
              />
            </div>
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
