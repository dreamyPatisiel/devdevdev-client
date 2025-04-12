import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { useModalStore } from '@stores/modalStore';
import { useSelectedPickCommentIdStore } from '@stores/pickCommentIdStore';
import { useSelectedCommentIdStore } from '@stores/techBlogStore';
import { useToastVisibleStore } from '@stores/toastVisibleStore';

import { ErrorRespone } from '@/types/errorResponse';
import { SuccessResponse } from '@/types/successResponse';

export interface TypeBlameParams {
  pickId?: number | null;
  pickCommentId?: number | null;
  techArticleId?: number | null;
  techArticleCommentId?: number | null;
  blameTypeId: number;
  customReason?: string | null;
}

export const postBlames = async ({
  blamePathType,
  params,
}: {
  blamePathType: 'PICK' | 'TECH_ARTICLE';
  params: TypeBlameParams;
}) => {
  const { blameTypeId, customReason, pickCommentId, pickId, techArticleCommentId, techArticleId } =
    params;

  const queryParams = {
    blameTypeId: blameTypeId,
    customReason: customReason === '' ? null : customReason,
    pickCommentId: pickCommentId || null,
    pickId: pickId || null,
    techArticleCommentId: techArticleCommentId || null,
    techArticleId: techArticleId || null,
  };
  const res = await axios.post<SuccessResponse<{ blameId: number }>>(
    `/devdevdev/api/v1/blames/${blamePathType}`,
    queryParams,
  );
  return res?.data;
};

export const usePostBlames = () => {
  const { setToastVisible } = useToastVisibleStore();
  const { setRefreshCommentPickId } = useSelectedPickCommentIdStore();
  const { setRefreshCommentTechblogId } = useSelectedCommentIdStore();
  const { popModal } = useModalStore();

  return useMutation({
    mutationFn: postBlames,
    onSuccess: async () => {
      await setToastVisible({
        message: '신고를 접수했어요! 확인 후 처리해드릴게요!',
        type: 'success',
      });
      await setRefreshCommentPickId();
      await setRefreshCommentTechblogId();
      popModal();
    },
    onError: async (error: ErrorRespone) => {
      const errorMessage = error.response.data.message;
      await setToastVisible({ message: errorMessage, type: 'error' });
      await setRefreshCommentPickId();
      await setRefreshCommentTechblogId();
      popModal();
    },
  });
};
