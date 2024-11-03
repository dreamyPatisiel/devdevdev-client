import React, { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';

import { InfiniteData } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import useIsMobile from '@hooks/useIsMobile';
import { useObserver } from '@hooks/useObserver';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import MobileDropdown from '@components/common/dropdowns/mobileDropdown';
import { TechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import { useInfiniteTechBlogComments } from '../api/useInfiniteGetTechComments';
import { TechBlogCommentsDropdownProps, TechCommentProps } from '../types/techCommentsType';

const DynamicTechCommentSet = dynamic(() => import('@/pages/techblog/components/CommentSet'));

export default function CommentTechSection({ articleId }: { articleId: string }) {
  const isMobile = useIsMobile();
  const { sortOption } = useDropdownStore();

  const bottomDiv = useRef(null);
  const { techBlogComments, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteTechBlogComments(sortOption as TechBlogCommentsDropdownProps, articleId);
  const totalCommentCnt = techBlogComments?.pages[0]?.data.totalElements;

  useObserver({
    target: bottomDiv,
    onIntersect,
  });

  const getStatusComponent = (
    CurTechBlogComments: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!articleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        if (isMobile) {
          return <MobileCommentSkeletonList itemsInRows={10} />;
        } else {
          return <CommentSkeletonList itemsInRows={10} />;
        }

      default:
        return (
          <>
            <div>
              {CurTechBlogComments?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCommentProps) => {
                    return (
                      <DynamicTechCommentSet
                        key={data.techCommentId}
                        data={data}
                        articleId={articleId}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                {isMobile ? (
                  <MobileCommentSkeletonList itemsInRows={10} />
                ) : (
                  <CommentSkeletonList itemsInRows={10} />
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className='flex justify-between items-center mb-[2.8rem]'>
        <p className='p1'>
          <span className='text-point3'>{totalCommentCnt}</span>개의 댓글
        </p>
        {isMobile ? <MobileDropdown type='comment' /> : <Dropdown type='techComment' />}
      </div>

      {totalCommentCnt === 0 && (
        <p className='text-center text-[#94A0B0] p1 my-[14rem]'>
          작성된 댓글이 없어요! 첫댓글을 작성해주세요{' '}
        </p>
      )}
      {getStatusComponent(techBlogComments, status)}
      <div ref={bottomDiv} />
    </>
  );
}
