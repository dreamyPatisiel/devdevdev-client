// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const postCompanySubscribe = async ({ companyId }: { companyId: number }) => {
  const res = await axios.post<SuccessResponse<number>>(`/devdevdev/api/v1/subscriptions`, {
    companyId: companyId,
  });
  return res.data;
};

export const usePostCompanySubscribe = ({
  companyName,
  companyId,
}: {
  companyName: string;
  companyId: number;
}) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postCompanySubscribe,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['companySubscriptionDetail', companyId] }),
        queryClient.invalidateQueries({ queryKey: ['mySubscriptions'] }),
      ]);
      setToastVisible({ message: `${companyName}에서 새로운 글이 올라오면 알려드릴게요!` });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
