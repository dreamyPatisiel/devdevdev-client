import parse from 'html-react-parser';

import { useRef, useState } from 'react';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

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
  const [textCount, setTextCount] = useState(preContents?.length ?? 0);
  const [textValue, setTextValue] = useState(preContents ?? '');
  const [isChecked, setIsChecked] = useState(false);
  const editableSpanRef = useRef<HTMLSpanElement | null>(null);

  // 로그인 여부
  const { loginStatus } = useLoginStatusStore();
  const { openLoginModal } = useLoginModalStore();
  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleTextOnInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (loginStatus === 'logout') {
      e.preventDefault();
      openLoginModal();
      return;
    }
    let textValue = e.target.innerText;
    textValue = textValue.replace(/\n/g, '<br />');
    setTextValue(textValue);
    if (textValue.length >= MAX_LENGTH) {
      if (!editableSpanRef.current) return;
      const sliceText = textValue.substring(0, MAX_LENGTH);
      editableSpanRef.current.innerText = sliceText;
      setTextValue(sliceText);
      setTextCount(sliceText.length);
      // 커서를 텍스트의 맨 뒤로 이동
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableSpanRef.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }

    setTextCount(textValue.length);
  };

  const handleSubmitWritable = () => {
    writableCommentButtonClick({
      contents: textValue,
      isPickVotePublic: isChecked,
      onSuccess: () => {
        if (editableSpanRef.current) {
          editableSpanRef.current.innerText = '';
        }
        setTextValue('');
        setTextCount(0);
      },
    });
  };

  /** 비회원이 댓글 작성시도시 로그인모달 띄우기 */
  const handleFocus = () => {
    if (loginStatus === 'logout') {
      openLoginModal();
      return;
    }
    if (editableSpanRef.current) {
      editableSpanRef.current.focus();
    }
  };

  return (
    <div className='px-[2.4rem] py-[1.6rem] bg-[#1A1B23] rounded-[1.6rem]'>
      {!textValue && mode === 'register' && !parentCommentAuthor && (
        <span className='p2 text-[#677485] absolute ml-7 mt-4' onClick={handleFocus}>
          댑댑이들의 의견을 남겨주세요! 광고 혹은 도배글을 작성할 시에는 관리자 권한으로 삭제할 수
          있습니다.
          {type === 'pickpickpick' && (
            <>
              <br /> 픽픽픽 공개여부는 댓글을 작성하고 나면 수정할 수 없어요.
            </>
          )}
        </span>
      )}

      {/* [DP- 395] 에있는 custom-scrollbar로 스타일 변경 필요 */}
      <div
        className={`p2 h-[6.4rem] overflow-y-scroll placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none`}
      >
        <span
          contentEditable='false'
          suppressContentEditableWarning={true}
          className='p2 text-[#BD79FF] pointer-events-none ml-0'
        >
          {parentCommentAuthor ? `@${parentCommentAuthor} ` : ''}
        </span>

        <span
          ref={editableSpanRef}
          contentEditable='true'
          onInput={handleTextOnInput}
          className={`p2 placeholder:text-gray4 px-[1rem] py-[1rem] w-full resize-none outline-none min-h-[6.8rem] max-h-[28rem] overflow-y-scroll`}
        >
          {mode === 'register' ? '' : parse(preContents || '')}
        </span>
      </div>

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
            disabled={textCount <= 0}
            onClick={handleSubmitWritable}
          />
        </div>
      </div>
    </div>
  );
}
