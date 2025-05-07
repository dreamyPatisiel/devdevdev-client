import { useState } from 'react';

import dynamic from 'next/dynamic';

import MyInfoFilterButtons from '@pages/myinfo/components/MyInfoFilterButtons';
import MyInfo from '@pages/myinfo/index.page';
import MyWritingNav from '@pages/myinfo/mywriting/mypick/components/MyWritingNav';
import { CommentFilterListProps, CommentFilterStatus } from '@pages/myinfo/types/myInfoFilter';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import DevGuriError from '@components/common/error/DevGuriError';

const DynamicMyComments = dynamic(
  () => import('@/pages/myinfo/mywriting/mycomment/components/MyComments'),
);

export default function MyComment() {
  const [commentFilterStatus, setCommentFilterStatus] = useState<CommentFilterStatus>('ALL');

  const commentFilterList: CommentFilterListProps[] = [
    {
      filterStatus: 'ALL',
      filterName: '전체',
    },
    {
      filterStatus: 'PICK',
      filterName: '픽픽픽',
    },
    {
      filterStatus: 'TECH_ARTICLE',
      filterName: '기술블로그',
    },
  ];

  const handleCommentFilterClick = (filterStatus: CommentFilterStatus) => {
    setCommentFilterStatus(filterStatus);
  };

  return (
    <MyInfo>
      <MyWritingNav />
      <MyInfoFilterButtons
        filterList={commentFilterList}
        filterStatus={commentFilterStatus}
        handleFilterClick={handleCommentFilterClick}
      />

      <QueryErrorBoundary
        fallbackRender={({ handleRetryClick }) => (
          <DevGuriError type='network' handleRetryClick={handleRetryClick} />
        )}
      >
        <DynamicMyComments commentFilterStatus={commentFilterStatus} />
      </QueryErrorBoundary>
    </MyInfo>
  );
}
