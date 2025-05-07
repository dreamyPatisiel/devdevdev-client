import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import CommentUserInfo from '@components/common/comment/CommentUserInfo';
import WritableComment from '@components/common/comment/WritableComment';
import DevGuriError from '@components/common/error/DevGuriError';

import { usePostPickComment } from '../apiHooks/comment/usePostPickComment';
import Comments from './Comments';

export default function PickCommentSection({ pickId }: { pickId: string }) {
  const { mutate: postPickCommentMutate } = usePostPickComment();

  const handleWritableCommentButonClick = ({
    contents: commentContents,
    isPickVotePublic,
    onSuccess,
  }: {
    contents: string;
    isPickVotePublic?: boolean;
    onSuccess: () => void;
  }) => {
    postPickCommentMutate(
      {
        pickId,
        contents: commentContents,
        isPickVotePublic: isPickVotePublic as boolean,
      },
      {
        onSuccess: onSuccess,
      },
    );
  };

  return (
    <>
      <div className='flex gap-[1.6rem] flex-col'>
        <CommentUserInfo />
        <WritableComment
          type='pickpickpick'
          mode='register'
          writableCommentButtonClick={handleWritableCommentButonClick}
        />
      </div>

      <QueryErrorBoundary
        fallbackRender={({ handleRetryClick }) => (
          <DevGuriError type='network' handleRetryClick={handleRetryClick} />
        )}
      >
        <Comments pickId={pickId} />
      </QueryErrorBoundary>
    </>
  );
}
