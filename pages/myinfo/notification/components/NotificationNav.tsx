import router from 'next/router';

import MyInfoSubNav from '@pages/myinfo/components/MyInfoSubNav';

import { ROUTES } from '@/constants/routes';

export default function NotificationNav() {
  const { pathname } = router;

  const NAV_ITEMS = [
    {
      key: 'notification',
      name: '알림',
      count: 0,
      pathname: ROUTES.MY_INFO.NOTIFICATION,
      active: pathname === ROUTES.MY_INFO.NOTIFICATION,
    },
    {
      key: 'subscribe',
      name: '구독한 기업',
      count: 0,
      pathname: ROUTES.MY_INFO.SUBSCRIBE,
      active: pathname === ROUTES.MY_INFO.SUBSCRIBE,
    },
  ];

  return <MyInfoSubNav myInfoTitle='알림' navItems={NAV_ITEMS} />;
}
