import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
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

  return isMobile;
}
