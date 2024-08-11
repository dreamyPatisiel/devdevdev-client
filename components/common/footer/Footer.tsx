import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useIsMobile from '@hooks/useIsMobile';

import {
  DEVDEVDEV_EMAIL,
  DEVDEVDEV_INSTAGRAM,
  DEVDEVDEV_INFO,
  DEVDEVDEV_YOUTUBE,
  DEVDEVDEV_PRIVACY,
} from '@/constants/FooterLink';
import book from '@/public/image/footer/book.svg';
import envelope from '@/public/image/footer/envelope.svg';
import instagram from '@/public/image/footer/instagram.svg';
import youtube from '@/public/image/footer/youtube.svg';

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className={'w-full h-[9.3rem]'}>
      <div
        className={`${isMobile ? 'flex-col gap-[1.6rem] pb-[2.4rem]' : 'justify-between px-[20.3rem] pb-[6.4rem]'} flex c1 items-end absolute bottom-0 w-full`}
      >
        <nav
          className={`flex ${isMobile ? 'flex-col-reverse gap-[1.6rem] items-center' : 'gap-[2.4rem] '}`}
        >
          <div className='flex items-center'>
            <Link href={DEVDEVDEV_INFO} target='_blank'>
              <Image src={book} alt='책 아이콘' />
            </Link>
            <p className='ml-4 mr-6 text-gray4'>꿈빛파티시엘</p>
            <a
              href={`mailto:${DEVDEVDEV_EMAIL}`}
              className='flex justify-center items-center gap-3 text-gray4'
            >
              <Image src={envelope} alt='메일 아이콘' />
              <span>{DEVDEVDEV_EMAIL}</span>
            </a>
          </div>

          <div className='flex items-center gap-5'>
            <Link href={DEVDEVDEV_INSTAGRAM} target='_blank'>
              <Image src={instagram} alt='인스타그램 아이콘' />
            </Link>
            <Link href={DEVDEVDEV_YOUTUBE} target='_blank'>
              <Image src={youtube} alt='유투브 아이콘' />
            </Link>
            <Link href={DEVDEVDEV_PRIVACY} className=' text-gray3' target='_blank'>
              개인정보 처리방침
            </Link>
          </div>
        </nav>

        <p className='text-gray4'>Copyright &copy; 2024 꿈빛파티시엘 All rights reserved.</p>
      </div>
    </footer>
  );
}
