import React from 'react';
import tossLogo from '@/public/image/techblog/Toss_Logo.svg';
import heart from '@/public/image/techblog/heart.svg';
import arrow from '@/public/image/techblog/angle-right.svg';
import Image from 'next/image';
import styled from 'styled-components';

const Tag = styled.li`
  line-height: 12px;
  font-weight: 700;
  border: 1px solid var(--point-1);
  border-radius: 100px;
  padding: 5px 9px;
  color: var(--point-1);
`;

const ImgWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-gray1 w-[28.6rem] h-[18.4rem] rounded-[2rem] border-white flex justify-center'>
      {children}
    </div>
  );
};
const TagWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex gap-[0.6rem]'>{children}</div>;
};

const TechCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='grid grid-flow-col border-white gap-[3.2rem] text-white'>{children}</div>;
};

const TechTitle = ({ type, title }: { type: string; title: string }) => {
  return (
    <p className='flex flex-row gap-8 font-bold text-st1 text-white border-white py-[0.9rem]'>
      <span className='text-primary3'>{type}</span>
      <Image priority src={arrow} alt='화살표' />
      {title}
    </p>
  );
};

const TechContent = ({ content }: { content: string }) => {
  const TechCntClasses = 'text-p2 text-white border-white border-solid pt-[1.3rem] pb-[2.4rem]';
  return <p className={TechCntClasses}>{content}</p>;
};

// FIXME: date타입은 서버에서 정해지면 바꿈
const TechInfo = ({ author, date }: { author: string; date: string }) => {
  return (
    <>
      <div className='text-c1 flex gap-10 border-white gap-[1.8rem]'>
        <p>{author}</p>
        <p>{date}</p>
      </div>
    </>
  );
};

export default function TechCard() {
  return (
    <>
      <TechCardWrapper>
        <ImgWrapper>
          <Image priority src={tossLogo} alt='기술블로그 사진' />
        </ImgWrapper>
        <div>
          <div className='flex justify-between border-white'>
            <TechTitle type='토스' title='게시물이니까 텍스트가 좀 길어져도 괜찮을 거 같네요.' />
            <Image src={heart} alt='좋아요버튼' />
          </div>
          <TechInfo author='by. 최진영' date='2023.10.23' />
          <TechContent
            content='  안녕하세요. 토스뱅크 프론트엔드 개발자로 근무하고 있는 박지혜입니다. 지난 글에서
            토스뱅크 프론트엔드 챕터가 웹으로 은행을 만들고 있는 이야기를 소개해 드렸는데요. 이번
            글에서는 토스뱅크 프론트엔드 개발자로 합류하셨을 때를 상상할 수 있도록, 저의 일주일을
            소개해 드리고자 해요. 스쿼드 구성원, 프론트엔드 챕터 구성원, 길드 구성원으로서 드리며...'
          />

          {/* 2차 UI */}
          {/* <TagWrapper>
            <Tag>다양하면 좋지요</Tag>
            <Tag>따끈따끈</Tag>
            <Tag>프론트</Tag>
          </TagWrapper> */}
        </div>
      </TechCardWrapper>
    </>
  );
}
