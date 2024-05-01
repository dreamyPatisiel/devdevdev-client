import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';
import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';

import SearchInput from '@/components/searchInput';
import Tooltip from '@/components/tooltips/tooltip';

import { useBookmarkStatus } from '../api/useBookmarkStatus';
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
      <div>
        <EllipsisGradientText startPercent='60%' endPercent='100%' className='p1 py-[1.7rem]'>
          {content}
        </EllipsisGradientText>
      </div>
    </>
  );
};

const ArticleViewBtn = ({ techArticleUrl }: { techArticleUrl: string }) => {
  const handleBtnClick = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.location.href = techArticleUrl;
    }
  };

  return (
    <button className='w-full flex justify-center items-center st1 text-point1 pt-[6.4rem] pb-[4.8rem] mb-[4.8rem] font-bold'>
      <p className='mr-[1.6rem]' onClick={handleBtnClick}>
        아티클 전체 보기
      </p>
      <RightArrow className='text-point1' />
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

  const [isHeartActive, setHeartActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    if (!isHeartActive) {
      setTooltipMessage('북마크함에 저장해보세요!');
    }
  }, []);
  const { mutate: bookmartMutation } = useBookmarkStatus();

  const handleHeartClick = () => {
    bookmartMutation(
      {
        techArticleId: id,
        status: !isHeartActive,
      },
      {
        onSuccess: () => {
          setHeartActive((prev) => !prev);
          setTooltipMessage(isHeartActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
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
  }, [isHeartActive, tooltipMessage]);

  const heartIcon = isHeartActive ? (
    <HeartActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요버튼' />
  ) : (
    <HeartNonActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요취소버튼' />
  );

  return (
    <section className='mb-[9.6rem]'>
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
              <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
                {tooltipMessage}
              </Tooltip>

              <div className='p-[1rem]'>{heartIcon}</div>
            </div>
          </div>
          <TechDetailInfo company={company.name} author={author} date={regDate} />
        </div>
      </div>

      <div className='px-[4rem]'>
        <TechMainContent title={title} content={contents} />
      </div>
      <div className='px-[14.5rem]'>
        <ArticleViewBtn techArticleUrl={techArticleUrl} />
      </div>
      <div className='border-solid border-b border-b-gray1 mx-[4rem]' />
    </section>
  );
}
