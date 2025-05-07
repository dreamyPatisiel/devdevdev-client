import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { SuccessResponse } from '@/types/successResponse';

interface CompanySubscriptionProps {
  companyId: number;
  companyName: string;
  industry: string;
  companyDescription: string;
  companyOfficialImageUrl: string;
  companyCareerUrl: string;
  techArticleTotalCount: number;
  isSubscribed: boolean;
}

export const getDetailCompanySubscribeData = async (companyId: number) => {
  const res = await axios.get<SuccessResponse<CompanySubscriptionProps>>(
    `/devdevdev/api/v1/subscriptions/companies/${companyId}`,
  );
  return res?.data;
};

export const useGetDetailCompanySubscribeData = (companyId: number) => {
  return useQuery({
    queryKey: ['companySubscriptionDetail', companyId],
    queryFn: () => {
      return getDetailCompanySubscribeData(companyId);
    },
    select: (data) => data.data as CompanySubscriptionProps,
  });
};
