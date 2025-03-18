import Head from 'next/head';

import { MYINFO_NOTIFICATIONS_CANONICAL_URL } from '../constants/myInfoLinks';
import Notification from './notification/index.page';

export default function NotificationsPage() {
  return (
    <>
      <Head>
        <link rel='canonical' href={MYINFO_NOTIFICATIONS_CANONICAL_URL} key='canonical' />
      </Head>
      <Notification />
    </>
  );
}
