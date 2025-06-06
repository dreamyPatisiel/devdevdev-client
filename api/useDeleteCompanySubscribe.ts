// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { SUBSCRIPTIONS } from '@/constants/apiConstants';
import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const deleteCompanySubscribe = async ({
  companyId, // 기술블로그 댓글 아이디
}: {
  companyId: number;
}) => {
  const res = await axios.delete<SuccessResponse<number>>(`${SUBSCRIPTIONS}`, {
    data: {
      companyId: companyId,
    },
  });
  return res.data;
};

export const useDeleteCompanySubscribe = ({ companyId }: { companyId: number }) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: deleteCompanySubscribe,
    onSuccess: async () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['companySubscriptionDetail', companyId] }),
        queryClient.invalidateQueries({ queryKey: ['mySubscriptions'] }),
      ]);
      setToastVisible({ message: '구독을 해제했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
