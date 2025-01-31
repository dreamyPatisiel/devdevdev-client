import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import DevLoadingComponent from '@pages/loading/index.page';

interface MediaQueryProps {
  isMobile: boolean | null;
}

const MediaQueryContext = createContext<MediaQueryProps | undefined>(undefined);

export function MediaQueryProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const mobile = useMediaQuery({ query: '(max-width: 1040px)' });

  useEffect(() => {
    const initialWidth = window.innerWidth;
    setIsMobile(initialWidth < 1040);
  }, []);

  useEffect(() => {
    if (isMobile !== null) {
      setIsMobile(mobile);
    }
  }, [mobile]);

  if (isMobile === null) {
    return <DevLoadingComponent />;
  }

  return <MediaQueryContext.Provider value={{ isMobile }}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryContext() {
  const context = useContext(MediaQueryContext);

  if (context === undefined) {
    throw new Error('useMediaQueryContext는 MediaQueryProvider 내부에서 사용해야 합니다.');
  }

  return context;
}
