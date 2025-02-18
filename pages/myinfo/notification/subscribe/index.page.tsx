import React from 'react';

import MyInfo from '@pages/myinfo/index.page';

import logoImage from '@public/image/devdevdevLogo.svg';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

import NotificationNav from '../components/NotificationNav';
import SubscribeCard from './components/SubscribeCard';

export default function Subscribe() {
  const { isMobile } = useMediaQueryContext();

  const subscribeData = [
    {
      id: 1,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: true,
    },
    {
      id: 2,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: true,
    },
    {
      id: 3,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: true,
    },
    {
      id: 4,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: false,
    },
    {
      id: 5,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: true,
    },
    {
      id: 6,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: false,
    },
    {
      id: 7,
      logoImage: logoImage,
      company: '댑구리',
      isSubscribe: true,
    },
  ];

  return (
    <MyInfo>
      <NotificationNav />
      <section
        className={`flex flex-wrap gap-x-[1.6rem] gap-y-[2.4rem] ${isMobile ? 'justify-center mb-[8rem]' : ''}`}
      >
        {subscribeData.map((subscribeItem) => (
          <SubscribeCard
            key={subscribeItem.id}
            logoImage={subscribeItem.logoImage}
            company={subscribeItem.company}
            isSubscribe={subscribeItem.isSubscribe}
          />
        ))}
      </section>
    </MyInfo>
  );
}
