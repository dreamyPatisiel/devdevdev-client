import { HTMLAttributes } from 'react';

export interface PickOptionsProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  title: string;
  percent?: number;
  isVoted?: boolean;
  isPicked?: boolean;
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
