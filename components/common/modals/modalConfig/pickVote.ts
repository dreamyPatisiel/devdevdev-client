export const PICK_VOTE_MODAL = {
  id: crypto.randomUUID(),
  title: '투표를 등록할까요?',
  contents: '타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요',
  submitText: '등록하기',
  cancelText: '취소',
  size: 's',
} as const;
