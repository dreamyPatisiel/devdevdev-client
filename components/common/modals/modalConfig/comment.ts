export const COMMENT_DELETE_MODAL = {
  id: crypto.randomUUID(),
  title: '댓글을 삭제할까요?',
  contents: '삭제하면 복구할 수 없고 다른 회원들이 댓글을 달 수 없어요',
  submitText: '삭제하기',
  cancelText: '취소',
  size: 's', //TODO: 모달 사이즈는 하나로 통일하고 웹/모바일로만 나뉨
} as const;

export const COMMENT_BLAME_MODAL = {
  id: crypto.randomUUID(),
  title: '댓글을 신고할까요?',
  submitText: '신고하기',
  cancelText: '취소',
  size: 's',
} as const;
