import Link from 'next/link';
import { useRouter } from 'next/router';

import useIsMobile from '@hooks/useIsMobile';

import { ROUTES } from '@/constants/routes';

export default function MyWritingNav() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { pathname } = router;

  const NAV_ITEMS = [
    {
      key: 'mypick',
      name: '게시물',
      count: 6,
      pathname: ROUTES.MY_INFO.MAIN,
      active: pathname === ROUTES.MY_INFO.MAIN,
    },
    {
      key: 'mycomment',
      name: '댓글',
      count: 21,
      pathname: ROUTES.MY_INFO.MY_COMMENT,
      active: pathname === ROUTES.MY_INFO.MY_COMMENT,
    },
  ];

  return (
    <div>
      {isMobile ? <></> : <h1 className='h3 font-bold mb-[2.6rem]'>내가 썼어요</h1>}

      <div className='mb-[2.4rem]'>
        {NAV_ITEMS.map((navItem) => (
          <Link
            key={navItem.key}
            href={navItem.pathname}
            className={`st2 font-bold p-[1rem] inline-block
        ${navItem.active ? 'border-b-[0.1rem] border-b-white text-white' : 'text-gray200'}`}
          >
            {navItem.name}
            <span
              className={`ml-[0.6rem] ${navItem.active ? 'text-secondary300' : 'text-secondary300 opacity-50'}`}
            >
              {navItem.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
