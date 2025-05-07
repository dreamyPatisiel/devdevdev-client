import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATIONS_POPUPLIST } from '@/constants/apiConstants';

import { AlertListResponse } from '../../pages/main/types/AlertType';

interface GetAlertListsProps {
  size: number;
}
const getNotificationsLists = async ({ size }: GetAlertListsProps) => {
  const res = await axios.get(`${NOTIFICATIONS_POPUPLIST}?size=${size}`);
  return res.data;
};

const useGetNotificationsLists = ({ size }: GetAlertListsProps) => {
  return useQuery({
    queryKey: ['getAlertLists', size],
    queryFn: () => getNotificationsLists({ size }),
    select: (data) => data.data as AlertListResponse,
  });
};

export default useGetNotificationsLists;
