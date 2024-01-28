import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import devLogo from '@/public/image/devdevdevLogo.svg';

// 1440x900 ? 기준

export default function Header() {
  return (
    <header
      className='flex flex-row justify-between items-center px-25 h-8vh text-p1'
      style={{
        borderBottom: '1px solid #DEE5ED',
      }}
    >
      <Image src={devLogo} alt='devdevdev로고' />
      <ul className='text-white flex flex-row gap-11'>
        <button>픽픽픽 💖</button>
        <button>기술블로그 🧪</button>
        <button>내정보 🧀</button>
        <button
          className='bg-primary1 text-center px-5 py-3 rounded-full'
          onClick={() => console.log('로그인 클릭')}
        >
          로그인
        </button>
      </ul>
    </header>
  );
}
