import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { SuccessResponse } from '@/types/successResponse';

import { TechCardProps } from '../types/techBlogType';

export const getDetailTechBlog = async (id: string) => {
  const res = await axios.get<SuccessResponse<TechCardProps>>(`/devdevdev/api/v1/articles/${id}`);
  return res?.data;
};

export const useGetDetailTechBlog = (techArticleId: string) => {
  return useQuery({
    queryKey: ['techDetail', techArticleId],
    queryFn: () => {
      return getDetailTechBlog(techArticleId);
    },
    select: (data) => data.data,
    staleTime: 0,
    gcTime: 0,
  });
};
