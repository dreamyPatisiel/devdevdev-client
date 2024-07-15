import { useState, useEffect, MutableRefObject } from 'react';

import Image from 'next/image';

import GoToTop from '@public/image/goToTopIcon.svg';

export default function GoToTopButton({
  scrollContainerRef,
}: {
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;

      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;

    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef]);

  return (
    <div className='fixed right-0 bottom-[5rem] z-50'>
      {isVisible && (
        <Image
          src={GoToTop}
          alt='페이지 상단 이동 버튼'
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
