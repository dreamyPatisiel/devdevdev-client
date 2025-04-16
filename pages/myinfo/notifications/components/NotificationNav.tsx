import router from 'next/router';

import MyInfoSubNav from '@pages/myinfo/components/MyInfoSubNav';
import { MYINFO_NOTIFICATIONS } from '@pages/myinfo/constants/myInfoLinks';

import { useGetMySubscriptions } from '../subscribe/apiHooks/useGetMySubscriptions';

export default function NotificationNav() {
  const { pathname } = router;

  const { mySubscriptionsData } = useGetMySubscriptions();

  const totalSubscriptions = mySubscriptionsData?.pages[0].data.totalElements;

  const NAV_ITEMS = MYINFO_NOTIFICATIONS.map((notificationsItem, index) => {
    const count = notificationsItem.key === 'subscribe' ? totalSubscriptions : 0;

    return {
      key: notificationsItem.key,
      name: notificationsItem.name,
      count: count ?? 0,
      pathname: notificationsItem.pathname,
      active:
        pathname === notificationsItem.pathname ||
        (index === 0 && pathname === notificationsItem.startHref),
    };
  });

  return <MyInfoSubNav myInfoTitle='알림' navItems={NAV_ITEMS} />;
}
