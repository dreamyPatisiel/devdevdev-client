import { Fragment, useRef, useState } from 'react';
import React from 'react';

import {
  NotificationFilterListProps,
  NotificationFilterStatus,
} from '@pages/myinfo/types/myInfoFilter';

import { useObserver } from '@hooks/useObserver';

import TextButton from '@components/common/buttons/textButton';
import { MyInfoAlertCardSkeletonList } from '@components/common/skeleton/alertSkeleton';

import { usePatchNotificationsReadAll } from '@/api/notifications/usePatchNotificationsReadAll';

import MyInfoFilterButtons from '../../components/MyInfoFilterButtons';
import MyInfo from '../../index.page';
import NotificationNav from '../components/NotificationNav';
import { useInfiniteNotificationsPage } from './apiHooks/useInfiniteNotifications';
import NotificationSubscribeCard, {
  NotificationSubscribeCardProps,
} from './components/NotificationSubscribeCard';

export default function Notification() {
  const [notificationFilterStatus, setNotificationFilterStatus] =
    useState<NotificationFilterStatus>('SUBSCRIBE');

  const bottom = useRef(null);

  const { notificationsPageData, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useInfiniteNotificationsPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  const { mutate: patchNotificationsReadAllMutate } = usePatchNotificationsReadAll();

  const notificationFilterList: NotificationFilterListProps[] = [
    // {
    //   filterStatus: 'ALL',
    //   filterName: '전체',
    //   filterTotal: 0,
    // },
    // {
    //   filterStatus: 'VOTE_COMMENT',
    //   filterName: '투표/댓글',
    //   filterTotal: 0,
    // },
    {
      filterStatus: 'SUBSCRIBE',
      filterName: '구독 업데이트',
      filterTotal: notificationsPageData?.pages[0]?.data?.totalElements,
    },
  ];

  const handleNotificationFilterClick = (filterStatus: NotificationFilterStatus) => {
    setNotificationFilterStatus(filterStatus);
  };

  if (status === 'pending') {
    return (
      <MyInfo>
        <NotificationNav />
        <section>
          <MyInfoAlertCardSkeletonList itemsInRows={4} />
        </section>
      </MyInfo>
    );
  }

  return (
    <MyInfo>
      <NotificationNav />

      <div className='flex justify-between items-center mb-[2.4rem]'>
        <MyInfoFilterButtons
          filterList={notificationFilterList}
          filterStatus={notificationFilterStatus}
          handleFilterClick={handleNotificationFilterClick}
        />

        <TextButton
          buttonContent='모두읽음'
          size='medium'
          color='secondary'
          line='true'
          fontWeight='Regular'
          onClick={() => patchNotificationsReadAllMutate()}
          disabled={notificationsPageData?.pages[0]?.data?.totalElements === 0}
        />
      </div>

      <section className='flex flex-col gap-[2.4rem] pb-[12rem]'>
        {notificationsPageData?.pages.map((page, index) => (
          <Fragment key={index}>
            {page?.data?.content.map((notificationPageItem: NotificationSubscribeCardProps) => (
              <NotificationSubscribeCard
                key={notificationPageItem.notificationId}
                {...notificationPageItem}
              />
            ))}
          </Fragment>
        ))}

        {isFetchingNextPage && hasNextPage && (
          <div className='mt-[2rem]'>
            <MyInfoAlertCardSkeletonList itemsInRows={4} />
          </div>
        )}

        <div ref={bottom} />
      </section>
    </MyInfo>
  );
}
