// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const postCompanySubscribe = async ({
  companyId,
}: {
  companyId: number;
}) => {
  const res = await axios.post<SuccessResponse<number>>(
    `/devdevdev/api/v1/subscriptions/${companyId}`,
  );
  return res.data;
};

export const usePostCompanySubscribe = ({
  companyName,
}: {
  companyName: string;
}) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  return useMutation({
    mutationFn: postCompanySubscribe,
    onSuccess: async () => {
        // TODO: 구독 목록 조회 쿼리 무효화
        // await queryClient.invalidateQueries({ queryKey: ['companySubscribe'] });
        setToastVisible({ message: `${companyName}에서 새로운 글이 올라오면 알려드릴게요!` });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
