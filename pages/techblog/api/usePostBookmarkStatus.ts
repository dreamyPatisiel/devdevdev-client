import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

import { TechBookmarkStatus } from '../types/techBlogType';

export const postBookmarkStatus = async ({
  techArticleId,
  status,
}: {
  techArticleId: number;
  status: boolean;
}) => {
  const res = await axios.post<SuccessResponse<TechBookmarkStatus>>(
    `/devdevdev/api/v1/articles/${techArticleId}/bookmark?status=${status}`,
  );
  return res.data;
};

export const usePostBookmarkStatus = () => {
  return useMutation({
    mutationFn: postBookmarkStatus,
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    },
  });
};
