import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { InfiniteData } from '@tanstack/react-query';

import { useDropdownStore } from '@stores/dropdownStore';

import { Dropdown } from '@components/common/dropdowns/dropdown';
import { TechSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import { useInfiniteTechBlogComments } from '../api/useInfiniteGetTechComments';
import { TechBlogCommentsDropdownProps, TechCommentProps } from '../types/techCommentsType';

const DynamicTechCommentSet = dynamic(() => import('@/pages/techblog/components/CommentSet'));

export default function CommentTechSection({ articleId }: { articleId: string }) {
  const { sortOption } = useDropdownStore();

  const { techBlogComments, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteTechBlogComments(sortOption as TechBlogCommentsDropdownProps, articleId);

  const totalCommentCnt = techBlogComments?.pages[0]?.data.totalElements;
  useEffect(() => {
    console.log('sortOption', sortOption);
    console.log('techBlogComments', techBlogComments);
  }, [sortOption]);

  const getStatusComponent = (
    CurTechBlogComments: InfiniteData<any, unknown> | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    switch (status) {
      case 'pending':
        // if (isMobile) {
        //   return <MobileTechSkeletonList itemsInRows={10} />;
        // } else {
        return <TechSkeletonList itemsInRows={10} />;
      // }

      default:
        return (
          <>
            <div>
              {CurTechBlogComments?.pages?.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.content.map((data: TechCommentProps) => {
                    return <DynamicTechCommentSet data={data} articleId={articleId} />;
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* 스켈레톤 */}
            {isFetchingNextPage && hasNextPage && (
              <div className='mt-[2rem]'>
                <TechSkeletonList itemsInRows={10} />
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
        <Dropdown type='techComment' />
      </div>
      {getStatusComponent(techBlogComments, status)}
    </>
  );
}
