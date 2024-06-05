import axios from 'axios';

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { ExitSurvey } from '../types/exitSurvey';

const getExitSurvey = async () => {
  const res = await axios.get('/devdevdev/api/v1/mypage/exit-survey');

  return res;
};

export const useGetExitSurvey = (): UseQueryResult<ExitSurvey> => {
  return useQuery({
    queryKey: ['getExitSurvey'],
    queryFn: getExitSurvey,
    select: (data) => data.data.data,
  });
};
