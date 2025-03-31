import React, { useRef } from 'react';

import { InfiniteData } from '@tanstack/react-query';

import { useObserver } from '@hooks/useObserver';

import { TechCompanyCardSkeletonList } from '@components/common/skeleton/techBlogSkeleton';

import { COMPANY_SUBSCRIBE_VIEW_SIZE } from '../constants/techBlogConstants';
import { Content } from '../types/techCompanySubscribeType';
import { TechCompanyImageCard } from './techCompanyImageCard';

export default function TechCompanyScroll({
  companyCardListData,
  selectedCompanyIndex,
  handleCompanySelection,
  status,
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
}: {
  companyCardListData: any; // TODO: any타입 다 고치기
  selectedCompanyIndex: number | null;
  handleCompanySelection: (index: number) => void;
  status: 'error' | 'success' | 'pending';
  onIntersect: ([entry]: IntersectionObserverEntry[]) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const rightDiv = useRef(null);

  useObserver({
    target: rightDiv,
    onIntersect,
  });

  const getStatusComponent = (
    companyCardListData: any,
    status: 'success' | 'error' | 'pending',
  ) => {
    switch (status) {
      case 'pending':
        return <TechCompanyCardSkeletonList itemsInRows={COMPANY_SUBSCRIBE_VIEW_SIZE} />;

      default:
        return (
          <>
            {companyCardListData?.pages?.map((group, index: number) => (
              <React.Fragment key={index}>
                {/* TODO: 타입상세 */}
                {group.data.content.map((companyCard: any) => (
                  <li key={companyCard.companyId}>
                    <TechCompanyImageCard
                      imgSrc={companyCard.companyImageUrl}
                      isSelected={selectedCompanyIndex === index}
                      onClick={() => handleCompanySelection(index)}
                    />
                  </li>
                ))}
              </React.Fragment>
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
