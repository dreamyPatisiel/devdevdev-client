import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType, SwiperSlide, SwiperRef, Swiper, SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import React, { useRef, useState } from 'react';

import Image from 'next/image';

import NextArrowButton from '@public/image/techblog/nextArrowButton.svg';
import PrevArrowButton from '@public/image/techblog/prevArrowButton.svg';

import { SLIDE_MOVE_COUNT } from '../constants/techBlogConstants';
import { Content } from '../types/techCompanySubscribeType';
import { TechCompanyImageCard } from './techCompanyImageCard';

// FIXME: 테스트용 데이터 (상세조회시 에러남) / 추후삭제
// companyCardListData대신 넣어서 테스트 해보시면 됩니당!
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
      onSwiper={(swiper) => console.log(swiper)}
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
