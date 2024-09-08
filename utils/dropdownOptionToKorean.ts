import { DropdownOptionProps } from '@stores/dropdownStore';

export const dropdownOptionToKorean = (englishOption: DropdownOptionProps) => {
  switch (englishOption) {
    case 'LATEST':
      return '최신순';
    case 'POPULAR':
      return '인기순';
    case 'MOST_VIEWED':
      return '조회순';
    case 'MOST_COMMENTED':
      return '댓글 많은 순';
    case 'BOOKMARKED':
      return '등록순';
    case 'HIGHEST_SCORE':
      return '정확도순';
    default:
      return '';
  }
};
