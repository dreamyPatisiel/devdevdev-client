import { useEffect, useState } from 'react';

import { Modal } from '@components/common/modals/modal';

export default function CommentModals({
  modalType,
  contents,
  selected,
  modalSubmitFn,
}: {
  modalType: string;
  contents: string;
  selected?: string;
  modalSubmitFn?: () => void;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(contents || null);
  const [dropDown, setDropDown] = useState(false);
  const [submitText, setSubmitText] = useState(`${modalType}`);
  const [size, setSize] = useState<'s' | 'm' | 'l' | undefined>('s');

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    switch (modalType) {
      case '삭제하기':
        setTitle('댓글을 삭제할까요?');
        setContent('삭제하면 복구할 수 없고 다른 회원들이 댓글을 달 수 없어요');
        setSubmitText('삭제하기');
        break;

      case '신고하기':
        setTitle('신고 사유를 선택해주세요');
        setContent(null);
        setDropDown(true);
        setSubmitText('신고하기');
        setSize('m');
        setDisabled(selected === ('신고 사유 선택' || ''));
        break;

      default:
        setTitle(`댓글을 ${modalType}할까요?`);
        setContent(contents);
        setDropDown(false);
        setSubmitText(modalType);
    }
  }, [modalType, selected]);

  return (
    <Modal
      title={title}
      contents={content}
      dropDown={dropDown}
      submitText={submitText}
      size={size}
      submitFn={modalSubmitFn}
      disabled={disabled}
    />
  );
}
