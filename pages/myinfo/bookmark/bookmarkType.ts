export type MyinfoBookmarkDropdownProps = 'BOOKMARKED' | 'LATEST' | 'MOST_COMMENTED';
export interface GetMyinfoBookmarkProps {
  techArticleId: string;
  bookmarkSort: MyinfoBookmarkDropdownProps;
}
