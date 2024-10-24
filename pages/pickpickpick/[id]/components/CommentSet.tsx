import { useState } from 'react';

import Comment from './Comment';
import CommentReplies from './CommentReplies';

export interface SubCommentsProps {
  pickCommentId: number;
  memberId: number;
  pickCommentParentId: number;
  pickCommentOriginParentId: number;
  createdAt: string;
  isPickAuthor: boolean;
  author: string;
  maskedEmail: string;
  contents: string;

  isCommentAuthor: boolean;
  isDeleted: boolean;
  isModified?: boolean;
}

interface CommentsProps {
  pickCommentId: number;
  isDeleted: boolean;
  author: string;
  maskedEmail: string;
  createdAt: string;
  isCommentAuthor: boolean;
  contents: string;

  votedPickOption: 'firstPickOption' | 'secondPickOption' | null;
  votedPickOptionTitle?: string;

  isPickAuthor: boolean;
  isModified?: boolean;
  replies?: SubCommentsProps[];
}

export default function CommentSet({
  isPickAuthor,
  isDeleted,
  author,
  maskedEmail,
  createdAt,
  isCommentAuthor,
  contents,

  votedPickOption,
  votedPickOptionTitle,

  replies,
  isModified,
}: CommentsProps) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <>
      {/* <Comment
        isPickAuthor={isPickAuthor}
        isDeleted={isDeleted}
        author={author}
        maskedEmail={maskedEmail}
        createdAt={createdAt}
        isCommentAuthor={isCommentAuthor}
        comment={contents}
        votedPickOption={votedPickOption}
        votedPickOptionTitle={votedPickOptionTitle ?? ''}
        isModified={isModified}
      /> */}

      <CommentReplies replies={replies} />

      {/* {subCommentInfo && subCommentInfo?.length > 2 && (
        <button onClick={handleMoreComments} className='p2 font-bold text-gray5 ml-[2.4rem]'>
          {moreComments ? '- 댓글 접기' : '+ 댓글 더보기'}
        </button> */}
      {/* )} */}
    </>
  );
}
