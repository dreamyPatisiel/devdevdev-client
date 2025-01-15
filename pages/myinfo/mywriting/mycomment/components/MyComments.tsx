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
  commentType: 'PICK' | 'TECH'; // "PICK"
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
        if (myCommentData?.pages[0].data.data.content.length === 0) {
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
      <MyCommentCard
        commentType={'TECH'} // 'TECH' (기술블로그 테스트)
        postId={3999} // 3946
        commentId={278} // 276
        postTitle={
          '아이유는 국민가수인데요. 여러분은 아이유의 노래 중 무엇이 가장 아이유의 성장에 큰 도움을 줬다고 생각하시나요?!'
        }
        commentCreatedAt={'2023-05-11'}
        commentContents={
          '여러모로 그는 K-팝 아티스트 중 아티스트 라는 호칭의 고전적 의미에 가장 가까운 스타다. 음악가로서 그가 본업에 충실하고, 단호하되 과격하지 않게 대중과 소통함으로써 존경을 쌓아온 한편, 인간 이지은의 성공 신화와 미담은 한국인이 숭배하는 또 다른 가치를 드러낸다.'
        }
        commentLikedCount={12344}
        pickOptionTitle={
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방법이 더 서버의 비용을 절감하고 유용합니다.'
        }
        pickOptionType={'firstPickOption'}
      />
      <MyCommentCard
        commentType={'PICK'} // 'TECH' (기술블로그 테스트)
        postId={222} // 3946
        commentId={1} // 276
        postTitle={
          '아이유는 국민가수인데요. 여러분은 아이유의 노래 중 무엇이 가장 아이유의 성장에 큰 도움을 줬다고 생각하시나요?!'
        }
        commentCreatedAt={'2023-05-11'}
        commentContents={
          '여러모로 그는 K-팝 아티스트 중 아티스트 라는 호칭의 고전적 의미에 가장 가까운 스타다. 음악가로서 그가 본업에 충실하고, 단호하되 과격하지 않게 대중과 소통함으로써 존경을 쌓아온 한편, 인간 이지은의 성공 신화와 미담은 한국인이 숭배하는 또 다른 가치를 드러낸다.'
        }
        commentLikedCount={12344}
        pickOptionTitle={
          '사용자가 결제를 진행 후 확인받는 프로세스에서는 Kakao의 방법이 더 서버의 비용을 절감하고 유용합니다.'
        }
        pickOptionType={'firstPickOption'}
      />
    </div>
  );
}
