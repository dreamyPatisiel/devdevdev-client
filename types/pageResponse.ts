export interface PageResponse<T> {
  data: {
    content: T;
    first: boolean;
    last: boolean;
    size: string;
  };
  resultType: string;
}
