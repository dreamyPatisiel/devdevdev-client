import router from 'next/router';

import MyInfoSubNav from '@pages/myinfo/components/MyInfoSubNav';
import { MYINFO_NOTIFICATIONS } from '@pages/myinfo/constants/myInfoLinks';

export default function NotificationNav() {
  const { pathname } = router;

  const NAV_ITEMS = MYINFO_NOTIFICATIONS.map((notificationsItem, index) => ({
    key: notificationsItem.key,
    name: notificationsItem.name,
    count: 0,
    pathname: notificationsItem.pathname,
    active:
      pathname === notificationsItem.pathname ||
      (index === 0 && pathname === notificationsItem.startHref),
  }));

  return <MyInfoSubNav myInfoTitle='알림' navItems={NAV_ITEMS} />;
}
