export interface Content {
  companyId: number;
  companyImageUrl: string;
  isSubscribed: boolean;
}

export interface GetCompanySubscribeProps {
  companyId?: string;
  size?: number;
}
