import { useState } from 'react';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useInfiniteCompanySubscribeList } from '../api/useGetInfiniteCompanySubscribeList';
import CompanyInfoCard from './companyInfoCard';
import TechCompanyScroll from './techCompanyScroll';
import TechCompanySlider from './techCompanySlider';

/**
 * 기술블로그 구독 회사 선택 컴포넌트
 */
const TechCompanySelector = () => {
  const { isMobile } = useMediaQueryContext();

  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number | null>(null);

  const { companySubscribeList, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteCompanySubscribeList();
  const companyCardListData = companySubscribeList?.pages[0].data.content;

  const handleCompanySelection = (index: number) => {
    const newSelectedIndex = selectedCompanyIndex === index ? null : index;
    setSelectedCompanyIndex(newSelectedIndex);
  };

  return (
    <QueryErrorBoundary type='section'>
      <section
        className='relative'
        onMouseEnter={() => !isMobile && setIsCompanySelectorHovered(true)}
        onMouseLeave={() => !isMobile && setIsCompanySelectorHovered(false)}
      >
        {isMobile ? (
          <TechCompanyScroll
            companyCardListData={companySubscribeList}
            handleCompanySelection={handleCompanySelection}
            selectedCompanyIndex={selectedCompanyIndex}
            status={status}
            onIntersect={onIntersect}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        ) : (
          <TechCompanySlider
            companyCardListData={companySubscribeList}
            isCompanySelectorHovered={isCompanySelectorHovered}
            handleCompanySelection={handleCompanySelection}
            selectedCompanyIndex={selectedCompanyIndex}
          />
        )}

        {selectedCompanyIndex !== null && (
          <div className='mt-[2.4rem]'>
            <CompanyInfoCard companyId={companyCardListData[selectedCompanyIndex].companyId} />
          </div>
        )}
      </section>
    </QueryErrorBoundary>
  );
};

export default TechCompanySelector;
