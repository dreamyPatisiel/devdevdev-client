import { Modal } from '@components/common/modals/modal';

export default function Modals(
  modalType: string,
  contents: string,
  setModalType: (type: string) => void,
  selected?: string,
) {
  if (modalType === '투표수정')
    return (
      <Modal
        title='투표를 수정할까요?'
        contents='타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.'
        submitText='수정하기'
      />
    );

  if (modalType === '투표삭제')
    return (
      <Modal
        title='투표를 삭제할까요?'
        contents='이 투표가 누군가의 한줄기 빛일지도 몰라요. 🥲'
        submitText='삭제하기'
      />
    );

  if (modalType === '신고')
    return (
      <Modal
        title={'신고 내용을 작성해주세요'}
        contents={null}
        dropDown={true}
        submitText={'신고하기'}
        size='m'
        submitFn={() => setModalType('신고완료')}
        disabled={selected === ('신고 사유 선택' || '')}
      />
    );

  if (modalType === '신고완료')
    return (
      <Modal
        title={'신고가 완료됐어요'}
        contents={'신고 내용을 바탕으로 신속하게 처리해드릴게요.'}
        size='m'
      />
    );

  return (
    <Modal
      title={`댓글을 ${modalType}할까요?`}
      contents={contents}
      dropDown={false}
      submitText={`${modalType}하기`}
    />
  );
}
