import React from 'react';

import Link from 'next/link';

import { ArticleViewTextButton } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponents';

import TechBlogImg from '@components/features/techblog/techBlogImg';

import { ROUTES } from '@/constants/routes';

export default function NotificationSubscribeCard() {
  const data = {
    id: 1,
    thumbnailUrl: 'https://img.animalplanet.co.kr/news/2020/02/10/700/1b2b4q83cbc25b47g551.jpg',
    techArticleUrl: 'https://img.animalplanet.co.kr/news/2020/02/10/700/1b2b4q83cbc25b47g551.jpg',
    title: 'Kotlin으로 DSL 만들기: 반복적이고 지루한 REST Docs 벗어나기',
    isBookmarked: false,
    author: '작성자',
    regDate: '2025-02-18',
    company: '회사',
    contents:
      '안녕하세요. 토스뱅크 프론트엔드 개발자로 근무하고 있는 박지혜입니다. 지난 글에서 토스뱅크 프론트엔드 챕터가 웹으로 은행을 만들고 있는 이야기를 소개해 드렸는데요.  필요한데 드리며...',
  };

  return (
    <div
      key={data.id}
      className='flex gap-[1.6rem] flex-col rounded-Radius16 px-[3.2rem] py-[2.4rem] border border-gray500'
    >
      <div className='rounded-[10rem] p-[0.4rem] bg-gray800 text-center'>
        <p className='p2'>
          <b className='font-bold'>{data.company}</b>의 새 아티클이에요!
        </p>
      </div>

      <div className='flex gap-[3.2rem]'>
        <div className='flex flex-col gap-[1.6rem]'>
          <TechBlogImg id={data.id} thumbnailUrl={data.thumbnailUrl} size='small' />

          <ArticleViewTextButton
            techArticleUrl={data.techArticleUrl}
            fontSize='p2'
            textIconGap='mr-[0.45rem]'
            paddingY='0'
            iconSize='w-[7px] h-[12px]'
          />
        </div>

        <div className='flex flex-col gap-[0.8rem]'>
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
            <TechContent content={data.contents} maxLines={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
