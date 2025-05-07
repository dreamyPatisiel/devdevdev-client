import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { NOTIFICATIONS_POPUPLIST } from '@/constants/apiConstants';

import { AlertListResponse } from '../pages/main/types/AlertType';

interface GetAlertListsProps {
  size: number;
}
const getAlertLists = async ({ size }: GetAlertListsProps) => {
  const res = await axios.get(`${NOTIFICATIONS_POPUPLIST}?size=${size}`);
  return res.data;
};

const useGetAlertLists = ({ size }: GetAlertListsProps) => {
  return useQuery({
    queryKey: ['getAlertLists', size],
    queryFn: () => getAlertLists({ size }),
    select: (data) => data.data as AlertListResponse,
  });
};

export default useGetAlertLists;
