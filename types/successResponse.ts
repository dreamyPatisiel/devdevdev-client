export type SuccessResponse<T> = {
  resultType: string;
  data: T;
};

export type RefreshTokenResponse<T> = {
  resultType: 'SUCCESS' | 'FAIL';
  data: T;
};