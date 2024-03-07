import { useState } from 'react';

import Comment from './Comment';

interface subComment {
  id: number;
  subComment: string;
}

export default function Comments({
  isDeleted,
  subCommentInfo,
  comment,
}: {
  댓글작성자?: string;
  userId?: string;
  게시물작성자?: string;
  liked?: boolean;
  isDeleted?: {
    byAdmin?: boolean;
    byWriter?: boolean;
  };
  subCommentInfo?: subComment[];
  comment: string;
}) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
      <Comment comment={comment} isDeleted={isDeleted} />

      {subCommentInfo &&
        subCommentInfo.slice(0, moreComments ? undefined : 2).map((subComment) => (
          <div key={subComment.id} className='py-[1.6rem]'>
            <Comment isSubComment={true} comment={subComment.subComment} />
          </div>
        ))}

      {subCommentInfo && subCommentInfo?.length > 2 && (
        <button onClick={handleMoreComments} className='p2 font-bold text-gray5 ml-[2.4rem]'>
          + 댓글 더보기
        </button>
      )}
    </div>
  );
}
