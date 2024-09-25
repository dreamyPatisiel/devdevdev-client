import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const mobile = useMediaQuery({ query: '(max-width: 1040px)' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(mobile);
      setIsLoading(false);
    }
  }, [mobile]);
  return { isMobile, isLoading };
}
