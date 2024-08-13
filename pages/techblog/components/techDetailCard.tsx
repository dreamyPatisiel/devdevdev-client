import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import SearchInput from '@components/common/searchInput';
import Tooltip from '@components/common/tooltips/tooltip';

import TechHeaderImg from '@public/image/techblog/TechHeaderImg.png';

import { ROUTES } from '@/constants/routes';

import { TechCardProps } from '../types/techBlogType';
import BookmarkIcon from './bookmarkIcon';
import { ArticleViewBtn, TechDetailInfo, TechMainContent } from './techDetailCardSubComponent';

export default function TechDetailCard({
  techDetailProps,
  techArticleId,
}: {
  techDetailProps: TechCardProps;
  techArticleId: string;
}) {
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

  const queryClient = useQueryClient();

  const { setSort } = useDropdownStore();

  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [techImgUrl, setTechImgUrl] = useState<string>(TechHeaderImg.src);

  useEffect(() => {
    if (!isBookmarkActive) {
      setTooltipMessage('북마크함에 저장해보세요!');
    }
  }, []);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  return (
    <section className='mb-[9.6rem]'>
      <div className='flex items-center justify-between mb-[4.8rem]'>
        <Link
          href={ROUTES.TECH_BLOG}
          className='h3 font-bold'
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
            setSort('LATEST');
          }}
        >
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
                id={Number(techArticleId)}
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
