import React from 'react';

import MyInfo from '@pages/myinfo/index.page';

import logoImage from '@public/image/devdevdevLogo.svg';

import NotificationNav from '../components/NotificationNav';
import SubscribeCard from './components/SubscribeCard';

export default function Subscribe() {
  const subscribeData = [
    {
      id: 1,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 2,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 3,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 4,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 5,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 6,
      logoImage: logoImage,
      company: '댑구리',
    },
    {
      id: 7,
      logoImage: logoImage,
      company: '댑구리',
    },
  ];

  return (
    <MyInfo>
      <NotificationNav />
      <section className='flex flex-wrap gap-x-[1.6rem] gap-y-[2.4rem]'>
        {subscribeData.map((subscribeItem) => (
          <SubscribeCard
            key={subscribeItem.id}
            logoImage={subscribeItem.logoImage}
            company={subscribeItem.company}
          />
        ))}
      </section>
    </MyInfo>
  );
}
