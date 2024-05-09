import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '@components/tooltips/tooltip';

import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import { TechCardProps } from '../types/techBlogType';
import { Tag } from './tag';
import { TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponent';

//----------------------------------------------------------------------------------------

export default function TechCard({ techData }: { techData: TechCardProps }) {
  const router = useRouter();
  const { pathname } = router;

  const {
    id,
    elasticId,
    thumbnailUrl,
    title,
    company,
    regDate,
    author,
    contents,
    viewTotalCount,
    recommendTotalCount,
    commentTotalCount,
    popularScore,
    isBookmarked,
  } = techData;

  const [isHeartActive, setHeartActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');

  const { mutate: bookmarkMutation } = usePostBookmarkStatus();

  const handleHeartClick = () => {
    bookmarkMutation(
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
    <>
      <TechCardWrapper>
        <div className='w-[20rem] h-[13.6rem]'>
          <img
            className='rounded-[2rem] w-[20rem] h-[13.6rem] object-cover '
            src={thumbnailUrl}
            alt='기술블로그 썸네일'
          />
        </div>
        <div>
          <div className='flex items-center justify-between border-white'>
            <Link href={`${pathname}/${id}`}>
              <TechTitle title={title} />
            </Link>

            <div className='flex flex-row items-center relative'>
              <Tooltip variant='grayTt' direction='right' isVisible={tooltipMessage !== ''}>
                {tooltipMessage}
              </Tooltip>
              {heartIcon}
            </div>
          </div>
          <TechInfo author={author} date={regDate} company={company?.name} />
          <Link href={`${pathname}/${id}`}>
            <TechContent content={contents} />
          </Link>
          {/* 2차 UI */}
          {/* <TagWrapper>
            <Tag text='다양하면 좋지요' />
            <Tag text='따끈따끈' />
            <Tag text='프론트' />
          </TagWrapper> */}
        </div>
      </TechCardWrapper>
    </>
  );
}
