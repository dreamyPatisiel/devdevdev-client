import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import WritableComment from '@components/common/comment/WritableComment';

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
      <WritableComment
        type='pickpickpick'
        mode='register'
        writableCommentButtonClick={handleWritableCommentButonClick}
      />

      <QueryErrorBoundary type='section'>
        <Comments pickId={pickId} />
      </QueryErrorBoundary>
    </>
  );
}
