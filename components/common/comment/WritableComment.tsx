import { useEffect, useState } from 'react';

import { SubButton } from '@components/common/buttons/subButtons';

import VisibilityPickToggle from './VisibilityPickToggle';

// 댓글 작성폼
export default function WritableComment({
  type,
  mode = 'register',
  preContents,
  isVoted = true,
  writableCommentButtonClick,
}: {
  type: 'pickpickpick' | 'techblog';
  mode: 'register' | 'edit';
  preContents?: string;
  isVoted?: boolean;
  writableCommentButtonClick: ({
    contents,
    isPickVotePublic,
    onSuccess,
  }: {
    contents: string;
    isPickVotePublic?: boolean;
    onSuccess: () => void;
  }) => void;
}) {
  const MAX_LENGTH = 1000;
  const [textCount, setTextCount] = useState(0);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (preContents && preContents !== '') {
      setTextCount(preContents.length);
    }
  }, [preContents]);

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setTextValue(textValue);
    if (textCount > MAX_LENGTH) {
      e.target.value = textValue.substring(0, MAX_LENGTH);
    }

    setTextCount(textValue.length);
  };

  const handleSubmitWritable = () => {
    writableCommentButtonClick({
      contents: textValue,
      onSuccess: () => {
        setTextValue('');
        setTextCount(0);
      },
    });
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-gray1 rounded-[1.6rem]'>
      <textarea
        value={textValue}
        name='commentMessage'
        rows={2}
        className='bg-gray1 p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none'
        placeholder='댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        aria-label='댓글 입력란'
        defaultValue={mode === 'register' ? '' : preContents}
        onChange={handleTextCount}
        maxLength={MAX_LENGTH}
      />

      <div className='flex justify-between items-end'>
        <div className='p2 font-light text-gray4'>
          {textCount}/{MAX_LENGTH}
        </div>
        <div className='flex items-end gap-[1.6rem]'>
          {type === 'pickpickpick' && <VisibilityPickToggle />}
          <SubButton
            text={mode === 'register' ? '댓글 남기기' : '댓글 수정하기'}
            variant='primary'
            disabled={textCount <= 0}
            onClick={handleSubmitWritable}
          />
        </div>
      </div>
    </div>
  );
}
