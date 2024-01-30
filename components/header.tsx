import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Modal from './modal';
import devLogo from '@/public/image/devdevdevLogo.svg';
import { useModalStore } from '@/store/modalStore';

// 1440x900 ? 기준
export default function Header() {
  const { openModal } = useModalStore();
  return (
    <header
      className='flex flex-row justify-between items-center px-[9.8rem] h-[8vh] text-p1'
      style={{
        borderBottom: '1px solid #DEE5ED',
      }}
    >
      <Image src={devLogo} alt='devdevdev로고' />
      <ul className='text-white flex flex-row gap-[4.8rem]'>
        <button>픽픽픽 💖</button>
        <button>기술블로그 🧪</button>
        <button>내정보 🧀</button>
        <button
          className='bg-primary1 text-center px-[2rem] py-[1.2rem] rounded-full'
          onClick={openModal}
        >
          로그인
        </button>
      </ul>
    </header>
  );
}
