import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import useIsMobile from '@hooks/useIsMobile';

import SearchInput from '@components/common/searchInput';

import TechHeaderImg from '@public/image/techblog/TechHeaderImg.png';

import { ROUTES } from '@/constants/routes';

import { TechCardProps } from '../types/techBlogType';
import {
  ArticleViewBtn,
  TechBookMarkAndToolTip,
  TechDetailInfo,
  TechMainContent,
} from './techDetailCardSubComponent';

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

  const isMobile = useIsMobile();
  const { setSort } = useDropdownStore();

  const [isBookmarkActive, setBookmarkActive] = useState(isBookmarked);
  const [techImgUrl, setTechImgUrl] = useState<string>(TechHeaderImg.src);

  useEffect(() => {
    if (thumbnailUrl) {
      setTechImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  useEffect(() => {
    setBookmarkActive(isBookmarked);
  }, [isBookmarked]);

  const ImageTitleStyle = {
    base: 'bg-black bg-opacity-50 bg-cover bg-blend-darken rounded-[16px]',
    desktop: 'px-[4rem] py-[3.2rem]',
    mobile: 'px-[2.4rem] py-[2rem]',
  };

  return (
    <section className={`${isMobile ? 'mb-[5.6rem]' : 'mb-[9.6rem]'}`}>
      <div
        className={`flex items-center justify-between  ${isMobile ? 'mb-[2.4rem]' : 'mb-[4.8rem]'}`}
      >
        <Link
          href={ROUTES.TECH_BLOG}
          className={`font-bold ${isMobile ? 'st1 w-full border-b border-b-gray2 pb-[1.4rem]' : 'h3'}`}
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
            setSort('LATEST');
          }}
        >
          기술블로그 🧪
        </Link>
        {!isMobile && <SearchInput />}
      </div>
      {/* ----------------------------------------------------- */}

      <div
        className={`w-full ${ImageTitleStyle.base} ${isMobile ? ImageTitleStyle.mobile : ImageTitleStyle.desktop}`}
        style={{
          backgroundImage: `url("${techImgUrl}")`,
        }}
      >
        <div className='grid grid-flow-col justify-between items-start mb-[2.4rem] z-10'>
          <h2 className={`font-bold ${isMobile ? 'st2' : 'h2'}`}>{title}</h2>
          {!isMobile && (
            <TechBookMarkAndToolTip
              isBookmarkActive={isBookmarkActive}
              setBookmarkActive={setBookmarkActive}
              techArticleId={techArticleId}
            />
          )}
        </div>

        <div className='grid'>
          <TechDetailInfo
            isMobile={isMobile}
            company={company.name}
            author={author}
            date={regDate}
          />
          {isMobile && (
            <TechBookMarkAndToolTip
              isBookmarkActive={isBookmarkActive}
              setBookmarkActive={setBookmarkActive}
              techArticleId={techArticleId}
            />
          )}
        </div>
      </div>

      <div className={`${isMobile ? 'px-[1.6rem]' : 'px-[4rem] mt-20'}`}>
        <TechMainContent isMobile={isMobile} content={contents} />
      </div>
      <div className={`${isMobile ? '' : 'px-[14.5rem]'}`}>
        <ArticleViewBtn
          paddingY={isMobile ? 'pt-[0.9rem]' : 'pt-[6.4rem]'}
          fontSize={isMobile ? 'st2' : 'st1'}
          techArticleUrl={techArticleUrl}
        />
      </div>
      <div className={`border-b border-b-gray1 ${isMobile ? 'mx-[1.6rem]' : 'mx-[4rem]'}`} />
    </section>
  );
}
