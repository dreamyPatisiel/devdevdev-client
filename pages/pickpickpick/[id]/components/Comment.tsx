import { useState } from 'react';

import WritableComment from '@components/common/comment/WritableComment';
import { ReplyButton } from '@components/common/comment/borderRoundButton';
import CommentContents from '@components/common/comments/CommentContents';
import CommentHeader from '@components/common/comments/CommentHeader';
import SelectedPick from '@components/common/comments/SelectedPick';

import { usePostPickReplyComment } from '../apiHooks/comment/usePostPickComment';

interface CommentProps {
  pickCommentOriginParentId: number;
  isCommentOfPickAuthor: boolean;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  comment: string;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle: string | null;

  isModified?: boolean;
  isSubComment?: boolean;

  pickId: string;
}

export default function Comment({
  pickCommentOriginParentId,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  comment,
  votedPickOption,
  votedPickOptionTitle,
  isModified,
  isSubComment,
  pickId,
}: CommentProps) {
  const [isActived, setIsActived] = useState(false);

  const { mutate: postPickReplyMutate } = usePostPickReplyComment();

  const handleSubmitReplyComment = ({
    contents: replyContents,
    onSuccess,
  }: {
    contents: string;
    onSuccess: () => void;
  }) => {
    postPickReplyMutate(
      {
        pickId: pickId,
        contents: replyContents,
        pickCommentOriginParentId,
        pickCommentParentId: pickCommentOriginParentId,
      },
      {
        onSuccess: onSuccess,
      },
    );
  };

  return (
    <div
      className={`flex flex-col gap-[2.4rem] pt-[2.4rem] pb-[3.2rem] border-b-[0.1rem] border-b-gray3 border-t-[0.1rem] border-t-gray3 ${isSubComment && 'bg-gray1 px-[3.2rem]'}`}
    >
      <CommentHeader
        isPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
      />

      {isSubComment
        ? null
        : votedPickOption &&
          votedPickOptionTitle && (
            <SelectedPick
              votedPickOption={votedPickOption}
              votedPickOptionTitle={votedPickOptionTitle}
            />
          )}

      <CommentContents comment={comment} isDeleted={isDeleted} />

      <div className='mr-0'>
        <ReplyButton isActived={isActived} setIsActived={setIsActived} />
      </div>

      {isActived && (
        <WritableComment
          type='techblog'
          mode='register'
          writableCommentButtonClick={handleSubmitReplyComment}
        />
      )}
    </div>
  );
}
