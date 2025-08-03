/** 현재 페이지가 클릭한 nav와 일치하는지 확인하는 함수 */
export const isNavigationActive = (
  link: '/pickpickpick' | '/techblog' | '/myinfo',
  pathname: string,
) => {
  return pathname === link || pathname.startsWith(link + '/');
};
