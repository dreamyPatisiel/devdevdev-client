import React from 'react';

import Link from 'next/link';

import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponents';

import TechBlogImg from '@components/features/techblog/techBlogImg';

import { ROUTES } from '@/constants/routes';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { usePatchNotificationsRead } from '../apiHooks/usePatchNotificationsRead';
import { MyInfoArticleViewTextButton } from './ArticleViewTextButton';

export interface NotificationSubscribeCardProps {
  notificationId: number;
  type: 'SUBSCRIPTION' | 'COMMENT_AND_REPLY';
  createdAt: string;
  isRead: boolean;
  techArticle: {
    id: number;
    elasticId: string;
    thumbnailUrl: string;
    isLogoImage: boolean;
    techArticleUrl: string;
    title: string;
    contents: string;
    company: {
      id: number;
      name: string;
      careerUrl: string;
      officialImageUrl: string;
    };
    regDate: string;
    author: string;
    viewTotalCount: number;
    recommendTotalCount: number;
    commentTotalCount: number;
    popularScore: number;
    isBookmarked: boolean;
    score: null;
  };
}

export default function NotificationSubscribeCard(
  notificationPageItem: NotificationSubscribeCardProps,
) {
  const { isMobile } = useMediaQueryContext();
  const { mutate: patchNotificationsReadMutate } = usePatchNotificationsRead();

  const { notificationId, isRead, techArticle } = notificationPageItem;
  const { id, thumbnailUrl, techArticleUrl, title, contents, company, regDate, author } =
    techArticle;

  return (
    <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
      <div
        key={id}
        className={`flex gap-[1.6rem] flex-col rounded-Radius16 border border-gray500 py-[2.4rem] 
        ${isMobile ? 'px-[1.6rem]' : 'px-[3.2rem]'}
        ${isRead ? 'opacity-50' : ''}
      `}
        onClick={() => patchNotificationsReadMutate(notificationId)}
      >
        <div className='rounded-[10rem] p-[0.4rem] bg-gray800 text-center'>
          <p className='p2'>
            <strong className='font-bold'>{company.name}</strong>의 새 아티클이에요!
          </p>
        </div>

        <div className={`flex ${isMobile ? 'flex-col gap-[2.4rem]' : 'gap-[3.2rem]'}`}>
          <div className='flex flex-col gap-[1.6rem] items-center'>
            <TechBlogImg id={id} thumbnailUrl={thumbnailUrl} size={isMobile ? 'mobile' : 'small'} />

            {!isMobile && <MyInfoArticleViewTextButton techArticleUrl={techArticleUrl} />}
          </div>

          <div className={`flex flex-col ${isMobile ? 'gap-[0.4rem]' : 'gap-[0.8rem]'}`}>
            <div className='flex items-center justify-between border-white'>
              <p className='font-bold st2'>{title}</p>
            </div>

            <TechInfo
              type='main'
              author={author}
              date={regDate}
              company={company.name}
              companyId={company.id}
            />

            <TechContent content={contents} maxLines={isMobile ? 3 : 2} />
          </div>

          {isMobile && <MyInfoArticleViewTextButton techArticleUrl={techArticleUrl} />}
        </div>
      </div>
    </Link>
  );
}
