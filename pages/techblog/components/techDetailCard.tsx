import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';
import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';
import techBlogImg from '@public/image/techblog/techBlogImg.png';

import SearchInput from '@/components/searchInput';
import Tooltip from '@/components/tooltips/tooltip';

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
    <>
      <ul className='p1 flex border-white gap-[1.6rem] select-none'>
        <li>{company}</li>
        <span className='text-gray4'>|</span>
        <li>by.{author || company}</li>
        <span className='text-gray4 '>|</span>
        <li>{date}</li>
      </ul>
    </>
  );
};

const TechMainContent = ({ title, content }: { title: string; content: string }) => {
  return (
    <>
      <h2 className='st1 py-[3.4rem] font-bold'>{title}</h2>
      <div>
        <EllipsisGradientText startPercent='60%' endPercent='100%' className='p1 py-[1.7rem]'>
          {content}
        </EllipsisGradientText>
      </div>
    </>
  );
};

const ArticleViewBtn = () => {
  return (
    <button className='w-full flex justify-center items-center st1 text-point1 pt-[6.4rem] pb-[4.8rem] border-solid border-b border-b-gray1 mb-[9.6rem] font-bold'>
      <p className='mr-[1.6rem]'>아티클 전체 보기</p>
      <RightArrow className='text-point1' />
    </button>
  );
};

export default function TechDetailCard(techDetailProps: TechCardProps) {
  const [heart, setHeart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [init, setInit] = useState(true);

  console.log('techDetailProps', techDetailProps);

  const { author, company, contents, description, regDate, thumbnailUrl, title } = techDetailProps;

  useEffect(() => {
    if (init) {
      setTimeout(() => {
        setInit(false);
      }, 2 * 1000);
    }
  }, []);

  const handleHeartClick = () => {
    setHeart((prev) => !prev);
    setShowTooltip(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 2 * 1000);
    };
    if (showTooltip) {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [heart, showTooltip]);

  const heartIcon = heart ? (
    <HeartActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요버튼' />
  ) : (
    <HeartNonActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요취소버튼' />
  );

  return (
    <section>
      <div className='flex items-center justify-between'>
        <Link href='/techblog' className='text-st1 font-bold'>
          기술블로그 🧪
        </Link>
        <SearchInput />
      </div>
      {/* ----------------------------------------------------- */}
      <div className='relative'>
        <img
          className='my-[4.8rem] opacity-40 rounded-[1.6rem] w-full h-[15.1rem] object-cover'
          src={thumbnailUrl}
          alt='기술블로그사진'
        />
        <div className='w-full px-[4rem] py-[3.2rem] top-0 absolute'>
          <div className='flex justify-between mb-[2.4rem]'>
            <h2 className='h2 font-bold'>{title}</h2>
            <div className='flex flex-row items-center gap-6 relative'>
              <Tooltip variant='greenTt' direction='right' isVisible={showTooltip}>
                {heart ? '북마크로 저장했어요' : '북마크에서 삭제했어요'}
              </Tooltip>
              <Tooltip variant='greenTt' direction='right' isVisible={init && !showTooltip}>
                북마크함에 저장해보세요!
              </Tooltip>
              <div className='p-[1rem]'>{heartIcon}</div>
            </div>
          </div>
          <TechDetailInfo company={company.name} author={author} date={regDate} />
        </div>
      </div>

      <div className='px-[4rem]'>
        <TechMainContent title={title} content={description} />
      </div>
      <div className='px-[14.5rem]'>
        <ArticleViewBtn />
      </div>
    </section>
  );
}
