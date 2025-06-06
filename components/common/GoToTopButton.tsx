import { useState, useEffect } from 'react';

import Image from 'next/image';

import GoToTop from '@public/image/goToTopIcon.svg';

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='fixed right-0 bottom-[5rem] z-30'>
      {isVisible && (
        <Image
          src={GoToTop}
          alt='페이지 상단 이동 버튼'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='cursor-pointer'
        />
      )}
    </div>
  );
}
