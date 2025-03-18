// 기술블로그 메인댓글 작성
import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export const deleteCompanySubscribe = async ({
  companyId, // 기술블로그 댓글 아이디
}: {
  companyId: number;
}) => {
  const res = await axios.delete<SuccessResponse<number>>(
    `/devdevdev/api/v1/subscriptions/${companyId}`,
  );
  return res.data;  
};

export const useDeleteCompanySubscribe = () => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: deleteCompanySubscribe,
    onSuccess: async () => {
      // 구독 목록 조회 쿼리 무효화
    //   await queryClient.invalidateQueries({ queryKey: [''] });
      setToastVisible({ message: '구독을 해제했어요!' });
    },
    onError: (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      return setToastVisible({ message: errorMessage, type: 'error' });
    },
  });
};
