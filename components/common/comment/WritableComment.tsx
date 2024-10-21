import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { SubButton } from '@components/common/buttons/subButtons';

import VisibilityPickToggle from './VisibilityPickToggle';

interface WritableCommentProps {
  // FIXME: 'techblog' 가 아닌 'default'로 바꾸기
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
  parentCommentAuthor?: string;
}

// 댓글 작성폼
export default function WritableComment({
  type,
  mode = 'register',
  preContents,
  isVoted = true,
  writableCommentButtonClick,
  parentCommentAuthor,
}: WritableCommentProps) {
  const MAX_LENGTH = 1000;
  const [textCount, setTextCount] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const editableSpanRef = useRef<HTMLSpanElement | null>(null);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (preContents && preContents !== '') {
      setTextCount(preContents.length);
    }
  }, [preContents]);

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.innerText;
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

  const handleFocus = () => {
    if (editableSpanRef.current) {
      editableSpanRef.current.focus();
    }
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-[#1A1B23] rounded-[1.6rem]'>
      <div
        className={`p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none`}
      >
        <span
          contentEditable='false'
          suppressContentEditableWarning={true}
          className='p2 text-[#BD79FF] pointer-events-none ml-0'
        >
          {parentCommentAuthor ? `@${parentCommentAuthor}` : ''}{' '}
        </span>
        {!textValue && mode === 'register' && (
          <span className='text-[#677485]' onClick={handleFocus}>
            댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수
            있습니다.
            {type === 'pickpickpick' && (
              <>
                <br /> 픽픽픽 공개여부는 댓글을 작성하고 나면 수정할 수 없어요.
              </>
            )}
          </span>
        )}
        <span
          ref={editableSpanRef}
          contentEditable='true'
          onInput={handleTextCount}
          className={`p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none`}
        >
          {mode === 'register' ? '' : preContents}
        </span>
      </div>

      {/* <div className='relative w-full'>
        <span className='absolute p2 top-[1rem] left-[1rem] text-[#BD79FF] pointer-events-none'>
          {parentCommentAuthor}
        </span>
      </div>
      <textarea
        value={textValue}
        name='commentMessage'
        rows={2}
        className='bg-gray1 p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none'
        placeholder={
          parentCommentAuthor
            ? ''
            : '댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        }
        aria-label='댓글 입력란'
        defaultValue={mode === 'register' ? '' : preContents}
        onChange={handleTextCount}
        maxLength={MAX_LENGTH}
        style={{ paddingLeft: `${parentCommentAuthor && parentCommentAuthor?.length * 1.25}rem` }}
      /> */}

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
