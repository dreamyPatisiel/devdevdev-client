import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import SubscribeCard from './SubscribeCard';

export default function SubscribeCardSkeleton() {
  const { isMobile } = useMediaQueryContext();

  return (
    <>
      {isMobile
        ? Array.from({ length: 4 }, (_, index) => (
            <SubscribeCard
              key={index}
              logoImage=''
              companyName=''
              isSubscribe={false}
              companyId={0}
            />
          ))
        : Array.from({ length: 8 }, (_, index) => (
            <SubscribeCard
              key={index}
              logoImage=''
              companyName=''
              isSubscribe={false}
              companyId={0}
            />
          ))}
    </>
  );
}
