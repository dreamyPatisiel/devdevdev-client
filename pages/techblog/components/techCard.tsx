import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '@components/tooltips/tooltip';

import HeartNonActive from '@public/image/techblog/heart.svg';
import HeartActive from '@public/image/techblog/heart_active.svg';

import { TechCardProps } from '../types/techBlogType';
import { Tag } from './tag';
import { ImgWrapper, TechCardWrapper, TechContent, TechInfo, TechTitle } from './techSubComponent';

//----------------------------------------------------------------------------------------

export default function TechCard({ techData }: { techData: TechCardProps }) {
  const router = useRouter();
  const { pathname } = router;

  const MOCK_DATA = {
    id: 91, // pk
    elasticId: 'HBG5Eo4B26VCvf0zcoV_', // 엘라스틱서치 pk
    thumbnailUrl:
      'https://d2908q01vomqb2.cloudfront.net/2a459380709e2fe4ac2dae5733c73225ff6cfee1/2024/02/05/DBBLOG-1651-PART2-img1-1024x321.png',
    title: 'AWS에서 SQL Server를 위한 재해 복구 설계: 2부',
    company: 'AWS',
    regDate: '20/23-08-02',
    author: 'aws 누군가..',
    description:
      '이 글은 AWS Database Blog에 게시된 Architect a disaster recovery for SQL Server on AWS: Part 2 by Ganapathi Varma Chekuri and Baris Furtinalar을 한국어 번역 및 편집하였습니다. 이 블로그 시리즈 (1부, 2부, 3부, 4부)에서는 Amazon Elastic Compute Cloud (Amazon EC2)에서 운영 중인 SQL Server에서 고려할 수 있는 재해 복구 (Disaster Recovery, DR) 각 방안을 […]',
    viewTotalCount: 984, // 조회수
    recommendTotalCount: 722, // 추천수
    commentTotalCount: 943, // 댓글수
    popularScore: 8628, // 인기 점수,
    isBookmarked: true, // 북마크 여부(회원일 경우만 존재)
  };

  const {
    id,
    elasticId,
    thumbnailUrl,
    title,
    company,
    regDate,
    author,
    description,
    viewTotalCount,
    recommendTotalCount,
    commentTotalCount,
    popularScore,
    isBookmarked,
  } = MOCK_DATA; // FIXME: techData로 변경

  const [heart, setHeart] = useState(isBookmarked);
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
      }, 2 * 1000);
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
        <ImgWrapper width='w-[24rem]' height='h-[18.4rem]'>
          <img width='500' height='300' src={thumbnailUrl} alt='기술블로그 썸네일' />
        </ImgWrapper>

        <div>
          <div className='flex items-center justify-between border-white'>
            <Link href={`${pathname}/1`}>
              <TechTitle type={company} title={title} />
            </Link>

            <div className='flex flex-row items-center relative'>
              <Tooltip variant='grayTt' direction='right' isVisible={showTooltip}>
                {heart ? '북마크로 저장했어요' : '북마크로 삭제했어요'}
              </Tooltip>
              {heartIcon}
            </div>
          </div>
          <TechInfo author={author} date={regDate} />
          <TechContent content={description} />
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
