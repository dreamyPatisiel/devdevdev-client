import React, { useState } from 'react';

import { SubButton } from '../buttons/subButtons';

// 답글 작성 & 수정폼
export default function ReplyComment({ type }: { type: 'register' | 'edit' }) {
  const MAX_LENGTH = 1000;
  const [commentText, setCommentText] = useState('');
  const [textCount, setTextCount] = useState(0);

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setCommentText(textValue);
    if (textCount > MAX_LENGTH) {
      e.target.value = textValue.substring(0, MAX_LENGTH);
    }

    setTextCount(textValue.length);
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-black rounded-[1.6rem] border border-gray4'>
      {/* TODO: 글자수 UI나오면 수정 */}
      {/* <div className='float-right'>
    <span className='p2 font-light text-gray4'>
      {textCount}/{MAX_LENGTH}
    </span>
  </div> */}
      <textarea
        name='commentMessage'
        rows={2}
        value={commentText}
        className='bg-black text-gray4 p2 px-[1rem] py-[1rem] w-full resize-none outline-none'
        placeholder='댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        aria-label='댓글 입력란'
        onChange={handleTextCount}
        maxLength={MAX_LENGTH}
      />
      <div className='flex justify-end items-end gap-[1.6rem]'>
        <SubButton
          text={type === 'register' ? '댓글 남기기' : '댓글 수정하기'}
          variant='primary'
          disabled={textCount <= 0}
        />
      </div>
    </div>
  );
}
