import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import listDots from '@public/image/list-dots.svg';

export default function MobileToListButton({ route }: { route: string }) {
  const [showBottom, setShowBottom] = useState(true);

  const handleScrollEvent = () => {
    if (window.scrollY === 0) {
      setShowBottom(true);
      return;
    }

    setShowBottom(false);
  };

  const handleClickEvent = () => {
    setShowBottom(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('click', handleClickEvent);
  }, []);

  if (!showBottom) return <></>;

  return (
    <div className='h-[6.4rem] z-40'>
      <div className={`fixed left-0 right-0 bottom-0 px-[1.6rem] py-[1.9rem] bg-gray1 flex}`}>
        <Link href={route}>
          <button className='st2 text-gray5 flex gap-[1rem] justify-center'>
            <Image src={listDots} alt='목록 아이콘' />
            목록으로
          </button>
        </Link>
      </div>
    </div>
  );
}
