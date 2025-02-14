import { PickDropdownProps, TechBlogDropdownProps } from '@stores/dropdownStore';

export const pickpickpickDropdownOptions = ['LATEST', 'POPULAR', 'MOST_VIEWED', 'MOST_COMMENTED'];
export const bookmarkDropdownOptions = ['BOOKMARKED', 'LATEST', 'MOST_COMMENTED'];
export const techBlogDropdownOptions = [
  'LATEST',
  'HIGHEST_SCORE',
  'POPULAR',
  'MOST_VIEWED',
  'MOST_COMMENTED',
];
export const TechBlogCommentsOptions = ['LATEST', 'MOST_LIKED', 'MOST_COMMENTED'];
export const pickCommentOptions = ['LATEST', 'MOST_LIKED', 'MOST_COMMENTED'];

export const INITIAL_PICK_SORT_OPTION: PickDropdownProps = 'LATEST';
export const INITIAL_TECH_SORT_OPTION: TechBlogDropdownProps = 'LATEST';
