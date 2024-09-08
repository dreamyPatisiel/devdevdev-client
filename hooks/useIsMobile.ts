import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 1040px)' });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}
