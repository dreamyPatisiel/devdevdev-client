import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '@components/tooltips/tooltip';

import TossLogo from '@public/image/techblog/Toss_Logo.svg';
import Arrow from '@public/image/techblog/angle-right_primary3.svg';
import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';

import { Tag } from './tag';

export const ImgWrapper = ({
  width,
  height,
  children,
}: {
  width: string;
  height: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{ width: width, height: height }}
      className='bg-gray1  rounded-[2rem] flex justify-center items-center'
    >
      {children}
    </div>
  );
};
const TagWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex gap-[0.6rem]'>{children}</div>;
};

const TechCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className='grid grid-flow-col border-white gap-[3.2rem] text-white py-[3.2rem] border-b r border-b-gray3 border-solid select-none'>
      {children}
    </li>
  );
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
  const TechCntClasses = 'text-p2 text-white border-white border-solid pt-[1.3rem] h-[10rem]';
  return (
    <p
      className={TechCntClasses}
      style={{
        display: '-webkit-box',
        wordWrap: 'break-word',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {content}
    </p>
  );
};

// FIXME: date타입은 서버에서 정해지면 바꿈
const TechInfo = ({ author, date }: { author: string; date: string }) => {
  return (
    <>
      <div className='text-c1 flex border-white gap-[1.6rem] '>
        <p>{author}</p>
        <p>{date}</p>
      </div>
    </>
  );
};

//----------------------------------------------------------------------------------------

export default function TechCard() {
  const router = useRouter();
  const { pathname } = router;
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
      }, 2 * 1000); // FIXME: 3초는 너무 긴 것같아 2초 제안
    };
    if (showTooltip) {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [heart, showTooltip]);

  const heartIcon = heart ? (
    <HeartActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요버튼' />
  ) : (
    <HeartNonActive className='cursor-pointer' onClick={handleHeartClick} alt='좋아요취소버튼' />
  );

  return (
    <>
      <TechCardWrapper>
        <ImgWrapper width='29.6rem' height='18.4rem'>
          <TossLogo priority alt='기술블로그 사진' className='w-[14.7rem]' />
        </ImgWrapper>

        <div>
          <div className='flex items-center justify-between border-white'>
            <Link href={`${pathname}/1`}>
              <TechTitle
                type='토스'
                title='Kotlin으로 DSL 만들기: 반복적이고 지루한 REST Docs 벗어나기 Kotlin으로 DSL 만들기: 반복.'
              />
            </Link>

            <div className='flex flex-row items-center gap-6'>
              {showTooltip && heart && <Tooltip text='북마크로 저장했어요' position='right' />}
              {showTooltip && !heart && <Tooltip text='북마크에서 삭제했어요' position='right' />}
              {heartIcon}
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
            <Tag text='다양하면 좋지요' />
            <Tag text='따끈따끈' />
            <Tag text='프론트' />
          </TagWrapper> */}
        </div>
      </TechCardWrapper>
    </>
  );
}
