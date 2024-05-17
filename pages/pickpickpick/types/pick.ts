import { HTMLAttributes } from 'react';

export interface PickOptionsProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  title: string;
  percent?: number;
  isVoted?: boolean /** 해당 글에 대한 투표 유무 */;
  isPicked?: boolean /** 해당 옵션에 대한 선택 유무 */;
}

export interface PickDataProps {
  id: number;
  title: string;
  isVoted?: boolean;
  pickOptions: {
    id: string;
    title: string;
    picked?: boolean | null;
    percent?: number;
    isPicked?: boolean;
  }[];
  voteTotalCount: number;
  commentTotalCount: number;
}

export interface GetPickDataProps {
  pageParam: number;
  pickSort: 'LATEST' | 'POPULAR' | 'MOST_VIEWED' | 'MOST_COMMENTED';
}
