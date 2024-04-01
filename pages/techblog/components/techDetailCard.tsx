import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/EllipsisGradientText ';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';
import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';
import techBlogImg from '@public/image/techblog/techBlogImg.png';

import SearchInput from '@/components/searchInput';
import Tooltip from '@/components/tooltips/tooltip';

const TechDetailInfo = ({
  company,
  author,
  date,
}: {
  company: string;
  author: string;
  date: string;
}) => {
  return (
    <>
      <ul className='p1 flex border-white gap-[1.6rem] select-none'>
        <li>{company}</li>
        <span className='text-gray4'>|</span>
        <li>by.{author}</li>
        <span className='text-gray4 '>|</span>
        <li>{date}</li>
      </ul>
    </>
  );
};

const TechMainContent = ({ title, content }: { title: string; content: string }) => {
  return (
    <>
      <h2 className='st1 py-[3.4rem] font-bold'>{title}</h2>
      <div>
        <EllipsisGradientText startPercent='60%' endPercent='100%' className='p1 py-[1.7rem]'>
          {content}
        </EllipsisGradientText>
      </div>
    </>
  );
};

const ArticleViewBtn = () => {
  return (
    <button className='w-full flex justify-center items-center st1 text-point1 pt-[6.4rem] pb-[4.8rem] border-solid border-b border-b-gray1 mb-[9.6rem] font-bold'>
      <p className='mr-[1.6rem]'>아티클 전체 보기</p>
      <RightArrow className='text-point1' />
    </button>
  );
};

export default function TechDetailCard() {
  const [heart, setHeart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [init, setInit] = useState(true);

  useEffect(() => {
    if (init) {
      setTimeout(() => {
        setInit(false);
      }, 2 * 1000);
    }
  }, []);

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
    <section>
      <div className='flex items-center justify-between'>
        <Link href='/techblog' className='text-st1 font-bold'>
          기술블로그 🧪
        </Link>
        <SearchInput />
      </div>
      {/* ----------------------------------------------------- */}
      <div className='relative'>
        <Image
          className='my-[4.8rem] opacity-40 rounded-[1.6rem] w-full h-[15.1rem] object-cover'
          src={techBlogImg}
          alt='기술블로그사진'
        />
        <div className='w-full px-[4rem] py-[3.2rem] top-0 absolute'>
          <div className='flex justify-between mb-[2.4rem]'>
            <h2 className='h2 font-bold'>Reactor Netty Memory Leak 이슈 탐방기</h2>
            <div className='flex flex-row items-center gap-6 relative'>
              <Tooltip variant='greenTt' direction='right' isVisible={showTooltip}>
                {heart ? '북마크로 저장했어요' : '북마크에서 삭제했어요'}
              </Tooltip>
              <Tooltip variant='greenTt' direction='right' isVisible={init && !showTooltip}>
                북마크함에 저장해보세요!
              </Tooltip>
              <div className='p-[1rem]'>{heartIcon}</div>
            </div>
          </div>
          <TechDetailInfo company='Toss' author='최진영' date='2023.10.23' />
        </div>
      </div>

      <div className='px-[4rem]'>
        <TechMainContent
          title='Spring Cloud Gateway Memory Leak 이슈 파악하기'
          content='어느 날 한 게이트웨이로부터 OOMKilled 알림을 받았습니다.
         OOMKilled 알림은 OS가 프로세스를 죽였다는 알림인데요.
         
         해당 컨테이너에 지정된 메모리 상한을 컨테이너가 사용하는 총 메모리가 초과했음을 뜻해요. 
         
         죽은 게이트웨이에는 최근에 변경된 사항이 없었고, 게이트웨이가 OOM으로 죽은 적이 처음이라 의아한 상황이었어요. 
         
         그래서 하나하나 증거를 살펴보기로 했습니다.

우선 컨테이너가 OOMKilled로 죽었다는 것은 JVM에서 일반적으로 사용하는 Heap 영역의 문제일 가능성이 거의 없습니다.

토스에서는 메모리 할당에 드는 오버헤드를 최대한 줄이기 위해  JVM 옵션을 사용하고 있는데요. 이 옵션을 사용하면 어플리케이션 부팅 시 Heap 영역만큼의 메모리를 미리 할당하고 시작하기 때문입니다.

그래서 일반적으로 토스의 서버들은 RSS 메모리 지표가 부팅할 때를 제외하고는 큰 변화가 없습니다.

하지만 이번에 OOM으로 죽은 서버의 residential set size (RSS) 메모리 지표를 살펴보면 변화가 있었을 뿐 아니라 꾸준히 우상향 중이었습니다.

여기서부터는 JVM heap 영역이 아닌 native 영역의 메모리를 사용하는 부분을 샅샅이 뒤져 범인을 찾아야 합니다. 

하지만 문제가 된 게이트웨이는 JNI나 JNA같이 native 영역의 메모리를 쓰는 곳은 없어서 어디에서 문제가 발생했는지 바로 알기 어려웠습니다. 여기서부터는 JVM heap 영역이 아닌 native 영역의 메모리를 사용하는 부분을 샅샅이 뒤져 범인을 찾아야 합니다. 

 '
        />
      </div>
      <div className='px-[14.5rem]'>
        <ArticleViewBtn />
      </div>
    </section>
  );
}
