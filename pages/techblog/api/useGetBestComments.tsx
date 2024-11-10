import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

interface GetBestCommentsProps {
  techArticleId: string;
  size: number;
}
interface UseGetBestCommentsProps {
  techArticleId: string;
  size: number;
  parentCommentTotal: number;
}

const getBestComments = async ({ techArticleId, size }: GetBestCommentsProps) => {
  const res = await axios.get(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/best?size=${size}`,
  );
  return res.data;
};

export const useGetBestComments = ({
  techArticleId,
  size,
  parentCommentTotal,
}: UseGetBestCommentsProps) => {
  return useQuery({
    queryKey: ['getBestTechComments', techArticleId],
    queryFn: () => getBestComments({ techArticleId, size }),
    enabled: !!techArticleId && parentCommentTotal > 3,
  });
};
