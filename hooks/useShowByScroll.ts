import { useEffect, useState } from 'react';

import useScrollPosition from './useScrollController';
import { useScrollDirection } from './useScrollDirection';

export default function useShowByScroll() {
  const [showBottom, setShowBottom] = useState(true);
  const scrollDirection = useScrollDirection();
  const { position } = useScrollPosition();

  useEffect(() => {
    if (position === 'top') {
      return setShowBottom(true);
    }

    if (position === 'bottom') {
      return setShowBottom(false);
    }

    if (scrollDirection === 'up') setShowBottom(true);
    if (scrollDirection === 'down') setShowBottom(false);
  }, [scrollDirection, position]);

  return { showBottom };
}
