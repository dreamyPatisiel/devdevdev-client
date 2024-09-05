import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  let preScroll = 0;

  const handleScrollEvent = () => {
    if (window.scrollY < preScroll) {
      setScrollDirection('up');
    }

    if (window.scrollY > preScroll) {
      setScrollDirection('down');
    }

    preScroll = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
  }, []);

  return scrollDirection;
};
