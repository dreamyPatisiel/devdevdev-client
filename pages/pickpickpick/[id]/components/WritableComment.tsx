import { useState } from 'react';

import { cn } from '@utils/mergeStyle';

import { SubButton } from '@components/common/buttons/subButtons';

import { MAX_LENGTH } from '../constants/pickCommentConstants';

export default function WritableComment({ isVoted = true }: { isVoted?: boolean }) {
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
      <div className='flex justify-between pl-[1rem]'>
        <span className='p2 font-bold text-gray5'>명탐정코난(det*******)</span>
        <span className='p2 font-light text-gray4'>
          {textCount}/{MAX_LENGTH}
        </span>
      </div>

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
        {isVoted && <span className='text-p2 font-bold text-primary3'>미래는 백엔드다</span>}

        <span className='text-c1 font-bold text-gray5 flex'>
          <label htmlFor='myvote-check' className='cursor-pointer flex items-center gap-[0.9rem]'>
            <input
              type='checkbox'
              id='myvote-check'
              className={cn(
                'appearance-none w-[1.1rem] h-[1.1rem] bg-[url("/image/pickpickpick/square.svg")] bg-no-repeat bg-center cursor-pointer',
                {
                  'checked:bg-[url("/image/pickpickpick/check-square.svg")]': isVoted,
                },
              )}
            />
            <span>내 투표 공개</span>
          </label>
        </span>

        <SubButton text='댓글 남기기' variant='primary' disabled={textCount <= 0} />
      </div>
    </div>
  );
}
