// 등록순 / 최신순 / 좋아요순 / 답글많은순
export type TechBlogCommentsDropdownProps = 'OLDEST' | 'LATEST' | 'LIKED' | 'MOST_COMMENTED';

export interface GetTechCommentsProps {
  articleId: string;
  techCommentId: string;
  techCommentSort: TechBlogCommentsDropdownProps;
  size?: number;
}

//  대댓글 정보
export interface RepliesProps {
  author: string;
  contents: string;
  createdAt: string;
  isDeleted: boolean;
  likeTotalCount: number;
  maskedEmail: string;
  memberId: number;
  techCommentId: number;
  techCommentOriginParentId: number;
  techCommentParentId: number;
  // 추후 서버에서 추가
  isCommentAuthor: boolean;
  isModified?: boolean;
}

// 하나의 댓글에 필요한 정보
export interface TechCommentProps {
  author: string;
  contents: string;
  createdAt: string;
  isCommentAuthor: boolean;
  isDeleted: boolean;
  isModified: boolean;
  likeTotalCount: number;
  maskedEmail: string;
  memberId: number;
  replies: RepliesProps[];
  replyTotalCount: number;
  techCommentId: number;
}

// 댓글 전체 조회값
export interface TechCommentsData {
  content: TechCommentProps[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
}

// 북마크 성공시 res값
export interface TypeTechRecommendsStatus {
  recommendStatus: boolean; // 기술블로그 댓글/답글 추천 상태
  recommendTotalCount: number; // 기술블로그 댓글/답글 추천 총 갯수
}
