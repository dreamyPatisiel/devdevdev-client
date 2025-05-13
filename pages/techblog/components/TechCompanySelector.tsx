import { useMemo, useState } from 'react';

import { useCompanyInfoStore, useSearchKeywordStore } from '@stores/techBlogStore';

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
  const { companyId, setCompanyInfo, resetCompanyInfo } = useCompanyInfoStore();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();

  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);

  const { companySubscribeList, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteCompanySubscribeList();

  const flatCompanyList = useMemo(() => {
    return companySubscribeList?.pages.flatMap((group) => group.data.content) || [];
  }, [companySubscribeList]);

  const handleCompanySelection = ({
    companyId: selectedId,
    companyName: selectedName,
  }: {
    companyId: number;
    companyName: string;
  }) => {
    const isDeselecting = companyId === selectedId;

    if (isDeselecting) {
      resetCompanyInfo();
    } else {
      setCompanyInfo({ id: selectedId, name: selectedName });
    }

    if (searchKeyword) {
      setSearchKeyword('');
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
          />
        </QueryErrorBoundary>
      )}

      {companyId !== null && (
        <QueryErrorBoundary
          fallbackRender={({ handleRetryClick }) => (
            <DevGuriHorizontalError handleRetryClick={handleRetryClick} />
          )}
        >
          <div className='mt-[2.4rem]'>
            <CompanyInfoCard companyId={companyId} />
          </div>
        </QueryErrorBoundary>
      )}
    </section>
  );
};

export default TechCompanySelector;
