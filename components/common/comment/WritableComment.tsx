import { ChangeEvent, useState } from 'react';

import { SubButton } from '@components/common/buttons/subButtons';

import VisibilityPickToggle from './VisibilityPickToggle';

interface WritableCommentProps {
  // FIXME: 'techblog' 가 아닌 'default'로 바꾸기
  type: 'pickpickpick' | 'techblog';
  mode: 'register' | 'edit' | 'reply';
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

  const [textCount, setTextCount] = useState(preContents?.length ?? 0);
  const [textValue, setTextValue] = useState(preContents ?? '');
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;

    if (textCount > MAX_LENGTH) {
      e.target.value = textValue.substring(0, MAX_LENGTH);
    }

    setTextValue(textValue);
    setTextCount(textValue.length);
  };

  const handleSubmitWritable = () => {
    writableCommentButtonClick({
      contents: textValue,
      isPickVotePublic: isChecked,
      onSuccess: () => {
        setTextValue('');
        setTextCount(0);
      },
    });
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-gray1 rounded-[1.6rem]'>
      {/* <div className='relative w-full'>
        <span className='absolute p2 top-[1rem] left-[1rem] text-[#BD79FF] pointer-events-none'>
          {parentCommentAuthor}
        </span>
      </div> */}

      <div
        className={`bg-gray1 p2 px-[1rem] py-[1rem] w-full resize-none outline-none min-h-[6.8rem] max-h-[28rem] overflow-y-scroll`}
      >
        {parentCommentAuthor && (
          <span
            contentEditable='false'
            suppressContentEditableWarning={true}
            className='text-[#BD79FF] ml-0'
          >
            {parentCommentAuthor}{' '}
          </span>
        )}

        <span
          contentEditable='true'
          suppressContentEditableWarning={true}
          onInput={(e: ChangeEvent<HTMLSpanElement>) => {
            setTextValue(e.target.innerText);
            setTextCount(e.target.innerText.length);
          }}
          // onKeyDown={(e) => {
          //   if ((textCount > 10 && e.key !== 'Backspace') || e.key !== 'Delete') {
          //     e.preventDefault();
          //   }
          // }}

          data-placeholder={
            mode === 'register'
              ? '댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다. \n 픽픽픽 공개여부는 댓글을 작성하고 나면 수정할 수 없어요.'
              : '댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
          }
          className={`bg-gray1 inline-block resize-none outline-none placeholder whitespace-pre-line cursor-text hover:cursor-text`}
        >
          {preContents}
        </span>
      </div>
      {/* <
        name='commentMessage'
        rows={2}
        className={`bg-gray1 p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none`}
        placeholder={
          parentCommentAuthor
            ? ''
            : '댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수 있습니다.'
        }
        aria-label='댓글 입력란'
        defaultValue={mode === 'register' ? '' : preContents}
        onChange={handleTextCount}
        maxLength={MAX_LENGTH}
        value={textValue}
        style={{ paddingLeft: `${parentCommentAuthor && parentCommentAuthor?.length * 1.25}rem` }}
      /> */}
      <div className='flex justify-between items-end mt-[1.6rem]'>
        <div className='p2 font-light text-gray4'>
          {textCount}/{MAX_LENGTH}
        </div>
        <div className='flex items-end gap-[1.6rem]'>
          {type === 'pickpickpick' && (
            <VisibilityPickToggle isChecked={isChecked} handleToggle={handleToggle} />
          )}
          <SubButton
            text={mode === 'register' ? '댓글 남기기' : '댓글 수정하기'}
            variant='primary'
            // disabled={textCount <= 0}
            onClick={handleSubmitWritable}
          />
        </div>
      </div>
    </div>
  );
}
