import React, { useRef } from 'react';

import MyInfo from '@pages/myinfo/index.page';
import { MySubscription } from '@pages/myinfo/types/responseData';

import { useObserver } from '@hooks/useObserver';

import logoImage from '@public/image/devdevdevLogo.svg';

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
          {Array.from({ length: 8 }, (_, index) => (
            <SubscribeCard
              key={index}
              logoImage={logoImage}
              company='로딩 중...'
              isSubscribe={false}
            />
          ))}
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
              />
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage && hasNextPage && (
          <div className='mt-[2rem]'>
            {isMobile ? (
              <SubscribeCard logoImage={logoImage} company='로딩 중...' isSubscribe={false} />
            ) : (
              <SubscribeCard logoImage={logoImage} company='로딩 중...' isSubscribe={false} />
            )}
            {/* TODO: 스켈레톤으로 수정 */}
          </div>
        )}

        <div ref={bottom} />
      </section>
    </MyInfo>
  );
}
