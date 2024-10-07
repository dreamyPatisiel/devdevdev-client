import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  const [isClientLoading, setIsClientLoading] = useState(true);

  const mobile = useMediaQuery({ query: '(max-width: 1040px)' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(mobile);
      setIsClientLoading(false);
    }
  }, [mobile]);
  return { isMobile, isClientLoading };
}
