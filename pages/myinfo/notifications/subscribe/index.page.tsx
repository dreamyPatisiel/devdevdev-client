import React, { useRef } from 'react';

import MyInfo from '@pages/myinfo/index.page';
import { MySubscription } from '@pages/myinfo/types/responseData';

import { useObserver } from '@hooks/useObserver';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import NotificationNav from '../components/NotificationNav';
import { useGetMySubscriptions } from './apiHooks/useGetMySubscriptions';
import SubscribeCard from './components/SubscribeCard';

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
          {isMobile ? <>로딩중...</> : <>로딩중...</>}
          {/* TODO: 스켈레톤으로 수정 */}
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
                company={subscribeItem.companyName}
                isSubscribe={subscribeItem.isSubscribed}
                id={subscribeItem.companyId}
              />
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage && hasNextPage && (
          <div className='mt-[2rem]'>
            {isMobile ? <>로딩중...</> : <>로딩중...</>}
            {/* TODO: 스켈레톤으로 수정 */}
          </div>
        )}

        <div ref={bottom} />
      </section>
    </MyInfo>
  );
}
