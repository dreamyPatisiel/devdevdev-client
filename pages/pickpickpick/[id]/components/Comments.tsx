import { useState } from 'react';

import Comment from './Comment';

interface subComment {
  id: number;
  subComment: string;
  isModified: boolean;
  isPickAuthor: boolean;
}

export default function Comments({
  isDeleted,
  subCommentInfo,
  comment,
  isPickAuthor,
  isModified,
}: {
  id: number;
  liked?: boolean;
  isDeleted?: {
    byAdmin?: boolean;
    byWriter?: boolean;
  };
  subCommentInfo?: subComment[];
  comment: string;
  isPickAuthor: boolean;
  isModified: boolean;
}) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <>
      <Comment
        comment={comment}
        isDeleted={isDeleted}
        isPickAuthor={isPickAuthor}
        isModified={isModified}
      />

      {subCommentInfo &&
        subCommentInfo.slice(0, moreComments ? undefined : 2).map((subComment) => (
          <div key={subComment.id} className='py-[1.6rem]'>
            <Comment
              isSubComment={true}
              comment={subComment.subComment}
              isPickAuthor={subComment.isPickAuthor}
              isModified={subComment.isModified}
            />
          </div>
        ))}

      {subCommentInfo && subCommentInfo?.length > 2 && (
        <button onClick={handleMoreComments} className='p2 font-bold text-gray5 ml-[2.4rem]'>
          + 댓글 더보기
        </button>
      )}
    </>
  );
}
