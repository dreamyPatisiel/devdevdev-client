import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '@components/tooltips/tooltip';

import DefaultTechMainImg from '@public/image/techblog/DefaultTechMainImg.png';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';
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

  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [techMainImgUrl, setTechMainImgUrl] = useState<string>(DefaultTechMainImg.src);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechMainImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  return (
    <TechCardWrapper>
      <div className='w-[20rem] h-[13.6rem]'>
        <Link href={`${pathname}/${id}`}>
          <img
            className='rounded-[1.6rem] w-[20rem] h-[13.6rem] object-cover '
            src={techMainImgUrl}
            alt='기술블로그 썸네일'
          />
        </Link>
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
            <BookmarkIcon
              id={id}
              tooltipMessage={tooltipMessage}
              isBookmarkActive={isBookmarkActive}
              setBookmarkActive={setBookmarkActive}
              setTooltipMessage={setTooltipMessage}
            />
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
  );
}
