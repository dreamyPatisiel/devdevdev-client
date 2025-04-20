import { useMemo, useState } from 'react';

import { useCompanyIdStore } from '@stores/techBlogStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

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
  const { setCompanyId } = useCompanyIdStore();

  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number | null>(null);

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
    }
  };

  return (
    <section
      className='relative'
      onMouseEnter={() => !isMobile && setIsCompanySelectorHovered(true)}
      onMouseLeave={() => !isMobile && setIsCompanySelectorHovered(false)}
    >
      {isMobile ? (
        <TechCompanyScroll
          companyCardListData={flatCompanyList}
          handleCompanySelection={handleCompanySelection}
          selectedCompanyIndex={selectedCompanyIndex}
          status={status}
          onIntersect={onIntersect}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      ) : (
        <TechCompanySlider
          companyCardListData={flatCompanyList}
          isCompanySelectorHovered={isCompanySelectorHovered}
          handleCompanySelection={handleCompanySelection}
          selectedCompanyIndex={selectedCompanyIndex}
        />
      )}

      {selectedCompanyIndex !== null && (
        <QueryErrorBoundary type='horizontal'>
          <div className='mt-[2.4rem]'>
            <CompanyInfoCard companyId={flatCompanyList[selectedCompanyIndex].companyId} />
          </div>
        </QueryErrorBoundary>
      )}
    </section>
  );
};

export default TechCompanySelector;
