import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

interface GetBestCommentsProps {
  techArticleId: string;
  size: number;
}

const getBestComments = async ({ techArticleId, size }: GetBestCommentsProps) => {
  const res = await axios.get(
    `/devdevdev/api/v1/articles/${techArticleId}/comments/best?size=${size}`,
  );
  return res.data;
};

export const useGetBestComments = ({ techArticleId, size }: GetBestCommentsProps) => {
  return useQuery({
    queryKey: ['getTechBestComments', techArticleId],
    queryFn: () => getBestComments({ techArticleId, size }),
    enabled: !!techArticleId,
  });
};
