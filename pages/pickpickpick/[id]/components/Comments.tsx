import { useState } from 'react';

import Comment from './Comment';

interface subComment {
  id: number;
  subComment: string;
}

export default function Comments({
  isDeleted,
  subCommentInfo,
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
}) {
  const [moreComments, setMoreComments] = useState(false);

  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  return (
    <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
      <Comment
        comment='미래는 백엔드다   마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜 모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는 정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이 안오네요?'
        isDeleted={isDeleted}
      />

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
