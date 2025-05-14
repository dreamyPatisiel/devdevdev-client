import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATIONS_COUNT } from '@/constants/apiConstants';

const getAlertCount = async () => {
  const res = await axios.get(`${NOTIFICATIONS_COUNT}`);
  return res.data;
};

const useGetNotificationsCount = () => {
  return useQuery({
    queryKey: ['getAlertCount'],
    queryFn: getAlertCount,
    select: (data) => data.data as number,
  });
};

export default useGetNotificationsCount;
