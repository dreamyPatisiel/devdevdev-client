import React from 'react';

import MyWritingNav from '@pages/myinfo/components/MyWritingNav';
import MyInfo from '@pages/myinfo/index.page';

import MyPickStatusComponent from './components/MyPickStatusComponent';

export default function MyPick() {
  return (
    <MyInfo>
      <MyWritingNav />
      <MyPickStatusComponent />
    </MyInfo>
  );
}
