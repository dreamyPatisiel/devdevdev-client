import { useState } from 'react';

import { StatusTag, Tag } from '@components/tags';

import ThumbsupPoint from '@public/image/pickpickpick/thumbs-up-point.svg';
import Thumbsup from '@public/image/pickpickpick/thumbs-up.svg';

export default function Comment({
  댓글작성자,
  게시물작성자,
  userId,
  liked,
}: {
  댓글작성자?: string;
  userId?: string;
  게시물작성자?: string;
  liked?: boolean;
}) {
  const [isLiked, setLiked] = useState(liked);

  const handleLiked = () => {
    setLiked(!isLiked);
  };

  return (
    <div className='py-[1.6rem] border-b-[0.1rem] border-b-gray3'>
      <div className='flex justify-between'>
        <span>
          <span className='c1 text-gray5 font-bold'>명탐정코난(det*******)</span>
          {게시물작성자 === userId && <StatusTag text='작성자' />}
          <span className='c1 text-gray3 ml-[2rem]'>2023.05.11</span>

          {댓글작성자 === userId ? (
            <>
              <span className='c1 text-gray4 ml-[0.8rem]'>수정</span>
              <span className='c1 text-gray4 ml-[0.8rem]'>삭제</span>
            </>
          ) : (
            <span className='c1 text-gray4 ml-[0.8rem]'>신고</span>
          )}
        </span>

        <span className='flex gap-[0.8rem] items-center'>
          <button onClick={handleLiked}>
            {isLiked ? (
              <ThumbsupPoint alt='클릭된 좋아요 아이콘' />
            ) : (
              <Thumbsup alt='클릭되지 않은 좋아요 아이콘' />
            )}
          </button>
          <span className='c1 text-gray5 font-bold'>1345</span>
        </span>
      </div>

      <div className='py-[1.6rem]'>
        <p className='p2'>
          <span className='font-bold text-primary3 mr-[1rem]'>미래는 프론트다</span>
          마음 울적한 날에 거리를 걸어보고, 어쩌고 저쩌고 더미 텍스트 얼마나 써야하는지 진짜
          모르겠다 아니 네이버 웹툰은 폰트 사이즈가 13px 이더라고요. 살짝 작아보이면서도 읽히는
          정도인 거 같아서 그런 것 같습니다. 근데 사용자들의 댓글 길이가 어느정도일지 살짝 감이
          안오네요?
        </p>
      </div>
    </div>
  );
}
