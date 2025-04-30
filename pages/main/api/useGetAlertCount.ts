import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { ALERT_COUNT } from '@/constants/apiConstants';

const getAlertCount = async () => {
  const res = await axios.get(`${ALERT_COUNT}`);
  return res.data;
};

const useGetAlertCount = () => {
  return useQuery({
    queryKey: ['getAlertCount'],
    queryFn: getAlertCount,
    select: (data) => data.data as number,
  });
};

export default useGetAlertCount;
