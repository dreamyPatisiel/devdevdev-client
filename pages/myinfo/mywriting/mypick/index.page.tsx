import React from 'react';

import MyInfo from '@pages/myinfo/index.page';
import MyWritingNav from '@pages/myinfo/mywriting/mypick/components/MyWritingNav';

import MyPickStatusComponent from './components/MyPickStatusComponent';

export default function MyPick() {
  return (
    <MyInfo>
      <MyWritingNav />
      <MyPickStatusComponent />
    </MyInfo>
  );
}
