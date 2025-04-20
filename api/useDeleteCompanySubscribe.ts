// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const deleteCompanySubscribe = async ({
  companyId, // 기술블로그 댓글 아이디
}: {
  companyId: number;
}) => {
  const res = await axios.delete<SuccessResponse<number>>(`/devdevdev/api/v1/subscriptions`, {
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
      // 구독 목록 조회 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['companySubscriptionDetail', companyId] });
      setToastVisible({ message: '구독을 해제했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
