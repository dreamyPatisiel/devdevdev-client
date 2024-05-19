import { useEffect, useState } from 'react';

import { Modal } from '@components/common/modals/modal';

export default function Modals({
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
  const [submitText, setSubmitText] = useState(`${modalType}하기`);
  const [size, setSize] = useState<'s' | 'm' | 'l' | undefined>('s');

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    switch (modalType) {
      case '투표수정':
        setTitle('투표를 수정할까요?');
        setContent('타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.');
        setSubmitText('수정하기');
        break;

      case '투표삭제':
        setTitle('투표를 삭제할까요?');
        setContent('이 투표가 누군가의 한줄기 빛일지도 몰라요. 🥲');
        setSubmitText('삭제하기');
        break;

      case '신고':
        setTitle('신고 내용을 작성해주세요');
        setContent(null);
        setDropDown(true);
        setSubmitText('신고하기');
        setSize('m');
        setDisabled(selected === ('신고 사유 선택' || ''));
        break;

      case '신고완료':
        setTitle('신고가 완료됐어요');
        setContent('신고 내용을 바탕으로 신속하게 처리해드릴게요.');
        setSize('m');
        break;

      default:
        setTitle(`댓글을 ${modalType}할까요?`);
        setContent(contents);
        setDropDown(false);
        setSubmitText(`${modalType}하기`);
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
