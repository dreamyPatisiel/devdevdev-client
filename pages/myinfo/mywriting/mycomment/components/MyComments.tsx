import { Fragment } from 'react';

import DevLoadingComponent from '@pages/loading/index.page';
import NoMyInfoData from '@pages/myinfo/components/NoMyInfoData';

import useIsMobile from '@hooks/useIsMobile';

import { NO_MYINFO_DATA } from '@/constants/NoMyInfoDataContants';

import { useInfiniteMyComments } from '../apiHooks/useInfiniteMyComment';
import { CommentFilterKey } from '../index.page';
import MyCommentCard from './MyCommentCard';

interface MyCommentData {
  uniqueCommentId: string; // ${commentType}_${postId}_${commentId}
  postId: number;
  postTitle: string;
  commentId: number;
  commentType: 'PICK' | 'TECH_ARTICLE';
  commentContents: string;
  commentRecommendTotalCount: number;
  commentCreatedAt: string; // "2025-01-01 00:00:00"
  pickOptionTitle?: string;
  pickOptionType?: 'firstPickOption' | 'secondPickOption' | null;
}

export default function MyComments({
  commentFilterStatus,
}: {
  commentFilterStatus: CommentFilterKey;
}) {
  const isMobile = useIsMobile();
  const { myCommentData, status } = useInfiniteMyComments({
    commentFilter: commentFilterStatus,
  });

  const getStatusComponent = (status: 'error' | 'success' | 'pending') => {
    switch (status) {
      case 'pending':
        return <DevLoadingComponent />;

      default:
        if (myCommentData?.pages[0].data?.content.length === 0) {
          return (
            <NoMyInfoData
              type='etc'
              title={NO_MYINFO_DATA.MYCOMMENT.TITLE}
              subTitle={NO_MYINFO_DATA.MYCOMMENT.SUBTITLE}
            />
          );
        }

        return (
          <>
            {myCommentData?.pages.map((group, index) => (
              <Fragment key={index}>
                {group.data.content.map((myComment: MyCommentData) => (
                  <MyCommentCard
                    key={myComment.uniqueCommentId}
                    commentType={myComment.commentType}
                    postId={myComment.postId}
                    commentId={myComment.commentId}
                    postTitle={myComment.postTitle}
                    commentCreatedAt={myComment.commentCreatedAt}
                    commentContents={myComment.commentContents}
                    commentLikedCount={myComment.commentRecommendTotalCount}
                    pickOptionTitle={myComment.pickOptionTitle}
                    pickOptionType={myComment.pickOptionType}
                  />
                ))}
              </Fragment>
            ))}
          </>
        );
    }
  };

  return (
    <div className={`${isMobile && 'mb-[8rem]'} flex flex-col gap-[2.4rem]`}>
      {getStatusComponent(status)}
    </div>
  );
}
