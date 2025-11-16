export interface PageResponse<T> {
  data: {
    content: T;
    first: boolean;
    last: boolean;
    size: string;
    totalElements?: number; // v2 추가 필드
  };
  resultType: string;
}
