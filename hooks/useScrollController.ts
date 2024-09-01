import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [position, setPosition] = useState<'top' | 'middle' | 'bottom'>('top');
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // 최상단 감지
      const atTop = scrollPosition === 0;
      if (atTop) {
        return setPosition('top');
      }
      // 하단 감지
      const atBottom = scrollPosition + windowHeight >= documentHeight - 10;
      if (atBottom) {
        return setPosition('bottom');
      }
      // 중간 감지: 최상단도 하단도 아닌 경우
      return setPosition('middle');
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return { position };
};
export default useScrollPosition;
