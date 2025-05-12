import { useMemo, useState } from 'react';

import { useSelectedCompanyIndexStore } from '@stores/selectedCompanyIndexStore';
import { useCompanyInfoStore } from '@stores/techBlogStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import DevGuriHorizontalError from '@components/common/error/DevGuriHorizontalError';
import GetCompanyListError from '@components/common/error/GetCompanyListError';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useInfiniteCompanySubscribeList } from '../api/useGetInfiniteCompanySubscribeList';
import CompanyInfoCard from './CompanyInfoCard';
import TechCompanyScroll from './TechCompanyScroll';
import TechCompanySlider from './TechCompanySlider';

/**
 * 기술블로그 구독 회사 선택 컴포넌트
 */
const TechCompanySelector = () => {
  const { isMobile } = useMediaQueryContext();
  const { setCompanyId, setCompanyName } = useCompanyInfoStore();
  const { selectedCompanyIndex, setSelectedCompanyIndex } = useSelectedCompanyIndexStore();

  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);

  const { companySubscribeList, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteCompanySubscribeList();

  const flatCompanyList = useMemo(() => {
    return companySubscribeList?.pages.flatMap((group) => group.data.content) || [];
  }, [companySubscribeList]);

  const handleCompanySelection = (index: number) => {
    const newSelectedIndex = selectedCompanyIndex === index ? null : index;
    setSelectedCompanyIndex(newSelectedIndex);

    if (newSelectedIndex !== null) {
      setCompanyId(flatCompanyList[newSelectedIndex]?.companyId || null);
      setCompanyName(flatCompanyList[newSelectedIndex]?.companyName || null);
    }
  };

  return (
    <section
      className='relative'
      onMouseEnter={() => !isMobile && setIsCompanySelectorHovered(true)}
      onMouseLeave={() => !isMobile && setIsCompanySelectorHovered(false)}
    >
      {isMobile ? (
        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <GetCompanyListError handleRetryClick={handleRetryClick} />
          )}
        >
          <TechCompanyScroll
            companyCardListData={flatCompanyList}
            handleCompanySelection={handleCompanySelection}
            selectedCompanyIndex={selectedCompanyIndex}
            status={status}
            onIntersect={onIntersect}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </QueryErrorBoundary>
      ) : (
        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <GetCompanyListError handleRetryClick={handleRetryClick} />
          )}
        >
          <TechCompanySlider
            companyCardListData={flatCompanyList}
            isCompanySelectorHovered={isCompanySelectorHovered}
            handleCompanySelection={handleCompanySelection}
            selectedCompanyIndex={selectedCompanyIndex}
          />
        </QueryErrorBoundary>
      )}

      {selectedCompanyIndex !== null && (
        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <DevGuriHorizontalError handleRetryClick={handleRetryClick} />
          )}
        >
          <div className='mt-[2.4rem]'>
            <CompanyInfoCard companyId={flatCompanyList[selectedCompanyIndex]?.companyId} />
          </div>
        </QueryErrorBoundary>
      )}
    </section>
  );
};

export default TechCompanySelector;
