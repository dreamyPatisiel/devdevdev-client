import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType, SwiperSlide, SwiperRef, Swiper, SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import NextArrowButton from '@public/image/techblog/nextArrowButton.svg';
import PrevArrowButton from '@public/image/techblog/prevArrowButton.svg';

import { SLIDE_MOVE_COUNT } from '../constants/techBlogConstants';
import { Content } from '../types/techCompanySubscribeType';
import { TechCompanyImageCard } from './techCompanyImageCard';

// FIXME: 테스트용 데이터 (상세조회시 에러남) / 추후삭제
// companyCardListData 대신 넣어서 테스트 해보시면 됩니당! (의존되는곳 모두 바꿔야함)
const expandedCompanyCardListData = [
  {
    companyId: 1,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%90%E1%85%A9%E1%84%89%E1%85%B3.png',
    isSubscribed: true,
  },
  {
    companyId: 2,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%83%E1%85%B3%E1%86%AF.png',
    isSubscribed: false,
  },
  {
    companyId: 3,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%A1%E1%84%86%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 4,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 5,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5.png',
    isSubscribed: false,
  },
  {
    companyId: 6,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8A%E1%85%A9%E1%84%8F%E1%85%A1.png',
    isSubscribed: false,
  },
  {
    companyId: 7,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%86%E1%85%A1%E1%84%8F%E1%85%A6%E1%86%BA%E1%84%8F%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5.png',
    isSubscribed: false,
  },
  {
    companyId: 8,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8F%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%8B%E1%85%A9%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5.png',
    isSubscribed: true,
  },
  {
    companyId: 9,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%A1%E1%84%86%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 10,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%83%E1%85%B3%E1%86%AF.png',
    isSubscribed: false,
  },
  {
    companyId: 11,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%90%E1%85%A9%E1%84%89%E1%85%B3.png',
    isSubscribed: true,
  },
  {
    companyId: 12,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%83%E1%85%B3%E1%86%AF.png',
    isSubscribed: false,
  },
  {
    companyId: 13,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%A1%E1%84%86%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 14,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 15,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5.png',
    isSubscribed: false,
  },
  {
    companyId: 16,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8A%E1%85%A9%E1%84%8F%E1%85%A1.png',
    isSubscribed: false,
  },
  {
    companyId: 17,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%86%E1%85%A1%E1%84%8F%E1%85%A6%E1%86%BA%E1%84%8F%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5.png',
    isSubscribed: false,
  },
  {
    companyId: 18,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8F%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%8B%E1%85%A9%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5.png',
    isSubscribed: true,
  },
  {
    companyId: 19,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%A1%E1%84%86%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%AB.png',
    isSubscribed: false,
  },
  {
    companyId: 20,
    companyImageUrl:
      'https://prod-devdevdev-storage.s3.ap-northeast-2.amazonaws.com/metadata/%E1%84%8B%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%92%E1%85%A1%E1%86%AB%E1%84%92%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%83%E1%85%B3%E1%86%AF.png',
    isSubscribed: false,
  },
];

export default function TechCompanySlider({
  companyCardListData,
  isCompanySelectorHovered,
  selectedCompanyIndex,
  handleCompanySelection,
}: {
  companyCardListData: any;
  isCompanySelectorHovered: boolean;
  selectedCompanyIndex: number | null;
  handleCompanySelection: (index: number) => void;
}) {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  /** 슬라이더가 첫 번째 슬라이드인지 마지막 슬라이드인지 확인하는 함수 */
  const handleSlideChange = (swiper: SwiperClass) => {
    console.log('swiper', swiper.isBeginning, swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };

  // slider 함수
  const handleSliderMove = (direction: 'next' | 'previous') => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const activeIndex = swiper.realIndex;
      const newIndex =
        direction === 'next' ? activeIndex + SLIDE_MOVE_COUNT : activeIndex - SLIDE_MOVE_COUNT;
      swiperRef.current.swiper.slideTo(newIndex);
    }
  };

  /**
   * 카드 갯수가 각 해상도별 갯수보다 모자랄 때 Swiper의 width 값 고정되는 스타일링을 제거하기 위한 함수
   * 이 함수는 현재 화면의 너비에 따라 카드의 flex 속성을 조정하여,
   * 슬라이드가 적을 경우에도 적절한 크기로 표시되도록 합니다.
   *
   * @param cardCount - 현재 표시할 카드의 총 개수
   * @returns flexValue - 화면 크기에 따라 설정된 flex 값
   */
  const applyFlexStyles = (cardCount: number): string => {
    let flexValue: string = 'none';

    const breakpoints = [
      { width: 1700, maxCards: 11 },
      { width: 1440, maxCards: 9 },
      { width: 1240, maxCards: 7 },
      { width: 1040, maxCards: 5 },
    ];

    for (const { width, maxCards } of breakpoints) {
      if (window.innerWidth >= width) {
        console.log('cardCount maxCards', cardCount, maxCards);

        if (cardCount <= maxCards) {
          flexValue = '1';
          setIsFirstSlide(true); // 카드 개수가 해당 이하일 때 첫 번째 슬라이드로 설정
          setIsLastSlide(true); // 카드 개수가 해당 이하일 때 마지막 슬라이드로 설정
          console.log('카드 부족');
        } else {
          console.log('카드 충분');
          setIsLastSlide(false);
          flexValue = 'none';
        }
        break; // 조건을 만족하면 루프 종료
      }
    }

    return flexValue;
  };

  //   스타일링을 건들였더니 isBeginning , isEnd값을 제대로 계산하지 못함..
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(0);
      }

      const slides = document.querySelectorAll('.swiper-slide');
      const flexValue = applyFlexStyles(companyCardListData?.length); // flex 값 계산

      slides.forEach((slide) => {
        const slideElement = slide as HTMLElement;
        if (flexValue !== 'none') {
          slideElement.style.flex = flexValue; // flex 값이 'none'이 아닐 때만 적용
        } else {
          slideElement.style.flex = ''; // 'none'일 경우 flex 스타일 제거
        }
      });
    };

    handleResize(); // 초기 렌더링시 스타일링이 설정될 수 있도록
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [companyCardListData?.length]);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      spaceBetween={12}
      slidesPerView={5}
      onSlideChange={handleSlideChange}
      breakpoints={{
        1040: {
          slidesPerView: 5,
        },
        1240: {
          slidesPerView: 7,
        },
        1440: {
          slidesPerView: 9,
        },
        1700: {
          slidesPerView: 11,
        },
      }}
      pagination={{ clickable: true }}
    >
      {companyCardListData?.map((companyCard: Content, index: number) => (
        <SwiperSlide key={companyCard.companyId}>
          <TechCompanyImageCard
            imgSrc={companyCard.companyImageUrl}
            isSelected={selectedCompanyIndex === index}
            onClick={() => handleCompanySelection(index)}
          />
        </SwiperSlide>
      ))}
      {isCompanySelectorHovered && (
        <>
          {!isFirstSlide && (
            <Image
              className='custom-next-button absolute z-10 left-[0.8rem] top-1/2 transform -translate-y-1/2 cursor-pointer'
              src={PrevArrowButton}
              alt='이전 기업 목록 보기 버튼'
              onClick={() => handleSliderMove('previous')}
            />
          )}
          {!isLastSlide && (
            <Image
              className='absolute z-10 right-[0.8rem] top-1/2 transform -translate-y-1/2 cursor-pointer'
              src={NextArrowButton}
              alt='다음 기업 목록 보기 버튼'
              onClick={() => handleSliderMove('next')}
            />
          )}
        </>
      )}
    </Swiper>
  );
}
