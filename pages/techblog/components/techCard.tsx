import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import useIsMobile from '@hooks/useIsMobile';

import Tooltip from '@components/common/tooltips/tooltip';
import TechBlogImg from '@components/features/techblog/techBlogImg';

import DefaultTechMainImg from '@public/image/techblog/DefaultTechMainImg.png';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';
import { Tag } from './tag';
import { TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponents';

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

  const isMobile = useIsMobile();
  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [techMainImgUrl, setTechMainImgUrl] = useState<string>(DefaultTechMainImg.src);

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechMainImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  return (
    <TechCardWrapper>
      <TechBlogImg id={id} thumbnailUrl={thumbnailUrl} size={isMobile ? 'mobile' : 'large'} />
      <div>
        <div className='flex items-center justify-between border-white'>
          <Link href={`${pathname}/${id}`}>
            <TechTitle title={title} width={isMobile ? 'w-full' : 'w-[77rem]'} />
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
        <TechInfo author={author} date={regDate} company={company?.name} companyId={company?.id} />
        <Link href={`${pathname}/${id}`}>
          <TechContent
            content={contents}
            maxLines={isMobile ? 4 : 3}
            className={isMobile ? '' : 'mr-[4rem]'}
          />
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
