import { useState } from 'react';

import { SubButton } from '@components/common/buttons/subButtons';

import VisibilityPickToggle from './VisibilityPickToggle';

export default function WritableComment({
  type,
  isVoted = true,
}: {
  type: 'pickpickpick' | 'techblog';
  isVoted?: boolean;
}) {
  const MAX_LENGTH = 1000;
  const [textCount, setTextCount] = useState(0);

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;

    if (textCount > MAX_LENGTH) {
      e.target.value = textValue.substring(0, MAX_LENGTH);
    }

    setTextCount(textValue.length);
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-gray1 rounded-[1.6rem]'>
      {/* TODO: 글자수 UI나오면 수정 */}
      {/* <div className='float-right'>
        <span className='p2 font-light text-gray4'>
          {textCount}/{MAX_LENGTH}
        </span>
      </div> */}
      <textarea
        name='commentMessage'
        rows={2}
        className='bg-gray1 p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none'
        placeholder='댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        aria-label='댓글 입력란'
        onChange={handleTextCount}
        maxLength={MAX_LENGTH}
      />
      <div className='flex justify-end items-end gap-[1.6rem]'>
        {type === 'pickpickpick' && <VisibilityPickToggle />}
        <SubButton text='댓글 남기기' variant='primary' disabled={textCount <= 0} />
      </div>
    </div>
  );
}
