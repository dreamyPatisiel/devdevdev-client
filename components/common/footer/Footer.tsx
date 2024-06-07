import React from 'react';

import Image from 'next/image';

import envelope from '@/public/image/footer/envelope.svg';
import instagram from '@/public/image/footer/instagram.svg';
import youtube from '@/public/image/footer/youtube.svg';

export default function Footer() {
  return (
    <footer className='flex justify-center items-center'>
      <nav>
        <ul className='flex'>
          <li className='mr-6'>꿈빛파티시엘</li>
          <li className='flex justify-center items-center'>
            <Image src={envelope} alt='메일 아이콘' />
            <p>dreamy5patisiel@gmail.com</p>
          </li>
          <li>
            <Image src={instagram} alt='인스타그램 아이콘' />
          </li>
          <li>
            <Image src={youtube} alt='유투브 아이콘' />
          </li>
          <li>개인정보 처리방침</li>
        </ul>
      </nav>
      <p className='c1 text-gray4'>&copy; Copyright ⓒ 2024 꿈빛파티시엘 All rights reserved.</p>
    </footer>
  );
}
