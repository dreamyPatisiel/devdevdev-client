import React from 'react';

import { DevDevDevLoading } from '@components/common/devdevdevLoading/devLoading';
import MobileHeader from '@components/common/mobileHeader/mobileHeader';

export default function index() {
  return (
    <div className='w-full'>
      <MobileHeader />
      <DevDevDevLoading />
    </div>
  );
}
