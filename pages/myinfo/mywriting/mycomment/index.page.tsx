import { useState } from 'react';

import dynamic from 'next/dynamic';

import MyInfoFilterButtons, {
  MyInfoFilterListProps,
} from '@pages/myinfo/components/MyInfoFilterButtons';
import MyInfo from '@pages/myinfo/index.page';
import MyWritingNav from '@pages/myinfo/mywriting/mypick/components/MyWritingNav';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

export type CommentFilterKey = 'ALL' | 'PICK' | 'TECH_ARTICLE';

const DynamicMyComments = dynamic(
  () => import('@/pages/myinfo/mywriting/mycomment/components/MyComments'),
);

export default function MyComment() {
  const [commentFilterStatus, setCommentFilterStatus] = useState('ALL');

  const commentFilterList: MyInfoFilterListProps[] = [
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

  const handleCommentFilterClick = (filterStatus: string) => {
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

      <QueryErrorBoundary type='section'>
        <DynamicMyComments commentFilterStatus={commentFilterStatus as CommentFilterKey} />
      </QueryErrorBoundary>
    </MyInfo>
  );
}
