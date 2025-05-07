import { useEffect } from 'react';

import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

const useBodyScrollLock = () => {
  const { isMobile } = useMediaQueryContext();
  const { isVisibleFullPopup } = useFullPopupVisibleStore();

  useEffect(() => {
    if (isMobile && isVisibleFullPopup) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'auto'; // 원래 스타일 복원
      };
    } else {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'auto';
      }
    }
  }, [isMobile, isVisibleFullPopup]);
};

export default useBodyScrollLock;
