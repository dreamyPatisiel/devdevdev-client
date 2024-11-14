import axios from 'axios';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

interface GetBestCommentsProps {
  pickId: string;
  size: number;
}

interface UseGetBestCommentsProps {
  pickId: string;
  size: number;
  parentCommentTotal: number;
}

const getBestComments = async ({ pickId, size }: GetBestCommentsProps) => {
  const res = await axios.get(`${GET_PICK_DATA}/${pickId}/comments/best?size=${size}`);

  return res;
};

export const useGetBestComments = ({
  pickId,
  size,
  parentCommentTotal,
}: UseGetBestCommentsProps): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['getBestComments', pickId],
    queryFn: () => getBestComments({ pickId, size }),
    enabled: !!pickId && parentCommentTotal > 3,
  });
};
