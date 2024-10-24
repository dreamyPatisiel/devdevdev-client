import { useState } from 'react';

import Comment from './Comment';
import CommentReplies from './CommentReplies';

export interface SubCommentsProps {
  pickCommentId: number;
  memberId: number;
  pickParentCommentId: number;
  pickOriginParentCommentId: number;
  parentCommentAuthor: string;
  createdAt: string;
  isCommentOfPickAuthor: boolean;
  author: string;
  maskedEmail: string;
  contents: string;
  pickParentCommentAuthor: string;
  isRecommended: boolean;
  likeTotalCount: number;

  isCommentAuthor: boolean;
  isDeleted: boolean;
  isModified?: boolean;
}

export interface CommentsProps {
  pickCommentId: number;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;
  isRecommended: boolean;
  likeTotalCount: number;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle?: string;

  isCommentOfPickAuthor: boolean;
  isModified?: boolean;
  replies?: SubCommentsProps[];
  pickId: string;
}

export default function CommentSet({
  pickCommentId,
  isCommentOfPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,
  isRecommended,
  likeTotalCount,

  votedPickOption,
  votedPickOptionTitle,

  replies,
  isModified,
  pickId,
}: CommentsProps) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <>
      <Comment
        isCommentOfPickAuthor={isCommentOfPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        comment={contents}
        votedPickOption={votedPickOption}
        votedPickOptionTitle={votedPickOptionTitle ?? ''}
        isModified={isModified}
        pickId={pickId}
        pickOriginParentCommentId={pickCommentId}
        pickParentCommentId={pickCommentId}
        pickCommentId={pickCommentId}
        type='default'
        recommendStatus={isRecommended}
        recommendTotalCount={likeTotalCount}
      />

      <CommentReplies replies={replies} pickId={pickId} />

      {/* {subCommentInfo && subCommentInfo?.length > 2 && (
        <button onClick={handleMoreComments} className='p2 font-bold text-gray5 ml-[2.4rem]'>
          {moreComments ? '- 댓글 접기' : '+ 댓글 더보기'}
        </button> */}
      {/* )} */}
    </>
  );
}
