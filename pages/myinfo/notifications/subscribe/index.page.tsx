import React, { useRef } from 'react';

import MyInfo from '@pages/myinfo/index.page';
import { MySubscription } from '@pages/myinfo/types/responseData';

import { useObserver } from '@hooks/useObserver';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import NotificationNav from '../components/NotificationNav';
import { useGetMySubscriptions } from './apiHooks/useGetMySubscriptions';
import SubscribeCard from './components/SubscribeCard';
import SubscribeCardSkeleton from './components/SubscribeCardSkeleton';

export default function Subscribe() {
  const bottom = useRef(null);

  const { isMobile } = useMediaQueryContext();
  const { mySubscriptionsData, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useGetMySubscriptions();

  useObserver({
    target: bottom,
    onIntersect,
  });

  if (status === 'pending') {
    return (
      <MyInfo>
        <NotificationNav />
        <section
          className={`flex flex-wrap gap-x-[1.6rem] gap-y-[2.4rem] ${isMobile ? 'mb-[8rem]' : ''}`}
        >
          <SubscribeCardSkeleton />
        </section>
      </MyInfo>
    );
  }

  return (
    <MyInfo>
      <NotificationNav />
      <section
        className={`flex flex-wrap gap-x-[1.6rem] gap-y-[2.4rem] ${isMobile ? 'mb-[8rem]' : ''}`}
      >
        {mySubscriptionsData?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.data?.content.map((subscribeItem: MySubscription) => (
              <SubscribeCard
                key={subscribeItem.companyId}
                logoImage={subscribeItem.companyImageUrl}
                isSubscribe={subscribeItem.isSubscribed}
                companyId={subscribeItem.companyId}
                companyName={subscribeItem.companyName}
              />
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage && hasNextPage && (
          <div className='mt-[2rem]'>
            <SubscribeCardSkeleton />
          </div>
        )}

        <div ref={bottom} />
      </section>
    </MyInfo>
  );
}
