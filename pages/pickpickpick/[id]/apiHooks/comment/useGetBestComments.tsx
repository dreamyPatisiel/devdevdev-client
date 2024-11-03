import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { GET_PICK_DATA } from '@pages/pickpickpick/constants/pickApi';

interface GetBestCommentsProps {
  pickId: string;
  size: number;
}

const getBestComments = async ({ pickId, size }: GetBestCommentsProps) => {
  const res = await axios.get(`${GET_PICK_DATA}/${pickId}/comments/best?size=${size}`);

  return res.data;
};

export const useGetBestComments = ({ pickId, size }: GetBestCommentsProps) => {
  return useQuery({
    queryKey: ['getBestComments', pickId],
    queryFn: () => getBestComments({ pickId, size }),
    enabled: !!pickId,
  });
};
