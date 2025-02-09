import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import Tooltip from '@components/common/tooltips/tooltip';
import TechBlogImg from '@components/features/techblog/techBlogImg';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';
import { TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponents';

export default function TechCard({
  techData,
  type,
}: {
  techData: TechCardProps;
  type: 'main' | 'techblog' | 'myinfo';
}) {
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
    isLogoImage,
  } = techData;

  const { isMobile } = useMediaQueryContext();
  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  return (
    <TechCardWrapper>
      <TechBlogImg
        id={id}
        isLogoImage={isLogoImage}
        thumbnailUrl={thumbnailUrl}
        size={isMobile ? 'mobile' : 'large'}
      />
      <div>
        <div className='flex items-center justify-between border-white'>
          <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
            <TechTitle title={title} width={isMobile ? 'w-full' : 'w-[77rem]'} />
          </Link>

          {type !== 'main' && (
            <div className='flex flex-row items-center relative flex-shrink-0'>
              <Tooltip variant='grayTt' direction='right' isVisible={tooltipMessage !== ''}>
                {tooltipMessage}
              </Tooltip>
              {/* TODO: 위치 수정필요 */}
              <BookmarkIcon
                type={type}
                id={id}
                tooltipMessage={tooltipMessage}
                isBookmarkActive={isBookmarkActive}
                setBookmarkActive={setBookmarkActive}
                setTooltipMessage={setTooltipMessage}
              />
            </div>
          )}
        </div>
        <TechInfo author={author} date={regDate} company={company?.name} companyId={company?.id} />
        <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
          <TechContent
            content={contents}
            maxLines={isMobile ? 4 : 3}
            className={isMobile ? '' : 'mr-[4rem]'}
          />
        </Link>
      </div>
    </TechCardWrapper>
  );
}
