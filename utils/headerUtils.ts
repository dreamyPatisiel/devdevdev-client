import { QueryClient } from '@tanstack/react-query';

import { ROUTES } from '@/constants/routes';

/** 각 nav를 클릭했을때 refresh 해주는 함수 */
// FIXME: 사용하는 곳이 없고 useHandleLinkClick과 겹치는 것 같은데 삭제해도 될까요?
export const handleLinkClick = (link: string, queryClient: QueryClient) => {
  switch (link) {
    case ROUTES.PICKPICKPICK.MAIN:
      queryClient.invalidateQueries({ queryKey: ['pickData'] });
      queryClient.setQueryData(['pickSort'], 'POPULAR');
      break;
    case ROUTES.TECH_BLOG:
      queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
      queryClient.setQueryData(['techblogSort'], 'LATEST');
      queryClient.setQueryData(['searchKeyword'], '');
      queryClient.setQueryData(['companyId'], null);
      break;
  }
};

/** 현재 페이지가 클릭한 nav와 일치하는지 확인하는 함수 */
export const isActive = (link: '/pickpickpick' | '/techblog' | '/myinfo', pathname: string) => {
  const { MY_INFO, PICKPICKPICK, TECH_BLOG } = ROUTES;
  if ([MY_INFO.PREFIX, PICKPICKPICK.MAIN, TECH_BLOG].includes(link)) {
    return pathname.startsWith(link);
  }
  return pathname === link;
};
