import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '@components/tooltips/tooltip';

import DefaultTechMainImg from '@public/image/techblog/DefaultTechMainImg.png';
import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import useClickCounter from '../hooks/useClickCounter';
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

  // TODO: 1초마다 리셋되고 , 연속으로 10번이상 누르면 Toast가 띄워지도록 설정해놓았는데 , 한번 직접 눌러보시면서 피드백 부탁드려요 :) 머지 되기 전 이 주석은 지울께요!
  const [clickCount, setClickCount] = useClickCounter({ maxCount: 10, threshold: 1000 });
  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [techMainImgUrl, setTechMainImgUrl] = useState<string>(DefaultTechMainImg.src);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechMainImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  const { mutate: bookmarkMutation } = usePostBookmarkStatus();

  const handleBookmarkClick = () => {
    setClickCount((prev) => prev + 1);
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
      alt='북마크버튼'
    />
  ) : (
    <Image
      src={bookmarkNonActive}
      className='cursor-pointer'
      onClick={handleBookmarkClick}
      alt='북마크취소버튼'
    />
  );

  return (
    <>
      <TechCardWrapper>
        <div className='w-[20rem] h-[13.6rem]'>
          <img
            className='rounded-[1.6rem] w-[20rem] h-[13.6rem] object-cover '
            src={techMainImgUrl}
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
              {bookmarkIcon}
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
