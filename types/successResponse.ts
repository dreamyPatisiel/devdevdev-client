export type SuccessResponse<T> = {
  resultType: 'SUCCESS' | 'FAIL';
  data: T;
};

