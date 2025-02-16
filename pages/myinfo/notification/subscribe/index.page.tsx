import React from 'react';

import MyInfo from '@pages/myinfo/index.page';

import NotificationNav from '../components/NotificationNav';

export default function SubScribe() {
  return (
    <MyInfo>
      <NotificationNav />
      <div>SubScribe</div>
    </MyInfo>
  );
}
