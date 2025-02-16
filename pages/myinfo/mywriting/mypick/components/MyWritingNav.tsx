import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/routes';

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

  const NAV_ITEMS = [
    {
      key: 'mypick',
      name: '게시물',
      count: MY_PICKS_TOTAL ?? 0,
      pathname: ROUTES.MY_INFO.MAIN,
      active: pathname === ROUTES.MY_INFO.MAIN,
    },
    {
      key: 'mycomment',
      name: '댓글',
      count: MY_COMMENTS_TOTAL ?? 0,
      pathname: ROUTES.MY_INFO.MY_COMMENT,
      active: pathname === ROUTES.MY_INFO.MY_COMMENT,
    },
  ];

  return <MyInfoSubNav myInfoTitle='내가 썼어요' NAV_ITEMS={NAV_ITEMS} />;
}
