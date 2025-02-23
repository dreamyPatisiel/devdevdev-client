import { useState } from 'react';

import {
  NotificationFilterListProps,
  NotificationFilterStatus,
} from '@pages/myinfo/types/myInfoFilter';

import MyInfoFilterButtons from '../../components/MyInfoFilterButtons';
import MyInfo from '../../index.page';
import NotificationNav from '../components/NotificationNav';
import NotificationSubscribeCard from './components/NotificationSubscribeCard';

export default function Notification() {
  const [notificationFilterStatus, setNotificationFilterStatus] =
    useState<NotificationFilterStatus>('SUBSCRIBE');

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
      filterTotal: 2,
    },
  ];

  const handleNotificationFilterClick = (filterStatus: NotificationFilterStatus) => {
    setNotificationFilterStatus(filterStatus);
  };

  return (
    <MyInfo>
      <NotificationNav />
      <MyInfoFilterButtons
        filterList={notificationFilterList}
        filterStatus={notificationFilterStatus}
        handleFilterClick={handleNotificationFilterClick}
      />
      <section className='flex flex-col gap-[2.4rem] pb-[12rem]'>
        <NotificationSubscribeCard />
        <NotificationSubscribeCard />
      </section>
    </MyInfo>
  );
}
