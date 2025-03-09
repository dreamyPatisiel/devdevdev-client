import React from 'react';

import Link from 'next/link';

import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponents';

import TechBlogImg from '@components/features/techblog/techBlogImg';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { MyInfoArticleViewTextButton } from './ArticleViewTextButton';

export default function NotificationSubscribeCard() {
  const { isMobile } = useMediaQueryContext();
  const data = {
    id: 1,
    thumbnailUrl: 'https://img.animalplanet.co.kr/news/2020/02/10/700/1b2b4q83cbc25b47g551.jpg',
    techArticleUrl: 'https://img.animalplanet.co.kr/news/2020/02/10/700/1b2b4q83cbc25b47g551.jpg',
    title: 'Kotlin으로 DSL 만들기: 반복적이고 지루한 REST Docs 벗어나기',
    isBookmarked: false,
    author: '작성자',
    regDate: '2025-02-18',
    company: '회사이름',
    contents:
      '세상의 모서리 구부정하게 커버린 골칫거리 Outsider 걸음걸이 옷차림 이어폰 너머 Play list 음악까지 다 Minor 넌 모르지 떨군 고개 위 환한 빛 조명이 어딜 비추는지 느려도 좋으니 결국 알게 되길 The one and only You are my celebrity 잊지마 넌 흐린 어둠 사이 왼손으로 그린 별 하나 보이니 그 유일함이 얼마나 아름다운지 말야 You are my celebrity Celebrity You are my celebrity',
  };

  return (
    <div
      key={data.id}
      className={`flex gap-[1.6rem] flex-col rounded-Radius16 border border-gray500 py-[2.4rem] ${isMobile ? 'px-[1.6rem]' : 'px-[3.2rem]'}`}
    >
      <div className='rounded-[10rem] p-[0.4rem] bg-gray800 text-center'>
        <p className='p2'>
          <strong className='font-bold'>{data.company}</strong>의 새 아티클이에요!
        </p>
      </div>

      <div className={`flex ${isMobile ? 'flex-col gap-[2.4rem]' : 'gap-[3.2rem]'}`}>
        <div className='flex flex-col gap-[1.6rem] items-center'>
          <TechBlogImg
            id={data.id}
            thumbnailUrl={data.thumbnailUrl}
            size={isMobile ? 'mobile' : 'small'}
          />

          {!isMobile && <MyInfoArticleViewTextButton techArticleUrl={data.techArticleUrl} />}
        </div>

        <div className={`flex flex-col ${isMobile ? 'gap-[0.4rem]' : 'gap-[0.8rem]'}`}>
          <div className='flex items-center justify-between border-white'>
            <Link href={`${ROUTES.TECH_BLOG}`}>
              <p className='font-bold st2'>{data.title}</p>
            </Link>
          </div>

          <TechInfo
            type='main'
            author={data.author}
            date={data.regDate}
            company={data.company}
            companyId={data.id}
          />

          <Link href={`${ROUTES.TECH_BLOG}`}>
            <TechContent content={data.contents} maxLines={isMobile ? 3 : 2} />
          </Link>
        </div>

        {isMobile && <MyInfoArticleViewTextButton techArticleUrl={data.techArticleUrl} />}
      </div>
    </div>
  );
}
