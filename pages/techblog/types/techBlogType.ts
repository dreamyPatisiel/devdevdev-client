export interface GetTechBlogProps {
  elasticId: string;
  pickSort: 'LATEST' | 'POPULAR' | 'MOST_VIEWED' | 'MOST_COMMENTED';
}

// 하나의 카드에 필요한 정보
export interface TechCardProps {
  id: number;
  elasticId: string;
  thumbnailUrl: string;
  title: string;
  company: string;
  regDate: string;
  author: string;
  description: string; // 글 내용
  viewTotalCount: number; // 조회수
  recommendTotalCount: number; // 추천수
  commentTotalCount: number; // 댓글수
  popularScore: number; // 인기 점수,
  isBookmarked: boolean; // 북마크여부
}

// 기술블로그 전체값
export interface TechTotalData {
  content: TechCardProps[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
