import { useEffect, useRef, useState } from 'react';

import useScrollPosition from './useScrollController';
import { useScrollDirection } from './useScrollDirection';

export default function useShowByScroll() {
  const [showBottom, setShowBottom] = useState(true);
  const scrollDirection = useScrollDirection();
  const { position } = useScrollPosition();

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (func: Function, sec: number) => {
    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => func(), sec);
  };

  useEffect(() => {
    if (position === 'top') {
      return setShowBottom(true);
    }

    if (scrollDirection === 'up') debounce(() => setShowBottom(true), 500);
    if (scrollDirection === 'down') setShowBottom(false);
  }, [scrollDirection]);

  return { showBottom };
}
