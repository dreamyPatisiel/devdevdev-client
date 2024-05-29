import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import { useInfiniteMyInfoBookmark } from '@pages/techblog/api/useInfiniteMyInfoBookmark';
import { useInfiniteTechBlogData } from '@pages/techblog/api/useInfiniteTechBlog';
import { usePostBookmarkStatus } from '@pages/techblog/api/usePostBookmarkStatus';
import { ArticleViewBtn } from '@pages/techblog/components/techDetailCardSubComponent';
import { TechContent, TechInfo } from '@pages/techblog/components/techSubComponent';
import { TechCardProps } from '@pages/techblog/types/techBlogType';

import { useDropdownStore } from '@stores/dropdownStore';

import { useObserver } from '@hooks/useObserver';

import { MainTechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import TechBlogImg from '../techblog/techBlogImg';

export default function DynamicTechBlogComponent({
  skeletonCnt,
  isScroll = true,
  bottomDiv,
  dataType = 'main',
  setTotalCnt,
}: {
  skeletonCnt: number;
  isScroll?: boolean;
  bottomDiv?: React.MutableRefObject<null>;
  dataType?: 'main' | 'myinfo';
  setTotalCnt?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { sortOption } = useDropdownStore();
  const queryClient = useQueryClient();

  const useInfiniteTechHook =
    dataType === 'main' ? useInfiniteTechBlogData : useInfiniteMyInfoBookmark;

  const { techBlogData, isFetchingNextPage, hasNextPage, status, error, onIntersect } =
    useInfiniteTechHook(sortOption); // TODO: sortOption 타입 및 드롭다운 변경해야함..

  useEffect(() => {
    console.log(techBlogData?.pages[0].data.totalElements);
    if (setTotalCnt) {
      setTotalCnt(techBlogData?.pages[0].data.totalElements || 0);
    }
  }, [techBlogData?.pages]);

  const SCROLL_CLASS = 'overflow-y-scroll max-h-[47rem]';

  useObserver({
    target: bottomDiv, // TODO: 타입에러 해결
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
        },
      },
    );
  };

  const getStatusComponent = () => {
    switch (status) {
      case 'pending':
        return <MainTechSkeletonList itemsInRows={skeletonCnt} />;

      case 'error':
        return <p>Error: {error?.message}</p>;

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
                        className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b border-b-gray1 border-solid select-none '
                      >
                        <div>
                          <TechBlogImg
                            id={id}
                            thumbnailUrl={thumbnailUrl}
                            width={'w-[12rem]'}
                            height={'h-[8rem]'}
                            rounded='rounded-[0.8rem]'
                          />

                          <ArticleViewBtn
                            techArticleUrl={techArticleUrl}
                            fontSize='c1'
                            textIconGap={'mr-[0.8rem]'}
                            paddingY='pt-[1.6rem]'
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
          </>
        );
    }
  };

  return <>{getStatusComponent()}</>;
}
