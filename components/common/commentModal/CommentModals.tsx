import { useEffect, useState } from 'react';

import { useBlameReasonStore, useSelectedStore } from '@stores/dropdownStore';

import { Modal } from '@components/common/modals/modal';

import { TypeBlames, useGetBlames } from '@/api/useGetBlames';

export default function CommentModals({
  modalType,
  contents,
  modalSubmitFn,
  submitButtonDisable,
}: {
  modalType: string;
  contents: string;
  modalSubmitFn?: () => void;
  submitButtonDisable?: boolean;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(contents || null);
  const [submitText, setSubmitText] = useState(`${modalType}`);
  const [size, setSize] = useState<'s' | 'm' | 'l' | undefined>('s');

  const [disabled, setDisabled] = useState(false);
  const { selectedBlameData, refreshSelectedBlameData } = useSelectedStore();
  const { refreshBlameReason } = useBlameReasonStore();

  const { data, status } = useGetBlames();

  const modalCancelFn = async () => {
    if (modalType === '신고하기') {
      await refreshSelectedBlameData();
      await refreshBlameReason();
    }
  };

  useEffect(() => {
    switch (modalType) {
      case '삭제하기':
        setSize('s');
        setTitle('댓글을 삭제할까요?');
        setContent('삭제하면 복구할 수 없고 다른 회원들이 댓글을 달 수 없어요');
        setSubmitText('삭제하기');
        break;

      case '신고하기':
        setSize('m');
        setTitle('신고 사유를 선택해주세요');
        setContent(null);
        setSubmitText('신고하기');
        setDisabled(selectedBlameData?.reason === ('신고 사유 선택' || ''));
        break;

      default:
        setTitle(`댓글을 ${modalType}할까요?`);
        setContent(contents);
        setSubmitText(modalType);
    }
  }, [modalType, selectedBlameData?.reason]);

  return (
    <Modal
      title={title}
      contents={content}
      dropDownList={modalType === '신고하기' ? data : null}
      status={status}
      submitText={submitText}
      size={size}
      submitFn={modalSubmitFn}
      cancelFn={modalCancelFn}
      disabled={submitButtonDisable}
    />
  );
}
