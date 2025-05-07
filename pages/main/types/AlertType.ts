export type AlertType = {
  id: number;
  type: 'SUBSCRIPTION' | 'COMMENT_AND_REPLY';
  title: string;
  createdAt: string;
  isRead: boolean;
  companyName: string;
  techArticleId: number;
};

export type SortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PageableType = {
  pageNumber: number;
  pageSize: number;
  sort: SortType;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type AlertListResponse = {
  content: AlertType[];
  pageable: PageableType;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: SortType;
  numberOfElements: number;
  empty: boolean;
};
