import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useInfiniteMyInfoBookmark } from '@pages/myinfo/bookmark/api/useInfiniteMyInfoBookmark';
import { MyinfoBookmarkDropdownProps } from '@pages/myinfo/bookmark/bookmarkType';
import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import { usePostBookmarkStatus } from '@pages/techblog/api/usePostBookmarkStatus';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponent';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useDropdownStore } from '@stores/dropdownStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { useObserver } from '@hooks/useObserver';

import { MainTechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import TechBlogImg from '../techblog/techBlogImg';
import GradientDiv from './gradientDiv';

export default function DynamicTechBlogComponent({
  skeletonCnt,
  isScroll = true,
  bottomDiv,
  dataType = 'main',
}: {
  skeletonCnt: number;
  isScroll?: boolean;
  bottomDiv?: React.MutableRefObject<null>;
  dataType: 'main' | 'myinfo';
}) {
  const queryClient = useQueryClient();
  const { sortOption } = useDropdownStore();
  const { setToastVisible } = useToastVisibleStore();
  const useConditionalInfiniteHook = (dataType: 'main' | 'myinfo') => {
    const techBlogHook = useInfiniteTechBlogData('LATEST');
    const myInfoBookmarkHook = useInfiniteMyInfoBookmark(sortOption as MyinfoBookmarkDropdownProps);

    if (dataType === 'main') {
      return techBlogHook;
    } else {
      return myInfoBookmarkHook;
    }
  };

  const { techBlogData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useConditionalInfiniteHook(dataType);

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
        return <MainTechSkeletonList itemsInRows={skeletonCnt} />;

      default:
        return (
          <>
            <div className={isScroll ? SCROLL_CLASS : ''}>
              {techBlogData?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map(
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
                            <Link href={`/techblog/${id}`}>
                              <p className='font-bold st2 py-[0.7rem]'>{title}</p>
                            </Link>
                            {dataType === 'myinfo' && (
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
                            author={author}
                            date={regDate}
                            company={company?.name}
                            companyId={id}
                          />
                          <Link href={`/techblog/${id}`}>
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
            {dataType === 'main' && <GradientDiv />}
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
