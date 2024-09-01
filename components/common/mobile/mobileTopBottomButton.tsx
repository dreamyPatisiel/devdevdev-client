import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import useScrollPosition from '@hooks/useScrollController';

import BottomArrow from '@public/image/mobile/bottomArrow.svg';
import TopArrow from '@public/image/mobile/topArrow.svg';

export default function MobileTopBottomButton() {
  const { position } = useScrollPosition();
  const [curTopStyle, setTopStyle] = useState('');
  const [curBottomStyle, setBottomStyle] = useState('');

  const baseStyle = 'z-50 cursor-pointer fixed';
  const singleArrowStyle = 'right-[1.6rem] bottom-[3.7rem] transition-transform duration-300';
  const compositeTopStyle = 'right-[1.6rem] bottom-[3.7rem]';
  const compositebottomStyle = 'right-[1.6rem] bottom-[9.5rem]';

  useEffect(() => {
    if (position === 'top') {
      setBottomStyle(`${baseStyle} ${singleArrowStyle}`);
      setTopStyle('hidden');
    }

    if (position === 'middle') {
      setBottomStyle(`${baseStyle} ${compositeTopStyle}`);
      setTopStyle(`${baseStyle} ${compositebottomStyle}`);
    }

    if (position === 'bottom') {
      setTopStyle(`${baseStyle} ${singleArrowStyle}`);
      setBottomStyle('hidden');
    }
  }, [position]);

  const handleTopScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleBottomScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    // 뷰포트의 높이
    const windowHeight = window.innerHeight;
    // 스크롤 가능한 최대 영역의 하단 위치
    const bottomPosition = documentHeight - windowHeight;
    window.scrollTo({ top: bottomPosition, behavior: 'smooth' });
  };

  return (
    <>
      <Image
        src={TopArrow}
        alt={'위로가기화살표버튼'}
        className={curTopStyle}
        onClick={handleTopScroll}
      />
      <Image
        src={BottomArrow}
        alt={'아래로가기화살표버튼'}
        className={curBottomStyle}
        onClick={handleBottomScroll}
      />
    </>
  );
}
