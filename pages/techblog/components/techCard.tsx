import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Arrow from '@/public/image/techblog/angle-right.svg';
import TossLogo from '@/public/image/techblog/Toss_Logo.svg';
import HeartNonActive from '@/public/image/techblog/heart.svg';
import HeartActive from '@/public/image/techblog/heart_active.svg';
import SaveTooltip from '@/public/image/techblog/툴팁_save.svg';
import DeleteTooltip from '@/public/image/techblog/툴팁_delete.svg';

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
    <div className='bg-gray1 w-[28.6rem] h-[18.4rem] rounded-[2rem] border-white flex justify-center items-center'>
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
    <div className='flex flex-row items-center gap-8 font-bold text-st1 text-white border-white py-[0.9rem] '>
      <span className='text-primary3'>{type}</span>
      <Arrow priority alt='화살표' />
      <p className='w-[65rem] truncate hover:text-clip'>{title}</p>
    </div>
  );
};

const TechContent = ({ content }: { content: string }) => {
  const TechCntClasses =
    'text-p2 text-white border-white border-solid pt-[1.3rem] h-[8.3rem] overflow-y-hidden';
  return <p className={TechCntClasses}>{content}</p>;
};

// FIXME: date타입은 서버에서 정해지면 바꿈
const TechInfo = ({ author, date }: { author: string; date: string }) => {
  return (
    <>
      <div className='text-c1 flex border-white gap-[1.6rem]'>
        <p>{author}</p>
        <p>{date}</p>
      </div>
    </>
  );
};

//----------------------------------------------------------------------------------------

export default function TechCard() {
  const [heart, setHeart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleHeartClick = () => {
    setHeart((prev) => !prev);
    setShowTooltip(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 3 * 1000);
    };
    if (showTooltip) {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [heart, showTooltip]);

  return (
    <>
      <TechCardWrapper>
        <ImgWrapper>
          <TossLogo priority alt='기술블로그 사진' className='w-[14.7rem]' />
        </ImgWrapper>
        <div>
          <div className='flex items-center justify-between border-white'>
            <TechTitle
              type='토스'
              title='Kotlin으로 DSL 만들기: 반복적이고 지루한 REST Docs 벗어나기 Kotlin으로 DSL 만들기: 반복.'
            />
            <div className='flex flex-row items-center gap-6'>
              {showTooltip && heart && <SaveTooltip priority alt='북마크저장 툴팁' />}
              {showTooltip && !heart && <DeleteTooltip priority alt='북마크삭제 툴팁' />}
              {heart ? (
                <HeartActive onClick={handleHeartClick} alt='좋아요버튼' />
              ) : (
                <HeartNonActive onClick={handleHeartClick} alt='좋아요취소버튼' />
              )}
            </div>
          </div>
          <TechInfo author='by. 최진영' date='2023.10.23' />
          <TechContent
            content='  안녕하세요. 토스뱅크 프론트엔드 개발자로 근무하고 있는 박지혜입니다. 지난 글에서
            토스뱅크 프론트엔드 챕터가 웹으로 은행을 만들고 있는 이야기를 소개해 드렸는데요. 이번
            글에서는 토스뱅크 프론트엔드 개발자로 합류하셨을 때를 상상할 수 있도록, 저의 일주일을
            소개해 드리고자 해요. 스쿼드 구성원, 프론트엔드 챕터 구성원, 길드 구성원으로서 드리며
            안녕하세요. 토스뱅크 프론트엔드 개발자로 근무하고 있는 박지혜입니다. 지난 글에서
            토스뱅크 프론트엔드 챕터가 웹으로 은행을 만들고 있는 이야기를 소개해 드렸는데요. 이번
            글에서는 토스뱅크 프론트엔드 개발자로 합류하셨을 때를 상상할 수 있도록, 저의 일주일을
            소개해 드리고자 해요. 스쿼드 구성원, 프론트엔드 챕터 구성원, 길드 구성원으로서 드리
            '
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
