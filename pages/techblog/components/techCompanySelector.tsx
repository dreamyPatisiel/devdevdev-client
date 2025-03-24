import { useEffect, useState } from 'react';

import Image from 'next/image';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';

import NextArrowButton from '@public/image/techblog/nextArrowButton.svg';
import PrevArrowButton from '@public/image/techblog/prevArrowButton.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import { useInfiniteCompanySubscribeList } from '../api/useGetInfiniteCompanySubscribeList';
import { Content } from '../types/techCompanySubscribeType';
import CompanyInfoCard from './companyInfoCard';
import { TechCompanyImageCard } from './techCompanyImageCard';

/**
 * 기술블로그 구독 회사 선택 컴포넌트
 */
const TechCompanySelector = () => {
  const { isMobile } = useMediaQueryContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(5);

  // TODO: 수정필요! 해상도별 몇개까지 카드를 보여둘것인지 ...
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 1040) {
        setCardsPerView(5);
      } else if (window.innerWidth < 1440) {
        setCardsPerView(9);
      } else {
        setCardsPerView(12);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const handleNext = () => {
    const totalCards = companyCardListData?.length;
    const maxStartIndex = totalCards - cardsPerView;
    if (currentStartIndex < maxStartIndex) {
      setCurrentStartIndex(currentStartIndex + cardsPerView);
    } else {
      setCurrentStartIndex(maxStartIndex);
    }
  };

  const handlePrevious = () => {
    if (currentStartIndex - cardsPerView >= 0) {
      setCurrentStartIndex(currentStartIndex - cardsPerView);
    } else {
      setCurrentStartIndex(0);
    }
  };

  // 선택 상태 변경 핸들러
  const handleSelection = (index: number) => {
    // TODO: 토스트 띄우기
    // TODO: 해당 기업 데이터 필터링
    // TODO: 해당 기업 상세 데이터 조회
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);
    // onCompanySelect(newSelectedIndex);
  };

  const { companySubscribeList, isFetchingNextPage, hasNextPage, status, onNextButtonClick } =
    useInfiniteCompanySubscribeList(10);

  const companyCardListData = companySubscribeList?.pages[0].data.content;

  const isLastIndex = currentStartIndex + cardsPerView === companyCardListData?.length;

  return (
    <QueryErrorBoundary type='section'>
      <section
        onMouseEnter={() => setIsCompanySelectorHovered(true)}
        onMouseLeave={() => setIsCompanySelectorHovered(false)}
      >
        <ul
          className={`relative flex flex-row gap-[1.2rem] overflow-x-auto ${isMobile ? 'scrollbar-hide scrollbar-x' : ''}`}
        >
          {companyCardListData
            ?.slice(currentStartIndex, currentStartIndex + cardsPerView)
            .map((companyCard: Content, index: number) => (
              <TechCompanyImageCard
                key={companyCard.companyId}
                imgSrc={companyCard.companyImageUrl}
                isSelected={selectedIndex === index}
                onClick={() => handleSelection(index)}
              />
            ))}

          {!isMobile && isCompanySelectorHovered && (
            <>
              {currentStartIndex !== 0 && (
                <Image
                  className='absolute left-[0.8rem] top-1/2 transform -translate-y-1/2 cursor-pointer'
                  src={PrevArrowButton}
                  alt='이전 기업 목록 보기 버튼'
                  onClick={handlePrevious}
                />
              )}
              {!isLastIndex && (
                <Image
                  className='absolute right-[0.8rem] top-1/2 transform -translate-y-1/2 cursor-pointer'
                  src={NextArrowButton}
                  alt='다음 기업 목록 보기 버튼'
                  onClick={handleNext}
                />
              )}
            </>
          )}
        </ul>

        {selectedIndex !== null && (
          <div className='mt-[2.4rem]'>
            <CompanyInfoCard
              companyId={companyCardListData[selectedIndex].companyId} />
          </div>
        )}
      </section>
    </QueryErrorBoundary>
  );
};

export default TechCompanySelector;
