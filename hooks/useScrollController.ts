import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtMiddle, setIsAtMiddle] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 최상단 감지
      const atTop = scrollPosition === 0;
      setIsAtTop(atTop);

      // 하단 감지
      const atBottom = scrollPosition + windowHeight >= documentHeight - 10;
      setIsAtBottom(atBottom);

      // 중간 감지: 최상단도 하단도 아닌 경우
      setIsAtMiddle(!atTop && !atBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isAtTop, isAtMiddle, isAtBottom };
};

export default useScrollPosition;
