import { useEffect } from 'react';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

interface CheckAndScrollToCommentProps {
  commentId: string;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const useCheckAndScrollToComment = ({
  commentId,
  hasNextPage,
  fetchNextPage,
}: CheckAndScrollToCommentProps) => {
  const { setToastVisible } = useToastVisibleStore();
  const MAX_RETRIES = 10;

  useEffect(() => {
    const checkAndScrollToComment = async () => {
      if (!commentId) return;

      if (hasNextPage) {
        // 로딩처리
        setToastVisible({ message: `댓글을 로딩 중입니다...😊` });
      }

      try {
        let retryCount = 0;
        let commentElement = document.getElementById(`comment-${commentId}`);

        while (!commentElement && hasNextPage && retryCount < MAX_RETRIES) {
          retryCount++;
          await fetchNextPage();
          await new Promise((resolve) => setTimeout(resolve, 100));
          commentElement = document.getElementById(`comment-${commentId}`);
        }

        if (commentElement) {
          commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return setToastVisible({ message: `댓글을 찾았어요! 🥳` });
        }

        // 모두 패칭했는데도 없으면 찾을수 없다는 모달 띄우기
        if (!hasNextPage) {
          return setToastVisible({ message: `댓글을 찾을 수 없어요 🥲` });
        }
      } catch (error) {
        console.error(error);
        return setToastVisible({
          message: `댓글을 찾는 도중 에러가 발생했어요 😢`,
          type: 'error',
        });
      }
    };

    checkAndScrollToComment();
  }, [commentId, hasNextPage]);
};
