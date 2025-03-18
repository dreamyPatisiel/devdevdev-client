import Head from 'next/head';

import { MYINFO_MYWRITING_CANONICAL_URL } from '../constants/myInfoLinks';
import MyPick from './mypick/index.page';

export default function MyWritingPage() {
  return (
    <>
      <Head>
        <link rel='canonical' href={MYINFO_MYWRITING_CANONICAL_URL} key='canonical' />
      </Head>
      <MyPick />
    </>
  );
}
