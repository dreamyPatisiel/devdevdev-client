import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

import { TechTotalData } from '@pages/techblog/types/techBlogType';

import { SuccessResponse } from './successResponse';

export type ExtendedUseInfiniteQueryResult<TData, TError = unknown> = UseInfiniteQueryResult<
  TData,
  TError
> & {
  techBlogData?: TData;
  onIntersect: ([entry]: IntersectionObserverEntry[]) => void;
};

// 기술블로그 (메인, 북마크) 데이터 타입
export type TechInfiniteDataType = ExtendedUseInfiniteQueryResult<
  InfiniteData<SuccessResponse<TechTotalData>, unknown>
>;
