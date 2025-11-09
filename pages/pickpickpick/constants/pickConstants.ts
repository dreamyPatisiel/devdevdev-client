export const PICK_VIEW_SIZE = 9;
export const MOBILE_MAIN_PICK_VIEW_SIZE = 3;

export const PICK_COMMENT_VIEW_SIZE = 10;

// 픽픽픽 검색시 최소 입력 글자 수
export const PICK_SEARCH_MIN_LENGTH = 1;
export const isPickSearchEnabled = (term: string) => term.trim().length >= PICK_SEARCH_MIN_LENGTH;
