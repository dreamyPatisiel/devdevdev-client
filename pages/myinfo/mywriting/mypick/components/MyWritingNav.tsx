import { useRouter } from 'next/router';

import { MYINFO_MYWRITING } from '@pages/myinfo/constants/myInfoLinks';

import MyInfoSubNav from '../../../components/MyInfoSubNav';
import { useInfiniteMyComments } from '../../mycomment/apiHooks/useInfiniteMyComment';
import { useGetMyPicks } from '../apiHooks/useGetMyPicks';

export default function MyWritingNav() {
  const router = useRouter();
  const { myPicks } = useGetMyPicks();
  const { myCommentData } = useInfiniteMyComments({ commentFilter: 'ALL' });

  const { pathname } = router;

  const MY_PICKS_TOTAL = myPicks?.pages[0].data.data.numberOfElements;
  const MY_COMMENTS_TOTAL = myCommentData?.pages[0].data.totalElements;

  const NAV_ITEMS = MYINFO_MYWRITING.map((mywritingItem, index) => {
    const count = mywritingItem.key === 'mypick' ? MY_PICKS_TOTAL : MY_COMMENTS_TOTAL;

    return {
      key: mywritingItem.key,
      name: mywritingItem.name,
      count: count ?? 0,
      pathname: mywritingItem.pathname,
      active:
        pathname === mywritingItem.pathname ||
        (index === 0 && pathname === mywritingItem.startHref),
    };
  });

  return <MyInfoSubNav myInfoTitle='내가 썼어요' navItems={NAV_ITEMS} />;
}
