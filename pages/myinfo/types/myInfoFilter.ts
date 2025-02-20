export type CommentFilterStatus = 'ALL' | 'PICK' | 'TECH_ARTICLE';
export type CommentFilterName = '전체' | '픽픽픽' | '기술블로그';

export type NotificationFilterStatus = 'ALL' | 'VOTE_COMMENT' | 'SUBSCRIBE';
export type NotificationFilterName = '전체' | '투표/댓글' | '구독 업데이트';

export interface CommentFilterListProps {
  filterStatus: CommentFilterStatus;
  filterName: CommentFilterName;
}

export interface NotificationFilterListProps {
  filterStatus: NotificationFilterStatus;
  filterName: NotificationFilterName;
  filterTotal: number;
}

export type MyInfoFilterListProps = CommentFilterListProps | NotificationFilterListProps;

export type MyInfoFilterStatus = CommentFilterStatus | NotificationFilterStatus;
