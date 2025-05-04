import { Fragment, useRef, useState } from 'react';
import React from 'react';

import {
  NotificationFilterListProps,
  NotificationFilterStatus,
} from '@pages/myinfo/types/myInfoFilter';

import { useObserver } from '@hooks/useObserver';

import MyInfoFilterButtons from '../../components/MyInfoFilterButtons';
import MyInfo from '../../index.page';
import NotificationNav from '../components/NotificationNav';
import { useGetNotificationsPage } from './apiHooks/useGetNotifications';
import NotificationSubscribeCard, {
  NotificationSubscribeCardProps,
} from './components/NotificationSubscribeCard';

export default function Notification() {
  const [notificationFilterStatus, setNotificationFilterStatus] =
    useState<NotificationFilterStatus>('SUBSCRIBE');

  const bottom = useRef(null);

  const { notificationsPageData, isFetchingNextPage, hasNextPage, status, onIntersect } =
    useGetNotificationsPage();
  console.log('notificationsPageData', notificationsPageData);

  useObserver({
    target: bottom,
    onIntersect,
  });

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
        <section className={``}>로딩중...</section>
      </MyInfo>
    );
  }

  return (
    <MyInfo>
      <NotificationNav />
      <MyInfoFilterButtons
        filterList={notificationFilterList}
        filterStatus={notificationFilterStatus}
        handleFilterClick={handleNotificationFilterClick}
      />
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

        {isFetchingNextPage && hasNextPage && <div className='mt-[2rem]'>로딩중...</div>}

        <div ref={bottom} />
      </section>
    </MyInfo>
  );
}
