import React, { useRef } from 'react';

import { useCompanyInfoStore } from '@stores/techBlogStore';

import { useObserver } from '@hooks/useObserver';

import { TechCompanyCardSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import { COMPANY_SUBSCRIBE_VIEW_SIZE } from '../constants/techBlogConstants';
import { Content } from '../types/techCompanySubscribeType';
import { TechCompanyImageCard } from './TechCompanyImageCard';

export default function TechCompanyScroll({
  companyCardListData,
  handleCompanySelection,
  status,
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
}: {
  companyCardListData: Content[];
  handleCompanySelection: ({
    companyId,
    companyName,
  }: {
    companyId: number;
    companyName: string;
  }) => void;
  status: 'error' | 'success' | 'pending';
  onIntersect: ([entry]: IntersectionObserverEntry[]) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const rightDiv = useRef(null);
  const { companyId } = useCompanyInfoStore();

  useObserver({
    target: rightDiv,
    onIntersect,
  });

  const getStatusComponent = (
    companyCardListData: Content[],
    status: 'success' | 'error' | 'pending',
  ) => {
    switch (status) {
      case 'pending':
        return <TechCompanyCardSkeletonList itemsInRows={COMPANY_SUBSCRIBE_VIEW_SIZE} />;

      default:
        return (
          <>
            {companyCardListData?.map((companyCard: Content) => (
              <li key={companyCard.companyId}>
                <TechCompanyImageCard
                  imgSrc={companyCard.companyImageUrl}
                  isSelected={companyId === companyCard.companyId}
                  onClick={() =>
                    handleCompanySelection({
                      companyId: companyCard.companyId,
                      companyName: companyCard.companyName,
                    })
                  }
                />
              </li>
            ))}
            {isFetchingNextPage && hasNextPage && (
              <TechCompanyCardSkeletonList itemsInRows={COMPANY_SUBSCRIBE_VIEW_SIZE} />
            )}
          </>
        );
    }
  };

  return (
    <ul className={`flex flex-row gap-[1.2rem] overflow-x-scroll scrollbar-hide overflow-y-hidden`}>
      {getStatusComponent(companyCardListData, status)}
      <div ref={rightDiv} />
    </ul>
  );
}
