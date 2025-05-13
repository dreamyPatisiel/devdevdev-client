export interface Content {
  companyId: number;
  companyName: string;
  companyImageUrl: string;
  isSubscribed: boolean;
}

export interface GetCompanySubscribeProps {
  companyId?: string;
  size?: number;
}
