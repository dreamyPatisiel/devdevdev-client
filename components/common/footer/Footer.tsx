import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { DEVDEVDEV_INSTAGRAM, DEVDEVDEV_NOTION, DEVDEVDEV_YOUTUBE } from '@/constants/FooterLink';
import envelope from '@/public/image/footer/envelope.svg';
import instagram from '@/public/image/footer/instagram.svg';
import youtube from '@/public/image/footer/youtube.svg';

export default function Footer() {
  return (
    <footer className='flex justify-between items-center px-[20.3rem]'>
      <nav>
        <ul className='flex'>
          <li className='mr-6'>꿈빛파티시엘</li>
          <li className='flex justify-center items-center gap-3  text-gray4'>
            <Image src={envelope} alt='메일 아이콘' />
            <p>dreamy5patisiel@gmail.com</p>
          </li>
          <div className='ml-[2.4rem] flex items-center gap-5'>
            <Link href={DEVDEVDEV_NOTION} target='_blank'>
              <Image src={instagram} alt='인스타그램 아이콘' />
            </Link>
            <Link href={DEVDEVDEV_YOUTUBE} target='_blank'>
              <Image src={youtube} alt='유투브 아이콘' />
            </Link>
            <Link href={DEVDEVDEV_INSTAGRAM} className=' text-gray3' target='_blank'>
              개인정보 처리방침
            </Link>
          </div>
        </ul>
      </nav>
      <p className='c1 text-gray4'>Copyright &copy; 2024 꿈빛파티시엘 All rights reserved.</p>
    </footer>
  );
}
