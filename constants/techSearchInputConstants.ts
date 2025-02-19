export const SEARCH_CONSTANTS = {
    DEBOUNCE_DELAY: 100,
    DEFAULT_SORT: 'LATEST',
    SEARCH_SORT: 'HIGHEST_SCORE',
    ERROR_MESSAGES: {
      EMPTY_KEYWORD: '검색어를 입력해주세요',
      SPECIAL_CHARS: '검색어에 특수문자는 포함할 수 없어요'
    }
  } as const;
  
  export const FORBIDDEN_CHARS_PATTERN = /[!^()-+/[\]{}:]/;