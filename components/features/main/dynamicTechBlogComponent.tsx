import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';
import { usePostBookmarkStatus } from '@pages/techblog/api/usePostBookmarkStatus';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponents';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import {
  MainTechSkeletonList,
  MobileTechSkeletonList,
} from '@components/common/skeleton/techBlogSkeleton';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { ROUTES } from '@/constants/routes';
import { TechInfiniteDataType } from '@/types/infiniteQueryType';

import TechBlogImg from '../techblog/techBlogImg';
import GradientDiv from './gradientDiv';

export default function DynamicTechBlogComponent({
  skeletonCnt,
  isScroll = true,
  bottomDiv,
  type = 'main',
  data,
}: {
  skeletonCnt: number;
  isScroll?: boolean;
  bottomDiv?: React.MutableRefObject<null>;
  type: 'main' | 'myinfo';
  data: TechInfiniteDataType;
}) {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  const isMobile = useIsMobile();
  const { techBlogData, isFetchingNextPage, hasNextPage, status, onIntersect } = data;

  const SCROLL_CLASS = 'relative overflow-y-scroll scrollbar-hide max-h-[50rem]';

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  const { mutate: bookmarkMutation } = usePostBookmarkStatus();

  const handleBookmarkClick = ({
    id,
    isBookmarkActive,
  }: {
    id: number;
    isBookmarkActive: boolean;
  }) => {
    bookmarkMutation(
      {
        techArticleId: id,
        status: !isBookmarkActive,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });
          setToastVisible('북마크에서 삭제했어요');
        },
      },
    );
  };

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        if (isMobile) {
          return <MobileTechSkeletonList itemsInRows={skeletonCnt} />;
        } else {
          return <MainTechSkeletonList itemsInRows={skeletonCnt} />;
        }

      default:
        if (type === 'myinfo' && techBlogData?.pages[0].data.content.length === 0)
          return <NoMyInfoData type='techblog' />;
        return (
          <>
            <div className={isScroll ? SCROLL_CLASS : ''}>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group?.data.content.map(
                    ({
                      id,
                      thumbnailUrl,
                      techArticleUrl,
                      title,
                      isBookmarked,
                      author,
                      regDate,
                      company,
                      contents,
                    }: TechCardProps) => (
                      <div
                        key={id}
                        className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[2.8rem] border-b border-b-gray1 border-solid select-none '
                      >
                        <div>
                          <TechBlogImg
                            id={id}
                            thumbnailUrl={thumbnailUrl}
                            rounded='rounded-[0.8rem]'
                            size='small'
                          />

                          <ArticleViewBtn
                            techArticleUrl={techArticleUrl}
                            fontSize='c1'
                            textIconGap={'mr-[0.8rem]'}
                            paddingY='pt-[1.6rem]'
                            iconSize='w-[6px] h-[20px]'
                          />
                        </div>
                        <div>
                          <div className='flex items-center justify-between border-white'>
                            <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
                              <p className='font-bold st2 py-[0.7rem]'>{title}</p>
                            </Link>
                            {type === 'myinfo' && (
                              <Image
                                src={isBookmarked ? bookmarkActive : bookmarkNonActive}
                                width={15}
                                height={16}
                                alt='북마크활성아이콘'
                                className='cursor-pointer'
                                onClick={() =>
                                  handleBookmarkClick({
                                    id,
                                    isBookmarkActive: isBookmarked,
                                  })
                                }
                              />
                            )}
                          </div>
                          <TechInfo
                            type='main'
                            author={author}
                            date={regDate}
                            company={company?.name}
                            companyId={id}
                          />
                          <Link href={`${ROUTES.TECH_BLOG}/${id}`}>
                            <TechContent content={contents} maxLines={4} className='mr-4' />
                          </Link>
                        </div>
                      </div>
                    ),
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <MainTechSkeletonList itemsInRows={skeletonCnt} />
              </div>
            )}
            {type === 'main' && <GradientDiv />}
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
