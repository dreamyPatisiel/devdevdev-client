import Link from 'next/link';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface MyInfoSubNavProps {
  myInfoTitle: string;
  navItems: {
    key: string;
    name: string;
    count: number;
    pathname: string;
    active: boolean;
  }[];
}

export default function MyInfoSubNav({ myInfoTitle, navItems }: MyInfoSubNavProps) {
  const { isMobile } = useMediaQueryContext();

  return (
    <div>
      {isMobile ? <></> : <h1 className='h3 font-bold mb-[2.6rem]'>{myInfoTitle}</h1>}

      <div className='mb-[2.4rem]'>
        {navItems.map((navItem) => (
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
