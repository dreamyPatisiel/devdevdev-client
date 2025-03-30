export const PICK_VOTE_MODAL = {
  // FIXME: PICK_VOTE_MODAL을 PICK_VOTE_REGISTER_MODAL로 변경
  id: crypto.randomUUID(),
  title: '투표를 등록할까요?',
  contents: '타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.',
  submitText: '등록하기',
  cancelText: '취소',
  size: 's',
} as const;

export const PICK_VOTE_MODIFIED_MODAL = {
  id: crypto.randomUUID(),
  title: '투표를 수정할까요?',
  contents: '타인을 비방하거나 광고가 포함된 게시물은 관리자에 의해 삭제될 수 있어요.',
  submitText: '수정하기',
  cancelText: '취소',
  size: 's',
} as const;

export const PICK_VOTE_DELETE_MODAL = {
  id: crypto.randomUUID(),
  title: '투표를 삭제할까요?',
  contents: '삭제된 투표는 복구할 수 없어요.',
  submitText: '삭제하기',
  cancelText: '취소',
  size: 's',
} as const;

export const PICK_VOTE_BLAME_MODAL = {
  id: crypto.randomUUID(),
  title: '신고 사유를 선택해주세요',
  submitText: '신고하기',
  cancelText: '취소',
  size: 'm',
} as const;

export const PICK_VOTE_COMMENT_DELETE_MODAL = {
  id: crypto.randomUUID(),
  title: '댓글을 삭제할까요?',
  contents: '삭제된 댓글은 복구할 수 없어요.',
  submitText: '삭제하기',
  cancelText: '취소',
  size: 's',
} as const;

export const PICK_VOTE_COMMENT_BLAME_MODAL = {
  id: crypto.randomUUID(),
  title: '댓글을 신고할까요?',
  contents: '신고된 댓글은 관리자에 의해 삭제될 수 있어요.',
  submitText: '신고하기',
  cancelText: '취소',
  size: 's',
} as const;
