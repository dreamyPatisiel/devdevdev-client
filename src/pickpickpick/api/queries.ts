import { useQuery } from '@tanstack/react-query';
import { getPickData } from './pickpickpick';

export const useGetPickData = () => {
  const { data: pickDatas } = useQuery({
    queryKey: ['pickData'],
    queryFn: getPickData,
  });

  return pickDatas?.pickData;
};
